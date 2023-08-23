import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
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
                <Button
                    onClick={() => onMovieClick(movie)}
                    variant='link'
                >
                    Open
                </Button>
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
    onMovieClick: PropTypes.func.isRequired
};