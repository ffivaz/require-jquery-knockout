requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        text: "text",
        jquery: "jquery",
        knockout: "knockout"
    }
});

require(['knockout', '../appViewModel'], function(ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});

require(['knockout'], function(ko) {
    ko.components.register('form-name', {
        viewModel: { require: "../app/components/form-name/form-name" },
        template: { require: "text!../app/components/form-name/form-name.html" }
    })
});
