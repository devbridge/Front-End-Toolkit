const rules = [
    /*
     * Reference: https://github.com/webpack-contrib/eslint-loader
     * Comment this out if you want to compile js with eslint errors.
     */
    {
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        use: [{
            loader: 'eslint-loader',
        }],
    },

    /* Reference: https://github.com/babel/babel-loader */
    {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        use: [
            'babel-loader',
        ],
    },
];

module.exports = rules;
