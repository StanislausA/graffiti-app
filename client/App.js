import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import './styles/app.css';
import Snippets from './components/Snippets';
import Snippet from './components/Snippet';
import Roadmap from './components/Roadmap';
import About from './components/About';
import Nav from './components/Nav';

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

  const errorReady = error ? (<div className='error'>{ error }</div>) : false;

  const textReady = text ? false : true;

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
        const updatedState = data.concat(snippet);
        setData(updatedState);
      })
      .catch((error) => {
        setError(`Error caught: ${ error }`);
        setTimeout(() => setError(null), 4000);
        console.log('Error caught:', error);
      }
    );
  };

  // const createSnippet = (event) => {
  //   event.preventDefault();
  //   const snippet = text.trim();
  //   if (snippet == '') {
  //     setText('');
  //     setError('Text input invalid...');
  //     setTimeout(() => setError(null), 4000);
  //     return;
  //   }
  //   const newSnippet = {
  //     id: data.length + 1,
  //     message: snippet,
  //     date: {
  //       seconds: Date.now(),
  //       nanoseconds: 0
  //     }
  //   };

  //   axios
  //     .post('/snippets', newSnippet)
  //     .then((response) => {
  //       const updatedState = data.concat(newSnippet);
  //       setData(updatedState);
  //       setText('');
  //     })
  //     .catch((error) => {
  //       setError(`Error caught: ${ error }`);
  //       setText('');
  //       setTimeout(() => setError(null), 4000);
  //       console.log('Error caught:', error);
  //     }
  //   );
  // };

  return (
    <div id="app">
      <Nav
        text={ text }
        textReady={ textReady }
        setText={ setText }
        createSnippet={ createSnippet }
      />
      <Routes>
        <Route
          path='/'
          element={
            <Snippets
              stateReady={ stateReady }
              errorReady={ errorReady }
            />
        } />
        <Route path='/about' element={ <About /> } />
        <Route path='/roadmap' element={ <Roadmap /> } />
      </Routes>
    </div>
  );
};

export default App;
