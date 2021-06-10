(async () => {
    // Get User Details
    const response = await fetch('http://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log('User Details---->', data);
  
    data.forEach((user, index) => {
      document.getElementById('user').innerHTML += `<label>Name:</label>
      <input type = "text"  id=${index}name value=${user.name} />
      <label>Email:</label>
      <input type = "text"  id=${index}email value=${user.email} />
      <label>Address:</label>
      <input type = "text" id=${index}address value=${user.address.city} />
      <br/>`;
    });
    //Post and Comment Input and buttons
  document.getElementById(
    'post'
  ).innerHTML = `<label>Enter user Id to retrieve the post</label><br/>
                    <input type=text id='userPost' />
                    <button id='postButton' >Show Post</button>
                    <button id='comment'>Show Comment</button>`;

  let userId;
  const showPost = document.getElementById('postButton');

  //Event Listener when clicking Submit to show post
  showPost.addEventListener('click', async () => {
    userId = document.getElementById('userPost').value;
    const postBody = document.getElementById('postBody');
    console.log('USER ID--->', userId);

    const post = await fetch(
      `http://jsonplaceholder.typicode.com/posts/${userId}`
    );
    const postData = await post.json();
    console.log('Post Data--->', postData);
    postBody.innerHTML = `<div>
                            <h1>Posts</h1>
                            <h3>Title:</h3>
                            <p>${postData.title}</p>
                            <h3>Body:</h3>
                            <p>${postData.body}</p>
                          </div>`;
  });
//Event Listener to show comments
const showComment = document.getElementById('comment');
showComment.addEventListener('click', async () => {
  const comment = await fetch(
    `http://jsonplaceholder.typicode.com/comments?postId=${userId}`
  );
  const commentData = await comment.json();
  const commentBody = document.getElementById('commentBody');
  commentBody.innerHTML = `<h1>Comments</h1>`;
  commentData.forEach((comment) => {
    commentBody.innerHTML += `<span>${comment.id}</span>:<p>${comment.body}</p>`;
  });
});
})();





