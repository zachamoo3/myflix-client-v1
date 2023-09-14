import { Button } from 'react-bootstrap';

export const FavoriteButton = ({ movie }) => {
    const storedToken = localStorage.getItem('token');

    const handleFavorite = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        let userFavs = storedUser.Favorite_Movies;

        let setMethod = () => {
            if (userFavs.includes(movie.id)) {
                return ('DELETE');
            } else {
                return ('POST');
            }
        }

        let fetchMethod = setMethod();

        fetch(`https://myflix3-8b08c65e975f.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`, {
            method: fetchMethod,
            headers: {
                Authorization: `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((userData) => {
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    console.log('Local storage update made using the', fetchMethod, 'method:', userData)
                } else {
                    alert('Local storage update failed.');
                }
            });
    };

    return (
        <>
            <Button variant='primary' onClick={handleFavorite}>
                Favorite
            </Button>
        </>
    )
}