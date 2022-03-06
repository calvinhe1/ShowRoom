# team27

# Starting the application:

Run `yarn install` to install all node modules from package.json

Run `yarn start` to run application on http://localhost:3000

# Login credentials:
Standard user: username: user, password: user 
Admin user: username: admin, password: admin

Alternatively, you can login as a temporary user from the Signup page. Note that this credential is not stored so you will not be able to login with the newly created credentials upon logout. 

# Features:

From logged out state:
Sign up
Log in
Browse shows on home page
Search for a show
Look at individual show page (including show information, ratings, and comments)

From logged in as standard/admin user state:
Add/change rating for a show
Comment on show
Delete own comments
View own profile (including user’s top rated shows and recent comments)
Change login credentials
Log out

From logged in as admin only user state:
Edit show information (including title, genre etc.)
Add a new show
Delete any user’s comments
Manage users 
Manage shows


# Libraries:
    For the frontend features, we used React Hooks and related libraries such as React Router Dom for routing. Page components are created from HTML components and styled with CSS. 
