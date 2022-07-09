import PropTypes from 'prop-types'
import React from 'react';

Column.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    addCard: PropTypes.func,
    cardtotal: PropTypes.number
}

export function Column(props) {
  console.log("Length: " + props.children);
  return (

    <div className="Column col-md-4">
        <div className="title_main">
          <div className="Column__title">{props.title}</div>
          <div className="Column_count">{props.cardtotal}</div>
          <div className="Column_add">+</div>
        </div>
          {props.children}
    </div>
  );
}
