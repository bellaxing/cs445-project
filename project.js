window.onload = function () {
    const { from } = rxjs;
    const { filter } = rxjs.operators;
  
    document.getElementById("search-user").onclick = showUser;
    function showUser() {
      const userId = (document.getElementById("user-id").value);
      let userList = document.getElementById("user-list");
      fetchUser();
    
      async function fetchUser() {
        userList.innerHTML = "";
        let response = await fetch("https://jsonplaceholder.typicode.com/users");
        let json = await response.json();
        const user = from(json);
        user
          .pipe(filter((user) => user.id == userId))
          .subscribe((user) => {
            showUserData(user);
          });
      }
  
      function showUserData(data) {
        let lati = data.address.geo.lat;
        let long = data.address.geo.lng;
        
  
        fetchLocation();
  
        async function fetchLocation() {
          let resultLocations = await fetch("https://mapquestapi.com/geocoding/v1/reverse?key=mzpDwKtGiMBAQAXNA5fm4Ae7GCkJsRbg&location=81.1496,-37.3159"+ lati +","+ long);
          
    
  
  
          let jsonLocation = await resultLocations.json();
          let location = jsonLocation.results[0].locations[0].street;      
          console.log(location);
        }
        
        let template = `     
                    <div class="col">
                        <h4>User Info:</h4>
                        <p>Full Name: ${data.name}</p>
                        <p>Email: ${data.email} </p>
                        
                        <p>Street: ${data.address.street} </p>
                        <p>City: ${data.address.city} </p>
                        <p>Zipcode: ${data.address.zipcode} </p>
                        <p>Latitude: ${data.address.geo.lat} Longitude: ${data.address.geo.lng}</p>
                        <button id="idBtn" value="${data.id} " style="background-color:white">Get User Post</button>
                    </div>     
                `;
  
        const div = document.createElement("user-list");
        div.innerHTML = template;
        userList.append(div);
  
  
        let getPost = document.getElementById("idBtn");
        getPost.onclick = fetchUserPost;
        let userPost = document.getElementById("user-post");
        userPost.innerHTML = "";
  
  
        async function fetchUserPost() {
          let userId = getPost.value;
          let postResult = await fetch("https://jsonplaceholder.typicode.com/posts");
          let postJson = await postResult.json();
  
          from(postJson)
            .pipe(filter((user) => user.userId == userId))
            .subscribe((user) => {
              displayUserPost(user);
            });
        }
        function displayUserPost(postData) {
          console.log(postData);
        
          let template = `     
                    <div class="col">
                    <h5> User post</h5>
                        <p>Employee Id: ${postData.id}</p>
                        <p>Title: ${postData.title}</p>
                        <p>Body: ${postData.body} </p>
                        <button id="commentBtn" value="${postData.id} " style="background-color: white;">Get User Comment</button>
                        <div id="comments"> </div>
                    </div>     
                `;
          const divPost = document.createElement("user-post");
          divPost.innerHTML = template;
          userPost.append(divPost);
          let postCommentBut = document.getElementById("commentBtn");
          postCommentBut.id = "commentDisplay";
          let userComment = document.getElementById("comments");
          userComment.id = "allComments";
          postCommentBut.addEventListener("click", fetchUserComments);
  
  
  
          async function fetchUserComments() {
            const commentResult = await fetch(
              "https://jsonplaceholder.typicode.com/comments"
            );
            const commentJson = await commentResult.json();
            let comId = Number(postCommentBut.value);
  
            from(commentJson)
              .pipe(filter((commentDta) => commentDta.postId == comId))
              .subscribe((commentDta) => {
                displayComments(commentDta);
              });
  
  
            function displayComments(commentDta) {
              console.log(commentDta);
              let commentTemplate = `     
                                <div class="col">
                                <h6 ">User Comment</h6>
                                    <p>Name:  ${commentDta.name}</p>
                                    <p>Email:   ${postData.body} </p>
                                    <p>Comment: ${postData.body} </p>
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