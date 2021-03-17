## Attribution: OAuth2 Github Readme Example

defmodule Rhapsody.Auth do
  use OAuth2.Strategy
  alias OAuth2.Strategy.AuthCode

  @config [
    strategy: __MODULE__,
    client_id: System.get_env("SPOTIFY_CLIENT_ID"),
    site: "https://api.spotify.com/",
    redirect_uri: "http://localhost:3000/",
    auth_url: "https://https://accounts.spotify.com/authorize",
    token_url: "https://accounts.spotify.com/api/token",
    scope: "user-top-read"
  ]

  def new do
    Application.get_env(:rhapsody, __MODULE__)
    |> Keyword.merge(@config)
    |> OAuth2.Client.new()
  end

  def new(token) do
    %{new() | token: OAuth2.AccessToken.new(token)}
  end

  def get_token!(params \\ [], headers \\ []) do
    OAuth2.Client.get_token!(new(), params, headers)
  end

  def authorize_url!(params \\ []) do
    OAuth2.Client.authorize_url!(new(), params)
  end

  # Strategy Callbacks

  def authorize_url(client, params) do
    AuthCode.authorize_url(client, params)
  end

  def get_token(client, params, headers) do
    client
    |> put_header("Accept", "application/json")
    |> AuthCode.get_token(params, headers)
  end

  # def client do
  #   OAuth2.Client.new([
  #     strategy: __MODULE__,
  #     client_id: System.get_env("SPOTIFY_CLIENT_ID"),
  #     site: "https://api.spotify.com/",
  #     redirect_uri: "http://localhost:3000/",
  #     auth_url: "https://https://accounts.spotify.com/authorize",
  #     token_url: "https://accounts.spotify.com/api/token",
  #     scope: "user-top-read"
  #   ])
  #   |> OAuth2.Client.put_serializer("application/json", Jason)
  # end

  # def authorize_url! do
  #   OAuth2.Client.authorize_url!(client())
  # end

  # # you can pass options to the underlying http library via `opts` parameter
  # def get_token!(params \\ [], headers \\ [], opts \\ []) do
  #   OAuth2.Client.get_token!(client(), params, headers, opts)
  # end

  # # Strategy Callbacks

  # def authorize_url(client, params) do
  #   OAuth2.Strategy.AuthCode.authorize_url(client, params)
  # end

  # def get_token(client, params, headers) do
  #   client
  #   |> put_header("accept", "application/json")
  #   |> OAuth2.Strategy.AuthCode.get_token(params, headers)
  # end
end
