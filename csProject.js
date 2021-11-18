window.onload = function () {
  document.getElementById("btn").addEventListener("click", userIdSearch);
};

async function userIdSearch() {
  const IdNumber = document.getElementById("idNo").value;
  document.getElementById("posts").innerHTML = "";
  const idUser = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + IdNumber
  );
  const userInfo = await idUser.json();
  const locationResponse = await fetch(
    `https://www.mapquestapi.com/geocoding/v1/reverse?key=	cfl8DwAgMcbCs8Gzme7b7J6XabVmHOFy&location=
    ${userInfo.address.geo.lat},${userInfo.address.geo.lng}
    &includeRoadMetadata=true&includeNearestIntersection=true`
  );
  const currentLo = await locationResponse.json();

  let template = `
           
                <br><div> <h3> User Information </h3></div>
                
                 <div> <span class="fw-bold"> Name: </span> ${userInfo.name}</div><br>
                 <div> <span class="fw-bold">Email: </span>${userInfo.email}</div><br>
                 <div> <h5 style="color:Tomato" style="text-Bold" >Addrees <h5></div>
                 <div> <span class="fw-bold">Street:</span> ${userInfo.address.street}</div><br>
                 <div> <span class="fw-bold"> City: </span> ${userInfo.address.city}</div><br>
                 <div> <span class="fw-bold">Zip:</span> ${userInfo.address.zipcode}</div><br>
                 <div> <span class="fw-bold"> Current Location:</span>${userInfo.address.geo.lat}-${userInfo.address.geo.lng}</div> <br>
               
          
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

          commentContent.innerHTML = `<div style="color:Tomato ">Comment:</div><span class="fw-bold">
           name:</span> ${comment.name}<br> <br> <span class="fw-bold">email</span>: ${comment.email} 
           <br><br><span class="fw-bold"> body: </span>${comment.body} <br><br>`;
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
