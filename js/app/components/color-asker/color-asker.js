define(["jquery", "knockout"], function($, ko) {

    function colorAskerBuilder() {
        this.inputColorTextValue = ko.observable("red");
        this.inputColorClearClick = function() {
            this.inputColorTextValue('red');
        };
        $('.color-text').css('color', this.inputColorTextValue());
    }

    return colorAskerBuilder;
});