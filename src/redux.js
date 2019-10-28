import { combineReducers, createStore } from 'redux';
import { ADD_BOOK, REMOVE_BOOK, CHANGE_CURRENT, CHANGE_BOOK, CHANGE_TITLE, CHANGE_DESC } from './constants';

const initialState = {
  library: {
    books: [
      {
        id: 0,
        name: 'Name1',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        id: 1,
        name: 'Name2',
        desc:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ],
    currentBook: -1,
    editableBook: { id: -1, name: '', desc: '' }
  }
};

// actions.js
export const addBook = book => ({
  type: ADD_BOOK,
  book
});

export const removeBook = id => ({
  type: REMOVE_BOOK,
  id
});

export const changeCurrent = id => ({
  type: CHANGE_CURRENT,
  id
});

export const changeBook = () => ({
  type: CHANGE_BOOK
});

export const changeTitle = title => ({
  type: CHANGE_TITLE,
  title
});

export const changeDesc = desc => ({
  type: CHANGE_DESC,
  desc
});

// reducers.js
export const library = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.book]
      };
    case REMOVE_BOOK:
      const books = [...state.books];
      let currentBook = state.currentBook === action.id ? -1 : state.currentBook;
      books.splice(books.findIndex(item => item.id === action.id), 1);
      return {
        ...state,
        books,
        currentBook
      };
    case CHANGE_CURRENT:
      const editableBook = { ...state.books[state.books.findIndex(item => item.id === action.id)] };

      return { ...state, currentBook: action.id, editableBook };
    case CHANGE_BOOK:
      const newBooks = [...state.books];
      newBooks[newBooks.findIndex(item => item.id === state.editableBook.id)] = state.editableBook;
      return {
        ...state,
        books: newBooks
      };
    case CHANGE_TITLE:
      return {
        ...state,
        editableBook: { ...state.editableBook, name: action.title }
      };
    case CHANGE_DESC:
      return {
        ...state,
        editableBook: { ...state.editableBook, desc: action.desc }
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  library
});

// store.js
export function configureStore() {
  const store = createStore(reducers, initialState);
  return store;
}

export const store = configureStore();
