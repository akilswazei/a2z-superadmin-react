import PropTypes from 'prop-types'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Column} from './Column';
import {DraggableCard} from './Card';

import { useEffect, useState } from 'react'
import { getPayoutsHistory } from 'src/services/PayoutService'
import ViewLeadPopup from 'src/screens/Lead/ViewLead'

Board.propTypes = {
    cards: PropTypes.object,
    columns: PropTypes.object,
    moveCard: PropTypes.func,
    addCard: PropTypes.func,
    addColumn: PropTypes.func,
    lead_obj: PropTypes.object,
}

const style = {
    position: 'absolute',
    top:'50%',
    left: '33%',
    transform: 'translate(-30%, -50%)',
    width: '90%',
    bgcolor: '#f5f5f5',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflow:'scroll',
    height:'800px',
}  

export function Board({cards, columns, moveCard, addCard, addColumn,lead_obj}) { 

    const getState = useSelector((state) => state)
    const {
        userSignin: { userInfo },
    } = getState
  
  const [openHistoryPayout, setHistoryPayout] = useState(false)
  const [eidNum, setEidNum] = useState('')

  const captureId = (cellValue) => {
    setEidNum(cellValue)
  }

  const handleHistoryClose = () => setHistoryPayout(false)
  const handleHistoryOpen = (cellValue, e) => {    
    captureId(cellValue)
    setHistoryPayout(true)
  }

  return (   

     <>     
     
     <ViewLeadPopup
        openHistoryPayout={openHistoryPayout}
        handleHistoryClose={handleHistoryClose}        
        style={style}
        eidNum = {eidNum}
      />

    <div className="Board">      
        {columns.map(column => (
            <Column
              key={column.id}
              title={column.title}
              cardtotal={column.cardIds.length}              
              addCard={addCard.bind(null, column.id)}
            >
                {column.cardIds
                    .map(cardId => cards.find(card => card.id === cardId))
                    .map((card, index) => (
                      <DraggableCard
                        key={index}
                        id={card.id}
                        columnId={column.id}
                        columnIndex={index}
                        title={card.title}
                        desc={card.desc}
                        email={card.email}
                        phone={card.phone}                    
                        lead_date={card.lead_date}
                        current_column_id={column.id}
                        moveCard={moveCard}    
                        handleHistoryOpen = {handleHistoryOpen}                
                      />
                ))}
                {column.cardIds.length === 0 && (
                    <DraggableCard
                      isSpacer
                      moveCard={cardId => moveCard(cardId, column.id, 0)}                  
                    />
                )}
            </Column>
          ))}

      {/*<div className="Column">
        <TextForm onSubmit={addColumn} placeholder="Add Column..." />
      </div>*/}
    </div>
    </>
  );
}