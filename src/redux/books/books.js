const ADD_BOOK = 'bookstore/books/addBook';
const REMOVE_BOOK = 'bookstore/books/REMOVE_BOOK';
const GET_BOOKS = 'bookstore/books/GET_BOOKS';

const initialState = [];

export const books = (payload) => ({
  type: GET_BOOKS,
  payload,
});

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
    case GET_BOOKS:
      return { state: action.payload };
    case ADD_BOOK:
      return { state: [...state.state, action.payload] };
    case REMOVE_BOOK:
      return { state: action.payload };
    default:
      return { state };
  }
};

export default reducer;
