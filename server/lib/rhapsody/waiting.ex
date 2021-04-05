defmodule Rhapsody.Waiting do
    def new do
        %{
            players_ready: %{},
            game_started: false,
            genres: [],
        }
    end

    def genres(st, genres) do
        IO.puts("HI!")
        genres = st.genres ++ genres

        %{
        
        players_ready: st.players_ready,
        game_started: st.game_started,
        genres: genres,

        }

    end

    def ready(st, user) do

        players_ready = Map.put(st.players_ready, user, true)
        game_started = Enum.all?(Map.values(players_ready))

        %{
        
        players_ready: players_ready,
        game_started: game_started,
        genres: st.genres,

        }

    end

    def notReady(st, user) do

        players_ready = Map.put(st.players_ready, user, false)
       
        %{
        
        players_ready: players_ready,
        game_started: st.game_started,
        genres: st.genres,

        }
    end

    def view(st) do
        %{
        
        players_ready: st.players_ready,
        game_started: st.game_started,
        genres: st.genres,

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


