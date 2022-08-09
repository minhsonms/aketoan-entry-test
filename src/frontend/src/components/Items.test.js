import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('Jest Snapshot testing suite', () => {
  it('Matches DOM Snapshot', () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
