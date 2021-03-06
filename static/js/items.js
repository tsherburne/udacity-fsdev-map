/*globals ko, mapResize, showItems, setMarkers, populateInfoWindowForItem*/

var allLocations = [
    { title: "UVA Rotunda", location: { lat: 38.0326828, lng: -78.503269 },
        yelpId: "university-of-virginia-charlottesville-3" },
    { title: "Downtown Mall", location: { lat: 38.029959, lng: -78.4873784 },
        yelpId: "downtown-mall-charlottesville-2" },
    { title: "Monticello", location: { lat: 38.0106646, lng: -78.4834914 },
        yelpId: "thomas-jeffersons-monticello-charlottesville" },
    { title: "Three Notch'd Brewery",
        location: { lat: 38.0310149, lng: -78.4838429 },
        yelpId: "three-notchd-brewing-company-charlottesville-5" },
    { title: "Whiskey Jar", location: { lat: 38.0314142, lng: -78.4849477 },
        yelpId: "the-whiskey-jar-charlottesville" },
    { title: "South Street Brewery",
        location: { lat: 38.0293422, lng: -78.4848757 },
        yelpId: "south-street-brewery-charlottesville" }
];

/* locations - used by map.js */
var locations = [];

var ItemsViewModel = function () {
    "use strict";
    var i = 0, item, title, self = this;

    /* keeps track of items sidebar - opened / closed */
    self.itemsOpen = ko.observable(false);
    /* keeps track of the filter list of map items */
    self.filteredMapItems = ko.observableArray();

    /* the filter string */
    self.itemsFilter = ko.observable("");

    /* Initially set filter locations to all locations*/
    for (i = 0; i < allLocations.length; i += 1) {
        self.filteredMapItems.push(allLocations[i]);
    }

    locations = self.filteredMapItems();

    self.openItems = function () {
        self.itemsOpen(true);
        mapResize();
    };

    self.closeItems = function () {
        self.itemsOpen(false);
        mapResize();

    };

    self.highlightItem = function (item) {
        populateInfoWindowForItem(item);
    };

    self.filterMap = function () {
        /* clear filteredMapItems */
        self.filteredMapItems.removeAll();

        /* filter match in UPPERCASE */
        var filter = self.itemsFilter().toUpperCase();

        /* rebuild filteredMapItems with items that match filter criteria */
        for (i = 0; i < allLocations.length; i += 1) {
            item = allLocations[i];
            title = allLocations[i].title;
            if (title.toUpperCase().indexOf(filter) > -1) {
                self.filteredMapItems.push(item);
            }
        }

        locations = self.filteredMapItems();

        setMarkers();
        showItems();
    };

    self.mainStatus = ko.computed(function () {
        return (self.itemsOpen() ? "body_withSidebar" : "body_withoutSidebar");
    });

    self.sideBarStatus = ko.computed(function () {
        return (self.itemsOpen() ? "sidebar_Open" : "sidebar_Closed");
    });

    self.navStatus = ko.computed(function () {
        return (self.itemsOpen() ? "nav_Off" : "nav_On");
    });

};

ko.applyBindings(new ItemsViewModel());
