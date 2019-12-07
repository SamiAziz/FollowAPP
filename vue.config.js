const Storage = require('electron-store');
const storage = new Storage();

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8002,
    proxy: `http://${storage.get('serverIp')}:5500`
  },
  pwa: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default'
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    }
  }
}