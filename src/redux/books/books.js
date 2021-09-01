/* eslint-disable no-case-declarations */
const ADD_BOOK = 'bookstore/books/addBook';
const REMOVE_BOOK = 'bookstore/books/REMOVE_BOOK';

const initialState = [
  {
    id: 1,
    title: 'Isekai wa maho',
    author: 'moses',
  },
  {
    id: 2,
    title: 'Nanatsu no hero',
    author: 'moses',
  },
];

export const addBook = (payload) => ({
  type: ADD_BOOK,
  payload,
});

export const removeBook = (payload) => ({
  type: REMOVE_BOOK,
  payload,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { state: [...state.state, action.payload] };
    case REMOVE_BOOK:
      return { state: [...state.state.filter((book) => book.id !== action.payload)] };
    default:
      return { state };
  }
};

export default reducer;
