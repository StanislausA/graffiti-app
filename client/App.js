import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/app.css';
import Snippet from './components/Snippet';
import { testData } from '../database/mockstore';

const App = () => {
  const [data, setData] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/snippets')
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const stateReady = data ? (
    data.map((doc, idx) => (
      <Snippet
        key={`doc${idx * 99}data`}
        content={doc.content}
        date={doc.date.seconds}
      />
    ))
  ) : (
    <h1>Loading...</h1>
  );

  const errorReady = error
    ? (<div className='error'>{ error }</div>)
    : false;

  const createSnippet = (event) => {
    event.preventDefault();
    const snippet = text.trim();
    if (snippet == '') {
      setText('');
      setError('Text input invalid...');
      setTimeout(() => setError(null), 4000);
      return;
    }
    axios
      .post('/snippets', { snippet })
      .then((response) => {
        console.log(response);
        setText('');
        const updatedState = { snippet, ...data };
        setData(updatedState);
      })
      .catch((error) => {
        setError(`Error caught: ${ error }`);
        setTimeout(() => setError(null), 4000);
        console.log('Error caught:', error);
      });
  };

  return (
    <div id="app">
      <div className="header-nav">
        <header>
          <h1>GRAFFITI</h1>
          <div className="create-snippet">
            <textarea
              className="snippet-textarea"
              placeholder="write on the wall..."
              maxLength="107"
              cols="70"
              rows="3"
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="snippet-textarea-button"
              type="button"
              onClick={(e) => createSnippet(e)}
            >
              save
            </button>
          </div>
        </header>
        <nav>
          <div className="nav-links">
            <a href="#">About</a>
            <a href="#">Roadmap</a>
          </div>
        </nav>
      </div>
      <main>
        <div className="snippet-cards">{stateReady}</div>
        { errorReady }
      </main>
    </div>
  );
};

export default App;
