"use strict";

window.onload = function () {
  const { from } = rxjs;
  const { filter } = rxjs.operators;

  document.getElementById("search-user").onclick = displayUser;;




  function displayUser() {
    const userId = parseFloat((document.getElementById("user-id").value));
    let userList = document.getElementById("user-list");
    fetchUser();

    async function fetchUser() {
      userList.innerHTML = "";
      let result = await fetch("https://jsonplaceholder.typicode.com/users");
      let userFetch = await result.json();
      const user = from(userFetch);
      user
        .pipe(filter((element) => element.id === userId))
        .subscribe((data) => {
          displayUserData(data);
        });
    }