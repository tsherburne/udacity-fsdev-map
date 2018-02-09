/* global ko mapResize */

var locations = [
    {title: 'UVA Rotunda', location: {lat: 38.0326828, lng: -78.503269}},
    {title: 'Downtown Mall', location: {lat: 38.029959, lng: -78.4873784}},
    {title: 'Monticello', location: {lat: 38.0106646, lng: -78.4834914}},
    {title: "Three Notch'd Brewery", location: {lat: 38.0310149, lng: -78.4838429}},
    {title: 'Whiskey Jar', location: {lat: 38.0314142, lng: -78.4849477}},
    {title: 'South Street Brewery', location: {lat: 38.0293422, lng: -78.4848757}}
];
    
var ItemsViewModel = function() {

    var self = this;
    self.itemsOpen = ko.observable(false);

    self.mapLocations = locations;

    self.openItems = function() {
        self.itemsOpen(true); 
        mapResize();
    };
    
    self.closeItems = function() {
        self.itemsOpen(false);
        mapResize();

    };
    
    self.mainStatus = ko.computed(function() {
        return (self.itemsOpen() ? "body_withSidebar" : "body_withoutSidebar");
    });
    
    self.sideBarStatus = ko.computed(function() {
        return (self.itemsOpen() ? "sidebar_Open" : "sidebar_Closed");
    });
    
    self.navStatus = ko.computed(function() {
        return (self.itemsOpen() ? "nav_Off" : "nav_On");
    });
    
};

ko.applyBindings(new ItemsViewModel());
