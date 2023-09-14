import { React, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies({ movies }) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    let favoriteMovies = storedUser.Favorite_Movies;

    let filteredMovies = movies.filter(movie => {
        if (favoriteMovies.includes(movie.id)) {
            return movie
        }
    })

    return (
        <>
            {filteredMovies.map((movie) => {
                return (
                    <Col className='mb-4' key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                    </Col>
                )
            })}
        </>
    );
};

export default FavoriteMovies;