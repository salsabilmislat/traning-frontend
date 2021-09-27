import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

class Header extends React.Component {

  render() {
    const isAuth = this.props.auth0.isAuthenticated
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        {/* TODO: if the user is logged in, render a navigation link to profile page */}
        {
          isAuth &&
          <NavItem><Link to="/profile" className="nav-link">Profile</Link></NavItem>
        }
        {
          isAuth &&
          <NavItem><Link to="/myfavorite" className="nav-link">My Favorite</Link></NavItem>
        }
        {/* TODO: if the user is logged in, render the `LogoutButton` */}
        {
          isAuth ? <LogoutButton /> : <LoginButton />
        }
      </Navbar>
    )
  }
}

export default withAuth0(Header);
