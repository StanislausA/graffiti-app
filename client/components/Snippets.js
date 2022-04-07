import React from 'react';

const Snippets = ({ stateReady, errorReady }) => {

  return (
      <main>
        <div className="snippet-cards">
          { stateReady() }
        </div>
        { errorReady }
      </main>
  );
}

export default Snippets;
