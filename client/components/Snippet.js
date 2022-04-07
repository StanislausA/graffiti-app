import React from 'react';

const Snippet = ({ content, date }) => {
  const readableDate = new Date(date * 1000).toLocaleDateString();

  return (
    <div className='snippet-card'>
      <p className='snippet-date'>
        <time dateTime={ readableDate }>{ readableDate }</time>
      </p>
      <p className='snippet-content'>
        { content }
      </p>
    </div>
  );
}

export default Snippet;
