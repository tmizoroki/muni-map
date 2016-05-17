# muni-map
NextBus API Data Visualizer for SF Muni

Deployed at: https://sf-muni-map.herokuapp.com

## To Run Locally
1. `node index.js` to get the RestBus proxy server running
2. `python -m SimpleHTTPServer` and go to localhost:8000 in your browser

##Using the Muni Map Application

Muni Map allows you to see the realtime location of any operating SF Muni Vehicle.

Click on the route in the side panel to view the positions for the vehicles driving that route on the map. Click on the route again to remove the vehicles.

## About Muni Map

Muni Map is built using AngularJS and D3.js. The D3 map is contained in a custom Angular directive that has the D3 library injected directly into it as a dependency.

SF Muni data is provided by the [NextBus Inc.](http://www.nextbus.com/xmlFeedDocs/NextBusXMLFeed.pdf) XML feed and is accessed through a [restbus](http://restbus.info/) proxy server which provides a RESTful JSON API.

Positions for all operating SF Muni vehicles are accessed every 15 seconds and are automatically updated on the map.
