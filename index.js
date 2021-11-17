window.onload = function () {
   document.getElementById("search-btn").onclick = loadUserInfo;
   document.body.style.backgroundColor = "#BEC3C7"
}

let { from } = rxjs;

async function loadUserInfo() {

    document.getElementById("user-info").innerHTML = ""
    let userId = document.getElementById("user-id").value;
    let user = await (((await fetch("https://jsonplaceholder.typicode.com/users/" + userId)).json()));

    document.getElementById("user-info").innerHTML = 
    `<p style="color: rgb(33,10,15)"><b>User information:</b> </p> 
   <p> name: ${user.name} </p> 
   <p> Email: ${user.email} </p>  
   <p>Address: </p>
   <p> Street: ${user.address.street} </p>  
   <p>City: ${user.address.city}  </p>  
   <p>Zip: ${user.address.zipcode}  </p> `

    let getPosts = document.createElement("button");
    getPosts.innerHTML = "Get Posts";
    getPosts.style.backgroundColor = "#0B5264";
    getPosts.style.color = "white";

    getPosts.onclick = async function () {
        document.getElementById("posts").innerHTML = "";
        let posts = await (((await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)).json()));

        from(posts).subscribe(post => {
            let postDiv = document.createElement('posts');
            postDiv.innerHTML = `<p> </P><p style="color: rgb(33,10,15)"><b> User Post:</b></P>
                                 <p>Title: ${post.title}</p>
                                 <p>Body: ${post.body} </p>
                                 <p></P> `

            let viewComments = document.createElement("button");
            viewComments.innerHTML = "View Comments";
            viewComments.style.backgroundColor = "#0B5264";
            viewComments.style.color = "white";
            
            let commentBox = document.createElement('div');
            
            viewComments.onclick = async function () {
                commentBox.innerHTML = "";
                let comments = await (((await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + post.id)).json()));
                from(comments).subscribe(comment => {
                    let content = document.createElement('div');
                    content.innerHTML = `<p style="color: rgb(33,10,15)"><b>Comment:</b></p>
                                         <p>name: ${comment.name}</p> 
                                         <p>email:${comment.email}</p>
                                         <p>body:${comment.body}</p>`

                    commentBox.appendChild(content);
                })
              

            }
            document.getElementById("posts").append(postDiv)
            document.getElementById("posts").append(viewComments)
            document.getElementById("posts").append(commentBox)

        })

     }

    document.getElementById("user-info").append(getPosts);

}




