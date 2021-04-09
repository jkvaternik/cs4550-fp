defmodule RhapsodyWeb.ContributorView do
  use RhapsodyWeb, :view
  alias RhapsodyWeb.ContributorView

  alias RhapsodyWeb.PlaylistView
  alias RhapsodyWeb.UserView

  def render("index.json", %{contributors: contributors}) do
    %{data: render_many(contributors, ContributorView, "contributor.json")}
  end

  def render("show.json", %{contributor: contributor}) do
    %{data: render_one(contributor, ContributorView, "contributor.json")}
  end

  def render("contributor.json", %{contributor: contributor}) do
    %{id: contributor.id}
  end

  def render("contributor_user.json", %{contributor: contributor}) do
    render_one(contributor.user, UserView, "user.json")
  end

  def render("contributor_playlist.json", %{contributor: contributor}) do
    render_one(contributor.playlist, PlaylistView, "playlist.json")
  end
end
