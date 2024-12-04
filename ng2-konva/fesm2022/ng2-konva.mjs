import * as i0 from '@angular/core';
import { QueryList, EventEmitter, inject, ElementRef, Component, ContentChildren, Input, Output } from '@angular/core';
import Konva from 'konva';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { Sprite } from 'konva/lib/shapes/Sprite';
import { Stage } from 'konva/lib/Stage';

// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js
function updatePicture(node) {
    const drawingNode = node.getLayer() || node.getStage();
    if (drawingNode) {
        drawingNode.batchDraw();
    }
}

// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js
function applyNodeProps(component, props = {}, oldProps = {}) {
    if ('id' in props) {
        const message = `ng2-konva: You are using "id" attribute for Konva node. In some very rare cases it may produce bugs. Currently we recommend not to use it and use "name" attribute instead.`;
        console.warn(message);
    }
    const instance = component.getStage();
    const updatedProps = {};
    let hasUpdates = false;
    Object.keys(oldProps).forEach((key) => {
        const isEvent = key.slice(0, 2) === 'on';
        const propChanged = oldProps[key] !== props[key];
        if (isEvent && propChanged) {
            let eventName = key.slice(2).toLowerCase();
            if (eventName.slice(0, 7) === 'content') {
                eventName =
                    'content' + eventName.slice(7, 8).toUpperCase() + eventName.slice(8);
            }
            instance.off(eventName, oldProps[key]);
        }
        const toRemove = !Object.hasOwn(props, key);
        if (toRemove) {
            instance.setAttr(key, undefined);
        }
    });
    Object.keys(props).forEach((key) => {
        const isEvent = key.slice(0, 2) === 'on';
        const toAdd = oldProps[key] !== props[key];
        if (isEvent && toAdd) {
            let eventName = key.slice(2).toLowerCase();
            if (eventName.slice(0, 7) === 'content') {
                eventName =
                    'content' + eventName.slice(7, 8).toUpperCase() + eventName.slice(8);
            }
            if (props[key]) {
                instance.off(eventName);
                instance.on(eventName, (event) => {
                    props[key]({
                        angularComponent: component,
                        event,
                    });
                });
            }
        }
        if (!isEvent &&
            (props[key] !== oldProps[key] || props[key] !== instance.getAttr(key))) {
            hasUpdates = true;
            updatedProps[key] = props[key];
        }
    });
    if (hasUpdates) {
        instance.setAttrs(updatedProps);
        updatePicture(instance);
        let val;
        Object.keys(updatedProps).forEach((prop) => {
            val = updatedProps[prop];
            if (val instanceof Image && !val.complete) {
                const node = instance;
                val.addEventListener('load', function () {
                    const layer = node.getLayer();
                    if (layer) {
                        layer.batchDraw();
                    }
                });
            }
        });
    }
}

