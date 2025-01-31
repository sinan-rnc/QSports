import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import "remixicon/fonts/remixicon.css";
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { Provider } from "react-redux"
import configureStore from './Store/configureStore';

const store = configureStore()
console.log(store.getState())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
