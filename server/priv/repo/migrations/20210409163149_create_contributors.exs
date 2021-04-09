defmodule Rhapsody.Repo.Migrations.CreateContributors do
  use Ecto.Migration

  def change do
    create table(:contributors) do
      add :user_id, references(:users)
      add :playlist_id, references(:playlists)

      timestamps()
    end

    create index(:contributors, [:user_id])
    create index(:contributors, [:playlist_id])
    create unique_index(:contributors, [:user_id, :playlist_id])

  end
end
