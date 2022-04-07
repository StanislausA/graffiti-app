import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/app.css'
import Snippet from './components/Snippet';
import { testData } from '../database/mockstore';

const App = () => {

  const [ data, setData ] = useState(null);
  const [ text, setText ] = useState('');

  useEffect(() => {
    axios.get('/snippets')
      .then(({ data }) => {
        const { snippets } = data;
        setData(snippets);
        console.log(snippets);
      })
      .catch(error => console.log(error));
  }, []);

  const stateReady = data
    ? data.map((doc, idx) =>
    <Snippet
      key={`doc${ idx * 99 }data`}
      content={doc.content}
      date={doc.date.seconds}
    />)
    : <h1>Loading...</h1>;

  const createSnippet = (event) => {
    event.preventDefault();
    const snippet = text.trim();
    if (snippet == undefined) {
      setText('');
      // display error to user
      return;
    }
    axios.post('/snippets', { snippet })
      .then(response => {
        console.log(response);
        setText('');
        // const updatedState = { snippet, ...data };
        // setData(updatedState);
      })
      .catch(error => console.log(error));
  }

  return (
    <div id='app'>
     <header>
       <h1>Graffiti-App</h1>
       <div className='create-snippet'>
        <textarea
          className='snippet-textarea'
          placeholder='write on the wall...'
          maxLength='107'
          cols='70'
          rows='3'
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='snippet-textarea-button'
          type='button'
          onClick={(e) => createSnippet(e)}
        >
          save
        </button>
       </div>
     </header>
     <nav>
      <div className='nav-links'>
        <a href='#'>About</a>
        <a href='#'>Roadmap</a>
      </div>
     </nav>
     <main>
      <div className='snippet-cards'>
         { stateReady }
      </div>
     </main>
    </div>
  );
}

export default App;
