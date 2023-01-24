const updatePostHandler = async (event) => {
  // const postNameUpdate = document.querySelector('#post-name-update').value.trim();
  // const descriptionUpdate = document.querySelector('#post-desc-update').value.trim();
  event.preventDefault();
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);

    const descriptionUpdate = document
      .querySelector("#post-desc-update")
      .value.trim();

    console.log(descriptionUpdate);

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ body: descriptionUpdate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert("Failed to update project");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector(".update-post")
  .addEventListener("click", updatePostHandler);

document
  .querySelector(".delete-post")
  .addEventListener("click", delButtonHandler);
