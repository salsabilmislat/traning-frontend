import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import AllData from './components/AllData';
import MyFavorite from './components/MyFavorite';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    const isAuth = this.props.auth0.isAuthenticated
    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {isAuth ? <AllData /> : <Login />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/myfavorite">
              {isAuth &&
                <MyFavorite />
              }

            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
