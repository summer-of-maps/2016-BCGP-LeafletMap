# 2016-BCGP-LeafletMap
This repo is a result of data analysis completed as part of the Summer of Maps Program. This work was completed in support of a pro bono project with the <a href="http://bicyclecoalition.org/">Bicycle Coalition of Greater Philadelphia</a>. 
Summer of Maps is a fellowship program organized and facilitated by Azavea. Azavea is a B Corporation that specializes in civic-minded GIS software development and spatial analysis.
Summer of Maps offers stipends to student spatial analysts to perform data analysis and visualization for non-profit organizations. Every year we match up non-profit organizations that have spatial analysis needs with talented students to implement projects over a three-month period during the summer.

<strong>The Webmap</strong><br>
All severe crashes (one or more major injury/fatality) mapped with census variables. The census variables used here were based off
of the DVRPC's <a href="http://www.dvrpc.org/GetInvolved/TitleVI/">Indicators of Potential Disadvantage</a>, which lists low-income and minority groups in the Delaware Valley.

Crash and census tract data was originally in shapefile format, but it was converted into JavaScript files using QGIS.
The QGIS plugin used to do this is called qgis2web, and it allows to the user to create Leaflet maps on the fly.

Alternatively, you can go <a href="http://www.mapshaper.org/">here</a> to upload your shapefile, import it, and simplify it (check prevent shape removal and visvalingam/weighted area). I simplified mine down to about 10 percent. Then finally, export it as geojson. 

Next what you have to do is open your geojson in notepad or Atom.io and add var (your variable name here) = right at the beginning of the file without the parenthesis. 

Then save the file as a JavaScript file by saving it as yourshapefile.js 

Make sure that All Files is selected under 'Save as type' in the dialog box. In your workspace folder, make sure you reference it in your html body.

And that's how you get the stuff to show up on your map. From here on out, it's basically stylization with the colors, legend, etc. Note that this will be specific to your data.

Copy my code since that'll make it easier, but make sure to reference your JavaScript file from here on out. If you don't, the map won't know what to reference and it'll show up blank.

<strong>Filtering Crashes</strong><br>
For this map, I wanted to have the ability to filter crashes based on certain conditions. So I took some code from
another Leaflet map which uses jquery to filter data using a dropdown menu. The code for filtering can be found in the main.js file. You need to create a function (found at the bottom of main.js) that will filter your file based on certain conditions. 

In my case, I used fields related to crash year, victim type, crash severity, road conditions, and reported causes. Keep in mind this was all done using the same shapefile (crashes). 

<strong>Hover Highlight</strong><br>
A function found in the middle of main.js was written to highlight each tract visually upon mouseover. In this case, an event listener (which attaches an event handler to a specified element) was added to the tracts layer. This makes each tract transparent upon highlight. mouseout : function is used to reset this effect once a user moves the mouse away. 

<strong>Hover Info</strong><br>
info.update is a function that updates the rightside tooltip window every time the mouse hovers over a tract. This function calls on the fields found in crashes.js In your case, all you have to do is change the field name after props. if you want to specify your own data.
