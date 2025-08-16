// lib/api.js
const API_BASE_URL = 'http://localhost:8000/api';

// Fetch data from the REST API
export async function fetchAPI(endpoint) {
  const res = await fetch(`${API_BASE_URL}/${endpoint}/`, {
    cache: 'no-store', // always fresh data
    credentials: 'include', // include cookies for session
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Failed to fetch ${endpoint}`);
  }

  return res.json();
}

// Fetch GitHub user data for resume
export async function fetchGitHubUserResume(username) {
  try {
    const res = await fetch(`${API_BASE_URL}/github/user/${username}/resume/`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      let errorBody = await res.text();
      let errorJson = {};
      try {
        errorJson = JSON.parse(errorBody);
      } catch {}
      return { error: true, message: errorJson.message || errorBody || 'Failed to fetch GitHub user data' };
    }

    const data = await res.json();
    console.log('API Success:', data);
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Fetch GitHub user repositories
export async function fetchGitHubUserRepos(username) {
  try {
    const res = await fetch(`${API_BASE_URL}/github/user/${username}/projects/`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch GitHub repositories');
    }

    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
