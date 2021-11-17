"use strict"
window.onload = function(){  
    document.getElementById("search").onclick = getData;
    
}

// FETCHING THE USERS BY ID
async function getData(){
    const div = document.getElementById("userDiv");
        const id = document.getElementById("idInput").value;
        if(id==="" || id<0 || id >10){
            return;
        }else{
            const response = await fetch("http://jsonplaceholder.typicode.com/users/"+id);
            const user = await response.json();
            let template = ` <div class=" mt-2 col-4 border border-2 shadow p-4 mb-4 bg-white">
                    <h3 class="fw-bold mt-2">User Information:</h3>
                    
                    <p> <span class="fw-bold">Name:</span>${user.name}</p>
                    <p><span class="fw-bold">Email:</span> ${user.email}</p>
                    <h4 style="color:coral;">Address:</h4>
                    <p><span class="fw-bold">City:</span>${user.address.city}</p>
                    <p><span class="fw-bold">Zip:</span>${user.address.zipcode}</p>
                     <p><span class="fw-bold">Current Location:</span>${user.address.geo.lat}-${user.address.geo.lng}</p>
                    <button class="btn btn-success mt-2" id="posts">Get Posts</button>`
                
                    div.innerHTML = template;
        }
         document.getElementById("posts").onclick = getPosts;

// FETCHING AND DISPLAYING POSTS FOR CHOSEN USER WHEN BUTTON IS CLICKED.
        async function getPosts(){
        const id = document.getElementById("idInput").value;
        const response = await fetch(`http://jsonplaceholder.typicode.com/users/${id}/posts`);
        const posts = await response.json();

        const secondCol = document.createElement("div");
        secondCol.classList ="col-8";
        div.appendChild(secondCol);
        
        for(let i=0;i<posts.length;i++){
                let template2 = `
                     <h5 style="color:coral;" class="fw-bold lead mt-2">User Post:</h5>
                    <p class="mt-2"><span class="fw-bold">Title:</span>${posts[i].title}</p>
                    <p><span class="fw-bold">Body:</span>${posts[i].body}</p>
                     `
                    let commentBtn = document.createElement("button");
                    let commentBox = document.createElement("div");
                    commentBox.id = `${posts[i].id}c`;
                    commentBox.classList = "mt-2"
                    commentBtn.innerHTML = "View Comment";
                    commentBtn.id = `${posts[i].id}`;
                    commentBtn.classList = "commentBtn btn btn-success";  
                     secondCol.innerHTML += template2;
                    secondCol.appendChild(commentBtn);
                    secondCol.appendChild(commentBox); 
                 
                   
                   
        }

// VIEWING THE COMMENTS FOR EACH POST WHEN "VIEW BUTTON", BUTTON IS CLICKED 
    let btns = document.querySelectorAll(".commentBtn");
    for(let btn of btns){
        btn.addEventListener("click",async function(){
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.id}`);
            const comments = await response.json();
            console.log(comments);
           
             for(let comment of comments){
             let commentDiv = document.createElement("div");
             commentDiv.classList = "border border-2 border-success p-2 shadow p-2 mb-2 bg-white"  
                let template3 = `
                    <p style="color:coral;" class="lead">Comment:</p>
                    <p><span class="fw-bold">Name:</span>${comment.name}</p><br>
                    <p><span class="fw-bold">Email:</span>${comment.email}</p><br>
                    <p><span class="fw-bold">Body:</span>${comment.body}</p><br>  
            `
                commentDiv.innerHTML += template3;
                document.getElementById(`${this.id}c`).appendChild(commentDiv);
              
            }
              

    }); 
            

                   
                
        }   

        }
     }
    


   
