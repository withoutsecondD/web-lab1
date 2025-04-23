import axios from 'axios';

const API_KEY = '3b1f32ed-b358-4a21-a10c-cb005940632d';

const api = axios.create({
    baseURL: 'https://api.balldontlie.io/epl/v1',
    headers: {
        Authorization: `${API_KEY}`, // Using Bearer format as per previous troubleshooting
    },
});

// Retry mechanism for rate limiting
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        if (error.response && error.response.status === 429) {
            const delay = 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            return api(config);
        }
        return Promise.reject(error);
    }
);

export const fetchTeams = (season: number = 2024) => api.get('/teams', { params: { season } });

export const fetchTeamPlayers = (teamId: number, season: number = 2024) =>
    api.get(`/teams/${teamId}/players`, { params: { season } });

export const fetchPlayers = (
    season: number,
    options: { teamIds?: number[]; playerIds?: number[]; cursor?: string; perPage?: number } = {}
) => {
    const params: any = { season };
    if (options.teamIds && options.teamIds.length > 0) {
        params['team_ids[]'] = options.teamIds;
    }
    if (options.playerIds && options.playerIds.length > 0) {
        params['player_ids[]'] = options.playerIds;
    }
    if (options.cursor) {
        params.cursor = options.cursor;
    }
    if (options.perPage) {
        params.per_page = options.perPage;
    }
    return api.get('/players', { params });
};

