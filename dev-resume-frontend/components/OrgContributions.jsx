import React from "react";

export default function OrgContributions({ orgContributions }) {
  if (!orgContributions || orgContributions.length === 0) return null;
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contributions to Other Organizations</h2>
      <div className="space-y-8">
        {orgContributions.map((org, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-2">
              {org.org_avatar && (
                <img src={org.org_avatar} alt={org.org_name} className="w-10 h-10 rounded-full mr-3" />
              )}
              <div>
                <a href={org.org_url} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-blue-700 hover:underline">
                  {org.org_name}
                </a>
                {org.org_description && (
                  <div className="text-gray-500 text-sm mt-1">{org.org_description}</div>
                )}
              </div>
            </div>
            <div className="ml-2 mt-2">
              <h3 className="font-semibold text-gray-700 mb-2">Merged Pull Requests:</h3>
              <ul className="space-y-2">
                {org.prs.map((pr, j) => (
                  <li key={j} className="border-b last:border-0 pb-2">
                    <a href={pr.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      {pr.title}
                    </a>
                    <div className="text-xs text-gray-500">
                      Repo: <span className="font-mono">{pr.repo}</span> &middot; Merged: {pr.mergedAt ? new Date(pr.mergedAt).toLocaleDateString() : "-"}
                    </div>
                    {pr.repo_description && (
                      <div className="text-xs text-gray-400 italic mt-1">{pr.repo_description}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
