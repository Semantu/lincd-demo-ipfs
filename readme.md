# Linked Data on IPFS using LINCD.js
[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/p/github/Semantu/lincd-demo-ipfs/draft/winter-framework)

This web application runs on [Linked Data](https://www.w3.org/standards/semanticweb/data) which is stored on [IPFS](https://ipfs.io/). 

This demonstration, despite its straightforward use case, demonstrates how distributed ledger technology and semantic web technology can be used to enhance each other's strengths and produce better and more intelligent [web3](https://www.investopedia.com/web-20-web-30-5208698) experiences.

### Simple and clean code
Only a few lines of code are required to convert this application into a Linked Data application hosted on IPFS, whilst the rest of the code is mostly related to the standard setup for a React-based web application. 

### Linked Data made easy
Working with Linked Data is made simple in the app thanks to [LINCD.js](https://github.com/Semantu/lincd) and packages from the [lincd.org](https://www.lincd.org) repository.
This makes dealing with Linked Data as simple as writing any other object-oriented code thanks to LINCD's [Shapes]() feature.

For example. see [createPerson()](https://github.com/Semantu/lincd-demo-ipfs/blob/master/frontend/src/pages/Home.tsx#L33-L35) in `/frontend/src/pages/Home.tsx`:

```typescript
let person = new Person();
person.name = inputName;
person.save();
```

### Stored on IPFS
The app creates a list of persons which are stored as a graph on IPFS using [Filebase](https://filebase.com/).
Ensuring the graph is stored on IPFS consists of [2 lines of code](https://github.com/Semantu/lincd-demo-ipfs/blob/master/frontend/src/App.tsx#L17-L18), plus the configuration settings explained below.

```
export const store = new FilebaseFrontendStore('_data')
Storage.setDefaultStore(store);
```

### No experience required
To put it in another way, this application demonstrates the compatibility of distributed ledgers and Linked Data.

But it also shows that with LINCD, **developers don't need any specialized understanding** of either of these emerging technologies in order to use and combine them in a web application

### Installation
- [Create an account](https://console.filebase.com/signup) on Filebase if you don't already have one, and set up a new bucket for this demo.
- Clone this repo
- Open `./env-cmdrc.json` and copy your filebase [access keys](https://console.filebase.com/keys) and the name of the bucket into this file.
- Run `yarn` followed by `yarn start` to start the application
