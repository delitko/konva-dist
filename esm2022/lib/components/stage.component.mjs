/* eslint-disable @angular-eslint/no-output-native */
import { Component, Input, Output, EventEmitter, ElementRef, ContentChildren, QueryList, inject, } from '@angular/core';
import { CoreShapeComponent as CoreShape } from './core-shape.component.mjs';
import { updatePicture, createListener, applyNodeProps } from '../utils/index.mjs';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import * as i0 from "@angular/core";
export class StageComponent {
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
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.0", type: StageComponent, isStandalone: true, selector: "ko-stage", inputs: { config: "config" }, outputs: { mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", mouseenter: "mouseenter", mouseleave: "mouseleave", mousedown: "mousedown", mouseup: "mouseup", wheel: "wheel", contextmenu: "contextmenu", click: "click", dblclick: "dblclick", touchstart: "touchstart", touchmove: "touchmove", touchend: "touchend", tap: "tap", dbltap: "dbltap", dragstart: "dragstart", dragmove: "dragmove", dragend: "dragend" }, queries: [{ propertyName: "shapes", predicate: CoreShape }], ngImport: i0, template: `<div><ng-content></ng-content></div>`, isInline: true });
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
                args: [CoreShape]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmcyLWtvbnZhL3NyYy9saWIvY29tcG9uZW50cy9zdGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEscURBQXFEO0FBQ3JELE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBRVosVUFBVSxFQUNWLGVBQWUsRUFDZixTQUFTLEVBRVQsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsSUFBSSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVV4QyxNQUFNLE9BQU8sY0FBYztJQUdqQixhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUM3QixNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQWEsQ0FBQztJQUNoRSxJQUFhLE1BQU0sQ0FBQyxNQUF1QjtRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUM7Z0JBQ3RCLEdBQUcsTUFBTTtnQkFDVCxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWE7YUFDOUIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsQ0FBQztJQUNILENBQUM7SUFFUyxTQUFTLEdBQ2pCLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFNBQVMsR0FDakIsSUFBSSxZQUFZLEVBQWtDLENBQUM7SUFDM0MsUUFBUSxHQUNoQixJQUFJLFlBQVksRUFBa0MsQ0FBQztJQUMzQyxVQUFVLEdBQ2xCLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFVBQVUsR0FDbEIsSUFBSSxZQUFZLEVBQWtDLENBQUM7SUFDM0MsU0FBUyxHQUNqQixJQUFJLFlBQVksRUFBa0MsQ0FBQztJQUMzQyxPQUFPLEdBQ2YsSUFBSSxZQUFZLEVBQWtDLENBQUM7SUFDM0MsS0FBSyxHQUNiLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFdBQVcsR0FDbkIsSUFBSSxZQUFZLEVBQW9DLENBQUM7SUFDN0MsS0FBSyxHQUNiLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFFBQVEsR0FDaEIsSUFBSSxZQUFZLEVBQWtDLENBQUM7SUFDM0MsVUFBVSxHQUNsQixJQUFJLFlBQVksRUFBa0MsQ0FBQztJQUMzQyxTQUFTLEdBQ2pCLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFFBQVEsR0FDaEIsSUFBSSxZQUFZLEVBQWtDLENBQUM7SUFDM0MsR0FBRyxHQUNYLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLE1BQU0sR0FDZCxJQUFJLFlBQVksRUFBa0MsQ0FBQztJQUMzQyxTQUFTLEdBQ2pCLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBQzNDLFFBQVEsR0FDaEIsSUFBSSxZQUFZLEVBQWtDLENBQUM7SUFDM0MsT0FBTyxHQUNmLElBQUksWUFBWSxFQUFrQyxDQUFDO0lBRTdDLE1BQU0sQ0FBUTtJQUNkLE9BQU8sQ0FBa0I7SUFDekIsVUFBVSxHQUFjLEVBQUUsQ0FBQztJQUU1QixRQUFRO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFTyxXQUFXLENBQUMsTUFBdUI7UUFDekMsTUFBTSxLQUFLLEdBQUc7WUFDWixHQUFHLE1BQU07WUFDVCxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7U0FDeEIsQ0FBQztRQUNGLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBZSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxZQUFZLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0sOENBQThDLENBQUM7WUFDdkQsQ0FBQztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQzt1R0ExRlUsY0FBYzsyRkFBZCxjQUFjLHNpQkFJUixTQUFTLDZCQU5oQixzQ0FBc0M7OzJGQUVyQyxjQUFjO2tCQUwxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxVQUFVO29CQUNwQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFLHNDQUFzQztpQkFDakQ7OEJBSzZCLE1BQU07c0JBQWpDLGVBQWU7dUJBQUMsU0FBUztnQkFDYixNQUFNO3NCQUFsQixLQUFLO2dCQWFJLFNBQVM7c0JBQWxCLE1BQU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLFVBQVU7c0JBQW5CLE1BQU07Z0JBRUcsVUFBVTtzQkFBbkIsTUFBTTtnQkFFRyxTQUFTO3NCQUFsQixNQUFNO2dCQUVHLE9BQU87c0JBQWhCLE1BQU07Z0JBRUcsS0FBSztzQkFBZCxNQUFNO2dCQUVHLFdBQVc7c0JBQXBCLE1BQU07Z0JBRUcsS0FBSztzQkFBZCxNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsVUFBVTtzQkFBbkIsTUFBTTtnQkFFRyxTQUFTO3NCQUFsQixNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsR0FBRztzQkFBWixNQUFNO2dCQUVHLE1BQU07c0JBQWYsTUFBTTtnQkFFRyxTQUFTO3NCQUFsQixNQUFNO2dCQUVHLFFBQVE7c0JBQWpCLE1BQU07Z0JBRUcsT0FBTztzQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtbmF0aXZlICovXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBFbGVtZW50UmVmLFxyXG4gIENvbnRlbnRDaGlsZHJlbixcclxuICBRdWVyeUxpc3QsXHJcbiAgT25EZXN0cm95LFxyXG4gIGluamVjdCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29yZVNoYXBlQ29tcG9uZW50IGFzIENvcmVTaGFwZSB9IGZyb20gJy4vY29yZS1zaGFwZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyB1cGRhdGVQaWN0dXJlLCBjcmVhdGVMaXN0ZW5lciwgYXBwbHlOb2RlUHJvcHMgfSBmcm9tICcuLi91dGlscy9pbmRleCc7XHJcbmltcG9ydCB7IEtvbnZhQ29tcG9uZW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9rby1jb21wb25lbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgU3RhZ2UgfSBmcm9tICdrb252YS9saWIvU3RhZ2UnO1xyXG5pbXBvcnQgeyBMYXllciB9IGZyb20gJ2tvbnZhL2xpYi9MYXllcic7XHJcbmltcG9ydCB7IENvbnRhaW5lckNvbmZpZyB9IGZyb20gJ2tvbnZhL2xpYi9Db250YWluZXInO1xyXG5pbXBvcnQgeyBOZ0tvbnZhRXZlbnRPYmplY3QgfSBmcm9tICcuLi9pbnRlcmZhY2VzL25nS29udmFFdmVudE9iamVjdCc7XHJcbmltcG9ydCB7IFByb3BzVHlwZSB9IGZyb20gJy4uL3V0aWxzL3R5cGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAna28tc3RhZ2UnLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2PjxuZy1jb250ZW50PjwvbmctY29udGVudD48L2Rpdj5gLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU3RhZ2VDb21wb25lbnRcclxuICBpbXBsZW1lbnRzIEtvbnZhQ29tcG9uZW50LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3lcclxue1xyXG4gIHByaXZhdGUgbm9kZUNvbnRhaW5lciA9IGluamVjdChFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xyXG4gIEBDb250ZW50Q2hpbGRyZW4oQ29yZVNoYXBlKSBzaGFwZXMgPSBuZXcgUXVlcnlMaXN0PENvcmVTaGFwZT4oKTtcclxuICBASW5wdXQoKSBzZXQgY29uZmlnKGNvbmZpZzogQ29udGFpbmVyQ29uZmlnKSB7XHJcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICBpZiAoIXRoaXMuX3N0YWdlKSB7XHJcbiAgICAgIHRoaXMuX3N0YWdlID0gbmV3IFN0YWdlKHtcclxuICAgICAgICAuLi5jb25maWcsXHJcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLm5vZGVDb250YWluZXIsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnVwbG9hZEtvbnZhKGNvbmZpZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwbG9hZEtvbnZhKGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAT3V0cHV0KCkgbW91c2VvdmVyOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgbW91c2Vtb3ZlOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgbW91c2VvdXQ6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBtb3VzZWVudGVyOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgbW91c2VsZWF2ZTogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIG1vdXNlZG93bjogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIG1vdXNldXA6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSB3aGVlbDogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxXaGVlbEV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8V2hlZWxFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIGNvbnRleHRtZW51OiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFBvaW50ZXJFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFBvaW50ZXJFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIGNsaWNrOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgZGJsY2xpY2s6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSB0b3VjaHN0YXJ0OiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxUb3VjaEV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgdG91Y2htb3ZlOiBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PiA9XHJcbiAgICBuZXcgRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxUb3VjaEV2ZW50Pj4oKTtcclxuICBAT3V0cHV0KCkgdG91Y2hlbmQ6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSB0YXA6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBkYmx0YXA6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8VG91Y2hFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PFRvdWNoRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnc3RhcnQ6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG4gIEBPdXRwdXQoKSBkcmFnbW92ZTogRXZlbnRFbWl0dGVyPE5nS29udmFFdmVudE9iamVjdDxNb3VzZUV2ZW50Pj4gPVxyXG4gICAgbmV3IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+KCk7XHJcbiAgQE91dHB1dCgpIGRyYWdlbmQ6IEV2ZW50RW1pdHRlcjxOZ0tvbnZhRXZlbnRPYmplY3Q8TW91c2VFdmVudD4+ID1cclxuICAgIG5ldyBFdmVudEVtaXR0ZXI8TmdLb252YUV2ZW50T2JqZWN0PE1vdXNlRXZlbnQ+PigpO1xyXG5cclxuICBwcml2YXRlIF9zdGFnZTogU3RhZ2U7XHJcbiAgcHJpdmF0ZSBfY29uZmlnOiBDb250YWluZXJDb25maWc7XHJcbiAgcHJpdmF0ZSBjYWNoZVByb3BzOiBQcm9wc1R5cGUgPSB7fTtcclxuXHJcbiAgcHVibGljIGdldFN0YWdlKCk6IFN0YWdlIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDb25maWcoKTogQ29udGFpbmVyQ29uZmlnIHtcclxuICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwbG9hZEtvbnZhKGNvbmZpZzogQ29udGFpbmVyQ29uZmlnKTogdm9pZCB7XHJcbiAgICBjb25zdCBwcm9wcyA9IHtcclxuICAgICAgLi4uY29uZmlnLFxyXG4gICAgICAuLi5jcmVhdGVMaXN0ZW5lcih0aGlzKSxcclxuICAgIH07XHJcbiAgICBhcHBseU5vZGVQcm9wcyh0aGlzLCBwcm9wcywgdGhpcy5jYWNoZVByb3BzKTtcclxuICAgIHRoaXMuY2FjaGVQcm9wcyA9IHByb3BzO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaGFwZXMuZm9yRWFjaCgoaXRlbTogQ29yZVNoYXBlKSA9PiB7XHJcbiAgICAgIGlmICghKGl0ZW0uZ2V0U3RhZ2UoKSBpbnN0YW5jZW9mIExheWVyKSkge1xyXG4gICAgICAgIHRocm93ICdZb3UgY2FuIG9ubHkgYWRkIExheWVyIE5vZGVzIHRvIFN0YWdlIE5vZGVzISc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fc3RhZ2UuYWRkKDxMYXllcj5pdGVtLmdldFN0YWdlKCkpO1xyXG4gICAgICB1cGRhdGVQaWN0dXJlKHRoaXMuX3N0YWdlKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdGFnZS5kZXN0cm95KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==