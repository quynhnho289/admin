import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import appReducers from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
  appReducers,
  compose(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

