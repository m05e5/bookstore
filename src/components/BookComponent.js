/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { books } from '../redux/books/books';
import styles from './BookComponent.module.css';

const baseUrl = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/D28YguIt5iavwfJAXzyr/books';

const Books = () => {
  const removeBook = (id) => {
    const x = document.getElementById('toast');
    x.className = 'show';
    setTimeout(() => { x.className = x.className.replace('show', ''); }, 4000);
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
      li.classList.add('li');
      const bDetails = document.createElement('div');
      bDetails.classList.add('bookDiv');
      const bCategory = document.createElement('p');
      bCategory.innerText = data[bok][0].category;
      bCategory.classList.add(styles.text);
      bDetails.appendChild(bCategory);
      const bTitle = document.createElement('h2');
      bTitle.classList.add(styles.bookName);
      bTitle.innerText = data[bok][0].title;
      bDetails.appendChild(bTitle);
      const bAuthor = document.createElement('p');
      bAuthor.classList.add(styles.text);
      bAuthor.style.color = '#4386bf';
      bAuthor.innerText = 'John Doe';
      bDetails.appendChild(bAuthor);
      const btnsDiv = document.createElement('div');
      btnsDiv.classList.add('btnsDiv');
      const commentBtn = document.createElement('button');
      commentBtn.type = 'button';
      commentBtn.classList.add(styles.bookBtns);
      commentBtn.innerText = 'Comments';
      btnsDiv.appendChild(commentBtn);

      const vLine1 = document.createElement('p');
      vLine1.innerText = '|';
      vLine1.classList.add('vLine');
      btnsDiv.appendChild(vLine1);

      const removeBtn = document.createElement('button');
      removeBtn.classList.add(styles.bookBtns);
      removeBtn.type = 'button';
      removeBtn.onclick = () => {
        removeBook(bok);
      };
      removeBtn.innerText = 'Remove';
      btnsDiv.appendChild(removeBtn);

      const vLine2 = document.createElement('p');
      vLine2.innerText = '|';
      vLine2.classList.add('vLine');
      btnsDiv.appendChild(vLine2);

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.innerText = 'Edit';
      editBtn.classList.add(styles.bookBtns);
      btnsDiv.appendChild(editBtn);
      bDetails.appendChild(btnsDiv);
      li.appendChild(bDetails);

      const bProgress = document.createElement('div');
      bProgress.classList.add('bProgress');
      bProgress.innerHTML = `
      <div class='progresss'>
        <div class='circularProgress'>
        </div>
        <div class='pers-completed'>
          <p class='percentageProgress'>25%</p>
          <p class="chapterText1">Completed</p>
        </div>
      </div>
      <div class='divider'></div>
      <div class='chapterProgress'>
        <p class='chapterText1'>Current Chapter</p>
        <p class='chapterText2'>Chapter 2</p>
        <button type='button' class='blueBtns'>UPDATE PROGRESS</button>
      </div>
      `;
      li.appendChild(bProgress);

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
    const x = document.getElementById('toast');
    x.className = 'show';
    setTimeout(() => { x.className = x.className.replace('show', ''); }, 4000);
    const bookName = document.getElementById('book-input').value;
    const catSelected = document.getElementById('categories').value;
    const newBook = {
      item_id: Date.now(),
      title: bookName,
      category: catSelected,
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
      {/* <button type="button" onClick={getBooks}>getBooks</button> */}

      <ul className="bookUl" />
      <div className="line" />
      <form onSubmit={submitBookToApi} className="bookForm">
        <input type="text" placeholder="Book title" id="book-input" className="book-input" />
        <select name="categories" id="categories" className="category-input">
          <option value="">Category</option>
          <option value="Comedy">Comedy</option>
          <option value="Action">Action</option>
          <option value="Romance">Romance</option>
          <option value="Drame">Drame</option>
        </select>
        <button type="submit" className="submitBtn blueBtns">ADD BOOK</button>
      </form>
      <div id="toast">Please wait...</div>
    </div>
  );
};

export default Books;
