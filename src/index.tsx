import React from 'react';
import ReactDOM from 'react-dom';

import store from './_redux';
import { AppContainer } from './app/components/Root';
import { ReflexProvider } from '@reflexio/react-v1/lib/ReflexProvider';
import './_styles/index.less';

const Application = () => (
  <ReflexProvider store={store}>
    <AppContainer />
  </ReflexProvider>
);

ReactDOM.render(<Application />, document.getElementById('app'));