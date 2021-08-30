import React from "react";


 class Books extends React.PureComponent {

  state = {
    books: []
  }

  addBook = (e) => {
    e.preventDefault();
    const bookName = document.getElementById('book-input').value;
    const newBook = {
      id: Date.now(),
      title: bookName,
    }
    this.setState({
      books:[...this.state.books, newBook]
    })
  }

  removeBook = (id) => {
    this.setState({
      books: [
        ...this.state.books.filter((book) => book.id !== id)
      ]
    })
  }

render(){
  return (
    <div>
      <form onSubmit={this.addBook}>
        <input type="text" id="book-input"/>
        <button type="button">submit</button>
      </form>
      <ul className='bookUl'>
        {this.state.books.map((book) => (
          <li key={book.id}>
            <p>{book.title}</p>
            <button type="button" onClick={()=>this.removeBook(book.id)}>delete</button>
          </li>
        ))}
      </ul>

    </div>
  );
}
  
}

export default Books;