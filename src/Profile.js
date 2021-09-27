import { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card'
class Profile extends Component {

  render() {
    /* TODO: render information about logged in user */
    const user=this.props.auth0.user
    /* STRETCH TODO: if no logged in user then redirect home */
    return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={user.picture} />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
};

export default withAuth0(Profile);
