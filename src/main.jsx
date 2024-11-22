// main.tsx or main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import App from './App'
import './index.css'
import 'react-quill/dist/quill.snow.css';

import { BrowserRouter } from "react-router-dom";
import store from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <NextUIProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </NextUIProvider>
    </React.StrictMode></BrowserRouter>,
)