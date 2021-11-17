window.onload = function () {
  document.getElementById("btn").addEventListener("click", userIdSearch);
};

async function userIdSearch() {
  const IdNumber = document.getElementById("idNo").value;

  const idUser = await fetch(
    "http://jsonplaceholder.typicode.com/users/" + IdNumber
  );
  const userInfo = await idUser.json();

  const userInformation = document.getElementById("userInfo");
  userInformation.innerHTML = "";
  // let div1 = document.createElement("div");
  // div1.classList = "col-6";
  // userInformation.append(div1);
  let template = `
           
                <br><div> <h3> User Information </h3></div>
                
                 <div> <span class="fw-bold"> Name: </span> ${userInfo.name}</div><br>
                 <div> Email: ${userInfo.email}</div><br>
                 <div> <h5 style="color:Tomato" >Addrees <h5></div>
                 <div> Street: ${userInfo.address.street}</div><br>
                 <div> City: ${userInfo.address.city}</div><br>
                 <div> Zip: ${userInfo.address.zipcode}</div><br>
                 <div> Zip: ${userInfo.address.currentLocation}</div> <br>
               
            <hr>
            `;

  let getPost = document.createElement("button");
  getPost.innerHTML = "Get Posts";
  getPost.style.backgroundColor = "aqua";

  getPost.onclick = async function () {
    document.getElementById("posts").innerHTML = "";
    const IdNumber = document.getElementById("idNo").value;

    const postsUser = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + IdNumber
    );
    const postInfo = await postsUser.json();
    postInfo.forEach((post) => {
      let postContent = document.createElement("div");

      postContent.innerHTML = `<br><h3> User posts:</h3> <span class="fw-bold">title:</span> ${post.title} <br><br> <span class="fw-bold">body:</span>${post.body} <br><br>`;

      let viewComment = document.createElement("button");
      viewComment.style.backgroundColor = "aqua";
      let commentInfo = document.createElement("div");
      viewComment.innerHTML = "View Comments";

      viewComment.onclick = async function () {
        commentInfo.innerHTML = "";
        let result = await fetch(
          "https://jsonplaceholder.typicode.com/comments?postId=" + post.id
        );
        let comments = await result.json();

        comments.forEach((comment) => {
          let commentContent = document.createElement("div");

          commentContent.innerHTML = `<div style="color:Tomato ">Comment:</div><span class="fw-bold"> name:</span> ${comment.name}<br> <br> <span class="fw-bold">email</span>: ${comment.email} <br><br><span class="fw-bold"> body: </span>${comment.body} <br>`;
          commentInfo.append(commentContent);
        });
      };
      document.getElementById("posts").append(postContent);
      document.getElementById("posts").append(viewComment);
      document.getElementById("posts").append(commentInfo);
    });
  };
  document.getElementById("userInfo").innerHTML = template;
  document.getElementById("userInfo").append(getPost);
}
