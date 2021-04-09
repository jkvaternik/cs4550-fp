defmodule RhapsodyWeb.SpotifyController do
  use RhapsodyWeb, :controller

  alias Rhapsody.APIRequests

def create(conn, %{"request" => request_params}) do
    APIRequests.pushPlaylistToSpotify(request_params["token"], request_params["playlist_id"])

    send_resp(conn, :no_content, "")

end


end