function camelize(str) {
    return str
        .replace(/^\w|[A-Z]|\b\w/g, function (letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/\s+/g, '');
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function getName(componentTag) {
    return capitalizeFirstLetter(camelize(componentTag.slice(3).replace('-', ' ')));
}
function createListener(instance) {
    const output = {};
    [
        'mouseover',
        'mousemove',
        'mouseout',
        'mouseenter',
        'mouseleave',
        'mousedown',
        'mouseup',
        'wheel',
        'contextmenu',
        'click',
        'dblclick',
        'touchstart',
        'touchmove',
        'touchend',
        'tap',
        'dbltap',
        'dragstart',
        'dragmove',
        'dragend',
    ].forEach((eventName) => {
        const name = eventName;
        const eventEmitter = (instance[name]);
        if (eventEmitter.observed) {
            output['on' + eventName] = eventEmitter.emit.bind(eventEmitter);
        }
    });
    return output;
}

/* eslint-disable @angular-eslint/no-output-native */
class CoreShapeComponent {
    shapes = new QueryList();
    set config(config) {
        this._config = config;
        this.uploadKonva(config);
    }
    get config() {
        return this._config;
    }
    mouseover = new EventEmitter();
    mousemove = new EventEmitter();
    mouseout = new EventEmitter();
    mouseenter = new EventEmitter();
    mouseleave = new EventEmitter();
    mousedown = new EventEmitter();
    mouseup = new EventEmitter();
    wheel = new EventEmitter();
    contextmenu = new EventEmitter();
    click = new EventEmitter();
    dblclick = new EventEmitter();
    touchstart = new EventEmitter();
    touchmove = new EventEmitter();
    touchend = new EventEmitter();
    tap = new EventEmitter();
    dbltap = new EventEmitter();
    dragstart = new EventEmitter();
    dragmove = new EventEmitter();
    dragend = new EventEmitter();
    nameNode = getName(inject(ElementRef).nativeElement.localName);
    cacheProps = {};
    _stage;
    _config;
    getStage() {
        return this._stage;
    }
    getConfig() {
        return this._config || {};
    }
    ngOnInit() {
        this.initKonva();
    }
    initKonva() {
        if (!this._stage) {
            this._stage = new Shape();
        }
        if (this.nameNode === 'Shape') {
            this._stage = new Shape();
        }
        else if (this.nameNode === 'Sprite') {
            this._stage = new Sprite(this.config);
        }
        else {
            this._stage = new Konva[this.nameNode](undefined);
        }
        const animationStage = this._stage.to.bind(this._stage);
        this._stage.to = (newConfig) => {
            animationStage(newConfig);
            setTimeout(() => {
                Object.keys(this._stage.attrs).forEach((key) => {
                    if (typeof this._stage.attrs[key] !== 'function') {
                        this.config[key] = this._stage.attrs[key];
                    }
                });
            }, 200);
        };
        if (this._config) {
            this.uploadKonva(this.config);
        }
    }
    uploadKonva(config) {
        if (!this._stage)
            return;
        const props = {
            ...config,
            ...createListener(this),
        };
        applyNodeProps(this, props, this.cacheProps);
        this.cacheProps = props;
    }
    ngAfterContentChecked() {
        this.shapes.forEach((item) => {
            if (this !== item) {
                if (this._stage instanceof Group || this._stage instanceof Layer) {
                    this._stage.add(item.getStage());
                }
                updatePicture(this._stage);
            }
        });
    }
    ngOnDestroy() {
        this._stage.destroy();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: CoreShapeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.0", type: CoreShapeComponent, isStandalone: true, selector: "ko-shape, ko-layer, ko-circle, ko-fastlayer, ko-group, ko-label, ko-rect, ko-ellipse, ko-wedge, ko-line, ko-sprite, ko-image, ko-text, ko-text-path, ko-star, ko-ring, ko-arc, ko-tag, ko-path, ko-regular-polygon, ko-arrow, ko-transformer", inputs: { config: "config" }, outputs: { mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", mouseenter: "mouseenter", mouseleave: "mouseleave", mousedown: "mousedown", mouseup: "mouseup", wheel: "wheel", contextmenu: "contextmenu", click: "click", dblclick: "dblclick", touchstart: "touchstart", touchmove: "touchmove", touchend: "touchend", tap: "tap", dbltap: "dbltap", dragstart: "dragstart", dragmove: "dragmove", dragend: "dragend" }, queries: [{ propertyName: "shapes", predicate: CoreShapeComponent }], ngImport: i0, template: `<div><ng-content></ng-content></div>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: CoreShapeComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ko-shape, ko-layer, ko-circle, ko-fastlayer, ko-group, ko-label, ko-rect, ko-ellipse, ko-wedge, ko-line, ko-sprite, ko-image, ko-text, ko-text-path, ko-star, ko-ring, ko-arc, ko-tag, ko-path, ko-regular-polygon, ko-arrow, ko-transformer',
                    standalone: true,
                    template: `<div><ng-content></ng-content></div>`,
                }]
        }], propDecorators: { shapes: [{
                type: ContentChildren,
                args: [CoreShapeComponent]
            }], config: [{
                type: Input
            }], mouseover: [{
                type: Output
            }], mousemove: [{
                type: Output
            }], mouseout: [{
                type: Output
            }], mouseenter: [{
                type: Output
            }], mouseleave: [{
                type: Output
            }], mousedown: [{
                type: Output
            }], mouseup: [{
                type: Output
            }], wheel: [{
                type: Output
            }], contextmenu: [{
                type: Output
            }], click: [{
                type: Output
            }], dblclick: [{
                type: Output
            }], touchstart: [{
                type: Output
            }], touchmove: [{
                type: Output
            }], touchend: [{
                type: Output
            }], tap: [{
                type: Output
            }], dbltap: [{
                type: Output
            }], dragstart: [{
                type: Output
            }], dragmove: [{
                type: Output
            }], dragend: [{
                type: Output
            }] } });

/* eslint-disable @angular-eslint/no-output-native */
class StageComponent {
    nodeContainer = inject(ElementRef).nativeElement;
    shapes = new QueryList();
    set config(config) {
        this._config = config;
        if (!this._stage) {
            this._stage = new Stage({
                ...config,
                container: this.nodeContainer,
            });
            this.uploadKonva(config);
        }
        else {
            this.uploadKonva(config);
        }
    }
    mouseover = new EventEmitter();
    mousemove = new EventEmitter();
    mouseout = new EventEmitter();
    mouseenter = new EventEmitter();
    mouseleave = new EventEmitter();
    mousedown = new EventEmitter();
    mouseup = new EventEmitter();
    wheel = new EventEmitter();
    contextmenu = new EventEmitter();
    click = new EventEmitter();
    dblclick = new EventEmitter();
    touchstart = new EventEmitter();
    touchmove = new EventEmitter();
    touchend = new EventEmitter();
    tap = new EventEmitter();
    dbltap = new EventEmitter();
    dragstart = new EventEmitter();
    dragmove = new EventEmitter();
    dragend = new EventEmitter();
    _stage;
    _config;
    cacheProps = {};
    getStage() {
        return this._stage;
    }
    getConfig() {
        return this._config;
    }
    uploadKonva(config) {
        const props = {
            ...config,
            ...createListener(this),
        };
        applyNodeProps(this, props, this.cacheProps);
        this.cacheProps = props;
    }
    ngAfterContentInit() {
        this.shapes.forEach((item) => {
            if (!(item.getStage() instanceof Layer)) {
                throw 'You can only add Layer Nodes to Stage Nodes!';
            }
            this._stage.add(item.getStage());
            updatePicture(this._stage);
        });
    }
    ngOnDestroy() {
        this._stage.destroy();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: StageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.0", type: StageComponent, isStandalone: true, selector: "ko-stage", inputs: { config: "config" }, outputs: { mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", mouseenter: "mouseenter", mouseleave: "mouseleave", mousedown: "mousedown", mouseup: "mouseup", wheel: "wheel", contextmenu: "contextmenu", click: "click", dblclick: "dblclick", touchstart: "touchstart", touchmove: "touchmove", touchend: "touchend", tap: "tap", dbltap: "dbltap", dragstart: "dragstart", dragmove: "dragmove", dragend: "dragend" }, queries: [{ propertyName: "shapes", predicate: CoreShapeComponent }], ngImport: i0, template: `<div><ng-content></ng-content></div>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: StageComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ko-stage',
                    standalone: true,
                    template: `<div><ng-content></ng-content></div>`,
                }]
        }], propDecorators: { shapes: [{
                type: ContentChildren,
                args: [CoreShapeComponent]
            }], config: [{
                type: Input
            }], mouseover: [{
                type: Output
            }], mousemove: [{
                type: Output
            }], mouseout: [{
                type: Output
            }], mouseenter: [{
                type: Output
            }], mouseleave: [{
                type: Output
            }], mousedown: [{
                type: Output
            }], mouseup: [{
                type: Output
            }], wheel: [{
                type: Output
            }], contextmenu: [{
                type: Output
            }], click: [{
                type: Output
            }], dblclick: [{
                type: Output
            }], touchstart: [{
                type: Output
            }], touchmove: [{
                type: Output
            }], touchend: [{
                type: Output
            }], tap: [{
                type: Output
            }], dbltap: [{
                type: Output
            }], dragstart: [{
                type: Output
            }], dragmove: [{
                type: Output
            }], dragend: [{
                type: Output
            }] } });

class KonvaComponent extends Component {
    getStage;
    getConfig;
    config;
    mouseover;
    mousemove;
    mouseout;
    mouseenter;
    mouseleave;
    mousedown;
    mouseup;
    wheel;
    contextmenu;
    click;
    dblclick;
    touchstart;
    touchmove;
    touchend;
    tap;
    dbltap;
    dragstart;
    dragmove;
    dragend;
}

/*
 * Public API Surface of ng2-konva
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CoreShapeComponent, KonvaComponent, StageComponent };
//# sourceMappingURL=ng2-konva.mjs.map
