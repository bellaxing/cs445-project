
function pageOnload() {
  const search = document.getElementById("search-user");

  const { from } = rxjs;
  const { filter } = rxjs.operators;
  search.onclick = display;
  function display() {
    datafetchUser();
    const userId = parseInt(document.getElementById("user-id").value);
    
    async function datafetchUser() {
      let userList = document.getElementById("users");
      userList.innerHTML = "";
      let result = await fetch("http://jsonplaceholder.typicode.com/users");
      let userFetch = await result.json();
      const user = from(userFetch);
      user
        .pipe(filter((element) => element.id === userId))
        .subscribe((data) => {
          
          let template = `     
            <div class="col">
                <h3> user information:</h3>
                <p>id: ${data.id}</p>
                <p>name: ${data.name}</p>
                <p>Email:${data.email} </p>
                <p style="color: magenta;font-size: larger;">Address</p>
                <p>Street:${data.address.street} </p>
                <p>City:${data.address.city} </p>
                <p>City:${data.address.city} </p>
                <p>Zip:${data.address.zipcode} </p>
                <p>Location </br>lat:${data.address.geo.lat}</br>lng:${data.address.geo.lng}</p>
                <button id="idBut" value="${data.id} " style="background-color: green;">All posts</button>
            </div>     
        `;
        
          const div = document.createElement("div");
          div.innerHTML = template;
          userList.append(div);
          let getPost = document.getElementById("idBut");
          getPost.onclick =UserPost;
          let userPost = document.getElementById("user-post");
          userPost.innerHTML = "";

          async function UserPost() {
            let userId = getPost.value;
            let Result = await fetch(
              "https://jsonplaceholder.typicode.com/posts"
            );
            let postJson = await Result.json();
  
            from(postJson)
              .pipe(filter((elem) => elem.userId === parseInt(userId)))
              .subscribe((postData) => {
                displayUserPost(postData);
              });
          } 
          function displayUserPost(postData) {
            let postId = postData.id;
            let PostTemplate = `     
                    <div class="col">
                    <h3 style="color:magenta; font-weight: bold;">List of User post:</h3>
                        <p>Title: ${postData.title}</p>
                        <p>Body:${postData.body} </p>
                        <button id="commentBut" value="${postId} " style="background-color: blue;">List of comments</button>
                        <div id="list-comments"> </div>
                    </div>     
                `;
            const divPost = document.createElement("user-post");
            divPost.innerHTML = PostTemplate;
            userPost.append(divPost);
            let postCommentBut = document.getElementById("commentBut");
            postCommentBut.id = "commentDisplay";
            let userComment = document.getElementById("list-comments");
            userComment.id = "list-of-comments";
            postCommentBut.addEventListener("click",Comments, false);

        
          async function Comments() {
            const commentResult = await fetch(
              "https://jsonplaceholder.typicode.com/comments"
            );
            const data = await commentResult.json();
            let comId = parseInt(postCommentBut.value);

            from(data)
              .pipe(filter((commentDta) => commentDta.postId === comId))
              .subscribe((commentDta) => {
                displayAllComments(commentDta);
              });
        
          function displayAllComments(commentDta) {
            console.log(commentDta);
            let commentTemplate = `     
                            <div class="col">
                            <h6 style="color: red;">Comment:</h6>
                                <p>name:  ${commentDta.name}</p>
                                <p>email:   ${postData.body} </p>
                                <p>comment: ${postData.body} </p>
                            </div>     
                        `;

            const postComment = document.createElement("post-comments");
            postComment.innerHTML = commentTemplate;
            userComment.append(postComment);
          }
        }
    }
    
  })
}
}
}
window.onload = pageOnload;