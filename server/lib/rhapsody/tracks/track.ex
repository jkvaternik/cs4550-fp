defmodule Rhapsody.Tracks.Track do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tracks" do
    field :artist, :string
    field :name, :string
    field :spotifyID, :string

    belongs_to :playlist, Rhapsody.Playlists.Playlist

    timestamps()
  end

  @doc false
  def changeset(track, attrs) do
    track
    |> cast(attrs, [:name, :artist, :spotifyID, :playlist_id])
    |> validate_required([:name, :artist, :spotifyID, :playlist_id])
  end
end
