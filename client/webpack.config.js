const path = require('path')

module.exports = {
    module: {
        rules: [{
            test: /\.s[a|c]ss$/i,
            use: [{
                loader: 'sass-loader',
                options: {
                    implementation: require("sass")
                }
            }]
        }]
    }
}