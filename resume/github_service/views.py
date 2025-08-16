from rest_framework.response import Response
from rest_framework.decorators import api_view
from github_service.services import fetch_github_profile, fetch_github_repos, get_github_user_data, fetch_github_contributions

@api_view(["GET"])
def profile_view(request, username):
    data = get_github_user_data(username)   # Get comprehensive user data
    if 'error' in data:
        return Response(data, status=404)
    # Fetch contributions using GraphQL only if user exists
    contributions = fetch_github_contributions(username)
    data['contributions'] = contributions
    return Response(data)

@api_view(["GET"])
def projects_view(request, username):
    data = fetch_github_repos(username)     # call service
    return Response(data)
