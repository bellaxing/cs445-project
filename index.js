window.onload = function () {
  const searchBtn = document.getElementById("searchbtn");
  searchBtn.addEventListener("click", dispUser);
};
async function dispUser() {
  let input = document.getElementById("inp").value;
  if (!input || input > 10 || input <= 0) return;

  let response = await fetch(
    "http://jsonplaceholder.typicode.com/users/" + input
  );
  let user = await response.json();
  console.log(user);
  const dispDiv = document.getElementById("disp");
  dispDiv.innerHTML = " ";
  let useInfo = `<div class="col-4">
  <h3>User information</h3>
  <div>name:${user.name}</div>
  <div>Email:${user.email}</div>
  <h5 class="">Address</h5>
  <div>
    street:${user.address.street}<br />
    city:${user.address.city}<br />
    zip:${user.address.zip}<br />
    current location:${user.address.curentLocation}<br />
    <button class="btn btn-success" id="getPosts">Get posts</button>
  </div>`;
  dispDiv.innerHTML = useInfo;
}
