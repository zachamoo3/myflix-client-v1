import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoriteButton } from '../favorite-button/favorite-button';

export const MovieCard = ({ movie }) => {
    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={movie.image} />
            <Card.Body>
                <Card.Title>
                    {movie.title}
                </Card.Title>
                <Card.Text>
                    {movie.director}
                </Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant='link'>
                        See more
                    </Button>
                </Link>
                <FavoriteButton movie={movie} />
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string,
        rating: PropTypes.string,
        genre: PropTypes.string,
        director: PropTypes.string,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
};
