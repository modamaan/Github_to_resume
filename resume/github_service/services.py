import requests
from datetime import datetime, timedelta
from collections import defaultdict

import os
from django.conf import settings

GITHUB_API_URL = "https://api.github.com"
GITHUB_TOKEN = os.environ.get('GITHUB_API_TOKEN')

if not GITHUB_TOKEN:
    raise ValueError("GITHUB_API_TOKEN environment variable is not set")

HEADERS = {
    "Accept": "application/vnd.github.v3+json",
    "Authorization": f"token {GITHUB_TOKEN}"
}

def fetch_github_profile(username):
    """Fetch basic user profile information from GitHub."""
    url = f"{GITHUB_API_URL}/users/{username}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def fetch_github_repos(username, per_page=100):
    """Fetch all repositories for a GitHub user."""
    url = f"{GITHUB_API_URL}/users/{username}/repos"
    params = {
        'per_page': per_page,
        'sort': 'updated',
        'direction': 'desc'
    }
    response = requests.get(url, headers=HEADERS, params=params)
    response.raise_for_status()
    return response.json()

def fetch_all_github_repos(username, max_repos=100):
    """Fetch all repositories for a user with pagination support."""
    url = f"{GITHUB_API_URL}/users/{username}/repos"
    params = {
        "per_page": 100,  # Max allowed by GitHub API
        "sort": "updated",
        "direction": "desc"
    }
    
    all_repos = []
    page = 1
    
    while True:
        params["page"] = page
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        
        repos = response.json()
        if not repos:  # No more repos
            break
            
        all_repos.extend(repos)
        
        # Stop if we've reached the maximum number of repos or if this is the last page
        if len(all_repos) >= max_repos or len(repos) < params["per_page"]:
            break
            
        page += 1
    
    return all_repos[:max_repos]  # Return at most max_repos

def fetch_repo_languages(username, repo_name):
    """Fetch languages used in a specific repository."""
    url = f"{GITHUB_API_URL}/repos/{username}/{repo_name}/languages"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

def fetch_org_contributions_and_prs(username, pr_limit=10, org_limit=5):
    """Fetch organizations contributed to and PRs made to each org (merged, not own repos)."""
    graphql_url = "https://api.github.com/graphql"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json",
    }
    # This query fetches the last PRs authored by the user, merged, and not in their own repos
    query = '''
    query($login: String!, $prLimit: Int!) {
      user(login: $login) {
        pullRequests(first: $prLimit, states: MERGED, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            title
            url
            mergedAt
            repository {
              nameWithOwner
              owner {
                login
                avatarUrl
                url
                ... on Organization {
                  name
                  description
                }
              }
              name
              description
            }
          }
        }
      }
    }
    '''
    variables = {"login": username, "prLimit": pr_limit}
    response = requests.post(graphql_url, json={"query": query, "variables": variables}, headers=headers)
    response.raise_for_status()
    data = response.json()
    pr_nodes = data.get("data", {}).get("user", {}).get("pullRequests", {}).get("nodes", [])
    orgs = {}
    for pr in pr_nodes:
        repo_owner = pr['repository']['owner']['login']
        if repo_owner.lower() == username.lower():
            continue  # Skip own repos
        # Group PRs by org
        if repo_owner not in orgs:
            orgs[repo_owner] = {
                "org_name": pr['repository']['owner'].get('name') or repo_owner,
                "org_avatar": pr['repository']['owner'].get('avatarUrl'),
                "org_url": pr['repository']['owner'].get('url'),
                "org_description": pr['repository']['owner'].get('description'),
                "prs": []
            }
        orgs[repo_owner]["prs"].append({
            "title": pr['title'],
            "url": pr['url'],
            "mergedAt": pr['mergedAt'],
            "repo": pr['repository']['nameWithOwner'],
            "repo_name": pr['repository']['name'],
            "repo_description": pr['repository']['description'],
        })
    # Limit number of orgs
    orgs_limited = list(orgs.values())[:org_limit]
    return orgs_limited

