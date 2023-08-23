import { React, useState } from 'react';

export const SignupView = () => {
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
                window.location.reload();
            } else {
                alert('Signup failed.');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='5'
                />
            </label>
            <label>
                Password:
                <input
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Birthday:
                <input
                    type='text'
                    value={birth_date}
                    onChange={(e) => setBirth_date(e.target.value)}
                    required
                />
            </label>
            <button type='submit'>Submit</button>
        </form>
    );
};
