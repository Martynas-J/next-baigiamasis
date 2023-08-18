import React from 'react';
import PropTypes from 'prop-types';
import Loading from '@/app/loading';

const ListContainer = ({ ListItem, items, onDelete }) => {
  if (!items) {
    return <Loading />;
  }
  if (items.length === 0) {
    return <h2>No data</h2>;
  }
  return (
    <>
      {items.map(item => (
        <ListItem key={item._id} data={item} onDelete={onDelete} />
      ))}
    </>
  );
};

ListContainer.propTypes = {
  ListItem: PropTypes.elementType.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
};

export default ListContainer;
