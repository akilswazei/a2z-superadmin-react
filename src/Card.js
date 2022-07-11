import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import cn from 'classnames';
import _ from 'lodash';

export function Card(props) {
  return _.flowRight(props.connectDragSource, props.connectDropTarget)(
    <div
      className={cn('Card', {
        'Card--dragging': props.isDragging,
        'Card--spacer': props.isSpacer,
      })}
    >
      {/*<div className="Card__title">{props.title}</div>*/}
      <div className="Card_priority_low">Low</div>
      <div className="name_and_dropdown">
          <div className="Card_title">Pourl D. Austin</div>
          <div className="Card_dropdown">...</div>
      </div>
      <div className="Card_sub_title">A & B market plus, inc</div>
      <div className="Card_email"><i className="fa fa-envelope" aria-hidden="true"></i>Swazie@gmail.com</div>
      <div className="Card_number"><i className="fa fa-mobile" aria-hidden="true"></i>407-250-3520</div>
      <div className="Card_user">As</div>
      <div className="Card_time">Apr 8,2021</div>
    </div>
  );
}

export const DraggableCard = _.flowRight([
  DropTarget(
    'Card',
    {
      hover(props, monitor) {
        const {columnId, columnIndex} = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
          props.moveCard(draggingItem.id, columnId, columnIndex);
        }
      },
    },
    connect => ({
      connectDropTarget: connect.dropTarget(),
    })
  ),
  DragSource(
    'Card',
    {
      beginDrag(props) {
        return {id: props.id};
      },

      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  ),
])(Card);