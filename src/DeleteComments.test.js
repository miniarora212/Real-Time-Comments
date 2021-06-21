import React from 'react';
import { render } from 'react-testing-library'
import DeleteComments from './DeleteComments';
import { Api } from './api';

describe('DeleteComments', () => {
  describe('when comments do not exist', () => {
    it('does not display the delete comments button', () => {
      const wrapper = render(<DeleteComments />);
      expect(wrapper.getByTestId('deletecomments').textContent).toBe('Sorry, no comments found!')
    });
  });
});
