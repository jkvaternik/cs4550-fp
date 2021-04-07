## Following Nat Tuck's PhotoBlog example
## https://github.com/NatTuck/scratch-2021-01/blob/master/notes-4550/11-photoblog/notes.md

defmodule RhapsodyWeb.SessionController do
  use RhapsodyWeb, :controller

  def create(conn, %{"email" => email, "password" => password}) do
    user = Rhapsody.Users.authenticate(email, password)

    if user do
      sess = %{
        user_id: user.id,
        email: user.email,
        token: Phoenix.Token.sign(conn, "user_id", user.id)
      }

      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(:created, Jason.encode!(%{session: sess}))
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(:unauthorized, Jason.encode!(%{error: "Failed to login"}))
    end
  end
end
