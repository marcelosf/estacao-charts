let mix = require('laravel-mix');
require('dotenv').config();

mix.setPublicPath('./public');
mix.js('js/src/app.js', './public/js/');
mix.version();
mix.browserSync({
        
      proxy: 'nginx',
      port: '3000',
      open: false

});