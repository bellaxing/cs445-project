window.onload = function () {

    document.getElementById("search-button").onclick = getUser;
    async function getUser() {
        let userId = parseInt(document.getElementById("user-id").value)
        let users = await fetch('https://jsonplaceholder.typicode.com/users');
        let userJson = await users.json();
        let listUser = userJson.filter(elem => elem.id === userId)
        listUser = listUser[0]
        //console.log(listUser)
        let userList = document.getElementById("user-info");
        userList.innerHTML = "";
        let userTemplate = ` 
                        <div class="col">
                        <h3>User info:</h3>
                        <p>name: ${listUser.name}</p>
                        <p>Email:${listUser.email} </p>
                        <p>Address</p>
                        <p>Street:${listUser.address.street} </p>
                        <p>City:${listUser.address.city} </p>
                        <p>Zip:${listUser.address.zipcode} </p>
                        <button id="idBut" value="${listUser.id}">Posts</button>
                        </div> 
                    `;
        const userDiv = document.createElement("user-list");
        userDiv.innerHTML = userTemplate;
        userList.append(userDiv);
        let getPost = document.getElementById("idBut");
        getPost.onclick = UserPost;
        let userPost = document.getElementById("user-post");
        userPost.innerHTML = "";

        async function UserPost() {
            let id = parseInt(getPost.value);
            let post = await fetch('https://jsonplaceholder.typicode.com/posts')
            let jsonPost = await post.json();
            let filterData = jsonPost.filter(elem => elem.userId === id)
            filterData.forEach(filterPost => {

                let postId = filterPost.id;
                let postTemplate = ` 
                           <div class="col">

                           <p>title: ${filterPost.title}</p>
                           <p>body:${filterPost.body} </p>
                           <button id="commentBut" value="${postId}">Comments</button>
                           <div id="comment-list"></div>
                           `;
                const divPost = document.createElement("diV-post");
                divPost.innerHTML = postTemplate;
                userPost.appendChild(divPost);
                let postCommentBut = document.getElementById("commentBut");
                postCommentBut.onclick = fetchComments;
                postCommentBut.id = "commentDisplay";
                let userComment = document.getElementById("comment-list");
                userComment.id = "list-of-comments";
                userComment.innerHTML = "";
            })
            postComment = document.getElementById("commentDisplay")
            postCommentBut.addEventListener("click", fetchComments, false);

            async function fetchComments() {
                const commentResult = await fetch("https://jsonplaceholder.typicode.com/comments");
                const commentJson = await commentResult.json();
                let commentId = Number(postCommentBut.value);
                let filteredComments = commentJson.filter(element => element.userId === commentId);
                filteredComments.forEach(filtercomment => {
                    let commentdisplayId = filteredComments.id;
                    let commentTemplate= `
                      <p>title: ${filtercomment.title}</p>
                           <p>body:${filtercomment.body}</p>
                    `;
                    const divComment =document.createElement("div-comment");
                    divComment.innerHTML= commentTemplate;
                    userCommnet.append(divComment)
                })
/*
                const postComment = document.createElement("post-comments");
                postComment.innerHTML = commentTemplate;
                userComment.append(postComment);
                */
         
               }

               
        }
    }
}
