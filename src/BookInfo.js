import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrent, changeBook, changeTitle, changeDesc } from './redux';

export class BookInfo extends Component {
  render() {
    const currentBook = this.props.library.editableBook;

    return (
      <form
        className='book-info'
        onSubmit={event => {
          event.preventDefault();
          this.props.changeBook();
          this.props.changeCurrent(-1);
        }}
      >
        <input
          className='book-title'
          type='text'
          value={currentBook.name}
          onChange={event => this.props.changeTitle(event.target.value)}
        />
        <textarea
          className='description'
          value={currentBook.desc}
          onChange={event => this.props.changeDesc(event.target.value)}
        />
        <button onClick={() => this.props.changeCurrent(-1)}>Cancel</button>
        <button type='submit'>Save</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  library: state.library
});

const mapDispatchToProps = {
  changeCurrent,
  changeBook,
  changeTitle,
  changeDesc
};

const BookInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BookInfo);

export default BookInfoContainer;
