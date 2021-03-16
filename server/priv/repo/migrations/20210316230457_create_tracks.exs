defmodule Rhapsody.Repo.Migrations.CreateTracks do
  use Ecto.Migration

  def change do
    create table(:tracks) do
      add :name, :string, null: false
      add :artist, :string, null: false
      add :album, :string, null: false

      timestamps()
    end

  end
end
