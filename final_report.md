# Rhapsody: CS4550 Final Report

## Meta:

### Team Members:
- Jamie Kuesel
- Olivia Blier
- Jim Howe
- Jaime Kvaternik

### Our App URL:  
https://rhapsody.onb6.fun

### Github Link:
https://github.com/jkvaternik/rhapsody.git

### Deployment Status:
Our app is deployed and working wonderfully!

### Team Member Contributions:

- Jamie: 
  - Jamie worked on setting up resources, and a lot of the backend
    logic behind getting recommendations, top tracks, and pushing a
    playlist to spotify. There were a multitude of requests that
    needed to be made before a playlist could be pushed. He worked on
    creating a playlist on Spotify, addings the songs to it, and
    getting the track picture for each song. He also worked heavily on
    the Final Report document. 

- Olivia:
  - Olivia Worked on a “Waiting Room page” where users could select
    from a variety of genres to use for a playlist. Furthemore, she
    worked on setting up the sockets and channels to send information
    from the frontend to the backend. She also worked with Jaime to
    create the playlist page.

- Jim:
  - Jim worked on figuring out OAuth and a lot of the backend logic
    behind getting recommendations, top tracks, and pushing a playlist
    to spotify. He focused on compiling the top group genres, picking
    three

- Jaime: 
  - Jaime worked on finalizing OAuth, along with setting up much of
    the front end up. He spent time figuring out how to effectively
    retrieve a token from Spotify’s API and how best to store it. He
    worked on the login workflow on the frontend and backend, feed
    page, and worked with Olivia to create a playlist page and connect
    to the backend.


## App:

### Functionality:
Rhapsody is a website where users can create group Spotify playlists
to collaborate on with their friends or peers. The playlists will
consist of a combination of Spotify recommendations for all the users
within selected genres by the group. The Playlist appears on a page on
the Rhapsody website, from which it can also be pushed to spotify for
the users to enjoy.

### Changes Since Proposal:

The biggest change we had since the proposal is how exactly we compile
a playlist for a group of users. Initially, we thought that we would
choose a single genre and use many of the various users' top tracks to
make a recommendation request from Spotify. However, after gaining
more experience with the Spotify API, we realized that there were some
limitations. Requesting recommendations could only have a total
combination of 5 artists, tracks, or genres. We decided we wanted both
individuality as well harmony among the playlist. That being, users
would all have relative songs, but the playlist would be cohesive and
not all over the place. To achieve this, we decided to have users pick
3 genres as “votes” for the playlist themes. The top 2 genres are then
collected based on all the votes from a playlist’s users. A request to
Spotify is made for each user using 2 of their top artists and the 3
genres voted on by the group. All the recommendations for the users
are then compiled into a single playlist for all users to enjoy!

### User Interaction:

Users interact with our app by forming groups with each other, and
creating a playlist which takes all of their interests into account.
When they first visit our website they must make an account with a
username, email, and password, before using this information to log
into the app. After they are logged in, they can authenticate with the
Spotify api by utilizing our OAuth implementation, which ties an OAuth
token to their user session to be used with future api requests. After
being fully authenticated, users can form groups by setting a group
name, and then all joining the same named group. After joining they
can each select up to 3 genres of music they want included in their
playlist, and select when they are ready. By doing all of this, the
user can have a custom playlist created and automatically added to
their spotifys, which they can all enjoy together!

## Project Requirement Fulfillments:

### Backend:
Our backend is a phoenix application that includes all the logic
behind our complex recommendation picker algorithm and handles sending
api requests to Spotify and pushing a final playlist. It also exposes
several JSON elements that the front end can call upon such as a
specific playlist resource.

### Frontend:
Our front end is a react application. It sends API requests to our
server for JSON files of our resources such as playlists. It also uses
channels to send playlist group information from our front end to our
backend. It is deployed as a static site.

### Deployment:
Our app is deployed to Olivia Blier’s VPS. 

### User Accounts and Password Authentication:
We implemented both user accounts and local password authentication.
Users also authenticate through their Spotify account (this grants the
app access to get information about their Spotify accounts and push
playlists to them).

### Postgres:
Users and Playlists are stored in a Postgres database

### External API Authentication:
Users authenticate using their Spotify account. This is done using
Oauth in our backend.

### Phoenix Channels:
Our phoenix channels get and push real time updates to users. Mainly,
whether players are ready or not in a waiting room, and the list of
genres that they selected.

### Neat Feature:
We have two neat features. Our first is our algorithm that takes in
the top artists of contributors to a playlist, and also takes the top
3 voted genres and then requests recommendations for each user.

The second neat feature is our “Push to Spotify” button that will push
a created playlist to the user who clicked the button’s Spotify..


### Application Testing:

We completed extensive testing on our website. Primarily, making sure
it worked with a single user as well as multiple users. The absolutely
key components to test were 

- Making sure a playlist did not submit until all users were ready
- All the contributors have access and appear on the playlist
- Push to spotify works correctly
- User joins correct channel for playlist

Obviously, we tested all other smaller components. But these were the
key features we wanted to make sure worked. 

Our testing revealed many bugs in our code. We were having the most
difficulty with contributors being added to the playlist correctly.
After creating a playlist, it was only available to the person who
initiated the creation, and not all users. We had to switch some lines
around, mainly when a user logs in and when they are added as a
contributor in order to make this work properly.

We tested many different permutations of users, genres selected, users
in certain playlists, etc. in order to ensure our application was
working properly.



## Beyond The Project Requirements:

### Complexity:
There is some complexity in how the group playlist is actually formed.
Users in a playlist group will select 3 genres from a list of genres.
The top 3 votes will be used for the creation of a playlist. Our
algorithm selects recommendations for each user using that user's top
artists and the genres selected for the playlist from the group. This
combination of an individual's top artists and the groups selected
genres adds both individuality and mood to a playlist. Having a
cluster of users recommended songs without cohesiveness through common
genres would be a mess. 

## Project Challenges and Solutions:

### Oauth:
Perhaps our biggest challenge for this project was getting Oauth to
work properly. Both Jim and Jaime attempted to take looks at it. We
also initially tried looking at it as a group. We ran into API as well
as elixir issues consistently. After much research, we discovered that
there was no OAuth client library that facilitated an OAuth workflow
and we needed to create our own. To do this, Jaime researched the
Spotify API’s OAuth example and built a React/Elixir workflow to carry
out the suggested paths. To accomplish this, the user is redirected to
Spotify to authorize Rhapsody to connect to Spotify. This returns a
code which is sent back to Spotify to retrieve an authentication
access token that will be used to access the API.


### Deployment Issues:

We had many more issues with deployment than we expected. We thought
it would be practically identical to our HW9 but there was some added
complexity here. Because we were making api requests to Spotify there
were some extra areas we needed to change. 

To solve this, we had to do a lot of debugging to figure out what
portions of our development code was different from our production
code. We had a lot of difficulty with the authentication portion. We
were getting a token back from Spotify but it was becoming null
somewhere. We found out that we forgot to change a few localhost:3000s
to our actual website URL.



