window.onload = function () {
  document.getElementById("btn").onclick = function () {
   document.getElementById("row1").innerHTML = "";
    document.getElementById("posts").innerHTML = "";
    document.getElementById("comments").innerHTML = "";
    let input = +document.getElementById("input").value;
    usersList(input);
   document.getElementById("input").value = "";
  };
};
const { from } = rxjs;
const { filter, map } = rxjs.operators;

async function usersList(input) {
  let promise = await fetch("https://jsonplaceholder.typicode.com/users");
  let employee = await promise.json();

  let row = document.getElementById("row1");
  row.innerHTML = "";

  from(employee)
    .pipe(filter((emp) => emp.id == input))
    .subscribe((emp) => {
      let div1 = document.createElement("div");
      div1.classList = "col-md-6";
      let name = document.createElement("span");
      name.classList = "text-left";
      name.innerHTML = emp.name;
      let div2 = document.createElement("div");
      div2.classList = "col-md-6";
      let email = document.createElement("div");
      email.classList = "text-right text-capitalize";
      email.innerHTML = emp.email;
      let address = document.createElement("div");
      address.classList = "text-right text-capitalize"
      address.innerHTML = emp.address.street;
      let city = document.createElement("div");
      city.classList = "text-right text-capitalize";
      city.innerHTML = emp.address.city + ", " + emp.address.zipcode;;
      let geoLoc = document.createElement("div");
      geoLoc.classList = "text-right text-capitalize";
      geoLoc.innerHTML = emp.address.geo.lat + ", " + emp.address.geo.lng;
      let hr = document.createElement("hr");
      let space = document.createElement("div");
      space.classList = "col-md-12 text-center mt-3";
      let posts = document.createElement("input");
      posts.type = "button";
      posts.classList = "btn btn-info w-3";
      posts.id = "btn-post";
      posts.value = "Posts";
      space.appendChild(posts);
      div1.appendChild(name);
      div1.appendChild(email);
      div2.appendChild(address);
      div2.appendChild(city);
      div2.appendChild(geoLoc);
      row.appendChild(div1);
      row.appendChild(div2);
      row.appendChild(space);
      row.appendChild(hr);
      
    });
    document.getElementById("btn-post").addEventListener("click", function(){postList(input)});
}

async function postList(input) {
  let promise = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + input);
  let posts = await promise.json();
  let row = document.getElementById("posts");
  row.innerHTML = "";
    from(posts)
      .subscribe((emp) => {
        let title = document.createElement("p");
        title.innerHTML = emp.title;
        let post = document.createElement("p");
        post.innerHTML = emp.body;
        let hr = document.createElement("hr");
        let comment = document.createElement("input");
        comment.type = "button";
        comment.classList = "btn btn-info w-30";
        comment.id = `${emp.id}`;
        comment.value = "Comments";
        row.appendChild(title);
        row.appendChild(post);
        row.appendChild(comment);
        row.appendChild(hr);
        document.getElementById(`${emp.id}`).addEventListener("click", function(){commentList(emp.id)});
      });   
};

async function commentList(input) {
    let promise = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + input);
    let posts = await promise.json();
    console.log(posts);
    let row = document.getElementById("comments");
    row.innerHTML = "";
      from(posts)
        .subscribe((emp) => {
            console.log(emp);
            let name = document.createElement("span");
            name.classList = "text-right";
            name.innerHTML = emp.name;
            let email = document.createElement("div");
            email.classList = "text-right";
            email.innerHTML = emp.email;
            let comment = document.createElement("div");
            comment.innerHTML = emp.body;
            let hr = document.createElement("hr");
            row.appendChild(name);
            row.appendChild(email);
            row.appendChild(comment);
            row.appendChild(hr);
            console.log(row);
        });
  };


 