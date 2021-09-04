import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './app.css';
import Books from './components/BookComponent';
import Categories from './redux/categories/categories';
import Header from './components/Header';
import store from './redux/configureStore';

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
              <Provider store={store}>
                <Books />
              </Provider>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
