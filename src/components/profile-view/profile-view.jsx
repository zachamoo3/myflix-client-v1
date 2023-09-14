import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DeleteProfile from './delete-profile';
import FavoriteMovies from './favorite-movies'

export const ProfileView = ({ onDelete, movies }) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');



    const updateUserInfo = (event) => {
        event.preventDefault();

        const inputData = {
            Username: username,
            Password: password,
            Email: email,
            Birth_Date: birth_date
        };
        console.log('inputData: ', inputData);

        fetch(`https://myflix3-8b08c65e975f.herokuapp.com/users/${storedUser.Username}`, {
            method: 'PUT',
            body: JSON.stringify(inputData),
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                alert('User update successful.');
                console.log('User updated: ', inputData);
                fetchUpdatedUser(inputData.Username)
            } else {
                alert('User update failed.');
            }
        });
    };

    const fetchUpdatedUser = (newUsername) => {
        fetch(`https://myflix3-8b08c65e975f.herokuapp.com/users/${newUsername}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data));
                    console.log('Local storage updated: ', data)
                    window.location.reload();
                } else {
                    alert('Local storage update failed.');
                }
            });
    }



    return (
        <Col>
            <Row>
                <Col>
                    <Row> {/* Display user information */}
                        <h3>User Profile</h3>
                        <div>
                            <span>Username: </span>
                            <span>{storedUser.Username}</span>
                        </div>
                        <div>
                            <span>Email: </span>
                            <span>{storedUser.Email}</span>
                        </div>
                        <div>
                            <span>Date of Birth: </span>
                            <span>{storedUser.Birth_Date.slice(0, 10)}</span>
                        </div>
                    </Row>
                    <br />
                    <Row> {/* Delete account */}
                        <h3>Wish to delete your profile?</h3>
                        <DeleteProfile onDelete={onDelete} />
                    </Row>
                </Col>
                <Col> {/* Update user info */}
                    <h3>Update User Information</h3>
                    <Form onSubmit={updateUserInfo}>
                        <Form.Group controlId='formUsername'>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength='5'
                            />
                        </Form.Group>

                        <Form.Group controlId='formPassword'>
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='formEmail'>
                            <Form.Label>Email: </Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='formBirthDate'>
                            <Form.Label>Birthday: </Form.Label>
                            <Form.Control
                                type='date'
                                value={birth_date}
                                onChange={(e) => setBirth_date(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant='primary' type='submit'>
                            Update
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row> {/* Favorite movies */}
                <h3>Favorite Movies</h3>
                <FavoriteMovies movies={movies} />
            </Row>
        </Col>
    );
};
