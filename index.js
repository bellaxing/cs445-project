//This is the project javascript file in feature-jyoti branch.
async function fetchSingleUser(id) {
    let responseBody = await fetch('http://jsonplaceholder.typicode.com/users');
    let json = await responseBody.json();
    return json[id];
}

// async function fetchUsers(len) {
//     const users = [];
//     for (let i = 0; i < len; i++) {
//         users[i] = await fetchSingleUser();
//     }
//     return users;
// }
async function fetchLocation(lat,lng){
    const url = "http://www.mapquestapi.com/geocoding/v1/reverse?key=Q3wki3UwkqnZrHPKJDz69sSvAF4oijG5&location="+lat+','+lng;
    //consumer key: Q3wki3UwkqnZrHPKJDz69sSvAF4oijG5
    return fetch(url).then(response => response.json())     
}


async function displayUserInHtml() {
    const inputId = parseInt(document.getElementById("userId").value);
        try {
        if (inputId >10){
            throw new Error("Error: ID not Found (Available Id :1 to 10)");
        }
       }catch (e){
          alert(e.message)
       }
    const userInformation = document.getElementById('userInfo');
    userInformation.innerHTML = '';
    const user = await fetchSingleUser(inputId -1);
    const lat = user.address.geo.lat;
    const lng = user.address.geo.lng;
    console.log(lat)
    console.log(lng)
    const currentObject = await fetchLocation(lat, lng);
    const currentLocation = currentObject.results;
    console.log(currentLocation)
    

    //userArr.forEach(user => {
        let template = `     
            <div class="col">
                <h6>Username : ${user.username}</h6>
                <h6>Name : ${user.name} </h6>
                <p>Phone : ${user.phone}</p>
                <p>Email : ${user.email}</p>
                <h5>Address:</h5>
                <p> ${user.address.suite}, ${user.address.street}.</P>
                <p>  ${user.address.city}, ${user.address.zipcode}.</P>
                <h5>Current Location:</h5>
                <p> ${currentLocation[0].locations[0].street},</P>
                <p> ${currentLocation[0].locations[0].adminArea3}, ${currentLocation[0].locations[0].postalCode}.</P>
                


            </div>     
        `;
        const div = document.createElement('div');
        div.classList = 'row border-top';
        div.innerHTML = template;
        userInformation.appendChild(div);

    
    //});
}
window.onload = async function() {
    //await displayUserInHtml();
    document.getElementById('button').onclick = async function() {
        await displayUserInHtml();
    }

}