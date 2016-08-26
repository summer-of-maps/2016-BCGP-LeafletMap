// Map center
var map = L.map('map', {
    center: [39.9871938, -75.0911072],
    zoom: 11,
    dragging: true
});

//initialize map and basemap
var basemap0 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWFjaHRtYXN0ZXIiLCJhIjoiY2lsam82ZW9nNTBsd3V0bTA5anE0YzY3ZSJ9.o8nujy4JrYRiW1CCLz1YIw', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 11,
  maxZoom: 19,
  ext: 'png'
}).addTo(map);


//button zoom and button style, add to map
var defaultViewFunc = function(){
    map.setView([39.9635936, -75.1642056],11);
};

L.easyButton('<img src="css/images/phila.png" class=conn >', function(btn, map){
  defaultViewFunc();
}).addTo(map);


//style tracts with the IPD field
        function doStyletracts20(feature) {
        if (feature.properties.ipd >= 0.0 &&
                feature.properties.ipd <= 1.0) {

            return {
                color: '#000000',
                weight: '0.2',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                fillColor: '#FFFFFF',
                opacity: '0.9',
                fillOpacity: '0.9',
            }
        }
        if (feature.properties.ipd >= 1.0 &&
                feature.properties.ipd <= 3.0) {

            return {
                color: '#000000',
                weight: '0.2',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                fillColor: '#B3D5D9',
                opacity: '0.9',
                fillOpacity: '0.9',
            }
        }
        if (feature.properties.ipd >= 3.0 &&
                feature.properties.ipd <= 5.0) {

            return {
                color: '#000000',
                weight: '0.2',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                fillColor: '#7BA0AE',
                opacity: '0.9',
                fillOpacity: '0.9',
            }
        }
        if (feature.properties.ipd >= 5.0 &&
                feature.properties.ipd <= 6.0) {

            return {
                color: '#000000',
                weight: '0.2',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                fillColor: '#6C7E83',
                opacity: '0.9',
                fillOpacity: '0.9',
            }
        }
        if (feature.properties.ipd >= 6.0 &&
                feature.properties.ipd <= 8.0) {

            return {
                color: '#000000',
                weight: '0.2',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                fillColor: '#274355',
                opacity: '0.9',
                fillOpacity: '0.9',
            }
        }
}

//style crashes depending on crash severity (crash severity field)
function getColor(d) {
    return d == "Major injury"   ? '#FFA300' :
           d == "Fatal" ? '#D6301D' :
                       '#FF9900';
}


function getColor_border(d) {
    return d == "Major injury"   ? '#252525' :
           d == "Fatal" ? '#850200' :
                      '#000';
}

//use function to call on crashes and style them
function getStyle(feature) {
  return {
    radius: '2.5',
    fillColor: getColor(feature.properties.SEVTEXT),
    color: getColor_border(feature.properties.SEVTEXT),
    weight: .6,
    opacity: 1,
    dashArray: '',
    fillOpacity: '0.90',
  };
}

//add tracts and crashes to the map
var tracts = new L.geoJson(tracts_js, {
    onEachFeature: eachTract,
    style: doStyletracts20
}).addTo(map);

var points = new L.geoJson(crashes_js, {
    onEachFeature: eachPoint,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, getStyle(feature));
    }
}).addTo(map);

// adds legend image to Leaflet map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info legend tract_legend');

    div.innerHTML +=
    '<img src="https://bicyclecoalition.github.io/BCGP_WEBMAP2_2016/css/images/legend.PNG" alt="legend" width="100%" height="100%">';

return div;
};

legend.addTo(map);


L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);

