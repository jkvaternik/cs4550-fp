defmodule RhapsodyWeb.PlaylistView do
  use RhapsodyWeb, :view
  alias RhapsodyWeb.PlaylistView
  alias RhapsodyWeb.CommentView
  alias RhapsodyWeb.UserView

  def render("index.json", %{playlists: playlists}) do
    %{data: render_many(playlists, PlaylistView, "playlist.json")}
  end

  def render("show.json", %{playlist: playlist}) do
    %{data: render_one(playlist, PlaylistView, "playlist.json")}
  end

  def render("playlist.json", %{playlist: playlist}) do
    %{id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      comments: render_many(playlist.comments, CommentView, "comment.json")}
      # users: render_many(playlist.users, UserView, "user.json")}
  end
end
