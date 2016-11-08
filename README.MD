# Making requirejs, jquery, and knockoutjs work together

I found that is was a PITA to make all these work together. So here is a small guide.

But first of all, some explanation is needed. I am fond of [KnockoutJS](http://knockoutjs.com). It's pure javascript, unlike other frameworks (yes, React and AngularJS 2, I'm looking at you), and the learning curve is steep in my experience. I used it for smaller projects until I hit a problem with growing projects becoming a mess. I tried other frameworks (yes, React and AngularJS 2, I'm looking at you) but came back. And I discovered that you can define [components](http://knockoutjs.com/documentation/component-overview.html). And I finally discovered [RequireJS](http://requirejs.org/) that could bring all this together, without using building tool (at first).

First, you'll want to structure your data, especially for big projects. The proposed structure took some advice from [Ado Kukic](https://scotch.io/tutorials/angularjs-best-practices-directory-structure#a-better-structure-and-foundation) who designed a structure for AngularJS. The structure also has to match some requisites of RequireJS. Here is the structure:

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
