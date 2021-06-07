"use strict";

window.onload = function () {
  const { from } = rxjs;
  const { filter } = rxjs.operators;

  document.getElementById("SID").onclick = displayUser;;




  function displayUser() {
    const userId = parseFloat((document.getElementById("UID").value));
    let userList = document.getElementById("UID");
    fetchUser();

    ///====
    async function fetchUser() {
      userList.innerHTML = "";
      let result = await fetch("https://jsonplaceholder.typicode.com/users");
      let userFetch = await result.json();
      const user = from(userFetch);
      user
        .pipe(filter((data) => data.id === userId))
        .subscribe((data) => {
          displayUserData(data);
        });
    }
    //=====\