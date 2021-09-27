import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handelDesplayUpdateModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Choco</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.handelUpdateData}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name='title' placeholder="Enter Title" defaultValue={this.props.chocoSelectedData.title}/>
                                
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" name='ImageURl' placeholder="Enter Image URl" defaultValue={this.props.chocoSelectedData.imageUrl} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name='userEmail' placeholder="Enter Email" defaultValue={this.props.chocoSelectedData.email} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        )
    }
}

export default UpdateForm
