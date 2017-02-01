"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var L = require("leaflet");
var LeafletDirective = (function () {
    function LeafletDirective(el) {
        this.DEFAULT_ZOOM = 1;
        this.DEFAULT_CENTER = L.latLng([38.907192, -77.036871]);
        this.DEFAULT_FPZ_OPTIONS = {};
        this.fitBoundsOptions = this.DEFAULT_FPZ_OPTIONS;
        this.panOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomOptions = this.DEFAULT_FPZ_OPTIONS;
        this.zoomPanOptions = this.DEFAULT_FPZ_OPTIONS;
        // Default configuration
        this.options = {};
        // Configure callback function for the map
        this.mapReady = new core_1.EventEmitter();
        this.element = el;
    }
    LeafletDirective.prototype.ngOnInit = function () {
        // Create the map with some reasonable defaults
        this.map = L.map(this.element.nativeElement, this.options);
        // Only setView if there is a center/zoom
        if (null != this.center && null != this.zoom) {
            this.setView(this.center, this.zoom);
        }
        // Set up all the initial settings
        if (null != this.fitBounds) {
            this.setFitBounds(this.fitBounds);
        }
        this.doResize();
        // Fire map ready event
        this.mapReady.emit(this.map);
    };
    LeafletDirective.prototype.ngOnChanges = function (changes) {
        /*
         * The following code is to address an issue with our (basic) implementation of
         * zooming and panning. From our testing, it seems that a pan operation followed
         * by a zoom operation in the same thread will interfere with eachother. The zoom
         * operation interrupts/cancels the pan, resulting in a final center point that is
         * inaccurate. The solution seems to be to either separate them with a timeout or
          * to collapse them into a setView call.
         */
        // Zooming and Panning
        if (changes['zoom'] && changes['center'] && null != this.zoom && null != this.center) {
            this.setView(changes['center'].currentValue, changes['zoom'].currentValue);
        }
        else if (changes['zoom']) {
            this.setZoom(changes['zoom'].currentValue);
        }
        else if (changes['center']) {
            this.setCenter(changes['center'].currentValue);
        }
        // Fit bounds
        if (changes['fitBounds']) {
            this.setFitBounds(changes['fitBounds'].currentValue);
        }
    };
    LeafletDirective.prototype.getMap = function () {
        return this.map;
    };
    LeafletDirective.prototype.onResize = function () {
        this.delayResize();
    };
    /**
     * Resize the map to fit it's parent container
     */
    LeafletDirective.prototype.doResize = function () {
        // Invalidate the map size to trigger it to update itself
        this.map.invalidateSize({});
    };
    /**
     * Manage a delayed resize of the component
     */
    LeafletDirective.prototype.delayResize = function () {
        if (null != this.resizeTimer) {
            clearTimeout(this.resizeTimer);
        }
        this.resizeTimer = setTimeout(this.doResize.bind(this), 200);
    };
    /**
     * Set the view (center/zoom) all at once
     * @param center The new center
     * @param zoom The new zoom level
     */
    LeafletDirective.prototype.setView = function (center, zoom) {
        if (this.map && null != center && null != zoom) {
            this.map.setView(center, zoom, this.zoomPanOptions);
        }
    };
    /**
     * Set the map zoom level
     * @param zoom the new zoom level for the map
     */
    LeafletDirective.prototype.setZoom = function (zoom) {
        if (this.map && null != zoom) {
            this.map.setZoom(zoom, this.zoomOptions);
        }
    };
    /**
     * Set the center of the map
     * @param center the center point
     */
    LeafletDirective.prototype.setCenter = function (center) {
        if (this.map && null != center) {
            this.map.panTo(center, this.panOptions);
        }
    };
    /**
     * Fit the map to the bounds
     * @param center the center point
     */
    LeafletDirective.prototype.setFitBounds = function (latLngBounds) {
        if (this.map && null != latLngBounds) {
            this.map.fitBounds(latLngBounds, this.fitBoundsOptions);
        }
    };
    return LeafletDirective;
}());
__decorate([
    core_1.Input('leafletFitBoundsOptions'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "fitBoundsOptions", void 0);
__decorate([
    core_1.Input('leafletPanOptions'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "panOptions", void 0);
__decorate([
    core_1.Input('leafletZoomOptions'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "zoomOptions", void 0);
__decorate([
    core_1.Input('leafletZoomPanOptions'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "zoomPanOptions", void 0);
__decorate([
    core_1.Input('leafletOptions'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "options", void 0);
__decorate([
    core_1.Output('leafletMapReady'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "mapReady", void 0);
__decorate([
    core_1.Input('leafletZoom'),
    __metadata("design:type", Number)
], LeafletDirective.prototype, "zoom", void 0);
__decorate([
    core_1.Input('leafletCenter'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "center", void 0);
__decorate([
    core_1.Input('leafletFitBounds'),
    __metadata("design:type", Object)
], LeafletDirective.prototype, "fitBounds", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeafletDirective.prototype, "onResize", null);
LeafletDirective = __decorate([
    core_1.Directive({
        selector: '[leaflet]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], LeafletDirective);
exports.LeafletDirective = LeafletDirective;

//# sourceMappingURL=leaflet.directive.js.map
