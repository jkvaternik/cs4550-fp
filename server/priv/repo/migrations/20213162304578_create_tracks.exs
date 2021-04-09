defmodule Rhapsody.Repo.Migrations.CreateTracks do
  use Ecto.Migration

  def change do
    create table(:tracks) do
      add :name, :string, null: false
      add :artist, :string, null: false
      add :spotifyID, :string, null: false
      add :track_picture, :string, null: false
      add :playlist_id, references(:playlists, on_delete: :nothing), null: false

      timestamps()
    end

  end
end
