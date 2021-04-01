defmodule Rhapsody.Repo.Migrations.CreatePlaylists do
  use Ecto.Migration

  def change do
    create table(:playlists) do
      add :name, :string, null: false
      add :description, :string, null: false

      timestamps()
    end

  end
end
