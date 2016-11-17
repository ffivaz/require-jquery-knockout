requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        "text": "text",
        "jquery": "jquery-1.12.4",
        "knockout": "knockout-3.4.0"
    }
});

require(['knockout', '../appViewModel'], function(ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});
