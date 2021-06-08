function userActivity() {
    const { from } = rxjs;
    const { filter } = rxjs.operators;
    search.onclick = displayUser;

    function displayUserIfo() {
        const userId = Number(document.getElementById("user-id").value);
        let userList = document.getElementById("user-list");
        fetchUserInfo();


        async function fetchUserInfo() {
            userList.innerHTML = "";
            const url = 'https://jsonplaceholder.typicode.com/users';
            let ResponseBody = await fetch(url);
            let json = await ResponseBody.json();
            const user = from(json);
            user
                .pipe(filter((element) => element.id === userId))
                .subscribe((data) => {
                    displayUserData(data);
                });

        }

        function displayUserData(data) {
            let lati = data.address.geo.lat;
            let long = data.address.geo.lng;
            let currentLocation;

            fetchCurrentLocation();

            async function fetchCurrentLocation() {
                let resultLocations = await fetch(
                    "https://mapquestapi.com/geocoding/v1/reverse?key=q5N7YWFQnHlQCfx0KyD5d1qoATAAFezV&location=" +
                    lati +
                    "," +
                    long
                );
                let jsonLocation = await resultLocations.json();

                currentLocation = jsonLocation.results[0].locations[0].street;
                if (currentLocation === "") {
                    navigator.geolocation.getCurrentPosition(latLong, failToLoad);
                }

                function latLong(position) {
                    lati = position.coords.latitude;
                    long = position.coords.longitude;
                    fetchCurrentLocation();
                }

                function failToLoad() {
                    alert("current locations failed to load");
                }
                console.log(currentLocation);
            }

            let id = data.id;
            let userTemplate = `     
                  <div class="col">
                      <h3>User information:</h3>
                      <p>name: ${data.name}</p>
                      <p>Email:${data.email} </p>
                      <p style="color: red;font-size: larger;">Address</p>
                      <p>Street:${data.address.street} </p>
                      <p>City:${data.address.city} </p>
                      <p>Zip:${data.address.zipcode} </p>
                      <p>Current location:${currentLocation} </p>
                      <button id="idBut" value="${id} " style="background-color: aqua;">Get posts</button>
                  </div>     
              `;


        }
    }
}


//    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=dO3a4FAviRC1A3StSlMVtX2L3XfRQvcd&location=81.1496,-37.3159&includeRoadMetadata=true&includeNearestIntersection=true';