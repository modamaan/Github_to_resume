'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchGitHubUserResume } from "@/lib/api";
import ResumeDesignTwo from "@/components/ResumeDesignTwo";
import { ClassicPreview, ModernPreview } from "@/components/ResumeDesignPreviews";

// Components
const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
    <div className="space-y-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-32 bg-gray-200 rounded"></div>
      ))}
    </div>
  </div>
);

const SearchForm = ({ onSearch, loading, apiError }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }
    setError('');
    onSearch(username.trim());
  };

  // Clear error on input change
  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  // Show API/network error from parent if present
  const showError = error || apiError;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">GitHub Resume Builder</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" aria-describedby={showError ? 'username-error' : undefined}>
        <div className="flex-grow">
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username"
            className={`w-full px-4 py-2 border ${showError ? 'border-red-400' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
            aria-invalid={!!showError}
            aria-describedby={showError ? 'username-error' : undefined}
          />
          {showError && (
            <p id="username-error" className="mt-1 text-sm text-red-600" role="alert">{showError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Resume'}
        </button>
      </form>
    </div>
  );
};

export default function ProfilePage() {
  // Move design switcher to the top to ensure hook order is always the same
  const [design, setDesign] = useState('default');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPreviews, setShowPreviews] = useState(true);
  const searchParams = useSearchParams();
  const initialUsername = searchParams.get('username');

  const fetchUserData = async (username) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchGitHubUserResume(username);
      if (data.error) {
        setError(data.message);
        setUserData(null);
      } else {
        setUserData(data);
        setError(null);
        // Update URL without reloading the page
        window.history.pushState({}, '', `/profile?username=${username}`);
      }
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError(err.message || 'Failed to fetch user data. Please try again.');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // Load initial username from URL if present
  useEffect(() => {
    if (initialUsername) {
      fetchUserData(initialUsername);
    }
  }, [initialUsername]);

  // Initial state - no data loaded yet
  if (!userData && !loading && !error) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-2 sm:py-10 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto flex flex-col gap-6">
          <div className="w-full max-w-md mx-auto mb-4 sm:mb-8">
            <SearchForm
              onSearch={username => {
                setShowPreviews(false);
                fetchUserData(username);
              }}
              loading={loading}
              apiError={error}
            />
            <div className="flex gap-3 justify-center mt-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={() => {
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(window.location.href)
                      .then(() => alert('Link copied to clipboard!'))
                      .catch(() => alert('Failed to copy link. Please copy manually.'));
                  } else {
                    // Fallback for unsupported browsers
                    window.prompt('Copy this link:', window.location.href);
                  }
                }}
                aria-label="Copy shareable resume link"
              >
                Share Link
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => window.print()}
                aria-label="Download resume as PDF"
              >
                Download PDF
              </button>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 text-center">Choose Your Resume Style</h1>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-4 sm:mb-8 w-full">
            <button
              className={`w-full sm:w-auto mb-4 sm:mb-0 focus:outline-none border-2 rounded-xl transition-all duration-200 ${design === 'default' ? 'border-blue-500 shadow-lg' : 'border-transparent'}`}
              onClick={() => setDesign('default')}
              aria-label="Select Classic Resume Style"
            >
              <ClassicPreview />
            </button>
            <button
              className={`w-full sm:w-auto focus:outline-none border-2 rounded-xl transition-all duration-200 ${design === 'modern' ? 'border-blue-500 shadow-lg' : 'border-transparent'}`}
              onClick={() => setDesign('modern')}
              aria-label="Select Modern Resume Style"
            >
              <ModernPreview />
            </button>
          </div>
          <div className="text-center text-gray-500 text-xs sm:text-sm">Select a style and enter a GitHub username to generate your resume.</div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={fetchUserData} loading={loading} apiError={error} />
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={fetchUserData} loading={loading} apiError={error} />
        </div>
      </div>
    );
  }

  const { profile, repositories, stats, contributions, org_contributions, languages } = userData;

  // Resume Layout
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-2 sm:py-10 sm:px-4 md:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto flex flex-col gap-4 sm:gap-6">
        <div className="flex gap-3 justify-end mb-2 print:hidden">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(window.location.href)
                  .then(() => alert('Link copied to clipboard!'))
                  .catch(() => alert('Failed to copy link. Please copy manually.'));
              } else {
                window.prompt('Copy this link:', window.location.href);
              }
            }}
            aria-label="Copy shareable resume link"
          >
            Share Link
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => window.print()}
            aria-label="Download resume as PDF"
          >
            Download PDF
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-end items-center gap-2 sm:gap-4 mb-2 sm:mb-4 w-full">
          <label htmlFor="resume-design" className="mr-2 font-medium">Design:</label>
          <select
            id="resume-design"
            className="border border-gray-300 rounded px-2 py-1 text-sm w-full sm:w-auto"
            value={design}
            onChange={e => setDesign(e.target.value)}
          >
            <option value="default">Classic</option>
            <option value="modern">Modern</option>
          </select>
        </div>
        <div className="w-full max-w-md mx-auto">
          <SearchForm onSearch={fetchUserData} loading={loading} apiError={error} />
        </div>
        {design === 'modern' ? (
          <ResumeDesignTwo userData={userData} />
        ) : (
        <div className="w-full p-0 sm:p-2 md:p-4 lg:p-6 text-black font-sans leading-relaxed">

          {/* Header */}
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{profile.name || profile.login}</h1>
            <div className="text-sm sm:text-base md:text-lg mb-4 space-y-2 md:space-y-0">
              <p className="flex flex-col md:flex-row md:space-x-4 break-all md:break-normal items-start md:items-center">
                <span>
                  GitHub:{" "}
                  <a href={profile.html_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {profile.login}
                  </a>
                </span>
                {profile.blog && (
                  <span>
                    Website:{" "}
                    <a href={profile.blog} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      {profile.blog}
                    </a>
                  </span>
                )}
                {profile.email && (
                  <span>
                    Email:{" "}
                    <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">
                      {profile.email}
                    </a>
                  </span>
                )}
              </p>
              <p className="flex flex-col sm:flex-row sm:space-x-4">
                {profile.location && <span>Location: {profile.location}</span>}
                <span>Public Repos: {stats.total_repos}</span>
                <span>Followers: {profile.followers}</span>
              </p>
            </div>
          </header>

          {/* Professional Profile */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-gray-300 pb-1">Professional Profile</h2>
            <div className="space-y-3 text-sm sm:text-base">
              <p>
                <strong>Bio:</strong> {profile.bio || 'Passionate software developer with a focus on building innovative solutions and contributing to open-source projects.'}
              </p>
              <p>
                <strong>GitHub Activity:</strong> Active developer with {contributions?.totalContributions || 0} contributions this year across {stats.total_repos} public repositories.
              </p>
              <p>
                <strong>Open Source Impact:</strong> Contributed to {org_contributions?.length || 0} external organizations with a total of {stats.total_stars} stars across all repositories.
              </p>
              <p>
                <strong>Technical Expertise:</strong> Experienced in {stats.languages_used} programming languages with a focus on modern development practices and collaborative software development.
              </p>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-gray-300 pb-1">Summary</h2>
            <p className="mb-2 text-sm sm:text-base">
              Software Developer with expertise in {languages?.slice(0, 3).map(l => l.name).join(', ') || 'multiple programming languages'}. 
              Active open-source contributor with {stats.total_repos} public repositories and {stats.total_stars} total stars. 
              Proven track record of building scalable applications and contributing to collaborative development projects.
            </p>
          </section>

          {/* Skills */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-gray-300 pb-1">Skills / Tech Stack</h2>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <strong>Programming Languages:</strong> {languages?.map(l => l.name).join(', ') || 'JavaScript, Python, TypeScript'}
              </p>
              <p>
                <strong>Development:</strong> Full-Stack Development, API Design, Open Source Contribution, Version Control (Git)
              </p>
              <p>
                <strong>Collaboration:</strong> GitHub Workflows, Code Review, Issue Management, Documentation
              </p>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-gray-300 pb-1">Notable Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {repositories.slice(0, 6).map((repo, index) => (
                <div key={repo.name} className="mb-6 pb-4 border-b border-gray-200 flex flex-col">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 break-words">{repo.name}</h3>
                  <p className="mb-1 text-sm sm:text-base">
                    {repo.description || 'A software project showcasing development skills and technical expertise'}
                  </p>
                  <p className="mb-1 text-sm sm:text-base">
                    <strong>Technologies:</strong> {repo.languages ? Object.keys(repo.languages).join(', ') : 'Multiple Technologies'}
                  </p>
                  <p className="mb-1 text-sm sm:text-base overflow-x-auto">
                    <strong>Repository:</strong>{' '}
                    <a href={repo.html_url} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                      {repo.html_url}
                    </a>
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{repo.stargazers_count} stars, {repo.forks_count} forks</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open Source Contributions */}
          {org_contributions && org_contributions.length > 0 && (
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-gray-300 pb-1">Open Source Contributions</h2>
              {org_contributions.slice(0, 3).map((org, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-1">{org.org_name}</h3>
                  <p className="text-sm sm:text-base">
                    Contributed {org.prs.length} merged pull request{org.prs.length !== 1 ? 's' : ''} to {org.org_name}. 
                    {org.org_description && ` ${org.org_description}`}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* GitHub Statistics */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 border-b border-gray-300 pb-1">GitHub Statistics</h2>
            <div className="space-y-1 text-sm sm:text-base">
              <p>
                <strong>Total Contributions (This Year):</strong> {contributions?.totalContributions || 0}
              </p>
              <p>
                <strong>Public Repositories:</strong> {stats.total_repos}
              </p>
              <p>
                <strong>Total Stars Received:</strong> {stats.total_stars}
              </p>
              <p>
                <strong>Programming Languages Used:</strong> {stats.languages_used}
              </p>
              <p>
                <strong>Followers:</strong> {profile.followers}
              </p>
              <p>
                <strong>Following:</strong> {profile.following}
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 pt-4 border-t border-gray-300">
            <div className="text-center space-y-2 text-sm sm:text-base">
              <p>
                <strong>Contact:</strong>{' '}
                {profile.email && (
                  <>
                    <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline break-all">
                      {profile.email}
                    </a>
                    {' | '}
                  </>
                )}
                <a href={profile.html_url} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </p>
              <p className="flex flex-col md:flex-row justify-center md:space-x-4 items-start md:items-center">
                <span>
                  <strong>Links:</strong>{' '}
                  <a href={profile.html_url} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                    github.com/{profile.login}
                  </a>
                </span>
                {profile.blog && (
                  <span>
                    <a href={profile.blog} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                      {profile.blog}
                    </a>
                  </span>
                )}
              </p>
            </div>
          </footer>
        </div>
        )}
      </div>
    </div>
  );
}
