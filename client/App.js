import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/app.css'

const App = () => {

  const [ data, setData ] = useState(null);

  useEffect(() => {
    axios.get('/snippets')
      .then(({ data }) => {
        const { snippets } = data;
        setData(snippets);
      })
      .catch(error => console.log(error));
  }, []);

  const shape = {
    content: "And, when you want something, all the universe conspires in helping you to achieve it...",
    date: {
      seconds: 1649199082,
      nanoseconds: 11000000
    }
  };

  const stateReady = data
    ? data.map()
    : <h1>Loading...</h1>;

  return (
    <div id='app'>
     <header>
       <h1>Graffiti-App</h1>
     </header>
     <nav>
       <div className='nav-links'>
        <a href='#'>Link 1</a>
        <a href='#'>Link 2</a>
        <a href='#'>Link 3</a>
        <a href='#'>Link 4</a>
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
