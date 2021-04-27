import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app/App'
import reportWebVitals from './tools/report-web-vitals'
import './styles/main-styles.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

reportWebVitals()
