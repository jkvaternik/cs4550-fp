defmodule RhapsodyWeb.RoomChannel do
  use RhapsodyWeb, :channel

  alias Rhapsody.Waiting
  alias Rhapsody.RoomServer

  @impl true
  def join("room:" <> id, payload, socket) do
    if authorized?(payload) do
      RoomServer.start(id)
      socket = socket
      |> assign(:id, id)
      |> assign(:user, "")
      room = RoomServer.peek(id)
     
        IO.puts("YOU DIDI TI")
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
    view = socket.assigns[:id]
    |> RoomServer.genres(genres)
    |> Waiting.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("reset", _, socket) do
    view = socket.assigns[:id]
    |> RoomServer.reset()
    |> Waiting.view()
    broadcast!(socket, "view", view)
    {:reply, {:ok, view}, socket}
  end

  @impl true
  def handle_in("ready", _, socket) do
    user = socket.assigns[:user]
    id = socket.assigns[:id]
    room = RoomServer.ready(id, user)

    if room.gameReady do
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
    id = socket.assigns[:id]
    room = Waiting.view(id)
    if !room.gameReady do
      room = RoomServer.not_ready(id, user)
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