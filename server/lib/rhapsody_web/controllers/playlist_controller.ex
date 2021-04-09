defmodule RhapsodyWeb.PlaylistController do
  use RhapsodyWeb, :controller

  alias Rhapsody.APIRequests
  alias Rhapsody.Playlists
  alias Rhapsody.Playlists.Playlist

  action_fallback RhapsodyWeb.FallbackController

  def index(conn, _params) do
    playlists = Playlists.list_playlists()
    |> Enum.map(fn p -> Playlists.load_playlist(p) end)

    render(conn, "index.json", playlists: playlists)
  end

  def create(conn, %{"playlist" => playlist_params}) do
    tokens = String.split(playlist_params["tokens"], ",")
    genres = String.split(playlist_params["genres"], ",")
    APIRequests.createPlaylist(tokens, genres, playlist_params["playlist_name"])

    with {:ok, %Playlist{} = playlist} <- Playlists.create_playlist(playlist_params) do
      playlist = playlist

      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.playlist_path(conn, :show, playlist))
      |> render("show.json", playlist: playlist)
    end
  end

  def show(conn, %{"id" => id}) do

    playlist = Playlists.get_playlist!(id)
    |> Playlists.load_playlist()

    IO.inspect(playlist)

    render(conn, "show.json", playlist: playlist)
  end

  def update(conn, %{"id" => id, "playlist" => playlist_params}) do
    playlist = Playlists.get_playlist!(id)

    with {:ok, %Playlist{} = playlist} <- Playlists.update_playlist(playlist, playlist_params) do
      render(conn, "show.json", playlist: playlist)
    end
  end

  def delete(conn, %{"id" => id}) do
    playlist = Playlists.get_playlist!(id)

    with {:ok, %Playlist{}} <- Playlists.delete_playlist(playlist) do
      send_resp(conn, :no_content, "")
    end
  end
end
