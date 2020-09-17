import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Item extends Component {
  render() {
    return (
      <div>

      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.object.isRequired
  })
};

export default Item;
