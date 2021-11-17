"use strict"
window.onload = function(){  
    document.getElementById("search").onclick = getData;
    
}


async function getData(){
    const div = document.getElementById("userDiv");
        const id = document.getElementById("idInput").value;
        if(id==="" || id<0 || id >10){
            return;
        }else{
            const response = await fetch("http://jsonplaceholder.typicode.com/users/"+id);
            const user = await response.json();
            let template = ` <div class="col-4">
                    <h3 class="fw-bold">User Information:</h3>
                    <p>Name: ${user.name}</p>
                    <p>Email: ${user.email}</p>
                    <h4 class="">Address</h4>
                    <p>Street: ${user.address.street}</p>
                    <p>City: ${user.address.city}</p>
                    <p>Zip: ${user.address.zipcode}</p>
                     <p>current location: ${user.address.geo.lat}-${user.address.geo.lng}</p>
                    <button id="posts">Get Posts</button>`
                
                    div.innerHTML = template;
        }
         document.getElementById("posts").onclick = getPosts;
        
        async function getPosts(){
        const id = document.getElementById("idInput").value;
        const response = await fetch(`http://jsonplaceholder.typicode.com/users/${id}/posts`);
        const posts = await response.json();
        const secondCol = document.createElement("div");
        secondCol.classList ="col-8";
        const userHeader = document.createElement("h3");
        userHeader.innerHTML = "User Posts:"
        secondCol.appendChild(userHeader);
        div.appendChild(secondCol);
        
        for(let i=0;i<posts.length;i++){
                let template2 = `
                    <p class="mt-2">Title:${posts[i].title}</p>
                    <p >Body:${posts[i].body}</p>
                    <button id="${posts[i].id}" class"commentBtn"> View Comments </button>
                 </div> `
                 secondCol.innerHTML += template2;
        }   
//    VIEW COMMENT  

     const commentBtn = document.querySelectorAll(".commentBtn");
         for(let btn of commentBtn){
             console.log(btn);
            btn.onclick = async function(){
            const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${this.id}/comments`);
            const comments = await response.json();
            console.log(comments);
        }
    }
    }



    
         
    }

   
