const updatePostHandler = async (event) => {
    // const postNameUpdate = document.querySelector('#post-name-update').value.trim();
    // const descriptionUpdate = document.querySelector('#post-desc-update').value.trim();
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
  
    const postNameUpdate = document.querySelector('#post-name-update').value.trim();
    const descriptionUpdate = document.querySelector('#post-desc-update').value.trim();
    console.log(postNameUpdate);
    console.log(descriptionUpdate);
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_title: postNameUpdate, post_body: descriptionUpdate }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
       document.location.replace('/dashboard');
      } else {
        alert('Failed to update project');
      }
    }
  }
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('../dashboard');
      } else {
        alert('Failed to delete project');
      }
    }
   
  };

document
  .querySelector('.update-post')
  .addEventListener('click', updatePostHandler);

document
  .querySelector('.delete-post')
  .addEventListener('click', delButtonHandler);
