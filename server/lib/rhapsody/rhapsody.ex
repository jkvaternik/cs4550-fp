defmodule Rhapsody.Rhapsody do

  def get_top_tracks(access_token) do
    token = "BQBYSa067dZT5TiUWykxkRO4Z0TQ6i9hCHoO02Wl0ibKmg6W3rVpj_olU1BX9iQzJSldesReEMhCI2mr3H--LRTPl3HXBz5DcwaTYSUKADaQ8PhaVDjjVTn-bTtwdhoFLerAX2HwwU0LBcwQdEyuNLYyibfV7JHcK1PDRQ6sT-jC619vjovGpw"
    headers = ["Authorization": "Bearer #{token}"]
    url = "https://api.spotify.com/v1/me/top/tracks?limit=5"

    {:ok, response} = HTTPoison.get(url, headers)
    data = Jason.decode!(response.body)
    items = data["items"]
    |> Enum.map(fn i -> i["name"] end)

    items
  end
end
