window.onload = function () {
    const { from } = rxjs;
    const { filter } = rxjs.operators;
  
    document.getElementById("search-user").onclick = showUser;
    function showUser() {
      const userId = parseFloat((document.getElementById("user-id").value));
      let userList = document.getElementById("user-list");
      fetchUser();
    
      async function fetchUser() {
        userList.innerHTML = "";
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let userFetch = await response.json();
        const user = from(userFetch);
        user
          .pipe(filter((element) => element.id === userId))
          .subscribe((data) => {
            showUserData(data);
          });
      }
  
      function showUserData(data) {
        let lati = data.address.geo.lat;
        let long = data.address.geo.lng;
        let location;
  
        fetchLocation();
  
        async function fetchLocation() {
          let resultLocations = await fetch("https://mapquestapi.com/geocoding/v1/reverse?key=mzpDwKtGiMBAQAXNA5fm4Ae7GCkJsRbg&location=81.1496,-37.3159"+ lati +","+ long);
          
    
  
  
          let jsonLocation = await resultLocations.json();
          let location = jsonLocation.results[0].locations[0].street;      
          console.log(location);
        }
        let id = data.id;
        let template = `     
                    <div class="col">
                        <h3>Employee Info:</h3>
                        <p>name: ${data.name}</p>
                        <p>Email:${data.email} </p>
                        <p style="color:red;font-size: larger;"></p>
                        <p>Street:${data.address.street} </p>
                        <p>City:${data.address.city} </p>
                        <p>Zip:${data.address.zipcode} </p>
                        <p>Latitude: ${data.address.geo.lat} Longitude: ${data.address.geo.lng}</p>
                        <button id="idBut" value="${id} " style="background-color:white">Get User Post</button>
                    </div>     
                `;
  
        const div = document.createElement("user-list");
        div.innerHTML = template;
        userList.append(div);
  
  
        let getPost = document.getElementById("idBut");
        getPost.onclick = fetchUserPost;
        let userPost = document.getElementById("user-post");
        userPost.innerHTML = "";
  
  
        async function fetchUserPost() {
          let userId = getPost.value;
          let postResult = await fetch("https://jsonplaceholder.typicode.com/posts");
          let postJson = await postResult.json();
  
          from(postJson)
            .pipe(filter((elem) => elem.userId === +userId))
            .subscribe((postData) => {
              showUserPost(postData);
            });
        }
        function showUserPost(postData) {
          console.log(postData);
          let postId = postData.id;
          let userPostTemplate = `     
                    <div class="col">
                    <h5> User post</h5>
                        <p>Employee Id: ${postData.id}</p>
                        <p>Title: ${postData.title}</p>
                        <p>Body:${postData.body} </p>
                        <button id="commentBut" value="${postId} " style="background-color: white;">Get User Comment</button>
                        <div id="list-comments"> </div>
                    </div>     
                `;
          const divPost = document.createElement("user-post");
          divPost.innerHTML = userPostTemplate;
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
                showComments(commentDta);
              });
  
  
            function showComments(commentDta) {
              console.log(commentDta);
              let commentTemplate = `     
                                <div class="col">
                                <h6 ">User Comment</h6>
                                    <p>name:  ${commentDta.name}</p>
                                    <p>email:   ${postData.body} </p>
                                    <p>comment: ${postData.body} </p>
                                </div>     
                            `;
  
              const postComment = document.createElement("post-comments");
              postComment.innerHTML = commentTemplate;
              userComment.append(postComment);
            }
          }
        }
      }
    }
  }

  //==============================================================================









//     async function displayPostHtml(){
//         const employeeDiv=document.getElementById("post");
//         employeeDiv.innerHTML="";
//         const id=document.getElementById("inputId").value;
//         const users=await postSingleUser();
//         users.filter(user=>user.userId==id)
//              .forEach(user=>{
//                let template=  `
//              <div class="col">
//                     <p>Name ${user.userId} </p>
//                     <p>Id Number: ${user.id}</p>
//                     <p>Title: ${user.title}</p>
//                     <p>Bosy: ${user.body}</p>
                    
//                 </div> 
//              `
//               const div= document.createElement("div");
//               div.innerHTML = template;
//               employeeDiv.append(div);
//              })
//     } async function commentSingleUser(){
//         const responseBody=await fetch('https://jsonplaceholder.typicode.com/comments');
//         const json=await 
//     }

// window.onload = async function() {

//     document.getElementById("getBtn").onclick = async function() {

//         await displayUserInHtml();
//         document.getElementById("getPost").onclick=async function(){
//             await displayPostHtml();
//         }
//     }
    

// }

// async function fetchSingleUser() {
//     let responseBody = await fetch('http://jsonplaceholder.typicode.com/comments'); //'https://randomuser.me/api/'
//     let json = await responseBody.json();
//     return json.results[0];
// }

// async function fetchUsers(len) {
//     const users = [];
//     for (let i = 0; i < len; i++) {
//         users[i] = await fetchSingleUser();
//     }
//     return users;
// }



/*
window.onload = function() {
     

    document.getElementById('getBtn').onclick = async function() {
        const userId=document.getElementById("inputId").value;
        let responseBody = await fetch('http://jsonplaceholder.typicode.com/users'); //'https://randomuser.me/api/'
        let json = await responseBody.json();
        const user = json.results;
        user.filter(user=>user.postId===userId)
            .forEach(user => {
            document.getElementById('name').innerHTML = 'Name: '+user.name.first + ' ' + user.name.last;
            document.getElementById('phone').innerHTML = 'phone:' + user.phone;
            document.getElementById('email').innerHTML = 'Email: '+user.email;
            document.getElementById('address').innerHTML='Street: '+user.location.street.number+" "+user.location.street.name;
            document.getElementById('address1').innerHTML='City: '+user.location.city+' State: '+user.location.state;
            document.getElementById('address2').innerHTML='Country: '+user.location.state+' ZipCode: '+user.location.postcode;
            });
            
    }

}

*/