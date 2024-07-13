// Create a new map view
var view = new ol.View({
    center: ol.proj.fromLonLat([0, 0]),
    zoom: 2
  });
  
  // Create a new tile layer without watermark using OpenStreetMap tiles
  var tileLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });
  
  // Create the map without the default attribution control
  var map = new ol.Map({
    target: 'map',
    layers: [tileLayer],
    view: view,
    controls: ol.control.defaults({
      attribution: false
    })
  });
  
  // Add custom controls
  document.getElementById('zoom-in').onclick = function () {
    var zoom = view.getZoom();
    view.setZoom(zoom + 1);
  };
  
  document.getElementById('zoom-out').onclick = function () {
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
  };
  
  document.getElementById('zoom-layer').onclick = function () {
    view.fit(tileLayer.getSource().getExtent(), { size: map.getSize() });
  };
  
  // Placeholder for extent history
  var history = {
    past: [],
    future: []
  };
  
  // Track view changes
  view.on('change:center', function() {
    if (history.past.length > 10) {
      history.past.shift();
    }
    history.past.push(view.getCenter());
    history.future = [];
  });
  
  // Previous Extent button
  document.getElementById('prev-extent').onclick = function () {
    if (history.past.length > 1) {
      history.future.push(history.past.pop());
      view.setCenter(history.past[history.past.length - 1]);
    }
  };


  
  // Next Extent button
  document.getElementById('next-extent').onclick = function () {
    if (history.future.length > 0) {
      history.past.push(history.future.pop());
      view.setCenter(history.past[history.past.length - 1]);
    }
  };
  
  // Pan Left button
  document.getElementById('pan-left').onclick = function () {
    var pan = ol.animation.pan({
      duration: 500,
      source: view.getCenter()
    });
    map.beforeRender(pan);
    var center = view.getCenter();
    center[0] -= 300000; // Adjust panning distance
    view.setCenter(center);
  };
  
  // Pan Right button
  document.getElementById('pan-right').onclick = function () {
    var pan = ol.animation.pan({
      duration: 500,
      source: view.getCenter()
    });
    map.beforeRender(pan);
    var center = view.getCenter();
    center[0] += 300000; // Adjust panning distance
    view.setCenter(center);
  };
  
  // Pan Up button
  document.getElementById('pan-up').onclick = function () {
    var pan = ol.animation.pan({
      duration: 500,
      source: view.getCenter()
    });
    map.beforeRender(pan);
    var center = view.getCenter();
    center[1] += 300000; // Adjust panning distance
    view.setCenter(center);
  };
  
  // Pan Down button
  document.getElementById('pan-down').onclick = function () {
    var pan = ol.animation.pan({
      duration: 500,
      source: view.getCenter()
    });
    map.beforeRender(pan);
    var center = view.getCenter();
    center[1] -= 300000; // Adjust panning distance
    view.setCenter(center);
  };