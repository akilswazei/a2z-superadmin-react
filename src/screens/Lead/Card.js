import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import cn from 'classnames';
import _ from 'lodash';
import { leadUpdateStatus } from 'src/services/LeadServices'
import { useNavigate } from 'react-router-dom'

export function Card(props) {

    const navigate = useNavigate()

    //navigating to lead view page
    function navigateFunction(lead_id) {
        navigate('/leads/view-lead/'+lead_id)
    }
    
  // console.log(props);
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
          <div className="Card_title"><span onClick={(e) => props.handleHistoryOpen(props.id, e)} style={{ cursor: 'pointer' }}>{props.title}</span></div>
          <div className="Card_dropdown">...</div>
      </div>
      <div className="Card_sub_title">{props.desc}</div>
      <div className="Card_email"><i className="fa fa-envelope" aria-hidden="true"></i>{props.email}</div>
      <div className="Card_number"><i className="fa fa-mobile" aria-hidden="true"></i>{props.phone}</div>
      <div className="Card_user">As - {props.current_column_id}</div>
      <div className="Card_time">{props.lead_date}</div>
    </div>
  );
}



const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const DraggableCard = _.flowRight([
  DropTarget(
    'Card',
    {
      hover(props, monitor) {
        const {columnId, columnIndex} = props;
        const draggingItem = monitor.getItem();
        if (draggingItem.id !== props.id) {
            props.moveCard(draggingItem.id, columnId, columnIndex, draggingItem.current_column_id);
        }
      },

      drop(props, monitor) {

        const {columnId, columnIndex} = props;
        const draggingItem = monitor.getItem();

        // console.log("Card ID: " + draggingItem.id +  " Lead Old Status --- "  + draggingItem.current_column_id + " Lead New Status --- " + columnId)
        // console.log("userInfo" + userInfo.data.user.name)
        
        const lead_arr = {
            "card_id" : draggingItem.id,
            "lead_new_status" : columnId,
            "lead_old_status" : draggingItem.current_column_id,
            "userinfo" : userInfo
        }

        let response = leadUpdateStatus(userInfo, lead_arr)
          
        if (response.data && Object.keys(response.data).length != 0) {
            
        } else {

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
        return {id: props.id,current_column_id: props.current_column_id};
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
