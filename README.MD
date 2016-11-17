# Making RequireJS, JQuery, and KnockoutJS work together

I found that is was a PITA to make all these work together. So here is a small guide.

But first of all, some explanation is needed. I am fond of [KnockoutJS](http://knockoutjs.com). It's pure javascript, unlike other frameworks (yes, React and Angular 2, I'm looking at you), and the learning curve is steep in my experience. I used it for smaller projects until I hit a problem with growing projects becoming a mess. I tried other frameworks (yes, React and Angular 2, I'm looking at you) but came back. And I discovered that you can define [components](http://knockoutjs.com/documentation/component-overview.html) in KnockoutJS. And I finally discovered [RequireJS](http://requirejs.org/) that could bring all this together, without using building tool (at first).

The tutorial below does not replace the [excellent documentation](http://knockoutjs.com/documentation/introduction.html) from KnockoutJS. But sometimes the documentation can go deeply into details. It took me hours to find how to implement components in KnockoutJS, so here is the tutorial.

## Data structure
First, you'll want to structure your data. This is especially true for big projects but not only. In my experience, it is far more difficult to convert an existing project than to start from scratch (there is a [Udacity lesson](https://www.udacity.com/course/javascript-design-patterns--ud989) about this). In fact, this is why I wrote this document. I found myself trying to squeeze a mess (thousands lines of code, many pages using the same components, hard copied from one to another, etc.) into a clean structure. It didn't work.

The proposed structure took some advice from a blog post by [Ado Kukic](https://scotch.io/tutorials/angularjs-best-practices-directory-structure#a-better-structure-and-foundation) about a clean structure for AngularJS. The structure also has to match some requisites of RequireJS, hence the differences. Here is the structure:

```javascript
assets/
---- css/
-------- lib/                    // Any third-party css (like bootstrap.css)
-------- style.css
---- img/                         // Images for your project
js/
---- app/
-------- components/
------------ color-asker/
---------------- color-asker.html   // Template
---------------- color-asker.js     // View model
------------ sidebar/
---------------- sidebar.html
---------------- sidebar.js
---- lib/
-------- jquery.js
-------- knockout.js
-------- text.js                  // The text.js plugin for RequireJS is used for reading knockout templates
---- app.js
---- require.js
---- appViewModel.js              // This is where KnockoutJS code goes
index.html
```

You can create the structure by yourself, or just fork or pull the code from here. In the structure above, four files are third-party : [require.js](http://requirejs.org/docs/download.html), [jquery.js](http://jquery.com/download/), [knockout.js](http://knockoutjs.com/downloads/) and [text.js](https://github.com/requirejs/text). Download them - or look at the code further down if you want to use RequireJS to load the last three from your favorite CDN. Note that the version numbers were removed from the files for clarity.

## Making RequireJS work
I start any project with a clean `index.html` file. Something like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Color asker</title>
    <link rel="stylesheet" href="css/style.css">
    <script data-main="js/app" src="js/require.js"></script>
</head>
<body>
    <h1>Color asker</h1>
    <p>What is your favorite color?</p>
</body>
</html>
```

The *script* line is important, it tells your browser to load the `require.js` file located in the `js` directory and tells RequireJS to load `app.js` to start the app. Yes, RequireJS doesn't need the .js extension. Now you can take a look at the basics from the `js/app.js`.

```javascript
requirejs.config({
    baseUrl: "js/lib",
    pathome texts: {
        "text": "text",
        "jquery": "jquery-1.12.4",
        "knockout": "knockout-3.4.0"
    }
});
```

RequireJS base url directory tells where to look for the files below. *(to be controled)* In my understanding of RequireJS, libraries like KnockoutJS are loaded only when used for the first time. Configuring the path to the files doesn't mean they are loaded and can be used. For instance, we will create our first KnockoutJS component below. If it contains some JQuery code, it won't work.

Now that RequireJS works, let's initialize KnockoutJS. In the `app.js` file, after the code above, write:

```javascript
require(["knockout", "../appViewModel"], function(ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});
```

This creates the binding that launches KnockoutJS magic. The require loads `appViewModel`, which depends on `knockout`. Now we have to load the view model function in `appViewModel.js`:

```javascript
define(["knockout"], function(ko) {
    return function appViewModel() {
        // Put some ko code here
    };
});
```

That is it. Now you can test that it works by creating some interactions. Say, an input asking for your prefered color and a simple text that takes the value in the input and writes it in the screen. Live. And we can add a button that resets the color in the input to red (it doesn't change anything if you didn't change the color in the input, to be clear). First, add three lines in your `index.html` file, in the body.

```html
<p>Enter a color: <input type="text" placeholder="color" data-bind="textInput: inputColorTextValue"></p>
<p>You really prefer <span data-bind="text: inputColorTextValue"></span>?</p>
<button data-bind="click: inputColorClearClick">Change</button>
```

There are two components linked to KnockoutJS: the input and the text (look for the `data-bind` tag). If you are not familiar with KnockoutJS, it's time to [take a tour](http://knockoutjs.com).

Then put the following code in `appViewModel.js`, like that:

```javascript
define(["knockout"], function(ko) {
    return function appViewModel() {
        this.inputColorTextValue = ko.observable("red");
        this.inputColorClearClick = function() {
            this.inputColorTextValue("red");
        };
    };
});
```

KnockoutJS uses *observables*. The `inputColorTextValue` variable is one. It stores our favorite color. The variable is bound two times in html code above: in the input (`textInput`, the observable is updated each time the text in the input changes), and in the text, where the content of the observable is rendered. Next comes a function. The function is triggered when the button is clicked. It sets the content of the observable to the original color. Note that observables are functions, and you call them with their new value to update.

Your page has now some interactive elements. Easy. What if you'll use the color form repeatedely and want to create a component?

## Our first KnockoutJS component
First, take the three lines of html code above and put them in a new file, in the components directory, name it `color-asker.html`. That file will work as a template. Create another file in the same directory, name it `color.asker.js`. It contains the code for the different bindings:

```javascript
define(["knockout"], function(ko) {
    function colorAskerViewModel() {
        this.inputColorTextValue = ko.observable("red");
        this.inputColorClearClick = function() {
            this.inputColorTextValue('red');
        };
    }
    return colorAskerViewModel;
});
```

Now that we have created a component. We want to use it in `index.html`. First, we'll rewrite our code in `appViewModel.js`:

```javascript
define(['knockout'], function(ko) {
    ko.components.register("form-name", {
        viewModel: { require: "../app/components/color-asker/color-asker" },
        template: { require: "text!../app/components/color-asker/color-asker.html" }
    });

    return function appViewModel() {
        // Non component code come here
    };
});
```

Exit the code in the `appViewModel()` function. It is now stored in a component file and called with the `ko.component.register()` function. Now that you have a function and a template, you have to *register* your component. And you can add your component to your HTML code, like that:

```html
<color-asker></color-asker>
```

Note that components are loaded asynchronously. I can lead to some of your content (fix content, that is, content you have in your HTML code) to move around your page when components are loaded and added to your page.

## And jQuery?
Now that you have a working component, you maybe want to use jQuery to change your component. Say, you want to change the color of the text, according to the color you entered (if it exists as a text color. TODO: Add link). First we change our component html template and add a class to our dynamic `<span>` text:

```html
<p>You really prefer <span class="color-text" data-bind="text: inputColorTextValue"></span>?</p>
```

Then, we can change our component's javascript code in the :

```javascript
$('.color-text').css('color', this.inputColorTextValue());
```

If your try to run this code, it won't work, throwing an error `Uncaught ReferenceError: $ is not defined(…)`. Why? Because we didn't tell RequireJS to load jQuery with the component. The `define` function at the top of the function has to be changed to:

```javascript
define(["jquery", "knockout"], function($, ko) {
```

*To be continued...*
