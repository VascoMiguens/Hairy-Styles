const newFormHandler = async (event) => {
  event.preventDefault();

  //Get the values of "add-post"

  // const content = document.querySelector(".form-content").value;

  // finding the input type of the queryselector, finding the first in the array
  const image = document.querySelector("input[type='file']").files[0];
  const data = new FormData();
  // data.append("content", content);
  data.append("image", image);
// Send a POST request to the API endpoint
  const response = await fetch("api/post", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// if the response from the backend routing is ok, then the page is replaced with the /profile page

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
};

const deletePost = async (event) => {
    // if the click event on the event listener, has the attribute "data-id", it will read the id of the post associated with the data-id attribute
  if (event.target.hasAttribute("data-id")) {
    const postId = event.target.getAttribute("data-id");
// this is a DELETE request to delete the associaieted data in the database
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });
// if the response from the backend routing is ok, then the page is replaced with the /dashboard page
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.querySelector(".post-form").addEventListener("submit", newFormHandler);
document.querySelector(".activity").addEventListener("click", deletePost);
