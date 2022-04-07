import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/app.css';
import Snippet from './components/Snippet';

const App = () => {
  const [data, setData] = useState(null);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/snippets')
      .then(({ data }) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [text]);

  const stateReady = () => {
    return data ? (
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
  }

  const errorReady = error
    ? (<div className='error'>{ error }</div>)
    : false;

    const textReady = text ? false : true;

  // const createSnippet = (event) => {
  //   event.preventDefault();
  //   const snippet = text.trim();
  //   if (snippet == '') {
  //     setText('');
  //     setError('Text input invalid...');
  //     setTimeout(() => setError(null), 4000);
  //     return;
  //   }
  //   axios
  //     .post('/snippets', { snippet })
  //     .then((response) => {
  //       console.log(response);
  //       setText('');
  //       const updatedState = data.concat(snippet);
  //       setData(updatedState);
  //     })
  //     .catch((error) => {
  //       setError(`Error caught: ${ error }`);
  //       setTimeout(() => setError(null), 4000);
  //       console.log('Error caught:', error);
  //     }
  //   );
  // };

  const createSnippet = (event) => {
    event.preventDefault();
    const snippet = text.trim();
    if (snippet == '') {
      setText('');
      setError('Text input invalid...');
      setTimeout(() => setError(null), 4000);
      return;
    }
    const newSnippet = {
      id: data.length + 1,
      message: snippet,
      date: {
        seconds: Date.now(),
        nanoseconds: 0
      }
    };

    axios
      .post('/snippets', newSnippet)
      .then((response) => {
        const updatedState = data.concat(newSnippet);
        setData(updatedState);
        setText('');
      })
      .catch((error) => {
        setError(`Error caught: ${ error }`);
        setText('');
        setTimeout(() => setError(null), 4000);
        console.log('Error caught:', error);
      }
    );
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
              value={ text }
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="snippet-textarea-button"
              type="button"
              onClick={(e) => createSnippet(e)}
              disabled={ textReady }
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
        <div className="snippet-cards">
          { stateReady() }
        </div>
        { errorReady }
      </main>
    </div>
  );
};

export default App;
