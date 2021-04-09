# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Rhapsody.Repo.insert!(%Rhapsody.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Rhapsody.Repo
alias Rhapsody.Users.User
alias Rhapsody.Playlists.Playlist
alias Rhapsody.Contributors.Contributor

defmodule Inject do
  def user(name, email, pass) do
    hash = Argon2.hash_pwd_salt(pass)
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

jimbo = Inject.user("jimbo", "jimbo@gmail.com", "password")
playlist = Repo.insert!(%Playlist{name: "Olivia's Playlist", description: "really good songs"})

contributor = Repo.insert!(%Contributor{playlist_id: 1, user_id: 1})
