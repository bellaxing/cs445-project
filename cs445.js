function pageOnload() {
  //http://jsonplaceholder.typicode.com/users
  const search = document.getElementById("search-user");

  const { from } = rxjs;
  const { filter } = rxjs.operators;
  search.onclick = displayUser;
  function displayUser() {
    fetchUser();
    const userId = Number(document.getElementById("user-id").value);
    async function fetchUser() {
      let userList = document.getElementById("user-list");
      userList.innerHTML = "";
      let result = await fetch("http://jsonplaceholder.typicode.com/users");
      let userFetch = await result.json();
      console.log(userFetch);
      const user = from(userFetch);
      user
        .pipe(filter((element) => element.id === userId))
        .subscribe((data) => {
          let id = data.id;
          let template = `     
            <div class="col">
                <h3>User information:</h3>
                <p>name: ${data.name}</p>
                <p>Email:${data.email} </p>
                <p style="color: red;font-size: larger;">Address</p>
                <p>Street:${data.address.street} </p>
                <p>City:${data.address.city} </p>
                <p>Zip:${data.address.zipcode} </p>
                <button id="idBut" value="${id} " style="background-color: aqua;">Get posts</button>
            </div>     
        `;
          const userDiv = document.createElement("user-list");
          //div.classList = "row border-top";
          userDiv.innerHTML = template;
          userList.append(userDiv);
          let getPost = document.getElementById("idBut");
          getPost.onclick = fetchUserPost;
          async function fetchUserPost() {
            let userId = getPost.value;
            let userPost = document.getElementById("user-post");
            userPost.innerHTML = "";
            let postResult = await fetch(
              "http://jsonplaceholder.typicode.com/posts"
            );
            let postJson = await postResult.json();
            console.log(postJson);
            from(postJson)
              .pipe(filter((elem) => elem.userId === Number(userId)))
              .subscribe((postData) => {
                console.log(postData);
                let id = postData.id;
                let template = `     
              <div class="col">
                  <h3> User post:</h3>
                  <p>Title: ${postData.title}</p>
                  <p>Body:${postData.body} </p>
                  <button id="commentBut" value="${id} " style="background-color: aqua;">Comments</button>
              </div>     
          `;
                const divPost = document.createElement("user-post");
                divPost.innerHTML = template;
                userPost.appendChild(divPost);
              });
          }
        });
    }
  }
}

window.onload = pageOnload;
