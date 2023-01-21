const newFormHandler = async (event) => {
    event.preventDefault();
  
    const commentBody = document.querySelector("#comment-desc").value.trim();
  
    console.log(commentBody);
  
    const post_id = window.location.href.split('/')[4];
  
    console.log(post_id);
  
    if (commentBody) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ user_comment: commentBody, post_id: post_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
  
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        document.location.replace(`/post/${id}`);
      } else {
        alert('Failed to create post');
      }
      console.log(post_id);
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);