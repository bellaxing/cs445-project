// window.onload=function(){
//     let url='http://www.mapquestapi.com/geocoding/v1/reverse?key=tWbaBBw92lD6YInMlGnx6xwwj8GpGZVO&location=81.1496,-37.3159';
//     fetch(url).then(response=>response.json())
//     .then(d=>console.log(d.results[0].locations[0].street))

//     let user=fetch('http://jsonplaceholder.typicode.com/users')
//     .then(data=>data.json()).then(console.log)
// }
// //locations
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
       
                 async  function fetchUserPost(){
                     let id=Number(getPost.value);
                     let post=await fetch('https://jsonplaceholder.typicode.com/posts')
                     let jsonPost=await post.json();
                     let filterData=jsonPost.filter(elem=>elem.userId===id)
                     filterData.forEach(filterPost=>{

                        console.log(filterPost)
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
                           let postCommentBut = document.getElementById("commentBut");
                             postCommentBut.id = "commentDisplay";
                           let userComment = document.getElementById("comment-list");
                           userComment.id = "list-of-comments";
                     })
                    }}}        
