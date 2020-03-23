import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => (
  <div>App</div>
);

const render = process.env.NODE_SSR ? 'hydrate' : 'render';

ReactDOM[render](
  <App />,
  document.getElementById('root')
);
