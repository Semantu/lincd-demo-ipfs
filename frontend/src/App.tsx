import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Spinner from './components/Spinner';
import {Storage} from 'lincd/lib/utils/Storage';
import Home from "./pages/Home";

//Note that by default LINCD apps are set up with support for SCSS (sass) and CSS Modules
//So any .scss file needs to be imported by itself
import "./App.scss";
//and then the .scss.json file needs to be imported to access the class names
// (this file will be automatically generated once you add a selector + css to the SCSS file)
import style from "./App.scss.json";
import {FilebaseFrontendStore} from 'lincd-filebase/lib/shapes/FilebaseFrontendStore';

//store all quads in a file on the backend named 'main'
// export const store = new FrontendFileStore('main');
export const store = new FilebaseFrontendStore('_data')
Storage.setDefaultStore(store);

declare var window;
export default function App({assets = typeof window !== 'undefined' ? window['assetManifest'] : {}}) {
  return (
    <Html assets={assets} title="LINCD + IPFS Demo">
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </Html>
  );
}

function Content() {
  return (
    <Layout>
      <div className={style.content}>
        <Home />
      </div>
    </Layout>
  );
}

function Error({error}) {
  return (
    <div className={style.error}>
      <h1>Application Error</h1>
      <pre>{error.stack}</pre>
    </div>
  );
}

function Layout({children}) {
  return (
    <main className={style.main}>
      <Header />
      {children}
    </main>
  );
}

function Header()
{
  return (
    <header className={style.header}>
      <h1>LINCD + IPFS Demo</h1>
    </header>
  );
}

function Html({assets, children, title}) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" href={assets['main.css']} />
      {assets['tailwind-cdn'] && (
        <script src={assets['tailwind-cdn']}></script>
      )}
      <title>{title}</title>
    </head>
    <body>
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<b>Enable JavaScript to run this app.</b>`,
      }}
    />
    {children}
    <script
      dangerouslySetInnerHTML={{
        __html: `assetManifest = ${JSON.stringify(assets)};`,
      }}
    />
    </body>
    </html>
  );
}
