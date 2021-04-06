defmodule RhapsodyWeb.PageController do
  @moduledoc """
  Static page controller
  """

  use RhapsodyWeb, :controller

  @client_id "006d7532893548a89635c04a92dd1fe6"
  @secret "5494091e5f3e42038eb1853784834cbb"

  def index(conn, _params) do
    render(conn, "index.html", current_user: get_session(conn, :current_user))
  end

  def authenticate(conn, %{"code" => code}) do
    {:ok, resp} = HTTPoison.post("https://accounts.spotify.com/api/token", params(code),  [
      {"Authorization", "Basic #{:base64.encode("#{@client_id}:#{@secret}")}"},
      {"Content-Type", "application/x-www-form-urlencoded"}
    ])

    {:ok, body} = resp |> Map.get(:body) |> Jason.decode()

    conn
    |> put_resp_header(
      "content-type",
      "application/json; charset=UTF-8")
    |> send_resp(200, Jason.encode!(body))
  end

  def refresh(conn, %{"token" => token}) do

  end

  def params(code) do
    URI.encode_query(%{"grant_type" => "authorization_code", "code" => "#{code}", "redirect_uri" => "http://localhost:3000/auth"})
  end
end
