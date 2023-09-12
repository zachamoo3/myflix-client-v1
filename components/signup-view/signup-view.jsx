import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignupView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birth_date, setBirth_date] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birth_Date: birth_date
        };

        fetch('https://myflix3-8b08c65e975f.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                alert('Signup successful.');
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                onLoggedIn(data.user, data.token);
                window.location.reload();
            } else {
                alert('Signup failed.');
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='5'
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                    type='date'
                    value={birth_date}
                    onChange={(e) => setBirth_date(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
    );
};
