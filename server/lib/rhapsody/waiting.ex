defmodule Rhapsody.Waiting do
    alias Rhapsody.APIRequests

    def new do
        %{
            playlist_name: "",
            players_ready: %{},
            game_started: false,
            genres: [],
        }
    end

    def genres(st, genres) do
        genres = st.genres ++ genres

        %{
        
        playlist_name: st.playlist_name,
        players_ready: st.players_ready,
        game_started: st.game_started,
        genres: genres,

        }

    end

    def login(st, user) do
        
        players_ready = Map.put_new(st.players_ready, user, false)

        %{
        
        playlist_name: st.playlist_name,
        players_ready: players_ready,
        game_started: st.game_started,
        genres: st.genres,

        }

    end

    def playlist(st, playlist) do

        %{
        
        playlist_name: playlist,
        players_ready: st.players_ready,
        game_started: st.game_started,
        genres: st.genres,

        }

    end

    def ready(st, user) do

        players_ready = Map.put(st.players_ready, user, true)
        game_started = Enum.all?(Map.values(players_ready))

        if (game_started) do
            Rhapsody.APIRequests.createPlaylist(Map.keys(players_ready), st.genres, URI.decode(st.playlist_name))
        end


        %{
        
        playlist_name: st.playlist_name,
        players_ready: players_ready,
        game_started: game_started,
        genres: st.genres,

        }

    end

    def notReady(st, user) do

        players_ready = Map.put(st.players_ready, user, false)
       
        %{
        
        playlist_name: st.playlist_name,
        players_ready: players_ready,
        game_started: st.game_started,
        genres: st.genres,

        }
    end

    def view(st) do
        %{
        
        playlist_name: st.playlist_name,
        players_ready: st.players_ready,
        game_started: st.game_started,
        genres: st.genres,

        }
    end
end


