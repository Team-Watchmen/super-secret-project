SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './scripts/main.js',
        'get-current-weather':'./scripts/get-current-weather-for-location.js',
        'get-five-day-forecast':'./scripts/get-five-day-weather-for-location.js'
    }
});