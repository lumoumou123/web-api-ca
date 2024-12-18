# Assignment 1 - ReactJS app.

Name: [haoran lu]

## Overview.

This is a React-based movie fan application that provides various features, including browsing movie information, adding reviews, saving to favorites, filtering, sorting, and managing a watchlist.

### Features.
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]
 
+ Actor list page.
+ Movie filtering functionality (by year and rating, either from high to low or low to high).
+ Pagination for displaying movies.
+ Watchlist functionality.
+ Popular and Upcoming movies pages.
+ Actor details page.

## Setup requirements.
Clone the repository:
         git clone https://github.com/lumoumou123/web-assignment.git
Install dependencies:
        npm install
Set up the environment variable:
    Make sure to create a .env file in the root directory and add your TMDB API key as shown above.
         REACT_APP_TMDB_KEY=<Your_TMDB_API_Key>
## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

e.g.
+ Discover list of movies - /discover/movie
+ Movie details - /movie/:id
+ Upcoming movies - /movie/upcoming
+ Popular movies - /movie/popular
+ Movie credits - /movie/:id/credits
+ Search actor by name - /search/person
+ Actor details - /person/:id
+ Movie genres - /genre/movie/list
+ Movie images - /movie/:id/images
+ Movie reviews - /movie/:id/reviews


## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /movies/favorites - Displays a list of favorite movies.
+ /movies/upcoming - Displays a list of upcoming movies.
+ /movies/popular - Displays a list of popular movies.
+ /movies/watch - Displays the user's watchlist.
+ /movies/:id - Displays detailed information about a specific movie.
+ /reviews/:id - Displays the reviews of a specific movie.
+ /actor/:id - Displays details about a specific actor.
+ /reviews/form - Displays a form to add a new movie review.
+ / - Displays the homepage with a list of discovered movies.

[If relevant, state what aspects of your app are protected (i.e. require authentication) and what is public.]

## Independent learning (If relevant).
+ React Query: Used for data fetching, caching, and state management. Code files include pages/favoriteMoviesPage.js, components/spinner.js. Reference: React Query official documentation.:https://react-query-v3.tanstack.com/overview
+ Material UI: Used as the UI component library for the application. Code files include components/movieCard.js, components/siteHeader.js. Reference: Material UI official documentation:https://mui.com/material-ui/api/accordion/
+ Pagination Implementation: Implemented pagination for displaying movies. Code files include components/templateMovieListPage.js. Reference: Digital Ocean - Pagination in React.:https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
+ TMDB API: Used to fetch movie data from The Movie Database (TMDB), files include api/tmdb-api.js.:https://developer.themoviedb.org/reference/intro/getting-started
