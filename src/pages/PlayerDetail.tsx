import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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

const PlayerDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { season } = (location.state as { season: number }) || { season: 2024 };
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchPlayers(season, { playerIds: [Number(id)] })
            .then((response: { data: { data: Player[] } }) => {
                const playerData = response.data.data.find((p) => p.id === Number(id));
                if (playerData) {
                    setPlayer(playerData);
                } else {
                    setError('Player not found');
                }
                setLoading(false);
            })
            .catch((err) => {
                const errorMessage = err.response
                    ? `API Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`
                    : `Network Error: ${err.message}`;
                setError(errorMessage);
                setLoading(false);
            });
    }, [id, season]);

    if (loading) return <div>Loading...</div>;
    if (error || !player) return <div>Error: {error || 'Player not found'}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <p>Position: {player.position}</p>
            <p>National Team: {player.national_team}</p>
            <p>Height: {player.height} cm</p>
            <p>Weight: {player.weight} kg</p>
            <p>Age: {player.age}</p>
            <p>Team IDs: {player.team_ids.join(', ')}</p>
        </div>
    );
};

export default PlayerDetail;