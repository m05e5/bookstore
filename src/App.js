import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Books from './redux/books/books';
import Categories from './redux/categories/categories'
import Header from './components/Header';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
            <Switch>
              <Route path="/categories">
                <Categories />
              </Route>
              <Route path="/">
                <Books />
              </Route>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
