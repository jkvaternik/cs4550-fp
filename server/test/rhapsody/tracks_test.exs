defmodule Rhapsody.TracksTest do
  use Rhapsody.DataCase

  alias Rhapsody.Tracks

  describe "tracks" do
    alias Rhapsody.Tracks.Track

    @valid_attrs %{album: "some album", artist: "some artist", name: "some name"}
    @update_attrs %{album: "some updated album", artist: "some updated artist", name: "some updated name"}
    @invalid_attrs %{album: nil, artist: nil, name: nil}

    def track_fixture(attrs \\ %{}) do
      {:ok, track} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tracks.create_track()

      track
    end

    test "list_tracks/0 returns all tracks" do
      track = track_fixture()
      assert Tracks.list_tracks() == [track]
    end

    test "get_track!/1 returns the track with given id" do
      track = track_fixture()
      assert Tracks.get_track!(track.id) == track
    end

    test "create_track/1 with valid data creates a track" do
      assert {:ok, %Track{} = track} = Tracks.create_track(@valid_attrs)
      assert track.album == "some album"
      assert track.artist == "some artist"
      assert track.name == "some name"
    end

    test "create_track/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tracks.create_track(@invalid_attrs)
    end

    test "update_track/2 with valid data updates the track" do
      track = track_fixture()
      assert {:ok, %Track{} = track} = Tracks.update_track(track, @update_attrs)
      assert track.album == "some updated album"
      assert track.artist == "some updated artist"
      assert track.name == "some updated name"
    end

    test "update_track/2 with invalid data returns error changeset" do
      track = track_fixture()
      assert {:error, %Ecto.Changeset{}} = Tracks.update_track(track, @invalid_attrs)
      assert track == Tracks.get_track!(track.id)
    end

    test "delete_track/1 deletes the track" do
      track = track_fixture()
      assert {:ok, %Track{}} = Tracks.delete_track(track)
      assert_raise Ecto.NoResultsError, fn -> Tracks.get_track!(track.id) end
    end

    test "change_track/1 returns a track changeset" do
      track = track_fixture()
      assert %Ecto.Changeset{} = Tracks.change_track(track)
    end
  end
end
