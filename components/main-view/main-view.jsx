import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view.jsx';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'The Princess Bride',
            image: 'https://m.media-amazon.com/images/M/MV5BYzdiOTVjZmQtNjAyNy00YjA2LTk5ZTAtNmJkMGQ5N2RmNjUxXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
            director: 'Rob Reiner',
            genre: 'Fantasy',
            description: 'A bedridden boy\'s grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.'
        },
        {
            id: 2,
            title: 'The Court Jester',
            image: 'https://m.media-amazon.com/images/M/MV5BYjY4MjI3YjgtZGIzNi00NzlmLTliNjMtMDRkNGU3YjFmMmZjXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg',
            director: 'Melvin Frank',
            genre: 'Comedy',
            description: 'A hapless carnival performer masquerades as the court jester as part of a plot against an evil ruler who has overthrown the rightful King.'
        },
        {
            id: 3,
            title: 'The Count of Monte Cristo',
            image: 'https://m.media-amazon.com/images/M/MV5BMDM0ZWRjZDgtZWI0MS00ZTIzLTg4MWYtZjU5MDEyMDU0ODBjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
            director: 'Kevin Reynolds',
            genre: 'Adventure',
            description: 'A young man, falsely imprisoned by his jealous \"friend\", escapes and uses a hidden treasure to exact his revenge.'
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};