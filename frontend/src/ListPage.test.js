import React from 'react';
import ReactDOM from 'react-dom';
import ListPage from './ListPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
