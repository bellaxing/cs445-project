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

  function showPost(p) {
    let innerdiv = document.getElementById("first");
    let phead = document.createElement("h4");
    phead.innerHTML = "POSTS";
    innerdiv.appendChild(phead);
    from(p).subscribe((data) => {
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
      dBtn.onclick = detail;
      dBtn.className = "btn btn-secondary";
      dBtn.innerHTML = "Show Comment";
      innerdiv.appendChild(row);
    });
  }
};
