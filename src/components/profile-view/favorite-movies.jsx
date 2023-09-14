import { React, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [filterList, setFilterList] = useState([]); // an array of _id's
    const [movies, setMovies] = useState([]);



    async function getUserFavorites() {
        let response = await
            fetch(`https://myflix3-8b08c65e975f.herokuapp.com/users/${storedUser.Username}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${storedToken}` }
            });
        let userData = await response.json();
        let userFavorites = await userData.Favorite_Movies.map((doc) => {
            return { title: doc.Title }
        });

        setFilterList(userFavorites);
    };

    async function getMovieInfo(doc) {
        let movieTitleEncoded = encodeURIComponent(doc.title);

        let response = await
            fetch(`https://myflix3-8b08c65e975f.herokuapp.com/movies/${movieTitleEncoded}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${storedToken}` }
            });
        let movieData = await response.json();
        let movie = {
            id: movieData._id,
            title: movieData.Title,
            release_date: movieData.Release_Date,
            rating: movieData.Rating,
            genre: movieData.Genre.Name,
            director: movieData.Director.Name,
            image: movieData.Image_Url,
            description: movieData.Description
        };

        setMovies(movies => [...movies, movie]);
    };

    async function makeMovies() {
        await getUserFavorites();

        filterList.map((doc) => {
            getMovieInfo(doc);
        });
    };

    useEffect(() => {
        setMovies([]);
        makeMovies();

        console.log('movies: ', movies); // CONSOLE.LOG !!!
    }, []);



    return (
        <>
            {movies.map((movie) => {
                <Col className='mb-4' key={movie._id} md={3}>
                    <MovieCard movie={movie} />
                </Col>
            })}
        </>
    );
};

export default FavoriteMovies;