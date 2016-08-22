# 2016-BCGP-LeafletMap
All severe crashes (one or more major injury/fatality) mapped with census variables. The census variables used here were based off
of the DVRPC's Indicators of Potential Disadvantage, which lists low-income and minority groups in the Delaware Valley.

<strong>The Webmap</strong><br>
Crash and census tract data was originally in shapefile format, but it was converted into JavaScript files using QGIS.
The QGIS plugin used to do this is called qgis2web, and it allows to the user to create Leaflet maps on the fly.

<strong>Filtering Crashes</strong><br>
For this map though, I wanted to have the ability to filter crashes based on certain conditions. So I took some code from
another Leaflet map which uses jquery to filter data using a dropdown menu. The code for filtering can be found in the main.js file. You need to create a function (found at the bottom of main.js) that will filter your file based on certain conditions. 

In my case, I used fields related to crash year, victim type, crash severity, road conditions, and reported causes. Keep in mind this was all done using the same shapefile (crashes). You can essentially do the same with any other file you have, but you need to specify fields that are found only in your data. Otherwise the data won't show.

<strong>Hover Info</strong><br>
A function was written to highlight each tract visually upon mouseover. In this case, an event listener (which attaches an event handler to a specified element) was added to the tracts layer. This makes each tract transparent upon highlight. geojson.resetstyle is used to reset this effect once a user moves the mouse away. 

Go here to download the counties shapefile, and then go to factfinder (or elsewhere, depending on what you wana do) and download the relevant data you want from there. In this case I used poverty rates for PA. So join the extra data to the counties to make your final shapefile. Now you obviously can't use this in a web map - so you have to convert the shapefile to geojson. 

Go here to upload your shapefile, import it, and simplify it (check prevent shape removal and visvalingam/weighted area). I simplified it down to about 10 percent. Then finally, export it as geojson. 

Next what you have to do is open your geojson in notepad and add var (your variable name here) = right at the beginning of the file without the parenthesis. 
Then save the file as a JavaScript file by saving it as yourcounties.js 

Make sure that All Files is selected under 'Save as type' in the dialog box.

Now you have to upload the JavaScript file to your lab 6 folder. Make sure you reference it in your body
by using this: 

<script type="text/javascript" src="yourcounties.js"></script>

Make sure it's outside of the script tag though, since it's already its own script.

And that's how you get the stuff to show up on your map. From here on out, it's basically stylization with the colors, legend, etc. Note that this will be specific to your data.

Copy my code since that'll make it easier, but make sure to reference your JavaScript file from here on out. If you don't, the map won't know what to reference and it'll show up blank.

For instance, since I'm doing poverty rates, I referenced the NAME and POVRATE fields found in my JavaScript file. 

info.update = function (props) {
this._div.innerHTML = '<h4>PA Poverty Rate</h4>' +  (props ?
	'<b>' + props.NAME + '</b><br />' + props.POVRATE + ' percent '
: 'Hover over a state');
};

This is just one example. You will have to do this across the whole thing. In this case, since you'll be using different data, the props.POVRATE value will have to be changed accordingly. If someone was doing - for instance - a map on primary votes, he would reference a relevant field found in his shapefile, maybe something like VOTES. 

info.update = function (props) {
this._div.innerHTML = '<h4>PA Poverty Rate</h4>' +  (props ?
	'<b>' + props.NAME + '</b><br />' + props.VOTES+ ' percent '
: 'Hover over a state');
};

Make sure you do this for all scripts.
