const newFormHandler = async (event) => {
  event.preventDefault();

  //Get the values of "add-post"
  const title = document.querySelector(".form-title").value;
  const content = document.querySelector(".form-content").value;

  const response = await fetch("api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

const deletePost = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const postId = event.target.getAttribute("data-id");

    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.querySelector(".post-form").addEventListener("submit", newFormHandler);
document.querySelector(".activity").addEventListener("click", deletePost);
