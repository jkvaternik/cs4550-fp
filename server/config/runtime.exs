import Config

config :ueberauth, Ueberauth.Strategy.Spotify.OAuth,
       client_id: "006d7532893548a89635c04a92dd1fe6",
       client_secret: "5494091e5f3e42038eb1853784834cbb",
       redirect_uri: "http://localhost:3000"

case config_env() do
  :prod ->
    secret_key_base =
      System.get_env("SECRET_KEY_BASE") ||
        raise """
        environment variable SECRET_KEY_BASE is missing.
        You can generate one by calling: mix phx.gen.secret
        """

    config :rhapsody, RhapsodyWeb.Endpoint,
           http: [
             port: String.to_integer(System.get_env("PORT") || "4000"),
             transport_options: [socket_opts: [:inet6]]
           ],
           url: [scheme: "https", host: "rhapsody.herokuapp.com", port: 443],
           force_ssl: [rewrite_on: [:x_forwarded_proto]],
           secret_key_base: secret_key_base

  _ ->
    nil
end
