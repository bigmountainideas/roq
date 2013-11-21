roq
===

[![NPM version](https://badge.fury.io/js/roq.png)](http://badge.fury.io/js/roq) [![Build Status](https://secure.travis-ci.org/bigmountainideas/roq.png)](http://travis-ci.org/bigmountainideas/roq)


Web application development platform and CMS build on node.js, express and handlebars.


## Components:

Roq: Development platform
  -- Pebbles: Data files
  -- Modules: Template Components
  -- Handlebars: Template Views
Chisel: CMS
Cronica: Deployment and versioning


## Install:

    npm install roq -g


## Scaffold:

    roq mynewroqapp.com


## Test:

    npm test
or
    make test

## ToDo:

* Client library dependencies
* Client library optimizations
* Combine localization object with local variables
* Determine how to set locale
* LESS compilation
* Client library processing
* Module and template controllers
* Hooks
* Chisel CMS
* Caching
* Async file reads of templates, modules, controllers and models
* Async compiling and execution of templates
* Compiled template caching
* Module caching
* Internal module data routing
* Integrate handlebars partials into modules


## Built On

* [Express 3.0](http://expressjs.com)
* [Handlebars 1.1.2](http://handlebarsjs.com/)


## License

Roq Platform is released under the MIT license.