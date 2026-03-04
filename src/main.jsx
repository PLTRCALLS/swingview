import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global reset styles
const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0a0f0d;
    color: #f0f5f2;
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    font-family: inherit;
  }
  
  img, video {
    max-width: 100%;
    display: block;
  }

  /* Hide scrollbar but keep functionality */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  /* Selection color */
  ::selection {
    background: rgba(62, 207, 142, 0.3);
    color: #f0f5f2;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
