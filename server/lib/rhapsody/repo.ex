defmodule Rhapsody.Repo do
  use Ecto.Repo,
    otp_app: :rhapsody,
    adapter: Ecto.Adapters.Postgres
end
