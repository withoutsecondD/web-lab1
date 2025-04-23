import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p>This app provides EPL statistics using the BallDontLie API.</p>
        </div>
    );
};

export default About;