define(["knockout"], function(ko) {
    function colorAskerViewModel() {
        this.inputNameTextValue = ko.observable("Fabien");
        this.inputNameClearClick = function() {
            this.inputNameTextValue('');
        };
    };
    return colorAskerViewModel;
});
