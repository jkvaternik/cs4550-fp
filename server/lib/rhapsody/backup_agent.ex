# Based on lecture notes
defmodule Rhapsody.BackupAgent do
  use Agent

  def start_link(_arg) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def put(id, val) do
    Agent.update __MODULE__, fn state ->
      Map.put(state, id, val)
    end
  end

  def get(id) do
    Agent.get __MODULE__, fn state ->
      Map.get(state, id)
    end
  end

end