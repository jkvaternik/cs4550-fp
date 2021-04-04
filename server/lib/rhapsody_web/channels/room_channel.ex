defmodule RhapsodyWeb.RoomChannel do
  use RhapsodyWeb, :channel

  alias Rhapsody.Waiting
  alias Rhapsody.RoomServer

  @impl true
  def join("room:" <> name, payload, socket) do
    if authorized?(payload) do
      RoomServer.start(name)
      socket = socket
      |> assign(:name, name)
      |> assign(:user, "")

      room = RoomServer.peek(name)
      view = Waiting.view(room)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

#   @impl true
#   def handle_in("login", user, socket) do
#     socket = assign(socket, :user, user)
#     view = socket.assigns[:name]
#     |> GameServer.login(user)
#     |> Game.view()
#     broadcast!(socket, "view", view)
#     {:reply, {:ok, view}, socket}
#   end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("genres", genres, socket) do
    view = socket.assigns[:name]
    |> RoomServer.genres(genres)
    |> Waiting.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _, socket) do
    view = socket.assigns[:name]
    |> RoomServer.reset()
    |> Waiting.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("ready", _, socket) do
    user = socket.assigns[:user]
    name = socket.assigns[:name]
    room = RoomServer.ready(name, user)

    if room.game_started do
        #need to do something
        #RoomServer.start_game(game.gamename)
    end
    view = Waiting.view(room)
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

    @impl true
  def handle_in("notReady", _, socket) do
    user = socket.assigns[:user]
    name = socket.assigns[:name]
    room = Waiting.view(name)
    if !room.gameReady do
      room = RoomServer.not_ready(name, user)
    end

    view = Waiting.view(room)
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end


  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end