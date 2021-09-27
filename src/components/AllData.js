import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
export class AllData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: []
        }
    }
    componentDidMount = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/allData`).then(allDataResponse => {
            this.setState({
                allData: allDataResponse.data
            });
            // console.log(allDataResponse.data);
        })
    }
    handelAddToFav = (choco) => {
        const dataForFav = {
            title: choco.title,
            imageUrl: choco.imageUrl,
            email: this.props.auth0.user.email
        }
        axios.post(`${process.env.REACT_APP_API_URL}/chocolate`, dataForFav)
    }

    render() {
        return (
            <div>
                {this.state.allData.length > 0 &&
                    this.state.allData.map(choco => {
                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Img variant="top" src={choco.imageUrl} />
                                    <Card.Title>{choco.title}</Card.Title>
                                    <Button variant="danger" onClick={() => { this.handelAddToFav(choco) }}>ADD TO Favorite</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default withAuth0(AllData)
