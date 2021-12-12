![checkboxes.js – A jQuery plugin that gives you nice powers over your checkboxes](.github/assets/banner.png)

[![Build Status](https://travis-ci.org/rmariuzzo/checkboxes.js.svg?branch=develop)](https://travis-ci.org/rmariuzzo/checkboxes.js)

## Installation

**With NPM:**

```shell
npm install checkboxes.js --save
```

**With bower:**

```shell
bower install checkboxes --save
```

**Manually:**

 1. [Download the latest release](https://github.com/rmariuzzo/checkboxes.js/releases).
 2. Then include `jquery.checkboxes-###.min.js` just after jQuery.

## Features

 * **Check all** checkboxes in context.
 * **Uncheck all** checkboxes in context.
 * **Toggle states** of all checkboxes in context.
 * Enable **range selection**.
 * **Limit** the number of checked checkbox per context.
 * **Data API** like Twitter Bootstrap.

### Documentation and examples

 * [Checking all checkboxes in a context](http://rmariuzzo.github.io/checkboxes.js/#checking-all-checkboxes)
 * [Unchecking all checkboxes in a context](http://rmariuzzo.github.io/checkboxes.js/#unchecking-all-checkboxes)
 * [Toggling all checkboxes's state in a context](http://rmariuzzo.github.io/checkboxes.js/#toggling-all-checkboxes)
 * [Enabling range selection of checkboxes](http://rmariuzzo.github.io/checkboxes.js/#range-selection-of-checkboxes)
 * [Limiting the number of checked checkboxes in a context](http://rmariuzzo.github.io/checkboxes.js/#limit-max-number-of-checked-checkboxes)

## Want to contribute?

All help are more than welcome!

#### Pre-requisites

 - [node.js](http://nodejs.org/).
 - [Grunt](http://gruntjs.com/).
 - [Bower](http://bower.io/).

#### Development Workflow

 1. **[Fork](https://github.com/rmariuzzo/checkboxes.js/fork)** this respository.
 2. **Clone** your fork and create a feature branch from develop.

    ```shell
    git clone git@github.com:<your-username>/checkboxes.js.git
    git fetch origin
    git checkout develop
    git checkout -b feature-<super-power>
    ```

 3. **Install** development dependencies.

    ```shell
    npm install
    bower install
    ```

 4. **Code** and be happy!
 5. **Test** your code (run `grunt` to watch JS files and execute the test specs).
 6. When everything is in good shape prepare the distribution files (run `grunt build`).
 7. Submit a **pull request** and grab popcorn.

Questions? [Hit me](https://github.com/rmariuzzo/).

#### ProTip:

> When coding run `grunt`, this will watch for any change in source and test files, then it will lint and test your code as you code.

## Tests

To run all tests:

```shell
grunt test
```

### Credits

 - **checkboxes.js** was created by [Rubens Mariuzzo](http://github.com/rmariuzzo) with all the love in the world.

 - **checkboxes.js** would not have been possible without the help of: [jQuery](http://jquery.com/), [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/), [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Glyphicons](http://glyphicons.com/), [Twitter Bootstrap](http://twitter.github.io/bootstrap/) and [Subtle Patterns](http://subtlepatterns.com/). _I'm very thankful for all!_