//This shows information for crashes once clicked
function eachPoint(feature, layer) {
  layer.bindPopup(" <h3>CRASH YEAR</h3> " + feature.properties.crash_year + "<br>" + "<h3>COLLISION TYPE</h3> " + feature.properties.coltype +
"<br>" + "<h3>VEHICLE TYPE</h3> " + feature.properties.vetype + "<br>" + "<h3>PERSON TYPE</h3> " + feature.properties.persontyp +
"<br>" + "<h3>AGE</h3> " + feature.properties.age + "<br>" + "<h3>SEX</h3> " + feature.properties.sex +
"<br>" + "<h3>MAJOR INJURIES</h3> " + feature.properties.majorinj + "<br>" + "<h3>FATALITIES</h3> " + feature.properties.fatalities +
"<br>" + "<h3>ROAD CONDITIONS</h3> " + feature.properties.roadcond + "<br>" + "<h3>WEATHER CONDITIONS</h3> " + feature.properties.weath);
  layer.on({
    mouseover: function(e){
      layer.setStyle({
        radius: '7.0',
        fillOpacity: 1
      });
    },
    mouseout: function(e) {
      layer.setStyle(getStyle(feature));
    },
  });
}

//this all controls the hover information shown over each tract
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info box'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Hover over a tract</h4>' +  (props ?
        '</b><br />' + '<b>' + props.namelsad10 + '</b><br />' + '</b><br />' +
        '<strong>'+props.totalcrash+ ' ' + '</strong>' + 'Severe crashes ' + '</b><br />' +
        '<strong>'+props.IPD2+ '  ' + '</strong>' + 'IPD ' + '</b><br />' +
        '<strong>'+props.elderly+ ' % ' + '</strong>' + 'Elderly ' + '</b><br />' +
        '<strong>'+props.nonhsmn+ ' % ' + '</strong>' + 'Non-Hispanic Min ' + '</b><br />' +
        '<strong>'+props.hispanic+ ' % ' + '</strong>' + 'Hispanic ' + '</b><br />' +
        '<strong>'+props.Disabled+ ' % ' + '</strong>' + 'Disabled % ' + '</b><br />' +
        '<strong>'+props.femhoh+ ' % ' + '</strong>' + 'Fem Head of Household ' + '</b><br />' +
        '<strong>'+props.poverty+ ' % ' + '</strong>' + 'Poverty ' + '</b><br />' +
        '<strong>'+props.carlesshh+ ' % ' + '</strong>' + 'Carless Households ' + '</b><br />' +
        '<strong>'+props.limeng+ ' % ' + '</strong>' + 'Limited Eng ' + '</b><br />'

        : 'Hover over a tract');
};

info.addTo(map);



function eachTract(feature, layer) {
  layer.on({
    mouseover: function(e){
      layer.setStyle({
        fillColor: '#000000',
        fillOpacity: 0.5
      });
        info.update(layer.feature.properties);
    },
    mouseout: function(e) {
      layer.setStyle(doStyletracts20(feature));
      info.update();
    },
    click: function (e){
      var bounds = this.getBounds();
      map.fitBounds(bounds);
    },
  });
}

$('#year').change(function() {
    var year = $('#year').val();

    if (map.hasLayer(points)){
        map.removeLayer(points);
    }
points = L.geoJson(crashes_js, {
      filter: function(feature, layer) {
        return (year === 'All' || feature.properties.crash_year == year);
      },
      onEachFeature: eachPoint,
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, getStyle(feature));
      }
  });
  points.addTo(map);
  return false;
});

$('#year, #vic, #sev, #cond, #flag').change(function() {
    var year = $('#year').val();
    var vic = $('#vic').val();
    var sev = $('#sev').val();
    var cond = $('#cond').val();
    var flag = $('#flag').val();

    if (map.hasLayer(points)){
        map.removeLayer(points);
    }
points = L.geoJson(crashes_js, {
      filter: function(feature, layer) {
        return (year === 'All' || feature.properties.crash_year == year) &&
              (vic === 'All' || feature.properties.VIC == vic) &&
              (sev === 'All' || feature.properties.SEV == sev) &&
              (cond === 'All' || feature.properties.COND == cond) &&
              (flag === 'All' || feature.properties.FLAG == flag);
      },
      onEachFeature: eachPoint,
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, getStyle(feature));
      }
  });
  points.addTo(map);
  return false;
});
