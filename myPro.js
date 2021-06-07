function pageOnload() {
    const search = document.getElementById("search");
    search.onclick = displayUserinformation;
    function displayUserinformation() {
      User();
      const userId = Number(document.getElementById("id").value);
      async function User() {
        let userList = document.getElementById("users");
        userList.innerHTML = "";
        let result = await fetch("http://jsonplaceholder.typicode.com/users");
        let userFetch = await result.json();
        console.log(userFetch);
            };
      }
    }
  window.onload = pageOnload;