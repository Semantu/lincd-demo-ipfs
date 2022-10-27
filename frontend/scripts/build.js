'use strict';
const webpack = require("webpack");
const config = require("lincd-server/site.webpack.config");
const chalk = require('chalk');
webpack(config, (err, stats) => { // [Stats Object](#stats-object)
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    process.exit(1);
    return;
  }
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.log('Finished running webpack with errors.');
    info.errors.forEach((e) => console.error(e));
  } else {
    // console.log(chalk.green('Finished running webpack.'));
    console.log(stats.toString({
      chunks:false,
      assets:true,
      entryPoints:false,
      modules:false,
      moduleAssets:false,
      moduleChunks:false,
      colors: true,
    }));
    // console.log(
    // 	chalk.green('\t'+Object.keys(stats.compilation.assets).join('\n\t')),
    // );
  }
  process.exit();
});