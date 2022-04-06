import React from 'react';
import './styles/app.css'

const App = () => {


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
         
       </div>
     </main>
    </div>
  );
}

export default App;
