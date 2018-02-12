## Neighborhood Maps
This respository is for project #5 (Google Map with highlighted locations, sidebar navigation and Yelp (TM) data about those locations) for the [Udacity Fullstack Developers Nano Degree](https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004). The Neighborhood Map is a 'single-page-web-app' and uses the [Knockout.js](http://knockoutjs.com/) framework to implement the MVVM paradigm.

### Table of Contents

* [Installation](#installation)
* [Running](#running)

### Installation
Clone the respository:

```
https://github.com/tsherburne/udacity-fsdev-map.git
cd udacity-fsdev-map
```

### Running

Start the Web Server:
```
python server.py
```
Open a browser and to view the Neighborhood Map! Select a map marker to view Yelp information about the business.  The sidebar provdies a way to filter the markers displayed on the map.
```
https://<host>:8080
```

A JSON endpoint is provided as a front-end to the [Yelp Fusion](https://www.yelp.com/developers/documentation/v3/get_started) service.
```
https://<host>:8080/api/yelp/<yelp-business-id>
```