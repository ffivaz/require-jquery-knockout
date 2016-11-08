define(['knockout'], function(ko) {
    function formNameViewModel() {

        self = this;
        this.inputNameTextValue = ko.observable('Fabien');

        this.inputNameClearClick = function() {
            self.inputNameTextValue('');
        };
    };

    return formNameViewModel;
});
