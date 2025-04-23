import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [season, setSeason] = useState<number>(2024); // Default season

    const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeason(Number(event.target.value));
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">EPL Stats</Link>
                <div className="flex items-center">
                    <div className="mr-4">
                        <label htmlFor="season" className="text-white mr-2">Season:</label>
                        <select
                            id="season"
                            value={season}
                            onChange={handleSeasonChange}
                            className="border p-1.5 rounded bg-white cursor-pointer"
                        >
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>
                    </div>
                    <Link to="/players" state={{ season }} className="text-white mx-4">Players</Link>
                    <Link to="/teams" state={{ season }} className="text-white mx-4">Teams</Link>
                    <Link to="/about" className="text-white mx-4">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;