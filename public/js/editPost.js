//function that will run from the event listener below
const updatePostHandler = async (event) => {
  // const postNameUpdate = document.querySelector('#post-name-update').value.trim();
  // const descriptionUpdate = document.querySelector('#post-desc-update').value.trim();
   
  //stops the page refreshing and deleting the data submitted before it makes it back to the database
  event.preventDefault();
  // if the click event on the event listener, has the attribute "data-id", it will read the id of the post associated with the data-id attribute
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
// reads the "value" or content entered into the form area with id post-desc-update
    const descriptionUpdate = document
      .querySelector("#post-desc-update")
      .value.trim();

    console.log(descriptionUpdate);
// this is a PUT request to update the content of the form area with id post-desc-update, with the "value" found in const descriptionUpdate
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ body: descriptionUpdate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
// if the response from the backend routing is ok, the post with the matching id is replaced
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert("Failed to update project");
    }
  }
};

const delButtonHandler = async (event) => {
  // if the click event on the event listener, has the attribute "data-id", it will read the id of the post associated with the data-id attribute
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    // this is a DELETE request to delete the associaieted data in the database
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

// if the response from the backend routing is ok, then the page is replaced with the /profile page
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete project");
    }
  }
};
// query selector to identfy the form to add the event listener onto it, which will run updatePostHandler on "click"
document
  .querySelector(".update-post")
  .addEventListener("click", updatePostHandler);
// query selector to identfy the form to add the event listener onto it, which will run delButtonHandler on "click"
document
  .querySelector(".delete-post")
  .addEventListener("click", delButtonHandler);
