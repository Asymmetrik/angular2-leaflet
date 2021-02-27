# Changelog

## 9.0
Angular 11

## 8.0
Support for Angular.io 10.

## 8.1
Added call to Map.remove in OnDestroy handler.
This should ensure that any outstanding event handlers are cleaned up.
Added demo example for adding/removing maps dynamically. 


## 7.0
Support for Angular.io 9. 🎉

- Are your markers broken? In Leaflet 1.6, the marker icons changed enough to create new hashes. See [README](https://github.com/Asymmetrik/ngx-leaflet/blob/master/README.md#a-note-about-markers) for more details.
- Renamed UMD bundle to `ngx-leaflet.umd.js`. This shouldn't affect anyone unless you're manually including the bundle.
- Angular deprecated parameterless forRoot, so I removed the static function. You may need to update your import.

### 7.0.1
Fixed an error running the demo.
Cleanup in the README.
Fixing minification to exclude comments and include license.


## 6.0
Support for Angular.io 8.


## 5.0
Support for Angular.io 7.
Also moved demo to `localhost:4200`.


## 4.0
Support for Angular 6.
Also migrated to using npm scripts for the build (no more dev dependency on gulp).

### 4.1.0
Exporting the `LeafletUtil` class.


## 3.0
Support for Angular 5. Also cleaned up some of the functionality related to Angular zone management.
Added documentation to README on Zone management.

### 3.1.0
Added [map events](#map-events), [layer events](#layer-events).
Added several input bound map options including ```[leafletMaxBounds]```, ```[leafletMaxZoom]```, and ```[leafletMinZoom]```.
Added output binding for map center - ```(leafletMapCenter)``` and map zoom - ```(leafletMapZoom)```.


## 2.0
Support for Angular 4.

### 2.6.0 
Wrapping several map operations in ```NgZone.runOutsideAngular``` in order to prevent excessive dirty checking.
If you encounter an unexpected issue due to this change, please file an issue.

### 2.5.0
Added the ```[leafletLayer]``` directive for adding/removing individual layers.

### 2.3.0
Renamed the package to ```ngx-leaflet```
