//will run from the event listener
const newFormHandler = async (event) => {
  //stops the page refreshing and deleting the data submitted before it makes it back to the database
  event.preventDefault();
//pulling the comment data from the form using the following queryselector 
  const commentBody = document.querySelector("#comment-desc").value.trim();

  console.log(commentBody);
//finding the post id from the window href
  const post_id = window.location.href.split("/")[4];

  console.log(post_id);

  // if there is data in the form for the comment body a POST request is made to the route /api/comments and the database will update withe the comment body and the post id will make sure the comment is saved to the correct post
  if (commentBody) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ user_comment: commentBody, post_id: post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
// if the response from the route is ok, then the post page with the correct id is replaced to show the newly added comment
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to create post");
    }
    console.log(post_id);
  }
};
// query selector to identfy the form to add the event listener onto it, which will run newFormHandler on "submit"
document
  .querySelector(".new-project-form")
  .addEventListener("submit", newFormHandler);
