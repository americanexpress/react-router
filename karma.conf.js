const webpack = require('webpack')
module.exports = config => {
  if (process.env.RELEASE)
    config.singleRun = true

  const customLaunchers = {
    // The ancient Travis Chrome that most projects use in CI.
    ChromeCi: {
      base: 'Chrome',
      flags: [ '--no-sandbox' ]
    }
  }

  const configuration = {
    customLaunchers: customLaunchers,

    browsers: [ 'Chrome' ],
    frameworks: [ 'mocha' ],
    reporters: [ 'mocha', 'coverage' ],

    files: [
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'cheap-module-inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test'),
          __DEV__: true
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage'
    }
  }

  if (process.env.USE_CLOUD) {
    configuration.browsers = Object.keys(customLaunchers)
    configuration.reporters[0] = 'dots'
    configuration.concurrency = 2

    configuration.browserDisconnectTimeout = 10000
    configuration.browserDisconnectTolerance = 3

    if (process.env.TRAVIS) {
      configuration.browsers = Object.keys(customLaunchers)
    }
  }

  config.set(configuration)
}
