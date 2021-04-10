import Config

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
           url: [scheme: "http", host: "rhapsody.onb6.fun", port: 80],
           secret_key_base: secret_key_base

  _ ->
    nil
end
