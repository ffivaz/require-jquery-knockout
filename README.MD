# Making RequireJS, JQuery, and KnockoutJS work together

I found that is was a PITA to make all these work together. So here is a small guide.

But first of all, some explanation are needed. I am fond of [KnockoutJS](http://knockoutjs.com). It's pure javascript, unlike other frameworks (yes, React and AngularJS 2, I'm looking at you), and the learning curve is steep in my experience. I used it for smaller projects until I hit a problem with growing projects becoming a mess. I tried other frameworks (yes, React and AngularJS 2, I'm looking at you) but came back. And I discovered that you can define [components](http://knockoutjs.com/documentation/component-overview.html). And I finally discovered [RequireJS](http://requirejs.org/) that could bring all this together, without using building tool (at first).

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
------------ form-name/
---------------- form-name.html   // Template
---------------- form-name.js     // View model
------------ sidebar/
---------------- sidebar.html
---------------- sidebar.js
---- lib/
-------- jquery.js
-------- knockout.js
-------- text.js                  // The text.js plugin for RequireJS is used for reading knockout templates
---- app.js
---- require.js
---- appViewModel.js              // Not used if all your code is broken into components
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
    <title>Test app</title>
    <link rel="stylesheet" href="css/style.css">
    <script data-main="js/app" src="js/require.js"></script>
</head>
<body>
    <h1>Test app</h1>
    <p>Some text</p>
</body>
</html>
```

The *script* line is important, it tells your browser to load the `require.js` file located in the `js` directory and tells RequireJS to load `app.js` to start the app. Yes, RequireJS doesn't need the .js extension. Now you can take a look at the basics from the `js/app.js`.

```javascript
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        "text": "text",
        "jquery": "jquery-1.12.4",
        "knockout": "knockout-3.4.0"
    }
});
```

RequireJS base url directory tells where to look for the files below. *(to be controled)* In my understanding of RequireJS, libraries like KnockoutJS are loaded only when used for the first time. Configuring the path to the files doesn't mean they are loaded and can be used. For instance, we will create our first KnockoutJS component below. If it contains some JQuery code, it won't work.

Now that RequireJS works, let's move to our first KnockoutJS component.

## Our first KnockoutJS component
We will create a simple form: an input, a rendered text based on it and a clear button. The html code is simple:

```html
<div>
    <label for="inputName">Please enter your name: </label>
    <input type="text" id="inputName" placeholder="Name" data-bind="textInput: inputNameTextValue">
</div>
<p>Your name is <span class="text-strong" data-bind="text: inputNameTextValue"></span></p><br>
<button data-bind="click: inputNameClearClick">Clear</button>
```

There are three components linked to KnockoutJS: the input, the text and the button (look for the `data-bind` tag). If you are not familiar with KnockoutJS, it's time to [take a tour](http://knockoutjs.com). This code will be written in the html file `form-name.html`. The other file in the directory contains the code for the different bindings.

```javascript
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
```

For now, we just have to focus on the `formNameViewModel()` function (the inner function). Observations:
* All your KnockoutJS view models *have* to begin with ```self = this```, it is the only way to use variables in functions.
* KnockoutJS uses *observables*. the `inputNameTextValue` variable is one. It stores our name (my name in this case). The variable is nound two times in html code above. In the input (`textInput`, the observable is updated each time the text in the input changes), and in the text, where the content of the observable is rendered.
* Next comes a function. The function is triggered when the button is clicked. It sets the content of the observable to an empty string. Note that observables are functions, and you call them with their new value to update.

*To be continued...*