def fetch_github_contributions(username):
    """Fetch user contributions (calendar) using GitHub GraphQL API."""
    graphql_url = "https://api.github.com/graphql"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Content-Type": "application/json",
    }
    query = """
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                date
              }
            }
          }
        }
      }
    }
    """
    variables = {"login": username}
    response = requests.post(graphql_url, json={"query": query, "variables": variables}, headers=headers)
    response.raise_for_status()
    data = response.json()
    user_data = data.get("data", {}).get("user")
    if user_data is None:
        # User not found or invalid username
        return {
            'error': 'User not found',
            'message': f"No GitHub user found with username '{username}'."
        }
    return user_data.get("contributionsCollection", {}).get("contributionCalendar", {})

def get_github_user_data(username):
    """Get comprehensive GitHub user data for resume building."""
    try:
        # Fetch basic profile
        try:
            profile = fetch_github_profile(username)
        except requests.exceptions.HTTPError as e:
            if e.response is not None and e.response.status_code == 404:
                return {
                    'error': 'User not found',
                    'message': f"No GitHub user found with username '{username}'."
                }
            else:
                raise
        # Fetch all repositories
        all_repos = fetch_all_github_repos(username, max_repos=100)
        
        # Process repositories data
        processed_repos = []
        languages = defaultdict(int)
        total_stars = 0
        total_forks = 0
        
        # Sort repos by stargazers_count (descending) and limit to top 20
        sorted_repos = sorted(
            all_repos,
            key=lambda x: x['stargazers_count'],
            reverse=True
        )[:20]
        
        # Process top repositories
        for repo in sorted_repos:
            if not repo['fork']:  # Only include non-forked repos
                repo_languages = fetch_repo_languages(username, repo['name'])
                processed_repo = {
                    'name': repo['name'],
                    'description': repo['description'],
                    'html_url': repo['html_url'],
                    'created_at': repo['created_at'],
                    'updated_at': repo['updated_at'],
                    'stargazers_count': repo['stargazers_count'],
                    'forks_count': repo['forks_count'],
                    'languages': repo_languages,
                    'topics': repo.get('topics', []),
                    'language': repo.get('language')
                }
                processed_repos.append(processed_repo)
                
                # Update totals
                total_stars += repo['stargazers_count']
                total_forks += repo['forks_count']
                
                # Aggregate language stats
                for lang, bytes_of_code in repo_languages.items():
                    languages[lang] += bytes_of_code
        
        # Sort languages by usage
        sorted_languages = sorted(
            languages.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        # Calculate total bytes for percentage calculation
        total_bytes = sum(languages.values())
        
        # Fetch contributions
        contributions = fetch_github_contributions(username)
        # Prepare final response
        return {
            'profile': {
                'login': profile['login'],
                'name': profile.get('name', ''),
                'bio': profile.get('bio', ''),
                'avatar_url': profile['avatar_url'],
                'html_url': profile['html_url'],
                'location': profile.get('location', ''),
                'email': profile.get('email', ''),
                'blog': profile.get('blog', ''),
                'public_repos': profile['public_repos'],
                'public_gists': profile['public_gists'],
                'followers': profile['followers'],
                'following': profile['following'],
                'created_at': profile['created_at'],
                'updated_at': profile['updated_at']
            },
            'repositories': processed_repos,
            'languages': [{
                'name': lang[0],
                'percentage': round((lang[1] / total_bytes) * 100) if total_bytes > 0 else 0
            } for lang in sorted_languages[:5]],  # Top 5 languages with percentages
            'stats': {
                'total_repos': len(all_repos),
                'total_stars': total_stars,
                'total_forks': total_forks,
                'languages_used': len(languages),
            },
            'contributions': contributions,
            'org_contributions': fetch_org_contributions_and_prs(username)
        }
        
    except requests.exceptions.RequestException as e:
        return {
            'error': str(e),
            'message': 'Failed to fetch data from GitHub API'
        }
