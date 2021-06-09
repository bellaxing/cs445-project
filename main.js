window.onload=pageLoad;
//https://jsonplaceholder.typicode.com/users
function pageLoad(){

document.getElementById("search-button").onclick=  fetchUser;
   async function fetchUser(){
    let userId= Number(document.getElementById("user-id").value)
        let users=await fetch('https://jsonplaceholder.typicode.com/users');
        let userJson=await users.json();
        let listUser=userJson.filter(elem=>elem.id===userId)
            listUser=listUser[0]
        //console.log(listUser)
        let userList=document.getElementById("user-info");
         userList.innerHTML="";
                     let userTemplate = ` 
                        <div class="col">
                        <h3>User information:</h3>
                        <p>name: ${listUser.name}</p>
                        <p>Email:${listUser.email} </p>
                        <p style="color: red;font-size: larger;">Address</p>
                        <p>Street:${listUser.address.street} </p>
                        <p>City:${listUser.address.city} </p>
                        <p>Zip:${listUser.address.zipcode} </p>
                        <button id="idBut" value="${listUser.id}">Get posts</button>
                        </div> 
                    `; 
                    const userDiv = document.createElement("user-list");
                    userDiv.innerHTML = userTemplate;
                    userList.append(userDiv);
                    let getPost = document.getElementById("idBut");
                    getPost.onclick = fetchUserPost;
                    let userPost = document.getElementById("user-post");
                    userPost.innerHTML = "";
                   // let postCommentBut;
                 async  function fetchUserPost(){
                     let id=Number(getPost.value);
                     let post=await fetch('https://jsonplaceholder.typicode.com/posts')
                     let jsonPost=await post.json();
                     let filterData=jsonPost.filter(elem=>elem.userId===id)
                     filterData.forEach(filterPost=>{

                        //console.log(filterPost)
                        let postId =filterPost.id;
                           let postTemplate = ` 
                           <div class="col">
   
                           <p>title: ${filterPost.title}</p>
                           <p>body:${filterPost.body} </p>
                           <button id="commentBut" value="${postId}">Get comment</button>
                           <div id="comment-list"></div>
                           `;
                           const divPost = document.createElement("diV-post");
                           divPost.innerHTML = postTemplate;
                           userPost.appendChild(divPost);
                          let  postCommentBut = document.getElementById("commentBut");
                             postCommentBut.id = "commentDisplay";
                           let userComment = document.getElementById("comment-list");
                           userComment.id = "list-of-comments";
                     })
                    let postCommentBut=document.getElementById("commentDisplay")//
                        postCommentBut.addEventListener("click", fetchComments, false);
                       
                     async function fetchComments(){
                        let result=await fetch('https://jsonplaceholder.typicode.com/comments')
                        let comResult=await result.json()
                        console.log(comResult)
                        let id=Number(postCommentBut.value) 
                        //console.log(id)
                         let filteredComment=   comResult.filter(data=>data.postId===id)
                         let listOfComments=document.getElementById("list-of-comments");
                         listOfComments.innerHTML="";
                         console.log(filteredComment)
                         filteredComment.forEach(d=>{

                            let commentTemplate = ` 
                            <div class="col">
                            <p>name: ${d.name}</p>
                            <p>email:${d.email} </p>
                            <p>body:${d.body} </p>
                            `;
                            const divComment = document.createElement("diV-comment");
                            divComment.innerHTML = commentTemplate;
                            listOfComments.appendChild(divComment);
                         })
 
                        }
                   }
     
    }

}

//https://jsonplaceholder.typicode.com/comments