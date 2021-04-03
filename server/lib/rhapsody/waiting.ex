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
        game_started: st.game_started,

        }
    end

    def view(st) do
        %{
        
        players_ready: st.players_ready,
        game_started: st.game_started,

        }
    end

    def takeThreeMostCommon(genres) do
        listOfGenres = []
        mapOfGenres = Enum.frequencies(genres)

        amountOne = Enum.max_by(mapOfGenres, fn ({key, value}) -> value end)
        val = Enum.at(Tuple.to_list(amountOne),0)
        mapOfGenres = Map.delete(mapOfGenres, val)
        listOfGenres = listOfGenres ++ [val]
        IO.puts(val)

        amountOne = Enum.max_by(mapOfGenres, fn ({key, value}) -> value end)
        val = Enum.at(Tuple.to_list(amountOne),0)
        mapOfGenres = Map.delete(mapOfGenres, val)
        listOfGenres = listOfGenres ++ [val]
        IO.puts(val)

        amountOne = Enum.max_by(mapOfGenres, fn ({key, value}) -> value end)
        val = Enum.at(Tuple.to_list(amountOne),0)
        listOfGenres = listOfGenres ++ [val]
        IO.puts(val)

        listOfGenres
    end

    def randomSample(genres) do
        listOfGenres = []

        listOfGenres = Enum.take_random(genres, 3)

        listOfGenres
    end
end


