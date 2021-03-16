defmodule Rhapsody.Tracks.Track do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tracks" do
    field :album, :string
    field :artist, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(track, attrs) do
    track
    |> cast(attrs, [:name, :artist, :album])
    |> validate_required([:name, :artist, :album])
  end
end
