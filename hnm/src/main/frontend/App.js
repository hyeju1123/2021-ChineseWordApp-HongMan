import React from 'react';

import { Provider } from 'react-redux';
import Root from './src/Root';
import { store } from './src/_modules/store';
import { Text } from 'react-native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const App = () => {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
    
  );
};



export default App;
