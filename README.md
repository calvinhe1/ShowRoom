# ShowRoom
A social networking website that allows opportunities for people who watch TV shows to come together. Users are able to view and learn more about shows, rate, comment, and communicate on their shows of interest, as well as set up their own profiles to be seen by other people.

## Features (User)
* Create a new account and login/logout
* Search for shows in the header
* View shows on the home page, including shows separated by categories such as genres (action, drama, fantasy), most talked about shows, and highest-rated shows
* View most recent comments on the home page
* Edit your own profile’s profile picture, biography, and authentication information
* Visit other commenters’ profiles and see their profile info
* Visit individual show pages which displays information such as the rating of the show, genres the show falls under, title, description, and cover photo
    * Add/delete your own comments
    * Upvote/downvote comments
    * Rate shows from a scale of 1-5 stars
    * View individual episode pages separated by seasons which displays information such as season number, episode number, title, release status, description, and episode photo
    * See a list of recommended shows 

## Features (Admin)
* Admins can perform the same actions as a user.
* Delete other people’s comments
* Add and edit shows such as updating titles, descriptions, genres, and cover photos of the show
* Add and edit episodes and seasons, such as updating episode numbers, titles, release status, description, and episode photo

# URL of deployed app
https://boiling-taiga-05000.herokuapp.com/

# Local Setup
The backend and frontend both need to be running simultaneously for the app to function locally. To do this, open 2 terminals, with one at the project root directory, and the other one at the client folder (with `cd client` from root directory).
From the root directory, run `yarn install` to install all node_modules needed for the backend, then run `yarn start`. If the connection was successful, you should see the following message:
    Listening on port 5000…
    Database connection successful
From the client folder, run `yarn install` to install the node_modules for the frontend, then run `yarn start`. A chrome page should automatically open, if it doesn’t, go to http://localhost:3000/ to view the web app.

Ensure you are running a local mongoDB, and if your node environment defaults to production, you may have to change config.js to always return the development configuration, as ours will reach out to our cloud DB. 
