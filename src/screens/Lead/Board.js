import PropTypes from 'prop-types'
import React from 'react';
import {Column} from './Column';
import {DraggableCard} from './Card';

Board.propTypes = {
    cards: PropTypes.object,
    columns: PropTypes.object,
    moveCard: PropTypes.func,
    addCard: PropTypes.func,
    addColumn: PropTypes.func,
}

export function Board({cards, columns, moveCard, addCard, addColumn}) {   

  return (    
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
                    key={card.id}
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
  );
}
