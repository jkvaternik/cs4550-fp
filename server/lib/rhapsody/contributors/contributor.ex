defmodule Rhapsody.Contributors.Contributor do
  use Ecto.Schema
  import Ecto.Changeset

  schema "contributors" do

    belongs_to :playlist, Rhapsody.Playlists.Playlist
    belongs_to :user, Rhapsody.Users.User

    timestamps()
  end

  @doc false
  def changeset(contributor, attrs) do
    contributor
    |> cast(attrs, [:playlist_id, :user_id])
    |> validate_required([:playlist_id, :user_id])
  end
end
