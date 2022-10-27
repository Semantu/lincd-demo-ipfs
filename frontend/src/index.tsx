window['$RefreshReg$'] = () => {};
window['$RefreshSig$'] = () => () => {};

import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import React from 'react';

hydrateRoot(
  document,
  <React.StrictMode>
    <BrowserRouter>
      <App assets={window['assetManifest']} />
    </BrowserRouter>
  </React.StrictMode>,
);
