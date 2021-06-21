import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library'
import App from './App';

describe('App', () => {
  it('renders correctly', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('Comments form exits', () => {
    it('contains a form to post comments', () => {
      const wrapper = render(<App />);
      expect(wrapper.queryByTestId('postcomments')).toBeTruthy()
    });
  });
});
