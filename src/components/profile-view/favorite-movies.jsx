import { React, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies() {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    const [filterList, setFilterList] = useState([]); // an array of _id's
    const [movies, setMovies] = useState([]);




    const fetchUserFavorites = () => { // asynchronous
        fetch(`https://myflix3-8b08c65e975f.herokuapp.com/users/${storedUser.Username}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const userMovieList = data.Favorite_Movies.map((doc) => {
                    return { title: doc.Title };
                }); // logs an array of simple objects {_id, Title}

                setFilterList(userMovieList); // successfully populates filterList with the list of the user's favorite movies' titles
                console.log('filterList: ', userMovieList); // CONSOLE.LOG !!!
            });
    };

    const fetchMovieInfo = (movieTitle) => { // asynchronous
        var movieTitleEncoded = encodeURIComponent(movieTitle.title); // makes the title URL compatible
        console.log('movieTitleEncoded: ', movieTitleEncoded) // CONSOLE.LOG !!!

        fetch(`https://myflix3-8b08c65e975f.herokuapp.com/movies/${movieTitleEncoded}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then((response) => response.json())
            .then((data) => { // data contains the doc's full details
                console.log('data: ', data); // CONSOLE.LOG !!!
                let movie = {
                    id: data._id,
                    title: data.Title,
                    release_date: data.Release_Date,
                    rating: data.Rating,
                    genre: data.Genre.Name,
                    director: data.Director.Name,
                    image: data.Image_Url,
                    description: data.Description
                }
                setMovies(movies => [...movies, movie])
            });
    };

    useEffect(() => {
        fetchUserFavorites();
        // filterList is an array of objects, each with a 'title'
    }, []);

    useEffect(() => {
        filterList.map((doc) => {
            console.log('doc: ', doc); // CONSOLE.LOG !!!
            fetchMovieInfo(doc); // sends doc to fetchMovieInfo
        });
    }, [filterList]);

    useEffect(() => {
        console.log('movies: ', movies); // CONSOLE.LOG !!!
    }, [movies]);














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