defmodule RhapsodyWeb.AuthController do

  @scopes "user-top-read user-top-read playlist-modify-public"
  @spotify_auth_endpoint "https://accounts.spotify.com/authorize?"
  ## TODO: Move this to config file
  @client_id "006d7532893548a89635c04a92dd1fe6"
  @redirect_url "http://localhost:3000/callback"

  def authenticate(conn, %{"code" => code}) do
    {:ok, body} = HTTPoison.post("https://accounts.spotify.com/api/token", params(code), "")
    IO.inspect(body)
  end

  def params(code) do
    [
      %{
        "grant-type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:3000/callback"
      }
    ]
  end
end
