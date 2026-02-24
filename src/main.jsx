import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const PageFallback = () => (
  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }} aria-live="polite">
    Loading…
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
