import React, { Component } from "react";
import List from "./List";
import "./App.css";

class App extends Component {
  state = {
    lists: [
      {
        id: "1",
        header: "First list",
        cardIds: ["a", "b", "c"]
      },
      {
        id: "2",
        header: "Second list",
        cardIds: ["d", "e", "f"]
      },
      {
        id: "3",
        header: "Third list",
        cardIds: ["g", "h", "i"]
      },
      {
        id: "4",
        header: "Fourth list",
        cardIds: ["j", "k", "l", "m"]
      }
    ],
    allCards: {
      a: { id: "a", title: "First card", content: "lorem ipsum" },
      b: { id: "b", title: "Second card", content: "lorem ipsum" },
      c: { id: "c", title: "Third card", content: "lorem ipsum" },
      d: { id: "d", title: "Fourth card", content: "lorem ipsum" },
      e: { id: "e", title: "Fifth card", content: "lorem ipsum" },
      f: { id: "f", title: "Sixth card", content: "lorem ipsum" },
      g: { id: "g", title: "Seventh card", content: "lorem ipsum" },
      h: { id: "h", title: "Eighth card", content: "lorem ipsum" },
      i: { id: "i", title: "Ninth card", content: "lorem ipsum" },
      j: { id: "j", title: "Tenth card", content: "lorem ipsum" },
      k: { id: "k", title: "Eleventh card", content: "lorem ipsum" },
      l: { id: "l", title: "Twelfth card", content: "lorem ipsum" },
      m: { id: "m", title: "Thirteenth card", content: "lorem ipsum" }
    }
  };

  handleDeleteCard = cardId => {
    const { lists, allCards } = this.state;

    const newLists = lists.map(list => ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));

    const newCards = this.omit(allCards, cardId);

    this.setState({
      lists: newLists,
      allCards: newCards
    });
  };

  handleAddCard = listId => {
    const newCard = this.newRandomCard();

    const newLists = this.state.lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id]
        };
      }
      return list;
    });

    this.setState({
      lists: newLists,
      allCards: {
        ...this.state.allCards,
        [newCard.id]: newCard
      }
    });
  };

  newRandomCard() {
    const id =
      Math.random()
        .toString(36)
        .substring(2, 4) +
      Math.random()
        .toString(36)
        .substring(2, 4);
    return {
      id,
      title: `Random Card ${id}`,
      content: "lorem ipsum"
    };
  }

  omit(obj, keyToOmit) {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
        key === keyToOmit ? newObj : { ...newObj, [key]: value },
      {}
    );
  }

  render() {
    const { lists, allCards } = this.state;
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => allCards[id])}
              addCard={listId => this.handleAddCard(listId)}
              deleteCard={cardId => this.handleDeleteCard(cardId)}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
