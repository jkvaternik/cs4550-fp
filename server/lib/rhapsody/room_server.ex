defmodule Rhapsody.RoomServer do
  use GenServer

  alias Rhapsody.BackupAgent
  alias Rhapsody.Waiting

  def reg(id) do
    {:via, Registry, {Rhapsody.RoomReg, id}}
  end

  def start(id) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [id]},
      restart: :permanent,
      type: :worker
    }
    Rhapsody.RoomSup.start_child(spec)
  end

  def start_link(id) do  
    room = BackupAgent.get(id) || Waiting.new
    GenServer.start_link(
      __MODULE__,
      room,
      id: reg(id)
    )
  end

  def reset(id) do
    GenServer.call(reg(id), {:reset, id})
  end

  def peek(id) do
    GenServer.call(reg(id), {:peek, id})
  end

#   def login(id, username) do
#     GenServer.call(reg(name), {:login, name, username})
#   end

  def genres(id, genres) do
    GenServer.call(reg(id), {:genres, id, genres})
  end

  def ready(id, user) do
    GenServer.call(reg(id), {:ready, id, user})
  end

  def not_ready(id, user) do
    GenServer.call(reg(id), {:not_ready, id, user})
  end

  def game_ready(id) do
    GenServer.call(reg(id), {:game_ready, id})
  end

  # implementation

  def init(game) do
    {:ok, game}
  end

  def handle_call({:reset, id}, _from, _game) do
    room = Waiting.new()
    BackupAgent.put(id, room)
    {:reply, room, room}
  end

  def handle_call({:genres, id, genres}, _from, room) do
    room = Waiting.genres(room, genres)
    BackupAgent.put(id, room)
    {:reply, room, room}
  end

  def handle_call({:peek, _id}, _from, room) do
    {:reply, room, room}
  end

#   def handle_call({:login, name, username}, _from, game) do
#     game = Game.login(game, name, username)
#     BackupAgent.put(name, game)
#     {:reply, game, game}
#   end

  def handle_call({:ready, id, user}, _from, room) do
    room = Waiting.ready(room, user)
    BackupAgent.put(id, room)
    {:reply, room, room}
  end

  def handle_call({:not_ready, id, user}, _from, room) do
    room = Waiting.notReady(room, user)
    BackupAgent.put(id, room)
    {:reply, room, room}
  end

  def handle_call({:game_ready, id}, _from, room) do
    room = Waiting.game_ready?(room)
    BackupAgent.put(id, room)
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