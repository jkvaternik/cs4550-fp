defmodule Rhapsody.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Rhapsody.Repo,
      # Start the Telemetry supervisor
      RhapsodyWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Rhapsody.PubSub},
      # Start the Endpoint (http/https)
      RhapsodyWeb.Endpoint,
      # Start a worker by calling: Rhapsody.Worker.start_link(arg)
      # {Rhapsody.Worker, arg}
      Rhapsody.BackupAgent,
      Rhapsody.RoomSup,
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Rhapsody.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    RhapsodyWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
