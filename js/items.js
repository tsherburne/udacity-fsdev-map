/* global ko mapResize */

var ItemsViewModel = function() {

    var self = this;
    self.itemsOpen = ko.observable(false);

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
