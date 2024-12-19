# Assignment 2 - Web API.

Name: haoran lu

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
+ Feature 1: Users can add movies to their favorites list.  
+ Feature 2: Users can leave reviews and ratings for specific movies.  
+ Feature 3: Improved error handling and user-friendly feedback.  
+ Feature 4: Parameterized URL support for user-specific actions

## Setup requirements.

[ Outline any non-standard setup steps necessary to run your app locally after cloning the repo.]

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODEENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
seedDb=true
secret=YourJWTSecret
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

Movies API
/api/movies | GET | Gets a list of movies.
/api/movies/:movieid | GET | Gets details of a single movie (fetched from TMDB).
/api/movies/upcoming | GET | Gets a list of upcoming movies (fetched from TMDB).
Users API
/api/users | GET | Gets a list of all users.
/api/users/:id/favourites | POST | Add a movie to a user's favorites list (new feature).
/api/users/:id/reviews | POST | Add a review and rating for a movie (new feature).
/api/users/:id/favourites | GET | Get a user's favorites list.
/api/users/:id/reviews | GET | Get all reviews submitted by a user.

If you have your API design on an online platform or graphic, please link to it (e.g. [Swaggerhub](https://app.swaggerhub.com/)).

## Security and Authentication

Authentication:
The API uses JWT (JSON Web Token) for user authentication.
Users must log in to get a valid JWT, which is required to access protected routes.
Protected Routes:
/api/users/:id/favourites (GET, POST)
/api/users/:id/reviews (GET, POST)

## Integrating with React App

Integration Steps:
The React app uses the /api/users/:id/favourites API to allow users to add movies to their favorites.
The /api/users/:id/reviews API is used to let users leave reviews for movies directly from the app.
Updated views in the React app to replace TMDB API calls with these custom API endpoints.
Updated Views:
Favorites Page: Displays the user's favorite movies by fetching data from /api/users/:id/favourites.
Movie Details Page: Displays reviews and allows users to add their own reviews using /api/users/:id/reviews.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   
