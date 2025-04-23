import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchTeamPlayers } from '../services/api';

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
}

const TeamPlayers: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { season } = (location.state as { season: number }) || { season: 2024 }; // Default to 2024 if not provided
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchTeamPlayers(Number(id), season)
            .then((response) => {
                setPlayers(response.data.data);
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
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Team Players ({season} Season)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {players.map((player) => (
                    <div key={player.id} className="border p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{player.name}</h3>
                        <p>Position: {player.position}</p>
                        <p>National Team: {player.national_team}</p>
                        <p>Height: {player.height} cm</p>
                        <p>Weight: {player.weight} kg</p>
                        <p>Age: {player.age}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamPlayers;