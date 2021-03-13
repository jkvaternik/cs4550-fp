defmodule RhapsodyWeb.PageController do
  use RhapsodyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
