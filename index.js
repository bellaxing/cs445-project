const { from } = rxjs;
const { filter } = rxjs.operators;
window.onload = function () {
  let btn = document.getElementById("btn");
  btn.onclick = data;
};

async function data() {
  let result = await fetch("https://jsonplaceholder.typicode.com/users");
  let res = await result.json();
  document.getElementById("first").innerHTML = "";
  document.getElementById("second").innerHTML = "";

  doSome(res);
}

function doSome(users) {
  let inputId = +document.getElementById("inp").value;

  from(users)
    .pipe(filter((x) => x.id == inputId))
    .subscribe((data) => {
      let innerdiv = document.getElementById("user");
      innerdiv.innerHTML = "";

      let user = `
         <div style="text-align:center"class="col">
         <p class="text-center"><b>Name: ${data.name}</b></p>
         <p class="text-center"> <b>Email: ${data.email}</b></p>
         <p class="text-center"> <b>Address: ${
           data.address.city +
           " " +
           data.address.street +
           " " +
           data.address.zipcode
         }</b></p>
         <p class="text-center"><b>Current Location: ${
           data.address.geo.lng + " " + data.address.geo.lat
         }</b></p>
         </div>
         
         `;
      let importPost = fetch(
        "https://jsonplaceholder.typicode.com/posts?userId=" + inputId
      );
      importPost.then((x) => x.json()).then((data) => showPost(data));

      let row = document.createElement("div");
      row.className = "row";
      row.innerHTML = user;
      innerdiv.appendChild(row);
    });
}

function showPost(arr) {
  let innerdiv = document.getElementById("first");
  let phead = document.createElement("h4");
  phead.innerHTML = "USER POSTS";
  phead.className = "offset-5 mb-5";
  innerdiv.appendChild(phead);
  from(arr).subscribe((data) => {
    let post = `
       <div class="col">

       <p class="text-end"><b> ${data.title}</b></p>
       <p class="text-end">${data.body}</p>
       </div>

       `;
    let row = document.createElement("div");
    let hr = document.createElement("hr");
    row.className = "row";
    row.innerHTML = post;
    let dBtn = document.createElement("button");
    row.appendChild(dBtn);
    row.appendChild(hr);
    dBtn.onclick = function () {
      comments(data.id);
    };
    dBtn.className = "btn btn-success";
    dBtn.style.width = "25%";
    dBtn.innerHTML = "Show Comment";
    innerdiv.appendChild(row);
  });
}
function comments(id) {
  let innerdiv = document.getElementById("second");
  innerdiv.innerHTML = "";
  let chead = document.createElement("h4");
  chead.innerHTML = "USER Comments";
  chead.className = "offset-5 mb-5";
  innerdiv.appendChild(chead);
  from(
    fetch(
      "https://jsonplaceholder.typicode.com/comments?postId=" + id
    ).then((x) => x.json())
  ).subscribe((data) => {
    data.forEach((com) => {
      let post = `
            <div class="col">
            <p class="text-end"><b>Name: ${com.name}</b></p>
            <p class="text-end"><b>email: ${com.email}</b></p>
            <p class="text-end">Comment: ${com.body}</p>
            </div>

            `;
      let row = document.createElement("div");
      let hr = document.createElement("hr");
      row.className = "row";
      row.innerHTML = post;
      row.appendChild(hr);
      innerdiv.appendChild(row);
    });
  });
}
