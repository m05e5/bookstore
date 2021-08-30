/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React from 'react';

class Books extends React.PureComponent {
  state = {
    bookList: [
      {
        id: 1,
        title: 'Pinokio',
      },
      {
        id: 2,
        title: 'the lion King',
      },
      {
        id: 3,
        title: 'the stork of darkness',
      },
    ],
  }

  addBook = (e) => {
    e.preventDefault();
    const bookName = document.getElementById('book-input').value;
    const newBook = {
      id: Date.now(),
      title: bookName,
    };
    this.setState({
      bookList: [...this.state.bookList, newBook],
    });
  }

  removeBook = (id) => {
    this.setState({
      bookList: [
        ...this.state.bookList.filter((book) => book.id !== id),
      ],
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addBook}>
          <input type="text" id="book-input" />
          <button type="button">submit</button>
        </form>
        <ul className="bookUl">
          {this.state.bookList.map((book) => (
            <li key={book.id}>
              <p>{book.title}</p>
              <button type="button" onClick={() => this.removeBook(book.id)}>delete</button>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default Books;
