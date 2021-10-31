defmodule BackendElixir.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      BackendElixir.Repo,
      # Start the Telemetry supervisor
      BackendElixirWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: BackendElixir.PubSub},
      # Start the Endpoint (http/https)
      BackendElixirWeb.Endpoint,
      # Start a worker by calling: BackendElixir.Worker.start_link(arg)
      # {BackendElixir.Worker, arg}
      BackendElixir.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: BackendElixir.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    BackendElixirWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
