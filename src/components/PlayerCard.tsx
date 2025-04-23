import React from 'react';
import { Link } from 'react-router-dom';

interface Player {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    team: { full_name: string };
}

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className="border rounded-lg p-4 m-2 shadow-md">
            <h3 className="text-lg font-bold">{player.first_name} {player.last_name}</h3>
            <p>Position: {player.position || 'N/A'}</p>
            <p>Team: {player.team.full_name}</p>
            <Link to={`/players/${player.id}`} className="text-blue-500">View Details</Link>
        </div>
    );
};

export default PlayerCard;