window.onload = function(){
   
    document.getElementById("search-btn").onclick = loadUserInfo;
    
}
let {from} = rxjs;

async function loadUserInfo(){
    
    document.getElementById("user-info").innerHTML = ""
    let userId = document.getElementById("user-id").value;
  

let user = await( ((await fetch("https://jsonplaceholder.typicode.com/users/" + userId )).json()) ) ;

   let info = document.createElement("div");
   info.innerHTML= ` <p>User information: </p> 
   
   <p> name: ${user.name} </p> 
   <p> Email: ${user.email} </p>  
  
   <p>Address: </p>
  
     
   <p> Street: ${user.address.street} </p>  
   <p>City: ${user.address.city}  </p>  
   <p>Zip: ${user.address.zipcode}  </p>  
      
   
 `
  let getPosts = document.createElement("button");
 
  getPosts.innerHTML = "Get Posts";

  
  getPosts.onclick = async function(){
    
    

let posts = await( ((await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId  )).json()) ) ;

from(posts).subscribe(post=>{
    let postDiv = document.createElement('div');
    postDiv.innerHTML = `<p> </P><p> User Post:</P>
    <p>
        Title: ${post.title}
     </p>
     <p>
        Body: ${post.body}
    </p>
    <p></P>
    `
    let getComments = document.createElement("button");
    let commentBox = document.createElement('div');

    getComments.innerHTML = "View Comments";
    document.getElementById("posts").append(postDiv)
    document.getElementById("posts").append(getComments)
    document.getElementById("posts").append(commentBox)
    getComments.onclick = async function(){
        let comments = await( ((await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + post.id  )).json()) ) ;
from(comments).subscribe(comment=>{
    let content = document.createElement('div');
    content.innerHTML = `<p>Comment:</p>
    <p>name: ${comment.name}</p> 
    <p>email:${comment.email}</p>
    <p>body:${comment.body}</p>
    `
    commentBox.appendChild(content);
})

    }

    
  
})


  }
 
document.getElementById("user-info").append(info);
document.getElementById("user-info").append(getPosts);
}
 



