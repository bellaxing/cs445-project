
function pageOnload() {
  const search = document.getElementById("search-user");

  const { from } = rxjs;
  const { filter } = rxjs.operators;
  search.onclick = display;
  function display() {
    fetchUser();
    const userId = Number(document.getElementById("user-id").value);
    async function fetchUser() {
      let userList = document.getElementById("users");
      userList.innerHTML = "";
      let result = await fetch("http://jsonplaceholder.typicode.com/users");
      let userFetch = await result.json();
      console.log(userFetch);
      const user = from(userFetch);
      user
        .pipe(filter((element) => element.id === userId))
        .subscribe((data) => {
          let id = data.id;
          let template = `     
            <div class="col">
                <h3> user information:</h3>
                <p>id: ${id}</p>
                <p>name: ${data.name}</p>
                <p>Email:${data.email} </p>
                <p style="color: red;font-size: larger;">Address</p>
                <p>Street:${data.address.street} </p>
                <p>City:${data.address.city} </p>
                <p>City:${data.address.city} </p>
                <p>Zip:${data.address.zipcode} </p>
                <p>Location </br>lat:${data.address.geo.lat}</br>lng:${data.address.geo.lng}</p>
                <button id="idBut" value="${id} " style="background-color: aqua;">Get posts</button>
            </div>     
        `;
        
          const div = document.createElement("div");
          div.classList = "row border-top";
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
              .pipe(filter((elem) => elem.userId === Number(userId)))
              .subscribe((postData) => {
                displayUserPost(postData);
              });
          } 
          function displayUserPost(postData) {
            console.log(postData);
            let postId = postData.id;
            let PostTemplate = `     
                    <div class="col">
                    <h3 style="color:blue; font-weight: bold;"> User post:</h3>
                        <p>Title: ${postData.title}</p>
                        <p>Body:${postData.body} </p>
                        <button id="commentBut" value="${postId} " style="background-color: aqua;"> View comments</button>
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
            postCommentBut.addEventListener("click", fetchComments, false);

        
          async function fetchComments() {
            const commentResult = await fetch(
              "https://jsonplaceholder.typicode.com/comments"
            );
            const commentJson = await commentResult.json();
            let comId = Number(postCommentBut.value);

            from(commentJson)
              .pipe(filter((commentDta) => commentDta.postId === comId))
              .subscribe((commentDta) => {
                displayComments(commentDta);
              });
        
          function displayComments(commentDta) {
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


          async function fetchUsers(len) {
              const users = [];
              for (let i = 0; i < len; i++) {
                  users[i] = await fetchSingleUser();
              }
              return users;
          }
          }
        }
    }
    
  })
}
}
}
window.onload = pageOnload;