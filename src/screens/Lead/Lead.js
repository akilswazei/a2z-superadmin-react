import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {Board} from 'src/Board';
import MainBoard from 'src/components/include/MainBoard'
import { Container, createStyles } from '@material-ui/core'


let _columnId = 0;
let _cardId = 0;

const initialCards = Array.from({length: 9}).map(() => ({
  id: ++_cardId,
  title: `Card ${_cardId}`,
}));

const initialColumns = ['New', 'Contacted', 'Proposal Sent', 'Proposal Sent'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: initialCards.slice(i * 4, i * 4 + 4).map(card => card.id),
}));

class Lead extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
  };

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

  moveCard = (cardId, destColumnId, index) => {
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
        <Container fluid>
            <Container className="p-0 mt-4">
            <h6 className="p-0">A2Z Leads</h6>
            </Container>
            <Container className="background-white-theme custom-container-white">
                <div style={{ height: '100vh', width: '100%',overflow:'y' }} className="py-2">
  

                  <Board
                    cards={this.state.cards}
                    columns={this.state.columns}
                    moveCard={this.moveCard}
                    addCard={this.addCard}
                    addColumn={this.addColumn}
                  />
             </div>
            </Container>
        </Container>
        </MainBoard>
        </>    

    );
  }
}

export default DragDropContext(HTML5Backend)(Lead);
