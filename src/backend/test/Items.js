import React from 'react';
import PropTypes from 'prop-types';

function Items(props) {
  const { items = [] } = props;

  // A single item in the list, render a span.
  if (items.length === 1) {
    return <span className="item-message">{items[0]}</span>;
  }

  // Multiple items on the list, render a list.
  if (items.length > 1) {
    return (
      <ul>
        {items.map(item => (
          <li key={item} className="item-message">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  // No items on the list, render an empty message.
  return <span className="empty-message">No items in list</span>;
}

Items.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array,
};

Items.defaultProps = {
  items: [],
};

export default Items;
