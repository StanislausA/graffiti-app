import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ text, textReady, setText, createSnippet }) => {

  return (
      <div className="header-nav">
        <header>
          <Link to='/'>graffiti</Link>
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
            <Link to='/about'>About</Link>
            <Link to='/roadmap'>Roadmap</Link>
          </div>
        </nav>
      </div>
  );
}

export default Nav;
