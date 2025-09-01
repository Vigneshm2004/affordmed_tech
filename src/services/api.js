const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1Z2NldDIyMDUzNEByZXZhLmVkdS5pbiIsImV4cCI6MTc1NjcwNDM4NiwiaWF0IjoxNzU2NzAzNDg2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGE5NDk0Y2EtMzFkZC00NDExLWE0MjctNDJjMDBiMzE0ZmJkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidmlnZW5zaCBtIiwic3ViIjoiNWUxNGY3ODQtMWE2Ni00YTcyLWJiODItNWYzMjQyMTMyZGQ3In0sImVtYWlsIjoidWdjZXQyMjA1MzRAcmV2YS5lZHUuaW4iLCJuYW1lIjoidmlnZW5zaCBtIiwicm9sbE5vIjoicjIyZXEwNDIiLCJhY2Nlc3NDb2RlIjoiTkpNS0RXIiwiY2xpZW50SUQiOiI1ZTE0Zjc4NC0xYTY2LTRhNzItYmI4Mi01ZjMyNDIxMzJkZDciLCJjbGllbnRTZWNyZXQiOiJoSGNuWFJEeXVGZm5ielV1In0.dKovpy5T9X50Pxs9melGCbq5I67TDJ9N9TPwxZmwtaI";

// 👇 Change this to your actual backend API base URL
const BASE_URL = "http://20.244.56.144/evaluation-service";

const api = {
  createShortUrls: async (urlEntries) => {
    try {
      const response = await fetch(`${BASE_URL}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(urlEntries),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create short URLs");
      }

      return data; // should contain the created short URLs
    } catch (error) {
      console.error("createShortUrls error:", error.message);
      return Promise.reject(error);
    }
  },

  getStatistics: async () => {
    try {
      const response = await fetch(`${BASE_URL}/statistics`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch statistics");
      }

      return data;
    } catch (error) {
      console.error("getStatistics error:", error.message);
      return Promise.reject(error);
    }
  },

  getLongUrlAndLogClick: async (shortCode) => {
    try {
      const response = await fetch(`${BASE_URL}/redirect/${shortCode}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Short URL not found or expired");
      }

      return data.longUrl; // backend should return original URL
    } catch (error) {
      console.error("getLongUrlAndLogClick error:", error.message);
      return Promise.reject(error);
    }
  },
};

export default api;
