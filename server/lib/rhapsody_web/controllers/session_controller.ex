## Following Nat Tuck's PhotoBlog example
## https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/11-photoblog/notes.md

defmodule RhapsodyWeb.SessionController do
  use RhapsodyWeb, :controller

  def create(conn, %{"name" => name}) do
    user = Rhapsody.Users.get_user_by_name(name)
    sess = %{
      user_id: user.id,
      name: user.name,
      token: Phoenix.Token.sign(conn, "user_id", user.id)
    }

    conn
    |> put_resp_header(
      "content-type",
      "application/json; charset=UTF-8")
    |> send_resp(:created, Jason.encode!(sess))
  end
end
