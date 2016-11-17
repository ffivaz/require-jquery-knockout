define(['knockout'], function(ko) {

    ko.components.register("color-asker", {
        viewModel: { require: "../app/components/color-asker/color-asker" },
        template: { require: "text!../app/components/color-asker/color-asker.html" }
    });

    return function appViewModel() {
        // Non component code come here
    };
});