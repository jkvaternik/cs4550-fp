defmodule Rhapsody.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :text
      add :user_id, references(:users, on_delete: :nothing)
      add :playlist_id, references(:playlists, on_delete: :nothing)

      timestamps()
    end

    create index(:comments, [:user_id])
    create index(:comments, [:playlist_id])
  end
end
