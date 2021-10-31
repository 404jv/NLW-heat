defmodule BackendElixirWeb.MessagesView do
  use BackendElixirWeb, :view

  def render("create.json", %{message: message}) do
    %{
      result: "Message Created!",
      message: message
    }
  end
end
