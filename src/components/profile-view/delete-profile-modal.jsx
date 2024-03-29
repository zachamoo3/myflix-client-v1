import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteProfileModal({ onDelete }) {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteProfile = () => {
        fetch(`https://myflix3-8b08c65e975f.herokuapp.com/users/${storedUser.Username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                handleClose();
                alert('User deleted successfully.');
                window.location.reload();
                onDelete();
            } else {
                alert('User deletion failed.');
            }
        });
    };

    return (
        <Col>
            <Button variant='primary' onClick={handleShow}>
                Delete
            </Button>

            <Modal
                size='sm'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you really sure that you want to delete your profile?  This cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        No
                    </Button>
                    <Button variant='primary' onClick={deleteProfile}>
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default DeleteProfileModal;