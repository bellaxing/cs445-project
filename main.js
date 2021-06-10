"use strict";
window.onload = function () {
  const { from } = rxjs;
  const { filter } = rxjs.operators;

  document.getElementById("search-user").onclick = showUser;
  function showUser() {
    const userId = parseFloat((document.getElementById("user-id").value));
    let userList = document.getElementById("user-list");
    fetchUser();
  
    async function fetchUser() {
      userList.innerHTML = "";
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let userFetch = await response.json();
      const user = from(userFetch);
      user
        .pipe(filter((element) => element.id === userId))
        .subscribe((data) => {
          showUserData(data);
        });
    }

    function showUserData(data) {
      let lati = data.address.geo.lat;
      let long = data.address.geo.lng;
      let location;

      fetchLocation();

      async function fetchLocation() {
        let resultLocations = await fetch("https://mapquestapi.com/geocoding/v1/reverse?key=mzpDwKtGiMBAQAXNA5fm4Ae7GCkJsRbg&location=81.1496,-37.3159"+ lati +","+ long);
        
        // my key = mzpDwKtGiMBAQAXNA5fm4Ae7GCkJsRbg


        let jsonLocation = await resultLocations.json();
        let location = jsonLocation.results[0].locations[0].street;      
        console.log(location);
      }
      let id = data.id;
      let template = `     
                  <div class="col">
                      <h3>User information:</h3>
                      <p>name: ${data.name}</p>
                      <p>Email:${data.email} </p>
                      <p style="color:red;font-size: larger;">Address</p>
                      <p>Street:${data.address.street} </p>
                      <p>City:${data.address.city} </p>
                      <p>Zip:${data.address.zipcode} </p>
                      <p>location:${location} </p>
                      <button id="idBut" value="${id} " style="background-color:lawngreen">Posts</button>
                  </div>     
              `;

      const div = document.createElement("user-list");
      div.innerHTML = template;
      userList.append(div);


      let getPost = document.getElementById("idBut");
      getPost.onclick = fetchUserPost;
      let userPost = document.getElementById("user-post");
      userPost.innerHTML = "";


      async function fetchUserPost() {
        let userId = getPost.value;
        let postResult = await fetch("https://jsonplaceholder.typicode.com/posts");
        let postJson = await postResult.json();

        from(postJson)
          .pipe(filter((elem) => elem.userId === +userId))
          .subscribe((postData) => {
            showUserPost(postData);
          });
      }