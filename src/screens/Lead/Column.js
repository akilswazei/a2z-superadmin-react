import PropTypes from 'prop-types'
import React from 'react';

Column.propTypes = {
    title: PropTypes.string,
    children: PropTypes.string,
    addCard: PropTypes.string    
}

export function Column(props) {
  return (
    <div className="Column col-md-4">
        <div className="title_main">
          <div className="Column__title">{props.title}</div>
          <div className="Column_count">300</div>
          <div className="Column_add">+</div>
        </div>
          {props.children}
    </div>
  );
}
