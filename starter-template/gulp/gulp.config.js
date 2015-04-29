
module.exports = function () {
    var config = {
        scss: {
            scssFolder: 'scss/',
            cssFolder: 'content/styles/'
        },
        svg: {
            sourceFolder: 'scss/sprites/svg/',
            spriteFolder: 'content/styles/images/',
            scssMapFolder: 'scss/core/',
            pngFallback: false
        }
    };

    return config;
};



