const newFormHandler = async (event) => {
  event.preventDefault();

  //Get the values of "add-post"

  // const content = document.querySelector(".form-content").value;
  const image = document.querySelector("input[type='file']").files[0];
  const data = new FormData();
  // data.append("content", content);
  data.append("image", image);

  const response = await fetch("api/post", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
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
