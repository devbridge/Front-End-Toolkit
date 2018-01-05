# Front End Toolkit

This project is a set of best practices, which will allow you to start project quickly, non depending from any javascript framework.

## Installation

To setup new project by cloning this repo:

    $ git clone -b v2-dev https://github.com/devbridge/Front-End-Toolkit.git

Switch to right node version using [nvm](https://github.com/creationix/nvm). (Which version is required is defined in [.nvmrc](https://github.com/devbridge/Front-End-Toolkit/blob/v2-dev/.nvmrc) file):

    $ nvm use 6.4.0

Install gulp globally if you don't have it:

    $ npm i gulp -g

And install other project dependencies:

    $ npm i

To start developing run this command:

    $ npm run start

It will start all required tasks in this hierarchy:
```
-- 'develop'
 +--'check-deps'
 +--'prepare-assets'
 | +--'image-optimization'
 | +--'create-svg-sprite'
 | +--'scss-linting'
 | +--'compile-scss'
 | +--'html-render'
 +--'prepare-config'
 +--'clear-image-cache'
 +--'watch-scss'
 | +--'compile-scss'
 | +--'scss-linting'
 +--'watch-htmlrender'
 | +--'html-render'
 +--'watch-svg'
 | +--'create-svg-sprite'
 +--'watch-images-optimize'
 | +--'image-optimization'
```

## Technologies

TODO: Describe technologies

## Usage

TODO: Write usage instructions

## History

You can access older versions of front-end toolkit, right here:
[https://github.com/devbridge/Front-End-Toolkit/tree/v1](https://github.com/devbridge/Front-End-Toolkit/tree/v1)

## License

The MIT License (MIT).
