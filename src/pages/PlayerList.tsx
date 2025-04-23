import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchPlayers } from '../services/api';

interface Player {
    id: number;
    position: string;
    national_team: string;
    height: number;
    weight: number;
    birth_date: string;
    age: string;
    name: string;
    first_name: string;
    last_name: string;
    team_ids: number[];
}

interface ApiResponse {
    data: Player[];
    meta: {
        next_cursor: string | null;
        per_page: number;
    };
}

const PlayerList: React.FC = () => {
    const location = useLocation();
    const { season } = (location.state as { season: number }) || { season: 2024 };
    const [players, setPlayers] = useState<Player[]>([]);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setPlayers([]); // Reset players on season change
        fetchPlayers(season, { perPage: 25 })
            .then((response: { data: ApiResponse }) => {
                setPlayers(response.data.data);
                setNextCursor(response.data.meta.next_cursor);
                setLoading(false);
            })
            .catch((err) => {
                const errorMessage = err.response
                    ? `API Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
                    : `Network Error: ${err.message}`;
                setError(errorMessage);
                setLoading(false);
            });
    }, [season]);

    const handleLoadMore = () => {
        if (!nextCursor) return;
        fetchPlayers(season, { cursor: nextCursor, perPage: 25 })
            .then((response: { data: ApiResponse }) => {
                setPlayers((prev) => [...prev, ...response.data.data]);
                setNextCursor(response.data.meta.next_cursor);
            })
            .catch((err) => {
                const errorMessage = err.response
                    ? `API Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
                    : `Network Error: ${err.message}`;
                setError(errorMessage);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">EPL Players ({season} Season)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {players.map((player) => (
                    <div key={player.id} className="border p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{player.name}</h3>
                        <p>Position: {player.position}</p>
                        <p>National Team: {player.national_team}</p>
                        <p>Height: {player.height} cm</p>
                        <p>Weight: {player.weight} kg</p>
                        <p>Age: {player.age}</p>
                        <Link
                            to={`/players/${player.id}`}
                            state={{ season }}
                            className="text-blue-500 hover:underline mt-2 block"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            {nextCursor && (
                <button
                    onClick={handleLoadMore}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default PlayerList;