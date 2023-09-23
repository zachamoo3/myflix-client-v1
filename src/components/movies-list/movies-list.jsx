import { React, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

function MoviesList({ movies, searchInput }) {
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);

    useEffect(() => {
        let filteredMovies = movies.filter(movie => {
            if (movie.title.toLowerCase().includes(searchInput.toLowerCase())) {
                return movie
            }
        });

        if (filteredMovies.length === 0) {
            setMoviesToDisplay(movies);
        } else {
            setMoviesToDisplay(filteredMovies);
        }

    }, [searchInput])

    return (
        <>
            {moviesToDisplay.map((movie) => {
                return (
                    <Col className='mb-4' key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                    </Col>
                )
            })}
        </>
    );
};

export default MoviesList;
