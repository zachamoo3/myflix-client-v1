import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <img src={movie.image} className='w-100' />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Release Date: </span>
                <span>{movie.release_date}</span>
            </div>
            <div>
                <span>Rating: </span>
                <span>{movie.rating}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <Link to={'/'}>
                <button
                    className='back-button'
                    style={{ cursor: 'pointer' }}
                >
                    Back
                </button>
            </Link>
        </div>
    );
};
