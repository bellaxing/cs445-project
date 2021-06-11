window.onload = pageOnload;

function pageOnload() {
    const search = document.getElementById("search-user");
    const { from } = rxjs;
    const { filter } = rxjs.operators;
    search.onclick = displayUser;

    // display user function
    function displayUser() {
        const userId = Number(document.getElementById("user-id").value);
        let userDetail = document.getElementById("user-list");
        fetchUser();

        // get user information

        async function fetchUser() {
            userDetail.innerHTML = "";
            let result = await fetch("https://jsonplaceholder.typicode.com/users");
            let userFetch = await result.json();
            const user = from(userFetch);
            user
                .pipe(filter((element) => element.id === userId))
                .subscribe((data) => {
                    displayUserData(data);
                });
        }

        function displayUserData(data) {
            let lati = data.address.geo.lat;
            let long = data.address.geo.lng;
            let currentLocation;
            getCurrentLocation();

            async function getCurrentLocation() {
                let resultLocations = await fetch(
                    "https://mapquestapi.com/geocoding/v1/reverse?key=q5N7YWFQnHlQCfx0KyD5d1qoATAAFezV&location=" +
                    lati +
                    "," +
                    long
                );
                let jsonLocation = await resultLocations.json();
                currentLocation = jsonLocation.results[0].locations[0].street;
                if (currentLocation === "") {
                    navigator.geolocation.getCurrentPosition(latLong, failToLoad);
                }

                function latLong(position) {
                    lati = position.coords.latitude;
                    long = position.coords.longitude;
                    fetchCurrentLocation();
                }

                function failToLoad() {
                    alert("current locations failed to load");
                }
                console.log(currentLocation);
            }

            let id = data.id;
            let userTemplate = `     
                  <div class="col" >
                      <h3>User information:</h3>
                      <p style="font-size": large >name: ${data.name}</p>
                      <p>Email:${data.email} </p>
                      <p>Street:${data.address.street} </p>
                      <p>City:${data.address.city} </p>
                      <p>Zip:${data.address.zipcode} </p>
                      <p>Current location:${currentLocation} </p>
                      <button id="idBut" value="${id} " style="background-color: orange;" >Get posts</button>
                  </div>     
              `;

            const userDiv = document.createElement("user-list");
            userDiv.innerHTML = userTemplate;
            userDetail.append(userDiv);
            let getPost = document.getElementById("idBut");
            getPost.onclick = getPosts;
            let userPost = document.getElementById("user-post");
            userPost.innerHTML = "";

            // get posts from remote API

            async function getPosts() {
                let userId = getPost.value;
                let postResult = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                let postJson = await postResult.json();
                from(postJson)
                    .pipe(filter((item) => item.userId === Number(userId)))
                    .subscribe((data) => {
                        users(data);
                    });
            }

            function users(postData) {
                let postId = postData.id;
                let userPostTemplate = `     
                  <div class="col">
                  <h3 class='userPost'> User post:</h3>
                      <p>Title: ${postData.title}</p>
                      <p>Body:${postData.body} </p>
                      <button id="commentBut" value="${postId} "> View comments</button>
                      <div id="list-comments"> </div>
                      <hr> 
                  </div>     
              `;
                const divPost = document.createElement("user-post");
                divPost.innerHTML = userPostTemplate;
                userPost.append(divPost);
                let postCommentBut = document.getElementById("commentBut");
                postCommentBut.id = "commentDisplay";
                let userComment = document.getElementById("list-comments");
                userComment.id = "list-of-comments";
                postCommentBut.addEventListener("click", getComments, false);

                // get all comments from remote API

                async function getComments() {
                    const commentResult = await fetch(
                        "https://jsonplaceholder.typicode.com/comments"
                    );
                    const commentJson = await commentResult.json();
                    let comId = Number(postCommentBut.value);
                    from(commentJson)
                        .pipe(filter((commentDta) => commentDta.postId === comId))
                        .subscribe((resp) => {
                            displayComments(resp);
                        });

                    // displaying all comments

                    function displayComments(comments) {
                        let commentTemplate = `     
                              <div class="col">
                              <h6 style="font-size: large;">Comment:</h6>
                                  <p>name:  ${comments.name}</p>
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