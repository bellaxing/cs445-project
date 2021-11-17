window.onload = function () {

    document.getElementById('search').onclick = fetchUser;
}

async function fetchUser() {

    const userId = document.getElementById('userId').value;

    let result = await fetch('http://jsonplaceholder.typicode.com/users/' + userId);
    let user = await result.json();
    renderUser(user);
}

function renderUser(user) {


    document.getElementById('name').innerHTML = user.name;
    document.getElementById('email').innerHTML = user.email; //can also have .textContent
    document.getElementById('street').innerHTML = user.address.street;
    document.getElementById('city').innerHTML = user.address.city;
    document.getElementById('zip').innerHTML = user.address.zipcode;
    document.getElementById('lat').innerHTML = user.address.geo.lat;
    document.getElementById('long').innerHTML = user.address.geo.lng;

}


