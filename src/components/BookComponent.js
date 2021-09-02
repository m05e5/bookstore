/*eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, removeBook, books } from '../redux/books/books';
const baseUrl = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/D28YguIt5iavwfJAXzyr/books';

const Books = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state.booksReducer.state);
  console.log(state);

  const submitBookToApi = (e) => {
    e.preventDefault();
    console.log('111111111111111111111111'); 
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

    }).then((response) => {
      console.log('222222222222222222222222222222'); 
      console.log(response);
      getBooks();
    });
    document.getElementById('book-input').value = '';
  }

  const removeBook = (id) => {
    console.log('====================================remove');
    fetch(`${baseUrl}/${id}` , {
      method: 'DELETE',
    } ).then((response) => {
        console.log('====================================3');
        console.log(response);
        console.log('====================================4');
        getBooks();
      });
};

  const getBooks = () => {
      fetch(baseUrl).then((data) => {
        data.json().then((dataJson) => {
          console.log('====================================3');
          console.log(dataJson);
          console.log('====================================4');
          return dispatch(books(dataJson));
        }).then((data) =>{
          drawList(data.payload);
          console.log('====================================1');
          setTimeout(() => {
          console.log(data.payload);
          }, 1000);
          console.log('====================================2');

        });
      });
  };

  const drawList = (data) => {
    const bookUl = document.querySelector('.bookUl');
    bookUl.innerHTML = '';
    for(const bok in data) {
      console.log(bok);
      console.log(data[bok][0])
      const li = document.createElement('li');
      li.key = bok;
      const bTitle = document.createElement('p');
      bTitle.innerText = data[bok][0].title;
      li.appendChild(bTitle);
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.onclick = () => {
        console.warn('hello');
        removeBook(bok);
      }
      removeBtn.innerText = 'delete';
      li.appendChild(removeBtn);
      bookUl.appendChild(li);
    }
  }


  return (
    <div>
      <button type="button" onClick={ getBooks }>getBooks</button>
      <form onSubmit={ submitBookToApi }>
        <input type="text" id="book-input" />
        <button type="submit">submit</button>
      </form>
      <ul className="bookUl">
        
      </ul>

    </div>
  );
};

export default Books;
