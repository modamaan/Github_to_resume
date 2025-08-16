import React from "react";

export default function ResumeDesignTwo({ userData }) {
  if (!userData) return null;
  const { profile, repositories, stats, contributions, org_contributions, languages } = userData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full bg-white/90 rounded-2xl shadow-xl p-8">
        <header className="flex flex-col sm:flex-row items-center mb-8 gap-6">
          <img
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            className="w-32 h-32 rounded-full border-4 border-green-300 shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-green-800 mb-1 break-words">{profile.name || profile.login}</h1>
            <p className="text-lg text-gray-700 mb-2">{profile.bio || 'Passionate developer & open-source enthusiast.'}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>📍 {profile.location || 'Remote'}</span>
              <span>👥 {profile.followers} followers</span>
              <span>⭐ {stats.total_stars} stars</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href={profile.html_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
              {profile.blog && (
                <a href={profile.blog} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Website</a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline">Email</a>
              )}
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-700 mb-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {(languages || []).map(l => (
              <span key={l.name} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                {l.name}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-700 mb-2">Summary</h2>
          <p className="text-gray-700 text-base">
            Software Developer with expertise in {(languages || []).slice(0, 3).map(l => l.name).join(', ') || 'multiple languages'}. Active open-source contributor with {stats.total_repos} public repositories and {stats.total_stars} total stars.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-700 mb-2">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-6">
            {(repositories || []).slice(0, 4).map(repo => (
              <div key={repo.name} className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-green-900 mb-1">
                  <a href={repo.html_url} className="hover:underline" target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h3>
                <p className="text-gray-700 text-sm mb-1">{repo.description || 'A software project.'}</p>
                <div className="flex flex-wrap gap-2 text-xs text-green-700">
                  {repo.languages && Object.keys(repo.languages).map(lang => (
                    <span key={lang} className="bg-green-200 px-2 py-0.5 rounded-full">{lang}</span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">⭐ {repo.stargazers_count} &nbsp;|&nbsp; 🍴 {repo.forks_count}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-green-700 mb-2">GitHub Stats</h2>
          <div className="flex flex-wrap gap-6 text-gray-700 text-base">
            <span>Contributions (this year): <strong>{contributions?.totalContributions || 0}</strong></span>
            <span>Repos: <strong>{stats.total_repos}</strong></span>
            <span>Followers: <strong>{profile.followers}</strong></span>
            <span>Following: <strong>{profile.following}</strong></span>
          </div>
        </section>

        {org_contributions && org_contributions.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-green-700 mb-2">Open Source Contributions</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {org_contributions.slice(0, 3).map((org, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{org.org_name}</span>: {org.prs.length} PRs merged
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-10 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          <div>
            <span>Contact: </span>
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="text-blue-600 hover:underline break-all">{profile.email}</a>
            )}
            {profile.blog && (
              <>
                {' | '}
                <a href={profile.blog} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">{profile.blog}</a>
              </>
            )}
          </div>
          <div className="mt-2">
            <a href={profile.html_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              github.com/{profile.login}
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
