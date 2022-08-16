import PropTypes from 'prop-types'
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
import { connect } from 'react-redux';
import { getLeads, setColumnToLead } from 'src/redux/actions/LeadActions'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button';

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
};
// EN - Modal

const mapStateToProps = state => ({
    userSignin: state.userSignin,
    leads: state.leads
});
const mapDispatchToProps = () => ({
    setColumnToLead
});

class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.leads.cards,
            columns: this.props.leads.columns,
            newcolumn:  [],
            newcard: ''
        };
    }
        
    componentDidMount() {
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

    moveCard = (cardId, destColumnId, index, current_column_id,is_dropped) => {
        // console.log("destColumnId: " + destColumnId + " current_column_id: " + current_column_id);        
        // console.log("moveCard " , this.props.leads.leads.columns);    

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

        if(is_dropped) {
            let response = this.props.setColumnToLead(cardId,destColumnId)            
        }      
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

                    {this.props.leads?.cards && (
                        <Board
                            cards={this.props.leads.cards}
                            columns={this.state.columns}
                            moveCard={this.moveCard}
                            addCard={this.addCard}
                            addColumn={this.addColumn}                            
                        />
                    )}
                    
                    </div>
                </div>
            </div>
        </MainBoard>
        </>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps())(DragDropContext(HTML5Backend)(Lead));

Lead.propTypes = {
    userSignin: PropTypes.object,
    leads: PropTypes.object,
    setColumnToLead : PropTypes.func
    /*leadData: PropTypes.object, */
}