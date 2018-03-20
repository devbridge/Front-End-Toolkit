# Front End Toolkit [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Front-end%20boilerplate%20with%20lots%20of%20automation%20&url=https://www.devbridge.com/articles/the-power-of-our-new-front-end-toolkit/&via=devbridge&hashtags=front-end,html,sass,automated,accessibility,webdev,css)

## Starter Template ##
This project is a set of best practices brought to you by the team at [Devbridge Group.](https://www.devbridge.com/articles/the-power-of-our-new-front-end-toolkit/), which will allow you to start project quickly, non depending from any javascript framework.
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
*  Prepared code hygiene tools, like editor config, nvmrc, npmrc files, and small things, like npm scripts.

In development:
*  HTML components with basic styling, states and best accessibility practices.
*  More detailed instructions and explanations, why we are doing things in this way.

## Installation

To setup new project clone this repo:

    $ git clone https://github.com/devbridge/Front-End-Toolkit.git

Switch to right node version using [nvm](https://github.com/creationix/nvm). (Which node version is required defined in [.nvmrc](https://github.com/devbridge/Front-End-Toolkit/blob/v2-dev/.nvmrc) file):

    $ nvm use [version number from .nvmrc file]

Inside project folder install dependencies from package.json:

    $ npm i

To start developing run npm script command:

    $ npm run start
Or launch command with "check-dependencies" mode, which will check if all needed dependencies are installed:

    $ npm run start-safe

It will start all development tasks: prepare assets, compile html and css, bundle javascript and add file watchers.

Now you can configure your project.


## License

The MIT License (MIT).
