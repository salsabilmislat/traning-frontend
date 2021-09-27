import React, { Component } from 'react'
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateForm from './UpdateForm';

export class MyFavorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favData: [],
            showUpdateModel: false,
            chocoSelectedData: {}
        }
    }

    componentDidMount = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/chocolate?email=${this.props.auth0.user.email}`).then(favDataResponse => {
            this.setState({
                favData: favDataResponse.data
            });
            console.log(favDataResponse.data);
        })
    }

    handelDeletechoco = (chocoId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/chocolate/${chocoId}`).then(deletedDataResponse => {
            if (deletedDataResponse.data.deletedCount === 1) {
                const newChocoArray = this.state.favData.filter(choco => choco._id !== chocoId)
                this.setState({ favData: newChocoArray })
            }
        })

    }

    handelDesplayUpdateModel = (choco) => {
        this.setState({
            showUpdateModel: !this.state.showUpdateModel,
            chocoSelectedData: choco
        })
    }
    handelUpdateData = (e) => {
        e.preventDefault();
        const responseBody = {
            title: e.target.title.value,
            imageUrl: e.target.ImageURl.value,
            email: e.target.userEmail.value
        }
        axios.put(`${process.env.REACT_APP_API_URL}/chocolate/${this.state.chocoSelectedData._id}`, responseBody).then(updateDataResponse => {
            const updateArray = this.state.favData.map(choco => {
                if (this.state.chocoSelectedData._id === choco._id) {
                    choco = updateDataResponse.data
                    return choco
                }
                return choco
            })
            this.setState({
                favData: updateArray,
                chocoSelectedData: {}
            })
            this.handelDesplayUpdateModel();
        })

    }
    render() {
        return (
            <div>
                {this.state.showUpdateModel &&

                    <UpdateForm
                        show={this.state.showUpdateModel}
                        handelDesplayUpdateModel={this.handelDesplayUpdateModel}
                        handelUpdateData={this.handelUpdateData}
                        chocoSelectedData={this.state.chocoSelectedData}
                    />
                }
                {this.state.favData.length > 0 &&
                    this.state.favData.map(choco => {
                        return (
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Img variant="top" src={choco.imageUrl} />
                                    <Card.Title>{choco.title}</Card.Title>
                                    <Button variant="danger" onClick={() => { this.handelDeletechoco(choco._id) }}>DELETE</Button>
                                    <Button variant="danger" onClick={() => { this.handelDesplayUpdateModel(choco) }}>UPDATE</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default withAuth0(MyFavorite)
