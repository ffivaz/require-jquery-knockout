define(['knockout'], function(ko) {
    function formNameViewModel() {

        self = this;
        this.inputNameTextValue = ko.observable('test');

        this.inputNameClearClick = function() {
            self.inputNameTextValue('');
        };
    };

    return formNameViewModel;
});
