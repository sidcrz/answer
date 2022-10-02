import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(Boolean(index))}
    >
      {text}
    </li>
  );
};
WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({items}) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(true);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(Boolean(index));

    console.log("Index Value: "+index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
          key={index}
        />
      ))}
    </ul>
  )
};

WrappedListComponent.propTypes = {

    //It should be arrayOf instead of shapeOf
    
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),
};
//Definitions of items is null in WrappedListComponent.defaultProps. It will not be mapped otherwise

WrappedListComponent.defaultProps = {
  items: null,
};
const List = memo(WrappedListComponent);

export default List;
