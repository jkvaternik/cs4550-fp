defmodule Rhapsody.Waiting do
    def new do
        %{
            players_ready: %{},
            game_started: false,
        }
    end

    def ready(st, name) do

        players_ready = Map.put(st.players_ready, name, true)
        game_started = Enum.all?(Map.values(players_ready))

        %{
        
        players_ready: players_ready,
        game_started: game_started,

        }

    end

    def notReady(st, name) do

        players_ready = Map.put(st.players_ready, name, false)
       
        %{
        
        players_ready: players_ready,
        game_started: game_started,

        }
    end

    def view(st) do
        %{
        
        players_ready: players_ready,
        game_started: game_started,

        }
    end
end


