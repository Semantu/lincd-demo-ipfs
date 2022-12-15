import {Person} from 'lincd-foaf/lib/shapes/Person';
import {useEffect, useRef, useState} from 'react';
import {store} from '../App';
import Spinner from '../components/Spinner';
import {Storage} from 'lincd/lib/utils/Storage';
import './Home.scss';
import * as style from './Home.scss.json';

export default function Home() {
  let [saving, setSaving] = useState<boolean>(false);
  let [current, update] = useState<boolean>(false);
  let [updatingCID, setUpdatingCID] = useState<boolean>();
  let [cid, setCID] = useState<string>('');
  let [initialised, setInitialised] = useState<boolean>(false);
  let name = useRef();

  let addPerson = async () => {
    //make sure the store is ready
    store.init().then(() => {
      let inputName;
      if (name && name.current) {
        inputName = name.current['value'];
        (name.current as any).value = '';
      } else {
        inputName = 'Person ' + Person.getLocalInstanceNodes().size;
      }

      let person = new Person();
      person.name = inputName;
      person.save();

      updateStorageState();
    });
  };

  let updateStorageState = () => {
    //wait for everything to be stored in the right store, in this case filebase
    setSaving(true);
    //make sure a rerender happens, even if we were already updating the storage
    update(!current);
    Storage.promiseUpdated().then(() => {
      setSaving(false);
      //currently the newly updated IPFS content ID needs to be manually retrieved.
      setUpdatingCID(true);
      store.getCID().then((cid) => {
        setCID(cid);
        setUpdatingCID(false);
      });
    });
  };
  useEffect(() => {
    //wait for the store to be initialised
    // (which loads all the contents of the graph from IPFS into local memory)
    store.init().then(() => {
      setInitialised(true);
      //then get the current content id
      store.getCID().then((cid) => {
        setCID(cid);
      });
    });
  }, []);

  let remove = (person: Person) => {
    person.remove();
    updateStorageState();
  };
  //get all the person nodes from the graph in local memory
  let persons = Person.getLocalInstances();

  return (
    <div className={style.home}>
      {cid !== null ? (
        <>
          <p>As an example, this demo stores a list of people. Go ahead and add a person:</p>
          <input type="text" ref={name} />
          <input type="button" onClick={addPerson} value={'Add person'} />
          {initialised ? (
            <>
              <ul className={style.personList}>
                {persons.map((person) => {
                  return (
                    <li key={person.node.value}>
                      {person.name}
                      <span onClick={() => remove(person)}>&#128465;</span>
                    </li>
                  );
                })}
              </ul>
              {persons.size == 0 && <span>No persons added yet</span>}
            </>
          ) : (
            <Spinner />
          )}
          <hr />
          <div>
            {saving && (
              <span>
                <Spinner /> Storing data to IPFS...
              </span>
            )}
            {updatingCID && (
              <span>
                <Spinner /> Getting updated CID...
              </span>
            )}
            {!saving && !updatingCID && cid && (
              <div>
                Content hash: <pre>{cid}</pre>
                <br />
                <a href={'https://ipfs.io/ipfs/' + cid} target={'_blank'}>
                  JSON-LD data on IPFS:
                </a>
                <iframe src={'https://ipfs.io/ipfs/' + cid} className={style.iframe} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div>
          <h3>Complete the setup first</h3>
          <>
            <ul>
              <li>Clone this repository</li>
              <li><a href="https://console.filebase.com/signup" target='_blank'>Create an account</a> on Filebase if you don't already have one, and set up a new bucket for this demo.</li>
              <li>Open <code>./env-cmdrc.json</code> and copy your Filebase <a href={"https://console.filebase.com/keys"} target='_blank'>access keys</a> and the name of the bucket into this file.</li>
              <li>Optionally, change the <code>SITE_ROOT</code> environment variable. For example if you're on an online code editor.</li>
              <li>(re)start the application</li>
            </ul>
          </>
        </div>
      )}
    </div>
  );
}
