import * as React from 'react'

import {Component} from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {Board} from 'src/screens/Lead/Board';
import MainBoard from 'src/components/include/MainBoard'
import { Container, createStyles } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { AddLeadPopup } from 'src/screens/Lead/AddLeadPopup'
import serialize from "form-serialize";
import { getLeads } from 'src/services/LeadServices'

let _columnId = 0;
let _cardId = 0;

// ST - Modal
const triggerText = 'Add Lead';
const onSubmit = (event) => {
    event.preventDefault(event);

    const fieldData = serialize(event.target, { hash: true });
    const {
      name,      
      email      
    } = fieldData;
    // console.log(fieldData);
    /*alert(
      `
        Hello ${name} !\r\n
        email: ${email}\r\n
        Thanks!
      `
    );*/        
    // console.log(event.target.name.value);
    // console.log(event.target.email.value);
};
// EN - Modal

const handleDragEnd = (event) => {
    console.log("Stop");
};

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

console.log("userInfo: " + JSON.stringify(userInfo));

class Lead extends Component {    

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            columns: [],
            leads:  [],
            newcolumn:  [],
            newcard: ''
        };
    }

    getLeads = async () => {        

        let leads = await getLeads(userInfo);        

        this.setState(state => ({
            newcolumn: [...state.newcolumn, leads.columns],
        }));

        this.setState(state => ({
            newcard: [...state.newcard, leads.cards],
        }));

        this.setState({ cards: this.state.newcard[0] })
        this.setState({ columns: this.state.newcolumn[0] })
    }
    
    componentDidMount() {
        this.getLeads(); // function call
    }
  

  addColumn = _title => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: [],
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCard = (columnId, _title) => {
    const title = _title.trim();
    if (!title) return;

    const newCard = {id: ++_cardId, title};
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? {...column, cardIds: [...column.cardIds, newCard.id]}
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index, current_column_id) => {
    console.log("destColumnId: " + destColumnId + " current_column_id: " + current_column_id);

    this.setState(state => ({
      columns: state.columns.map(column => ({
        ...column,
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),        
      })),      
    }));

    

  };

  render() {
    return (
       <>
        <MainBoard>
            <div className="p-2">
                
                <div className=" p-0 mt-4">
                    <h6 className="p-0">A2Z Leads</h6>
                </div>
                <div className=" background-white-theme custom-container-white">
                    <div className="justify-flex-end input-div">
                        <button className="custom-blue-btn m-2">
                            Export Lead<span></span>
                        </button>
                        <AddLeadPopup triggerText={triggerText} onSubmit={onSubmit} />
                    </div>
                    <hr></hr>
                    <div style={{ height: '100vh', width: '100%',overflow:'y' }} className="py-2">
                        <Board
                            cards={this.state.cards}
                            columns={this.state.columns}
                            moveCard={this.moveCard}
                            addCard={this.addCard}
                            addColumn={this.addColumn}                            
                        />
                    </div>
                </div>
            </div>
        </MainBoard>
        </>
    );
  }
}
export default DragDropContext(HTML5Backend)(Lead);