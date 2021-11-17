window.onload = function () {
  const searchBtn = document.getElementById("searchbtn");
  searchBtn.addEventListener("click", dispUser);
};
async function dispUser() {
  let input = document.getElementById("inp").value;
  if (!input || input > 10 || input <= 0) return;
  let currentUserId = input;
  let response = await fetch(
    "http://jsonplaceholder.typicode.com/users/" + input
  );
  let user = await response.json();
  let dispDiv = document.getElementById("disp");
  dispDiv.innerHTML = " ";
  let userInfo = `<div class="col-4">
  <h3>User information</h3>
  <div>name:${user.name}</div>
  <div>Email:${user.email}</div>
  <h5 class="">Address</h5>
  <div>
    street:${user.address.street}<br />
    city:${user.address.city}<br />
    zip:${user.address.zip}<br />
    current location:${user.address.curentLocation}<br /></div>
    <button class="btn btn-success" id="getPosts">Get posts</button>
  </div>`;
  dispDiv.innerHTML = userInfo;
  document.getElementById("getPosts").addEventListener("click", dispPost);

  async function dispPost() {
    let postRes = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + currentUserId
    );
    let postBody = await postRes.json();
    let postdispcol = document.createElement("div");
    postdispcol.classList = "col-8";
    postdispcol.id = "postDisp";
    postdispcol.innerHTML = `<h3>User Post</h3>`;
    dispDiv.appendChild(postdispcol);

    postBody.forEach((post) => {
      let eachPost = `  
      <div>
  <div>Title:${post.title}</div>
  <div>Body:${post.body}</div>
<button class="btn btn-success btn-comment" id="${post.id}">View Comments</button>
<div id="c${post.id}"></div>

</div>
`;
      postdispcol.innerHTML += eachPost;
    });

    ////////////////
    let btnArr = document.getElementsByClassName("btn-comment");
    for (let btn of btnArr) {
      btn.addEventListener("click", viewComment);
    }
    async function viewComment() {
      let postid = this.id;
      let cmtDiv = document.getElementById(`c${postid}`);
      if (cmtDiv.innerHTML != "") return;
      let comRes = await fetch(
        "https://jsonplaceholder.typicode.com/comments?postId=" + postid
      );
      let comBody = await comRes.json();
      for (let cmt of comBody) {
        let cmtTem = ` <div>
          <div class="warning"> Comment:</div>
          <div>name: ${cmt.name}</div>
          <div>email: ${cmt.email}</div>
          <div>body: ${cmt.body}</div>
      </div>`;
        cmtDiv.innerHTML += cmtTem;
      }
    }
  }
}
