let mix = require("laravel-mix");

mix.setPublicPath("./public");
mix.js("js/src/app.js", "./public/js/");
mix.js("js/src/app-home.js", "./public/js/");
mix.sass("scss/app.scss", "./public/css/");
mix.version();
mix.browserSync({
  proxy: "localhost",
  port: "3000",
  open: false,
});
