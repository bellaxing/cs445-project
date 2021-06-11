"use strict";

const { from } = rxjs;
const { filter } = rxjs.operators;

window.onload = function () {

  let mykey = "v49hcfHBd6uhbmZo7QjuXInQvjRh61Eh";
  let longitude, latitude;

  document.getElementById("button").onclick = displayUser;
  function displayUser() {
    const userId = parseFloat((document.getElementById("userId").value));
    let fetchedUsers = document.getElementById("user-list");
    fetchUser();
    async function fetchUser() {
      fetchedUsers.innerHTML = "";
      let result = await fetch("https://jsonplaceholder.typicode.com/users");
      let userJson = await result.json();
      const eachUser = from(userJson);
      eachUser
        .pipe(filter((result) => result.id === userId))
        .subscribe((data) => {
          displayUserInfo(data);
        });
    }

    function displayUserInfo(data) {
      latitude = data.address.geo.lat;
      longitude = data.address.geo.lng;
      let exactLocation;
      fetchExactLocation();
      async function fetchExactLocation() {
        let result = await fetch(`https://mapquestapi.com/geocoding/v1/reverse?key=${mykey}&location=81.1496,-37.3159 + ${latitude},${longitude}`);
        //my key = v49hcfHBd6uhbmZo7QjuXInQvjRh61Eh

        let json = await result.json();
        let exactLocation = json.results[0].locations[0].street;
        console.log(exactLocation);
      }

      let id = data.id;
      let template = `     
                  <div class="col">
                      <h4 style ="color: khaki;">User Information:</h4>
                      <p>name: ${data.name}</p>
                      <p>Email:${data.email} </p>
                      <p>Street:${data.address.street} </p>
                      <p>City:${data.address.city} </p>
                      <p>Zip:${data.address.zipcode} </p>
                      <p>location:${exactLocation} </p>
                      <button id="userIdButton" value="${id} " style="background-color:blue;color:white;"> Click for User posts</button>
                  </div>     
              `;

      const userDiv = document.createElement("user-list");
      userDiv.innerHTML = template;
      fetchedUsers.append(userDiv);


      let getPost = document.getElementById("userIdButton");
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
            displayUserPost(postData);
          });
      }

      function displayUserPost(postData) {
        console.log(postData);
        let postId = postData.id;
        let userPostTemplate = `     
                  <div class="col">
                  <h5 style="color:khaki;text-align: center;"> User posts:</h5>
                      <p>Title: ${postData.title}</p>
                      <p>Body:${postData.body} </p>
                      <button id="commentButton" value="${postId}" style="background-color: khaki; color: red"> Click for comments </button>
                      <div id="list-comments"> </div>
                  </div>     
              `;
        const divPost = document.createElement("user-post");
        divPost.innerHTML = userPostTemplate;
        userPost.append(divPost);
        let postCommentBut = document.getElementById("commentButton");
        postCommentBut.id = "commentDisplay";
        let userComment = document.getElementById("list-comments");
        userComment.id = "list-of-comments";
        postCommentBut.addEventListener("click", fetchComments);

        async function fetchComments() {
          const commentResult = await fetch("https://jsonplaceholder.typicode.com/comments");
          const commentJson = await commentResult.json();
          let comId = parseFloat((postCommentBut.value));

          from(commentJson)
            .pipe(filter((commentDta) => commentDta.postId === comId))
            .subscribe((commentDta) => {
              displayComments(commentDta);
            });


          function displayComments(commentDta) {
            console.log(commentDta);
            let commentTemplate = `     
                              <div class="col">
                              <h6 style="color: red; text-align: center;">Comment:</h6>
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