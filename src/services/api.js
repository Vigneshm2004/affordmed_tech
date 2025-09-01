const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1Z2NldDIyMDUzNEByZXZhLmVkdS5pbiIsImV4cCI6MTc1NjcwNDM4NiwiaWF0IjoxNzU2NzAzNDg2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGE5NDk0Y2EtMzFkZC00NDExLWE0MjctNDJjMDBiMzE0ZmJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmlnZW5zaCBtIiwic3ViIjoiNWUxNGY3ODQtMWE2Ni00YTcyLWJiODItNWYzMjQyMTMyZGQ3In0sImVtYWlsIjoidWdjZXQyMjA1MzRAcmV2YS5lZHUuaW4iLCJuYW1lIjoidmlnZW5zaCBtIiwicm9sbE5vIjoicjIyZXEwNDIiLCJhY2Nlc3NDb2RlIjoiTkpNS0RXIiwiY2xpZW50SUQiOiI1ZTE0Zjc4NC0xYTY2LTRhNzItYmI4Mi01ZjMyNDIxMzJkZDciLCJjbGllbnRTZWNyZXQiOiJoSGNuWFJEeXVGZm5ielV1In0.dKovpy5T9X50Pxs9melGCbq5I67TDJ9N9TPwxZmwtaI";

const api = {
    createShortUrls: async (urlEntries) => {
        try {
            const response = await fetch('https://your-api-endpoint.com/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify(urlEntries),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create short URLs');
            }

            const data = await response.json();
            return data; // Assuming the backend returns the list of created URLs
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getStatistics: async () => {
        try {
            const response = await fetch('https://your-api-endpoint.com/statistics', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch statistics');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getLongUrlAndLogClick: async (shortCode) => {
        try {
            const response = await fetch(`https://your-api-endpoint.com/redirect/${shortCode}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Short URL not found or expired');
            }

            const data = await response.json();
            // Assuming the backend logs the click and returns the original longUrl
            return data.longUrl;
        } catch (error) {
            return Promise.reject(error);
        }
    },
};

export default api;
