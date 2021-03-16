defmodule RhapsodyWeb.TrackView do
  use RhapsodyWeb, :view
  alias RhapsodyWeb.TrackView

  def render("index.json", %{tracks: tracks}) do
    %{data: render_many(tracks, TrackView, "track.json")}
  end

  def render("show.json", %{track: track}) do
    %{data: render_one(track, TrackView, "track.json")}
  end

  def render("track.json", %{track: track}) do
    %{id: track.id,
      name: track.name,
      artist: track.artist,
      album: track.album}
  end
end
