/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, Output, EventEmitter, ElementRef, ContentChildren, QueryList, inject, } from '@angular/core';
import { getName, createListener, applyNodeProps } from '../utils/index.mjs';
import Konva from 'konva';
import { updatePicture } from '../utils/index.mjs';
import { Group } from 'konva/lib/Group';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { Sprite } from 'konva/lib/shapes/Sprite';
import * as i0 from "@angular/core";
export class CoreShapeComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS1zaGFwZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzIta29udmEvc3JjL2xpYi9jb21wb25lbnRzL2NvcmUtc2hhcGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHFEQUFxRDtBQUNyRCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFVBQVUsRUFDVixlQUFlLEVBQ2YsU0FBUyxFQUdULE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUl6RSxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxPQUFPLEVBQUUsTUFBTSxFQUFnQixNQUFNLHlCQUF5QixDQUFDOztBQTJCL0QsTUFBTSxPQUFPLGtCQUFrQjtJQUk3QixNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQXNCLENBQUM7SUFDN0MsSUFBYSxNQUFNLENBQUMsTUFBd0I7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFUyxTQUFTLEdBQ2pCLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFNBQVMsR0FDakIsSUFBSSxZ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a0JBQWtCLDB3QkFHWixrQkFBa0IsNkJBTHpCLHNDQUFzQzs7MkZBRXJDLGtCQUFrQjtrQkFOOUIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQ04sOE9BQThPO29CQUNoUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLHNDQUFzQztpQkFDakQ7OEJBS0MsTUFBTTtzQkFETCxlQUFlO3VCQUFDLGtCQUFrQjtnQkFFdEIsTUFBTTtzQkFBbEIsS0FBSztnQkFRSSxTQUFTO3NCQUFsQixNQUFNO2dCQUVHLFNBQVM7c0JBQWxCLE1BQU07Z0JBRUcsUUFBUTtzQkFBakIsTUFBTTtnQkFFRyxVQUFVO3NCQUFuQixNQUFNO2dCQUVHLFVBQVU7c0JBQW5CLE1BQU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkFFRyxPQUFPO3NCQUFoQixNQUFNO2dCQUVHLEtBQUs7c0JBQWQsTUFBTTtnQkFFRyxXQUFXO3NCQUFwQixNQUFNO2dCQUVHLEtBQUs7c0JBQWQsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLFVBQVU7c0JBQW5CLE1BQU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLEdBQUc7c0JBQVosTUFBTTtnQkFFRyxNQUFNO3NCQUFmLE1BQU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZSAqL1xyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIGluamVjdCxcclxuICBBZnRlckNvbnRlbnRDaGVja2VkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBnZXROYW1lLCBjcmVhdGVMaXN0ZW5lciwgYXBwbHlOb2RlUHJvcHMgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XHJcbmltcG9ydCB7IEtvbnZhQ29tcG9uZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9rby1jb21wb25lbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU2hhcGVDb25maWdUeXBlcyB9IGZyb20gJy4uL3V0aWxzL2NvbmZpZ1R5cGVzJztcclxuaW1wb3J0IHsgU2hhcGVUeXBlcyB9IGZyb20gJy4uL3V0aWxzL3NoYXBlVHlwZXMnO1xyXG5pbXBvcnQgS29udmEgZnJvbSAna29udmEnO1xyXG5pbXBvcnQgeyB1cGRhdGVQaWN0dXJlIH0gZnJvbSAnLi4vdXRpbHMnO1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJ2tvbnZhL2xpYi9Hcm91cCc7XHJcbmltcG9ydCB7IExheWVyIH0gZnJvbSAna29udmEvbGliL0xheWVyJztcclxuaW1wb3J0IHsgU2hhcGUgfSBmcm9tICdrb252YS9saWIvU2hhcGUnO1xyXG5pbXBvcnQgeyBTcHJpdGUsIFNwcml0ZUNvbmZpZyB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvU3ByaXRlJztcclxuaW1wb3J0IHsgQXJjIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9BcmMnO1xyXG5pbXBvcnQgeyBBcnJvdyB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvQXJyb3cnO1xyXG5pbXBvcnQgeyBDaXJjbGUgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL0NpcmNsZSc7XHJcbmltcG9ydCB7IEVsbGlwc2UgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL0VsbGlwc2UnO1xyXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvSW1hZ2UnO1xyXG5pbXBvcnQgeyBMYWJlbCwgVGFnIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9MYWJlbCc7XHJcbmltcG9ydCB7IExpbmUgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL0xpbmUnO1xyXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9QYXRoJztcclxuaW1wb3J0IHsgUmVjdCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvUmVjdCc7XHJcbmltcG9ydCB7IFJlZ3VsYXJQb2x5Z29uIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9SZWd1bGFyUG9seWdvbic7XHJcbmltcG9ydCB7IFJpbmcgfSBmcm9tICdrb252YS9saWIvc2hhcGVzL1JpbmcnO1xyXG5pbXBvcnQgeyBTdGFyIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9TdGFyJztcclxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJ2tvbnZhL2xpYi9zaGFwZXMvVGV4dCc7XHJcbmltcG9ydCB7IFRleHRQYXRoIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9UZXh0UGF0aCc7XHJcbmltcG9ydCB7IFRyYW5zZm9ybWVyIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9UcmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IFdlZGdlIH0gZnJvbSAna29udmEvbGliL3NoYXBlcy9XZWRnZSc7XHJcbmltcG9ydCB7IEZhc3RMYXllciB9IGZyb20gJ2tvbnZhL2xpYi9GYXN0TGF5ZXInO1xyXG5pbXBvcnQgeyBOZ0tvbnZhRXZlbnRPYmplY3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25nS29udmFFdmVudE9iamVjdCc7XHJcbmltcG9ydCB7IFByb3BzVHlwZSB9IGZyb20gJy4uL3V0aWxzL3R5cGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOlxyXG4gICAgJ2tvLXNoYXBlLCBrby1sYXllciwga28tY2lyY2xlLCBrby1mYXN0bGF5ZXIsIGtvLWdyb3VwLCBrby1sYWJlbCwga28tcmVjdCwga28tZWxsaXBzZSwga28td2VkZ2UsIGtvLWxpbmUsIGtvLXNwcml0ZSwga28taW1hZ2UsIGtvLXRleHQsIGtvLXRleHQtcGF0aCwga28tc3Rhciwga28tcmluZywga28tYXJjLCBrby10YWcsIGtvLXBhdGgsIGtvLXJlZ3VsYXItcG9seWdvbiwga28tYXJyb3csIGtvLXRyYW5zZm9ybWVyJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIHRlbXBsYXRlOiBgPGRpdj48bmctY29udGVudD48L25nLWNvbnRlbnQ+PC9kaXY+YCxcclxufSlcclxuZXhwb3J0IGNsYXNzIENvcmVTaGFwZUNvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgS29udmFDb21wb25lbnQsIEFmdGVyQ29udGVudENoZWNrZWQsIE9uRGVzdHJveSwgT25Jbml0XHJcbntcclxuICBAQ29udGVudENoaWxkcmVuKENvcmVTaGFwZUNvbXBvbmVudClcclxuICBzaGFwZXMgPSBuZXcgUXVlcnlMaXN0PENvcmVTaGFwZUNvbXBvbmVudD4oKTtcclxuICBASW5wdXQoKSBzZXQgY29uZmlnKGNvbmZpZzogU2hhcGVDb25maWdUeXBlcykge1xyXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG4gICAgdGhpcy51cGxvYWRLb252YShjb25maWcpO1xyXG4gIH1cclxuICBnZXQgY29uZmlnKCk6IFNoYXBlQ29uZmlnVHlwZXMge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICB9XHJcblxyXG4gIEBPdXRwdXQoKSBtb3VzZW92ZXI6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBtb3VzZW1vdmU6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBtb3VzZW91dDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIG1vdXNlZW50ZXI6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBtb3VzZWxlYXZlOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgbW91c2Vkb3duOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgbW91c2V1cDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIHdoZWVsOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFdoZWVsRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxXaGVlbEV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgY29udGV4dG1lbnU6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8UG9pbnRlckV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8UG9pbnRlckV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgY2xpY2s6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBkYmxjbGljazogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIHRvdWNoc3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSB0b3VjaG1vdmU6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSB0b3VjaGVuZDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxUb3VjaEV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIHRhcDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxUb3VjaEV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIGRibHRhcDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxUb3VjaEV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdzdGFydDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdtb3ZlOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgZHJhZ2VuZDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcblxyXG4gIHB1YmxpYyBuYW1lTm9kZToga2V5b2YgdHlwZW9mIFNoYXBlVHlwZXMgfCAnU2hhcGUnIHwgJ1Nwcml0ZScgPSBnZXROYW1lKFxyXG4gICAgaW5qZWN0KEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQubG9jYWxOYW1lXHJcbiAgKSBhcyBrZXlvZiB0eXBlb2YgU2hhcGVUeXBlcyB8ICdTaGFwZScgfCAnU3ByaXRlJztcclxuXHJcbiAgcHJpdmF0ZSBjYWNoZVByb3BzOiBQcm9wc1R5cGUgPSB7fTtcclxuICBwcml2YXRlIF9zdGFnZTpcclxuICAgIHwgU2hhcGVcclxuICAgIHwgQXJjXHJcbiAgICB8IEFycm93XHJcbiAgICB8IENpcmNsZVxyXG4gICAgfCBFbGxpcHNlXHJcbiAgICB8IEltYWdlXHJcbiAgICB8IExhYmVsXHJcbiAgICB8IFRhZ1xyXG4gICAgfCBMaW5lXHJcbiAgICB8IFBhdGhcclxuICAgIHwgUmVjdFxyXG4gICAgfCBSZWd1bGFyUG9seWdvblxyXG4gICAgfCBSaW5nXHJcbiAgICB8IFNwcml0ZVxyXG4gICAgfCBTdGFyXHJcbiAgICB8IFRleHRcclxuICAgIHwgVGV4dFBhdGhcclxuICAgIHwgVHJhbnNmb3JtZXJcclxuICAgIHwgV2VkZ2VcclxuICAgIHwgR3JvdXBcclxuICAgIHwgTGF5ZXJcclxuICAgIHwgRmFzdExheWVyO1xyXG4gIHByb3RlY3RlZCBfY29uZmlnOiBTaGFwZUNvbmZpZ1R5cGVzO1xyXG5cclxuICBwdWJsaWMgZ2V0U3RhZ2UoKTpcclxuICAgIHwgU2hhcGVcclxuICAgIHwgQXJjXHJcbiAgICB8IEFycm93XHJcbiAgICB8IENpcmNsZVxyXG4gICAgfCBFbGxpcHNlXHJcbiAgICB8IEltYWdlXHJcbiAgICB8IExhYmVsXHJcbiAgICB8IFRhZ1xyXG4gICAgfCBMaW5lXHJcbiAgICB8IFBhdGhcclxuICAgIHwgUmVjdFxyXG4gICAgfCBSZWd1bGFyUG9seWdvblxyXG4gICAgfCBSaW5nXHJcbiAgICB8IFNwcml0ZVxyXG4gICAgfCBTdGFyXHJcbiAgICB8IFRleHRcclxuICAgIHwgVGV4dFBhdGhcclxuICAgIHwgVHJhbnNmb3JtZXJcclxuICAgIHwgV2VkZ2VcclxuICAgIHwgR3JvdXBcclxuICAgIHwgTGF5ZXJcclxuICAgIHwgRmFzdExheWVyIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDb25maWcoKTogU2hhcGVDb25maWdUeXBlcyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnIHx8IHt9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRLb252YSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0S29udmEoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX3N0YWdlKSB7XHJcbiAgICAgIHRoaXMuX3N0YWdlID0gbmV3IFNoYXBlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5uYW1lTm9kZSA9PT0gJ1NoYXBlJykge1xyXG4gICAgICB0aGlzLl9zdGFnZSA9IG5ldyBTaGFwZSgpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5hbWVOb2RlID09PSAnU3ByaXRlJykge1xyXG4gICAgICB0aGlzLl9zdGFnZSA9IG5ldyBTcHJpdGUodGhpcy5jb25maWcgYXMgU3ByaXRlQ29uZmlnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3N0YWdlID0gbmV3IEtvbnZhW3RoaXMubmFtZU5vZGVdKHVuZGVmaW5lZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uU3RhZ2UgPSB0aGlzLl9zdGFnZS50by5iaW5kKHRoaXMuX3N0YWdlKTtcclxuXHJcbiAgICB0aGlzLl9zdGFnZS50byA9IChuZXdDb25maWc6IFNoYXBlQ29uZmlnVHlwZXMpOiB2b2lkID0+IHtcclxuICAgICAgYW5pbWF0aW9uU3RhZ2UobmV3Q29uZmlnKTtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc3RhZ2UuYXR0cnMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9zdGFnZS5hdHRyc1trZXldICE9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnW2tleV0gPSB0aGlzLl9zdGFnZS5hdHRyc1trZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAyMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5fY29uZmlnKSB7XHJcbiAgICAgIHRoaXMudXBsb2FkS29udmEodGhpcy5jb25maWcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHVwbG9hZEtvbnZhKGNvbmZpZzogU2hhcGVDb25maWdUeXBlcyk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9zdGFnZSkgcmV0dXJuO1xyXG4gICAgY29uc3QgcHJvcHMgPSB7XHJcbiAgICAgIC4uLmNvbmZpZyxcclxuICAgICAgLi4uY3JlYXRlTGlzdGVuZXIodGhpcyksXHJcbiAgICB9O1xyXG4gICAgYXBwbHlOb2RlUHJvcHModGhpcywgcHJvcHMsIHRoaXMuY2FjaGVQcm9wcyk7XHJcbiAgICB0aGlzLmNhY2hlUHJvcHMgPSBwcm9wcztcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2hhcGVzLmZvckVhY2goKGl0ZW06IENvcmVTaGFwZUNvbXBvbmVudCkgPT4ge1xyXG4gICAgICBpZiAodGhpcyAhPT0gaXRlbSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGFnZSBpbnN0YW5jZW9mIEdyb3VwIHx8IHRoaXMuX3N0YWdlIGluc3RhbmNlb2YgTGF5ZXIpIHtcclxuICAgICAgICAgIHRoaXMuX3N0YWdlLmFkZChpdGVtLmdldFN0YWdlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1cGRhdGVQaWN0dXJlKHRoaXMuX3N0YWdlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N0YWdlLmRlc3Ryb3koKTtcclxuICB9XHJcbn1cclxuIl19