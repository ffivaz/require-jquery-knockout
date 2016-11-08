# Making RequireJS, JQuery, and KnockoutJS work together

I found that is was a PITA to make all these work together. So here is a small guide.

But first of all, some explanation are needed. I am fond of [KnockoutJS](http://knockoutjs.com). It's pure javascript, unlike other frameworks (yes, React and AngularJS 2, I'm looking at you), and the learning curve is steep in my experience. I used it for smaller projects until I hit a problem with growing projects becoming a mess. I tried other frameworks (yes, React and AngularJS 2, I'm looking at you) but came back. And I discovered that you can define [components](http://knockoutjs.com/documentation/component-overview.html). And I finally discovered [RequireJS](http://requirejs.org/) that could bring all this together, without using building tool (at first).

## Data structure
First, you'll want to structure your data. This is especially true for big projects but not only. In my experience, it is far more difficult to convert an existing project than to start from scratch (there is a [Udacity lesson](https://www.udacity.com/course/javascript-design-patterns--ud989) about this). In fact, this is why I wrote this document. I found myself trying to squeeze a mess (thousands lines of code, many pages using the same components, hard copied from one to another, etc.) into a clean structure. It didn't work.

The proposed structure took some advice from a blgo post by [Ado Kukic](https://scotch.io/tutorials/angularjs-best-practices-directory-structure#a-better-structure-and-foundation) about a clean structure for AngularJS. The structure also has to match some requisites of RequireJS, hence differences. Here is the structure:

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
