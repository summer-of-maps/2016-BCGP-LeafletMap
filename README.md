# 2016-BCGP-LeafletMap
All severe crashes (one or more major injury/fatality) mapped with census variables. The census variables used here were based off
of the DVRPC's Indicators of Potential Disadvantage, which lists low-income and minority groups in the Delaware Valley.

Crash and census tract data was originally in shapefile format, but it was converted into JavaScript files using QGIS.
The QGIS plugin used to do this is called qgis2web, and it allows to the user to create Leaflet maps on the fly.

For this map though, I wanted to have the ability to filter crashes based on certain conditions. So I took some code from
another Leaflet map which uses jquery to filter data using a dropdown menu. The code for filtering can be found in the main.js file. You need to create a function (found at the bottom of main.js) that will filter your file based on certain conditions. 

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

In my case, I used fields related to crash year, victim type, crash severity, road conditions, and reported causes. Keep in mind this was all done using the same shapefile (crashes). 
