defmodule Rhapsody.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias NotQwerty123.PasswordStrength

  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string

    has_many :comments, Rhapsody.Comments.Comment
    has_many :contributors, Rhapsody.Contributors.Contributor

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email])
    # |> validate_password(attrs["password"])
    |> add_password_hash(attrs["password"])
    |> validate_required([:name, :email, :password_hash])
  end

  def add_password_hash(cset, nil) do
    cset
  end

  def add_password_hash(cset, password) do
    change(cset, Argon2.add_hash(password))
  end

  # def validate_password(cset, nil) do
  #   cset
  # end

  # def validate_password(cset, password) do
  #   case PasswordStrength.strong_password?(password) do
  #     {:ok, _password} -> cset
  #     {:error, message} -> add_error(cset, :password, message)
  #   end
  # end
end
