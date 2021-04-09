defmodule Rhapsody.ContributorsTest do
  use Rhapsody.DataCase

  alias Rhapsody.Contributors

  describe "contributors" do
    alias Rhapsody.Contributors.Contributor

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def contributor_fixture(attrs \\ %{}) do
      {:ok, contributor} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Contributors.create_contributor()

      contributor
    end

    test "list_contributors/0 returns all contributors" do
      contributor = contributor_fixture()
      assert Contributors.list_contributors() == [contributor]
    end

    test "get_contributor!/1 returns the contributor with given id" do
      contributor = contributor_fixture()
      assert Contributors.get_contributor!(contributor.id) == contributor
    end

    test "create_contributor/1 with valid data creates a contributor" do
      assert {:ok, %Contributor{} = contributor} = Contributors.create_contributor(@valid_attrs)
    end

    test "create_contributor/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Contributors.create_contributor(@invalid_attrs)
    end

    test "update_contributor/2 with valid data updates the contributor" do
      contributor = contributor_fixture()
      assert {:ok, %Contributor{} = contributor} = Contributors.update_contributor(contributor, @update_attrs)
    end

    test "update_contributor/2 with invalid data returns error changeset" do
      contributor = contributor_fixture()
      assert {:error, %Ecto.Changeset{}} = Contributors.update_contributor(contributor, @invalid_attrs)
      assert contributor == Contributors.get_contributor!(contributor.id)
    end

    test "delete_contributor/1 deletes the contributor" do
      contributor = contributor_fixture()
      assert {:ok, %Contributor{}} = Contributors.delete_contributor(contributor)
      assert_raise Ecto.NoResultsError, fn -> Contributors.get_contributor!(contributor.id) end
    end

    test "change_contributor/1 returns a contributor changeset" do
      contributor = contributor_fixture()
      assert %Ecto.Changeset{} = Contributors.change_contributor(contributor)
    end
  end
end
