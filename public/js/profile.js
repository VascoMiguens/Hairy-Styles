const newFormHandler = async (event) => {
  

  const postName = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  console.log(postName, description);

  if (postName && description) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ post_title: postName, post_body: description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create project');
    }
  }
};

const updatePostHandler = async (event) => {
  // const postNameUpdate = document.querySelector('#post-name-update').value.trim();
  // const descriptionUpdate = document.querySelector('#post-desc-update').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    event.preventDefault();

  const postNameUpdate = document.querySelector('#post-name-update').value.trim();
  const descriptionUpdate = document.querySelector('#post-desc-update').value.trim();

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

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.update-post')
  .addEventListener('submit', updatePostHandler);

document
  .querySelector('.delete-post')
  .addEventListener('click', delButtonHandler);
