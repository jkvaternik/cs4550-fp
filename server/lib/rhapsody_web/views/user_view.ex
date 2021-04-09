defmodule RhapsodyWeb.UserView do
  use RhapsodyWeb, :view
  alias RhapsodyWeb.UserView

  alias RhapsodyWeb.ContributorView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user_info.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email}
  end

  def render("user_info.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      contributors: render_many(user.contributors, ContributorView, "contributor_playlist.json")
    }
  end
end
