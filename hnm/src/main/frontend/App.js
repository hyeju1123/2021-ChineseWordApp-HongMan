import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import rootReducer from './src/_modules';
import Root from './src/Root';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const App = () => {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
    
  );
};



export default App;
