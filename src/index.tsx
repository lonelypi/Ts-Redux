import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
//npx concurrently -k "json-server --watch json-server/db.json --port 3001" "npm start"