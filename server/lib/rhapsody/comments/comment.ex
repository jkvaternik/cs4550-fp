defmodule Rhapsody.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string

    belongs_to :playlist, Rhapsody.Playlists.Playlist
    belongs_to :user, Rhapsody.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :playlist_id, :user_id])
    |> validate_required([:body, :playlist_id, :user_id])
  end
end
