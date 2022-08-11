/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Items from '../test/Items';

// Snapshot: test that renders the Items component with no items passed
it('renders correctly when there are no items', () => {
  const tree = renderer.create(<Items />).toJSON();
  expect(tree).toMatchSnapshot();
});
