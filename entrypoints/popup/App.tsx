import { useState } from 'react';
import wxtLogo from '/wxt.svg';
import linkedin from '../popup/linkedin.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const openNewTab = () => {
    const url = 'https://www.linkedin.com/login';
    window.open(url, '_blank');
  };
  return (
    <>
      <div>
        <a href="https://www.linkedin.com" target="_blank">
          <img src={linkedin} className="logo" alt="Linkedin logo" />
        </a>
      </div>
      <h1>Linkedin Autoreply AI</h1>
      <div className="card">
        <button className="button" onClick={openNewTab}>
          Try it now!
        </button>
        {/* <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}
      </div>
      <p className="read-the-docs">
        This extension will help you in generating reply for your linkedin chats, give it a try!
      </p>
    </>
  );
}

export default App;
