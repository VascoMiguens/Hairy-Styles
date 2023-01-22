var postElements = document.querySelectorAll(".profile-post");
postElements.forEach(function (element) {
  element.addEventListener("click", function () {
    //get the post id from data-id attribute
    var postId = this.dataset.id;
    //redirect to the post page
    window.location.href = postId;
  });
});
