import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTeams } from '../services/api';

interface Team {
    id: number;
    name: string;
    short_name: string;
    abbr: string;
    city: string;
    stadium: string;
}

const TeamList: React.FC = () => {
    const location = useLocation();
    const { season } = (location.state as { season: number }) || { season: 2024 };
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchTeams(season)
            .then((response) => {
                setTeams(response.data.data);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">EPL Teams ({season} Season)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <div key={team.id} className="border p-4 rounded shadow">
                        <h3 className="text-xl font-semibold">{team.name}</h3>
                        <p>Abbreviation: {team.abbr}</p>
                        <p>City: {team.city}</p>
                        <p>Stadium: {team.stadium}</p>
                        <Link
                            to={`/teams/${team.id}/players`}
                            state={{ season }}
                            className="text-blue-500 hover:underline mt-2 block"
                        >
                            View Players
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamList;