window.onload = function () {
  const { from } = rxjs;
  const { filter } = rxjs.operators;
  let input = document.getElementById("inp");
  let btn = document.getElementById("btn");
  btn.onclick = data;

  function data() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => doSome(data));
  }
  function doSome(arr) {
    let card = "";
    userId = arr.filter((item) => item.id == input.value);
    userId.forEach((item) => {
      card = `
        <p>${item.name}</p>
        <p>${item.email}</p>
        <p>${item.address.street} ${item.address.suite} ${item.address.city} ${item.address.zipcode}</p>
        <p>${item.address.geo.lat} ${item.address.geo.lng}</p>
        <br>
        `;
    });
    let posts = fetch(
      "https://jsonplaceholder.typicode.com/posts?userId=" + input.value
    );
    posts.then((x) => x.json()).then((data) => showPost(data));
    document.getElementById("user").innerHTML = card;
  }

  function showPost(arr) {
    console.log(arr);
    let place = document.getElementById("first");
    let head = document.createElement("h4");
    head.innerHTML = "Posts";
    place.appendChild(head);
    let post = "";
    arr.forEach((item) => {
      post += `
      <div class="col">
       <p class=""> ${item.title}</p>
       <p class="">${item.body}</p>
       </div>
      `;
    });
    let div = document.createElement("div");
    div.className = "row";
    div.innerHTML = post;
    let btn = document.createElement("button");
    let hr = document.createElement("hr");
    div.appendChild(btn);
    row.appendChild(hr);
    btn.onclick = createDetail;
    btn.className = "btn btn-secondary";
    btn.innerHTML = "Show Comment";
    place.appendChild(div);
  }
};
