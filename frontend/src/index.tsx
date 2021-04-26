import './index.css';

// ...

// import { App } from './nodeClient';

// App();

// ...

import React from 'react';
import ReactDOM from 'react-dom';

// import { App } from './hooks';
// import { App } from './useStateImpl';
// import { App } from './debounce';
// import { App } from './useTask';
// import { App } from './dataFetching';
import { App } from './todo';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);