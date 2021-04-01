defmodule Rhapsody.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    field :user_id, :id
    field :playlist_id, :id

    belongs_to :user, Rhapsody.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :user_id])
    |> validate_required([:body, :user_id])
  end
end
