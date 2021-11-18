window.onload = function () {
  const searchBtn = document.getElementById("searchbtn");
  searchBtn.addEventListener("click", dispUser); //btn to display the user after input
};
////////////////////////////////////function to display user
async function dispUser() {
  let input = document.getElementById("inp").value;
  if (!input || input > 10 || input <= 0) return; // nothing will happen if the input number is invalid
  let currentUserId = input;
  let response = await fetch(
    "http://jsonplaceholder.typicode.com/users/" + input
  );
  let user = await response.json();
  let dispDiv = document.getElementById("disp");
  dispDiv.innerHTML = " ";
  let userInfo = `<div class="col-4">
  <h3>User information</h3><br/>
  <div>name: ${user.name}</div><br/>
  <div>Email: ${user.email}</div><br/>
 
  <div>
  <h5 class="text-danger">Address</h5>
    street: ${user.address.street}<br />
    city:  ${user.address.city}<br />
    zip:${user.address.zip}<br />
    current location: ${user.address.geo.lat}, ${user.address.geo.lng}</div><br />
    <button style ="background-color: #00ffff" class="btn btn-info" id="getPosts">Get posts</button>
  </div>`;
  dispDiv.innerHTML = userInfo;
  document.getElementById("getPosts").addEventListener("click", dispPost);
  ////////////////////////////////////function to display post
  async function dispPost() {
    let postRes = await fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + currentUserId
    );
    let postBody = await postRes.json();
    let postdispcol = document.createElement("div");
    postdispcol.classList = "col-8";
    postdispcol.id = "postDisp";
    dispDiv.appendChild(postdispcol);
    postBody.forEach((post) => {
      let eachPost = `  
      <div>
      <h3 style=" font-weight: bold;color:	#0000CD">User Post: </h3><br/>
        <div>Title: ${post.title}</div><br/>
        <div>Body: ${post.body}</div><br/>
        <button style ="background-color: #00ffff" class="btn btn-comment" id="${post.id}">View Comments</button><br/><br/>
        <div id="c${post.id}"></div><br/>
        </div>
        `;
      postdispcol.innerHTML += eachPost;
    });

    let btnArr = document.getElementsByClassName("btn-comment");
    for (let btn of btnArr) {
      btn.addEventListener("click", viewComment);
    }
    ////////////////////////////////////function to display comment
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
          <div class="text-danger"> Comment:</div><br/>
          <div>name: ${cmt.name}</div><br/>
          <div>email: ${cmt.email}</div><br/>
          <div>body: ${cmt.body}</div><hr/>
      </div>`;
        cmtDiv.innerHTML += cmtTem;
      }
    }
  }
}
