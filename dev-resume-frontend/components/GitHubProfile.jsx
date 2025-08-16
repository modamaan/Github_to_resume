"use client"
import { useState, useEffect } from 'react';
import { fetchGitHubUserResume } from '../lib/api';

export default function GitHubProfile({ username }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubUserResume(username);
        setProfile(data.profile);
        setRepos(data.repositories || []);
        setLanguages(data.languages || []);
        setStats(data.stats || {});
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div className="text-center py-8">Loading GitHub profile...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-white rounded-lg shadow-md">
        <img 
          src={profile.avatar_url} 
          alt={`${profile.name || profile.login}'s avatar`}
          className="w-32 h-32 rounded-full border-4 border-blue-100"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name || profile.login}</h1>
          {profile.bio && <p className="text-gray-600 mt-2">{profile.bio}</p>}
          <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            {profile.location && (
              <span className="flex items-center text-gray-600">
                📍 {profile.location}
              </span>
            )}
            <a 
              href={profile.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub Profile
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Repositories" value={stats.total_repos || 0} />
        <StatCard title="Stars" value={stats.total_stars || 0} />
        <StatCard title="Forks" value={stats.total_forks || 0} />
        <StatCard title="Languages" value={stats.languages_used || 0} />
      </div>

      {/* Languages */}
      {languages.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Top Languages</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: getLanguageColor(lang.name) }}
                  />
                  <span className="font-medium">{lang.name}</span>
                  <span className="ml-2 text-gray-500">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Repositories */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Top Repositories</h2>
        <div className="space-y-4">
          {repos.map((repo) => (
            <div key={repo.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  {repo.description && (
                    <p className="text-gray-600 mt-1">{repo.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                    {repo.language && (
                      <span className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span>⭐ {repo.stargazers_count?.toLocaleString()}</span>
                    <span>🍴 {repo.forks_count?.toLocaleString()}</span>
                    <span>Updated on {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    View
                  </a>
                </div>
              </div>
              
              {repo.topics && repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {repo.topics.map((topic) => (
                    <span 
                      key={topic}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center">
      <div className="text-3xl font-bold text-blue-600">{value.toLocaleString()}</div>
      <div className="text-gray-500 mt-1">{title}</div>
    </div>
  );
}

// Helper function to get colors for different programming languages
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Shell': '#89e051',
    'Dart': '#00B4AB',
    'R': '#198CE7',
    'Scala': '#c22d40',
    'Objective-C': '#438eff',
    'Vue': '#2c3e50',
    'React': '#61dafb',
    'Angular': '#dd0031',
  };

  return colors[language] || '#cccccc';
}
