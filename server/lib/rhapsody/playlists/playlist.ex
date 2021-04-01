defmodule Rhapsody.Playlists.Playlist do
  use Ecto.Schema
  import Ecto.Changeset

  schema "playlists" do
    field :description, :string
    field :name, :string

    belongs_to :user, Rhapsody.Users.User
    has_many :users, Rhapsody.Users.User
    has_many :comments, Rhapsody.Comments.Comment

    timestamps()
  end

  @doc false
  def changeset(playlist, attrs) do
    playlist
    |> cast(attrs, [:name, :description, :user_id])
    |> validate_required([:name, :description, :user_id])
  end
end
