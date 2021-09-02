/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { books } from '../redux/books/books';

const baseUrl = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/D28YguIt5iavwfJAXzyr/books';

const Books = () => {
  const removeBook = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    }).then(() => {
      // eslint-disable-next-line no-use-before-define
      getBooks();
    });
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => state.booksReducer.state);
  const drawList = (data) => {
    const bookUl = document.querySelector('.bookUl');
    bookUl.innerHTML = '';
    // eslint-disable-next-line guard-for-in
    for (const bok in data) {
      const li = document.createElement('li');
      li.key = bok;
      const bTitle = document.createElement('p');
      bTitle.innerText = data[bok][0].title;
      li.appendChild(bTitle);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.onclick = () => {
        removeBook(bok);
      };
      removeBtn.innerText = 'delete';
      li.appendChild(removeBtn);
      bookUl.appendChild(li);
    }
  };

  const getBooks = () => {
    fetch(baseUrl).then((data) => {
      data.json().then((dataJson) => dispatch(books(dataJson))).then((data) => {
        drawList(data.payload);
      });
    });
  };

  useEffect(() => {
    getBooks();
    drawList(state);
  }, []);

  const submitBookToApi = (e) => {
    e.preventDefault();
    const bookName = document.getElementById('book-input').value;
    const newBook = {
      item_id: Date.now(),
      title: bookName,
      category: 'moses',
    };
    fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    }).then(() => {
      getBooks();
    });
    document.getElementById('book-input').value = '';
  };

  return (
    <div>
      <button type="button" onClick={getBooks}>getBooks</button>
      <form onSubmit={submitBookToApi}>
        <input type="text" id="book-input" />
        <button type="submit">submit</button>
      </form>
      <ul className="bookUl" />

    </div>
  );
};

export default Books;
