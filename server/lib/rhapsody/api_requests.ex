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
  def getSongInfo(track) do
    output = %{}
    output = Map.put(output,:id,track["id"])
    output = Map.put(output,:name,track["name"])
    output = Map.put(output,:artist,List.first(track["artists"])["name"])
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
    output = Enum.map(response["tracks"], fn x -> getSongInfo(x) end)
    output
  end

  # Returns a list of maps for each song recommendation given a list of genres of any size
  # and an access token, using the top 3 genres and the users top two artists as seeds
  def doThing(genres,token) do
    genres = getThreeMostCommon(genres)
    artists = getTopArtists(token)
    getRecommendations(genres,artists,token)
  end

end