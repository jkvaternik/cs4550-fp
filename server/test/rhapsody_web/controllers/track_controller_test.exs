defmodule RhapsodyWeb.TrackControllerTest do
  use RhapsodyWeb.ConnCase

  alias Rhapsody.Tracks
  alias Rhapsody.Tracks.Track

  @create_attrs %{
    album: "some album",
    artist: "some artist",
    name: "some name"
  }
  @update_attrs %{
    album: "some updated album",
    artist: "some updated artist",
    name: "some updated name"
  }
  @invalid_attrs %{album: nil, artist: nil, name: nil}

  def fixture(:track) do
    {:ok, track} = Tracks.create_track(@create_attrs)
    track
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all tracks", %{conn: conn} do
      conn = get(conn, Routes.track_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create track" do
    test "renders track when data is valid", %{conn: conn} do
      conn = post(conn, Routes.track_path(conn, :create), track: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.track_path(conn, :show, id))

      assert %{
               "id" => id,
               "album" => "some album",
               "artist" => "some artist",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.track_path(conn, :create), track: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update track" do
    setup [:create_track]

    test "renders track when data is valid", %{conn: conn, track: %Track{id: id} = track} do
      conn = put(conn, Routes.track_path(conn, :update, track), track: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.track_path(conn, :show, id))

      assert %{
               "id" => id,
               "album" => "some updated album",
               "artist" => "some updated artist",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, track: track} do
      conn = put(conn, Routes.track_path(conn, :update, track), track: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete track" do
    setup [:create_track]

    test "deletes chosen track", %{conn: conn, track: track} do
      conn = delete(conn, Routes.track_path(conn, :delete, track))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.track_path(conn, :show, track))
      end
    end
  end

  defp create_track(_) do
    track = fixture(:track)
    %{track: track}
  end
end
