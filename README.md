# Assignment 2 - Web API

**Name:** Haoran Lu  

---

## Features

A bullet-point list of the additional features implemented in the API **that were not in the labs** (or modifications to existing features):

- **Feature 1:** Users can add movies to their watchlist and favorites list.
- **Feature 2:** Users can remove movies from their watchlist and favorites list.
- **Feature 3:** Users can leave reviews and ratings for specific movies.
- **Feature 4:** User-specific authentication using JWT to secure protected routes.
- **Feature 5:** Enhanced error handling for better debugging and user feedback.
- **Feature 6:** API endpoints for popular and upcoming movies fetched directly from TMDB.
- **Feature 7:** Pagination and filtering for movie listings with sorting options.

---

## Setup Requirements

**Outline any non-standard setup steps necessary to run your app locally after cloning the repo:**

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install dependencies for both the backend and frontend:
   ```bash
   npm install
   cd react-movies
   npm install
   ```

3. Create an `.env` file in the root folder of your backend project with the following contents:
   ```plaintext
   NODE_ENV=development
   PORT=8080
   HOST=localhost
   MONGO_URL=YourMongoDBURL
   SEED_DB=true
   TMDB_KEY=YourTMDBAPIKey
   SECRET=YourJWTSecret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

5. Start the frontend app:
   ```bash
   cd react-movies
   npm start
   ```

---

## API Configuration

Before running the app, ensure you configure your `.env` file for the backend with the following variables:

```plaintext
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_URL=YourMongoDBConnectionString
SEED_DB=true
TMDB_KEY=YourTMDBAPIKey
SECRET=YourJWTSecret
```

---

## API Design

Here’s an overview of the API endpoints:

**Movies API**  
- `GET /api/movies` - Retrieves a list of movies from the database.
- `GET /api/movies/:id` - Retrieves detailed information about a specific movie.
- `GET /api/movies/tmdb/upcoming` - Fetches upcoming movies from TMDB.
- `GET /api/movies/tmdb/popular` - Fetches popular movies from TMDB.

**Users API**  
- `GET /api/users` - Retrieves a list of all users.
- `GET /api/users/:id/favourites` - Retrieves a user's favorite movies.
- `POST /api/users/:id/favourites` - Adds a movie to a user's favorites list.
- `DELETE /api/users/:id/favourites/:movieId` - Removes a movie from a user's favorites list.
- `POST /api/users/:id/reviews` - Adds a review for a specific movie.
- `GET /api/users/:id/reviews` - Retrieves all reviews submitted by a user.

**Watchlist API**  
- `GET /api/users/:id/watchlist` - Retrieves a user's watchlist.
- `POST /api/users/:id/watchlist` - Adds a movie to a user's watchlist.
- `DELETE /api/users/:id/watchlist/:movieId` - Removes a movie from a user's watchlist.

---

## Security and Authentication

**Authentication:**  
The API uses JWT (JSON Web Token) for user authentication.  
Users must log in to obtain a valid JWT, which is required to access protected routes.

**Protected Routes:**  
- `GET /api/users/:id/favourites`
- `POST /api/users/:id/favourites`
- `DELETE /api/users/:id/favourites/:movieId`
- `GET /api/users/:id/watchlist`
- `POST /api/users/:id/watchlist`
- `DELETE /api/users/:id/watchlist/:movieId`
- `POST /api/users/:id/reviews`
- `GET /api/users/:id/reviews`

---

## Integrating with React App

**Integration Steps:**  
1. The React app uses the API endpoints to manage user-specific features such as favorites, watchlist, and reviews.
2. The `/api/movies/tmdb/upcoming` and `/api/movies/tmdb/popular` endpoints are used to fetch upcoming and popular movies for display.
3. The `/api/users/:id/favourites` and `/api/users/:id/watchlist` endpoints are used to manage user-specific data.

**Updated Views:**  
- **Favorites Page:** Displays the user's favorite movies using the `/api/users/:id/favourites` endpoint.
- **Watchlist Page:** Displays the user's watchlist using the `/api/users/:id/watchlist` endpoint.
- **Movie Details Page:** Allows users to add reviews using `/api/users/:id/reviews`.

---

## Independent Learning

**Additional Features:**  
- Implementation of JWT authentication for securing API routes.
- Advanced filtering, sorting, and pagination for movie listings.
- Error handling for robust debugging and user feedback.

---
