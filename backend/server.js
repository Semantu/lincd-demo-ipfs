'use strict';
require('@babel/register')({ extensions: ['.ts', '.tsx'] });

const LincdServer = require("lincd-server/lib/shapes/LincdServer");
let server = new LincdServer.LincdServer({
  loadAppComponent: () => require("../frontend/src/App").default,
});
server.start();