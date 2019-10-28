import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook, removeBook, changeCurrent } from './redux';
import './App.css';

import BookInfo from './BookInfo';

export class App extends Component {
  render() {
    const l = this.props.library.books.length + 1;

    return (
      <div className='clearfix'>
        <h1>Library</h1>
        <button
          className='add-book'
          onClick={() => this.props.addBook({ id: l - 1, name: `Name${l}`, desc: 'Description' })}
        >
          Add book
        </button>
        <div className='panel'>
          {this.props.library.books.map((item, index) => {
            return (
              <div className='book clearfix' key={index}>
                <p onClick={() => this.props.changeCurrent(item.id)}>Book: "{item.name}"</p>
                <button onClick={() => this.props.removeBook(item.id)}>Remove</button>
              </div>
            );
          })}
        </div>
        <div className='panel'>{this.props.library.currentBook >= 0 ? <BookInfo /> : null}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  library: state.library
});

const mapDispatchToProps = {
  addBook,
  removeBook,
  changeCurrent
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
