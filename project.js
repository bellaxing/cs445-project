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
            let template = ` <div class="col-4">
                    <h3 class="fw-bold">User Information:</h3>
                    <p>Name: ${user.name}</p>
                    <p>Email: ${user.email}</p>
                    <h4 class="text-danger">Address</h4>
                    <p>Street: ${user.address.street}</p>
                    <p>City: ${user.address.city}</p>
                    <p>Zip: ${user.address.zipcode}</p>
                     <p>current location: ${user.address.geo.lat}-${user.address.geo.lng}</p>
                    <button class="btn btn-warning" id="posts">Get Posts</button>`
                
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
        const userHeader = document.createElement("h3");
        userHeader.innerHTML = "User Posts:"
        secondCol.appendChild(userHeader);
        div.appendChild(secondCol);
        
        for(let i=0;i<posts.length;i++){
                let template2 = `
                    <p class="mt-2">Title:${posts[i].title}</p>
                    <p >Body:${posts[i].body}</p>
                     `
                    let commentBtn = document.createElement("button");
                    let commentBox = document.createElement("div");
                    commentBox.id = `${posts[i].id}c`;
                    commentBtn.innerHTML = "View Comment";
                    commentBtn.id = `${posts[i].id}`;
                    commentBtn.classList = "commentBtn";  
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
                let template3 = `
                    <p class="text-danger">Comment:</p>
                    <p>Name:${comment.name}</p><br>
                    <p>Email:${comment.email}</p><br>
                    <p>Body:${comment.body}</p><br>  
            `
                commentDiv.innerHTML += template3;
                document.getElementById(`${this.id}c`).appendChild(commentDiv);
              
            }
              

    }); 
            

                   
                
        }   

        }
     }
    


   
