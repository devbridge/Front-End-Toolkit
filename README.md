# Front End Toolkit

## Starter Template ##
This project is a set of best practices, which will allow you to start project quickly, non depending from any javascript framework.
Features, that are already here:
*  Recommended Sass structure with good practices from our team.
*  Live server with auto reload feature.
*  Sass linting integration and configuration. 
*  Automated svg spriting.
*  Automated image optimization.
*  Recommended structure for HTML layout.
*  Automated Html linting task.
*  Automated accessibility check with generated reports.
*  Pre-commit hooks, to keep project "clean".
*  Component based development approach, which will help to transfer code on whatever front-end framework you want or just use it as a plain HTML site generator.
*  Prepared code higiene tools, like editor config, nvmrc, npmrc files, and small things, like npm scripts.

In development:
*  HTML components with basic styling, states and best accessibility practices.
*  More detailed instructions and explanations, why we are doing things in this way.

## Installation

To setup new project clone this repo:

    $ git clone https://github.com/devbridge/Front-End-Toolkit.git

Switch to right node version using [nvm](https://github.com/creationix/nvm). (Which node version is required defined in [.nvmrc](https://github.com/devbridge/Front-End-Toolkit/blob/v2-dev/.nvmrc) file):

    $ nvm use [version number from .nvmrc file]


## Wiki ##
A collection of resources, useful tools and technologies for front-end web development.


Inside project folder install dependencies from package.json:

    $ npm i

To start developing run npm script command:

    $ npm run start

It will start all development tasks: prepare assets, compile html and css, bundle javascript and add file watchers.

Now you can configure your project.


## License

The MIT License (MIT).
