defmodule Rhapsody.RoomServer do
  use GenServer

  alias Rhapsody.BackupAgent
  alias Rhapsody.Waiting

  def reg(name) do
    {:via, Registry, {Rhapsody.RoomReg, name}}
  end

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker
    }
    Rhapsody.RoomSup.start_child(spec)
  end

  def start_link(name) do  
    room = BackupAgent.get(name) || Waiting.new
    GenServer.start_link(
      __MODULE__,
      room,
      name: reg(name)
    )
  end

  def reset(name) do
    GenServer.call(reg(name), {:reset, name})
  end

  def peek(name) do
    GenServer.call(reg(name), {:peek, name})
  end

  def login(name, username) do
    GenServer.call(reg(name), {:login, name, username})
  end

  def genres(name, genres) do
    GenServer.call(reg(name), {:genres, name, genres})
  end

  def playlist(name) do
    GenServer.call(reg(name), {:playlist, name})
  end

  def ready(name, user) do
    GenServer.call(reg(name), {:ready, name, user})
  end

  def not_ready(name, user) do
    GenServer.call(reg(name), {:not_ready, name, user})
  end

  def game_ready(name) do
    GenServer.call(reg(name), {:game_ready, name})
  end
  
  # implementation

  def init(game) do
    {:ok, game}
  end

  def handle_call({:reset, name}, _from, _game) do
    room = Waiting.new()
    BackupAgent.put(name, room)
    {:reply, room, room}
  end

  def handle_call({:genres, name, genres}, _from, room) do
    room = Waiting.genres(room, genres)
    BackupAgent.put(name, room)
    {:reply, room, room}
  end

  def handle_call({:playlist, name}, _from, room) do
    room = Waiting.playlist(room, name)
    BackupAgent.put(name, room)
    {:reply, room, room}
  end

  def handle_call({:peek, _name}, _from, room) do
    {:reply, room, room}
  end

  def handle_call({:login, name, username}, _from, game) do
    game = Waiting.login(game, username)
    BackupAgent.put(name, game)
    {:reply, game, game}
  end

  def handle_call({:ready, name, user}, _from, room) do
    room = Waiting.ready(room, user)
    BackupAgent.put(name, room)
    {:reply, room, room}
  end

  def handle_call({:not_ready, name, user}, _from, room) do
    room = Waiting.notReady(room, user)
    BackupAgent.put(name, room)
    {:reply, room, room}
  end

  def handle_call({:game_ready, name}, _from, room) do
    room = Waiting.game_ready?(room)
    BackupAgent.put(name, room)
    {:reply, room, room}
  end

# RhapsodyWeb.Endpoint.broadcast!(
#       "room:" <> room.roomID,
#       "view",
#       view)
#     if room.gameReady do
#       Process.send_after(self(), {:show_guesses, name}, 30_000)
#     end
#     {:noreply, game}
#   end

end