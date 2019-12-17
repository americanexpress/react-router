module.exports = (config) => {
  config.set({
    frameworks: [ 'mocha' ],
    files: ['tests.webpack.js'],
    reporters: ['progress'],
    port: 9876, // karma web server port
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    // singleRun: false, // Karma captures browsers, runs the tests and exits
    concurrency: Infinity,
  });
};
