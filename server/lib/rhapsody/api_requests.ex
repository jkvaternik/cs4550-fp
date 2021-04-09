defmodule Rhapsody.APIRequests do


  # Gets the three most common genres from a long list of genres (or all of them if less than 3)
  # Can return an empty list, api call still works if that happens
  def getThreeMostCommon(genres) do

    if length(Enum.uniq(genres)) < 3 do
      Enum.uniq(genres)
    else
      listOfGenres = []
      mapOfGenres = Enum.frequencies(genres)

      amountOne = Enum.max_by(mapOfGenres, fn ({key, value}) -> value end)
      val = Enum.at(Tuple.to_list(amountOne),0)
      mapOfGenres = Map.delete(mapOfGenres, val)
      listOfGenres = listOfGenres ++ [val]

      amountOne = Enum.max_by(mapOfGenres, fn ({key, value}) -> value end)
      val = Enum.at(Tuple.to_list(amountOne),0)
      mapOfGenres = Map.delete(mapOfGenres, val)
      listOfGenres = listOfGenres ++ [val]

      amountOne = Enum.max_by(mapOfGenres, fn ({key, value}) -> value end)
      val = Enum.at(Tuple.to_list(amountOne),0)
      listOfGenres = listOfGenres ++ [val]

      listOfGenres
    end
  end


  ##creates a playlist on spotify for the specific user. Deafults to a public playlist.
  ##Params
  ##String token          the autorization token of a user
  ##String user_id        the user id of a specific user
  ##String playlist_name  The name of the playlist that is to be created on spotify/
  def createPlaylistOnSpotify(token, user_id, playlist_name) do
    url = "https://api.spotify.com/v1/users/" <> user_id <> "/playlists"
    headers = ["Authorization": "Bearer #{token}", "Accept": "Application/json", "Content-Type": "application/json"]
    body = Poison.encode!(%{
      "name": playlist_name,
      "description": "Test2",
      "public": true
    })

    response = HTTPoison.post!(url, body, headers, [])

    response = Poison.decode!(response.body)

    response["id"]
    
    
  end

  def addSongsToPlaylist(token, playlist_id, song_uris) do

    song_uris = Enum.map(song_uris, fn(x) -> "spotify:track:" <> x end)
    url = "https://api.spotify.com/v1/playlists/" <> playlist_id <> "/tracks"
    headers = ["Authorization": "Bearer #{token}", "Accept": "Application/json", "Content-Type": "application/json"]
    body = Poison.encode!(%{
      "uris": song_uris,
    })

    HTTPoison.post(url, body, headers, [])
  end

  # Return a list of ids of the top TWO artists for the given user
  # To be combined with three genres as seeds to the recommender
  def getTopArtists(token) do
    url = "https://api.spotify.com/v1/me/top/artists?limit=2"
    headers = ["Authorization": "Bearer #{token}", "Accept": "Application/json", "Content-Type": "application/json"]
    response = HTTPoison.get!(url,headers)
    response = Poison.decode!(response.body)
    output = Enum.map(response["items"], fn x -> x["id"] end)
    output
  end

  # Outputs a map for a song object from spotify containing name, id, and artist name
  # To be given to the frontend/stored in a resource
  def getSongInfo(token, track) do
    output = %{}
    output = Map.put(output,:id,track["id"])
    output = Map.put(output,:name,track["name"])
    output = Map.put(output,:artist,List.first(track["artists"])["name"])
    output = Map.put(output,:track_picture, getTrackPicture(token, track["id"]))
    output
  end

  # Returns a list of maps for each song recommendation given a list of genres,
  # artists, and an access token
  def getRecommendations(genres,artists,token) do
    genre_param = "seed_genres=" <> Enum.join(genres, "%2C")
    artists_param = "seed_artists=" <> Enum.join(artists, "%2C")
    song_limit = "5"
    url = "https://api.spotify.com/v1/recommendations?limit=" <> song_limit <> "&" <> genre_param <> "&" <> artists_param
    headers = ["Authorization": "Bearer #{token}", "Accept": "Application/json", "Content-Type": "application/json"]
    response = HTTPoison.get!(url,headers)
    response = Poison.decode!(response.body)
    output = Enum.map(response["tracks"], fn x -> getSongInfo(token, x) end)
    output
  end

  def getUserID(token) do
    url = "https://api.spotify.com/v1/me"
    headers = ["Authorization": "Bearer #{token}", "Accept": "Application/json", "Content-Type": "application/json"]
    
    response = HTTPoison.get!(url,headers)
    response = Poison.decode!(response.body)
    response["id"]

  end

  ##Root Function to create the playlist on spotify, and create resource for the front end to access.
  def createPlaylist(tokens, genres, playlist_name) do
    ##get three most common genres
    genres = getThreeMostCommon(genres)

    ##Get the song recomandations of each person
    masterPlaylist = Enum.map(tokens, fn x -> getPersonalPlaylist(x, genres) end)

    ##Complile one master playlist
    masterPlaylist = Enum.reduce(masterPlaylist, fn x, acc -> acc ++ x end)
    ##TODO REMOVE DUPLICATES


    #get the track ids
    track_ids = Enum.map(masterPlaylist, fn x -> x[:id] end)

    
    #get thge user id
    creator_User_ID = getUserID(Enum.at(tokens, 0))

    #create the playlist on spotify
    playlist_id = createPlaylistOnSpotify(Enum.at(tokens, 0), creator_User_ID, playlist_name)

    ok = addSongsToPlaylist(Enum.at(tokens, 0), playlist_id, track_ids)


    masterPlaylist


  end

  def getTrackPicture(token, trackID) do
    url = "https://api.spotify.com/v1/tracks/" <> trackID
    headers = ["Authorization": "Bearer #{token}", "Accept": "Application/json", "Content-Type": "application/json"]
    
    response = HTTPoison.get!(url,headers)
    response = Poison.decode!(response.body)
    Enum.at(response["album"]["images"], 2)["url"]

  end

  # Returns a list of maps for each song recommendation given a list of genres of any size
  # and an access token, using the top 3 genres and the users top two artists as seeds
  def getPersonalPlaylist(token,genres) do
    artists = getTopArtists(token)
    getRecommendations(genres,artists,token)
  end

end
