defmodule Rhapsody.Rhapsody do

  def get_top_tracks(access_token) do
    headers = ["Authorization": "Bearer #{access_token}"]
    url = "https://api.spotify.com/v1/me/top/tracks?limit=5"

    {:ok, response} = HTTPoison.get(url, headers)
    data = Jason.decode!(response.body)
    items = data["items"]
    |> Enum.map(fn i -> %{name: i["name"], id: i["id"]} end)

    items
  end

  def get_recommendations(access_token, seed_artists, seed_tracks, seed_genres) do
    seed_artists_uri = if seed_artists do
      "seed_artists=" <> URI.encode(seed_artists)
    else
      ""
    end

    seed_tracks_uri = if seed_tracks do
      "seed_tracks=" <> URI.encode(seed_tracks)
    else
      ""
    end

    seed_genres_uri = if seed_genres do
      "seed_genres=" <> URI.encode(seed_genres)
    else
      ""
    end

    headers = ["Authorization": "Bearer #{access_token}"]
    url = "https://api.spotify.com/v1/recommendations?limit=5&market=US&"  <> Enum.join([seed_artists_uri, seed_tracks_uri, seed_genres_uri], "&")

    {:ok, response} = HTTPoison.get(url, headers)
    data = Jason.decode!(response.body)
    tracks = data["tracks"]
    |> Enum.map(fn i -> %{
      name: i["name"],
      id: i["id"],
      artists: i["artists"] |> Enum.map(fn a -> %{name: a["name"], id: a["id"]} end)
    } end)

    tracks
  end

  def get_recommendation_genres(access_token) do
    headers = ["Authorization": "Bearer #{access_token}"]
    url = "https://api.spotify.com/v1/recommendations/available-genre-seeds"

    {:ok, response} = HTTPoison.get(url, headers)
    data = Jason.decode!(response.body)
    genres = data["genres"]

    genres
  end
end
