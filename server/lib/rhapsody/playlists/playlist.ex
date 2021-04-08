defmodule Rhapsody.Playlists.Playlist do
  use Ecto.Schema
  import Ecto.Changeset

  schema "playlists" do
    field :description, :string
    field :name, :string

    has_many :users, Rhapsody.Users.User
    has_many :comments, Rhapsody.Comments.Comment
    has_many :tracks, Rhapsody.Tracks.Track

    timestamps()
  end

  @doc false
  def changeset(playlist, attrs) do
    playlist
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
