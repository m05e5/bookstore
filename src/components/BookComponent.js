import React from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook } from '../redux/books/books';

const Books = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.booksReducer.state);

  const submitBookToSTore = (e) => {
    e.preventDefault();
    const bookName = document.getElementById('book-input').value;
    const newBook = {
      id: Date.now(),
      title: bookName,
      author: 'moses',
    };
    dispatch(addBook(newBook));
    document.getElementById('book-input').value = '';
  };

  const removeBookFromSTore = (id) => {
    dispatch(removeBook(id));
  };

  return (
    <div>
      <form onSubmit={submitBookToSTore}>
        <input type="text" id="book-input" />
        <button type="button">submit</button>
      </form>
      <ul className="bookUl">
        {state.map((book) => (
          <li key={book.id}>
            <p>{book.title}</p>
            <button type="button" onClick={() => removeBookFromSTore(book.id)}>delete</button>
          </li>
        ))}
        {/* <li>sdfsdfsdf</li>  */}
      </ul>

    </div>
  );
};

export default Books;
