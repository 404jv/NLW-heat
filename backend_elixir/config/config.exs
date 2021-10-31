# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :backend_elixir,
  ecto_repos: [BackendElixir.Repo]

# Configures the endpoint
config :backend_elixir, BackendElixirWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "UDLAReQ1k5Pq3wYux94xfbiRMqz6k4pkoKza3ytpQo2TGiMY3g1DMFeg2uE2JZLx",
  render_errors: [view: BackendElixirWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: BackendElixir.PubSub,
  live_view: [signing_salt: "UYiUWVPb"]

config :backend_elixir, BackendElixir.Scheduler,
  jobs: [
    {"0 0 * * *", {BackendElixir.Tags.Count, :call, []}}
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
