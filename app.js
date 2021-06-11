


// // Page elements 
// // Starting with defining the page elements 

// //const searchbutton = document.querySelector("#searchbtn");

// //const commentButton = document.querySelector("#commentbtn")

// // Information to reach API


// function userLoader() {                 // This is the main function on page load
//     document.getElementById("searchbtn").onclick = getUser;
//     async function getUser() {
//         //let inputfield = Number(document.getElementById("input"));
//         let userId = Number(document.getElementById("input").value);
//         let users = await fetch(`https://jsonplaceholder.typicode.com/users`);
//         let userJasonfetched = await users.json();
//         const listUser = userJasonfetched.filter(element => element.id === userId); // this filters out the users' json based on id
//         listUser = listUser[0];
//         console.log(listUser);
//         //searchbutton.addEventListener('click', getUser);

//         // Let's now prepare the template to append to our div in the page to display the list of users
//         let userinfo = document.getElementById("user-list");
//         userinfo.innerHTML = "";
//         let ourUserTemplate = `
//         <div class='col'>
//         <h3>User Info: </h3>
//         <p>name: ${listUser.name}</p>
//         <p>Email:${listUser.email}</p>
//         <p>Address</p>
//         <p>Street:${listUser.address.street}</p>
//         <p>City:${listUser.address.city}</p>
//         <p>Zip-Code:${listUser.address.zipcode}</p>
//         <button id="buttonId" value= = "${listUser.id}">Posts</button>
//         </div>
//         `;
//         const userContainer = document.createElement("user-list");
//         userContainer.innerHTML = ourUserTemplate;
//         userList.appendChild(userContainer);
//         let getPost = document.getElementById("buttonId");
//         getPost.onclick = document.getElementById('user-post');
//         userPost.innerHTML = "";

//         async function getuserPosts() {
//             let id = Number(getPost.value);
//             let posts = await fetch(`https://jsonplaceholder.typicode.com/users`)
//             let postJason = await posts.json();
//             let filteredPosts = postJason.filter(element => element.userId === id);
//             filteredPosts.forEach(filterPost => {
//                 let postId = filterPost.id;
//                 let postTemplate = `
//                 <div class ="col>
//                 <P>title: ${filterPost.title}</P>
//                 <p>body: ${filterPost.body}</p>
//                 <button id= "commentbutton" value ="${postId}">Comments</button>
//                 <div id= "comment-list></div>
//                 `;
//                 const divPost = document.createElement("div-post");
//                 divPost.innerHTML = postTemplate;
//                 userPost.appendChild(divPost);
//                 let postCommentbutton = document.getElementById("commentbutton");
//                 postCommentbutton.id = "commentDisplay";
//                 let userComment = document.getElementById("comment-list");
//                 userComment.id = "list-of-comments";
                
//             })
//             postCommentBut = document.getElementById("commentDisplay")
//             postCommentBut.addEventListener("click", fetchComments, false);
//             async function fetchComments() {
//                 const commentResult = await fetch("https://jsonplaceholder.typicode.com/comments");


//                 const commentJson = await commentResult.json();
//                 let comId = Number(postCommentBut.value);
//                 //    console.log(commentJson)
//                 from(commentJson)
//                     .pipe(filter((commentDta) => commentDta.postId === comId))
//                     .subscribe((commentDta) => {
//                         displayComments(commentDta);
//                     })

//             }
//         }
       
    
//     }
// }
window.onload = function () {

    document.getElementById("search-button").onclick = fetchUser;
    async function fetchUser() {
        let userId = Number(document.getElementById("user-id").value)
        let users = await fetch('https://jsonplaceholder.typicode.com/users');
        let userJson = await users.json();
        let listUser = userJson.filter(elem => elem.id === userId)
        listUser = listUser[0]
        //console.log(listUser)
        let userList = document.getElementById("user-info");
        userList.innerHTML = "";
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

        async function fetchUserPost() {
            let id = Number(getPost.value);
            let post = await fetch('https://jsonplaceholder.typicode.com/posts')
            let jsonPost = await post.json();
            let filterData = jsonPost.filter(elem => elem.userId === id)
            filterData.forEach(filterPost => {

                console.log(filterPost)
                let postId = filterPost.id;
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
            postCommentBut = document.getElementById("commentDisplay")
            postCommentBut.addEventListener("click", fetchComments, false);

            //    async function fetchComments(){
            //        console.log("hello")
            //        console.log(document.getElementById("commentDisplay").value)

            //     }

            async function fetchComments() {
                const commentResult = await fetch("https://jsonplaceholder.typicode.com/comments");


                const commentJson = await commentResult.json();
                let comId = Number(postCommentBut.value);
                //    console.log(commentJson)
                from(commentJson)
                    .pipe(filter((commentDta) => commentDta.postId === comId))
                    .subscribe((commentDta) => {
                        displayComments(commentDta);
                    });

                ///////////////////////////////////////////////////////////////////////////////////////////

                //         function displayComments(commentDta) {
                //             alert("hello")
                //         }}
                //     //       console.log(commentDta);
                //     //       let commentTemplate = `     
                //     //                       <div class="col">
                //     //                       <h6 style="color: red;">Comment:</h6>
                //     //                           <p>name:  ${commentDta.name}</p>
                //     //                           <p>email:   ${postData.body} </p>
                //     //                           <p>comment: ${postData.body} </p>
                //     //                       </div>     
                //     //                   `;

                //     //       const postComment = document.createElement("post-comments");
                //     //       postComment.innerHTML = commentTemplate;
                //     //       userComment.append(postComment);
                //     //     }
            }
        }
    }
}


