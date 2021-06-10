async function fetchSingleUser() {
    let responseBody = await fetch('http://jsonplaceholder.typicode.com/users');
    let json = await responseBody.json();
    return json[0];
}

// async function fetchUsers(len) {
//     const users = [];
//     for (let i = 0; i < len; i++) {
//         users[i] = await fetchSingleUser();
//     }
//     return users;
// }

async function displayUserInHtml() {
    
    const user = await fetchSingleUser();
        document.getElementById('name').innerHTML = 'Full Name: '+user.name;
        document.getElementById('phone').innerHTML = 'phone:' + user.phone;
        document.getElementById('email').innerHTML = "Email: "+user.email;
        document.getElementById('address').innerHTML='Street: '+user.address.street+" "+user.address.suite;
        document.getElementById('address1').innerHTML='City: '+user.address.city+' ZipCode: '+user.address.zipcode;
        document.getElementById('geoLocation').innerHTML='Location: Latitude: '+user.address.geo.lat+' Longitude: '+user.address.geo.lng;
    }

window.onload = async function() {
    await displayUserInHtml();

    document.getElementById('getBtn').onclick = async function() {
        await displayUserInHtml();
    }

}

// async function fetchSingleUser() {
//     let responseBody = await fetch('http://jsonplaceholder.typicode.com/comments'); //'https://randomuser.me/api/'
//     let json = await responseBody.json();
//     return json.results[0];
// }

// async function fetchUsers(len) {
//     const users = [];
//     for (let i = 0; i < len; i++) {
//         users[i] = await fetchSingleUser();
//     }
//     return users;
// }



/*
window.onload = function() {
     

    document.getElementById('getBtn').onclick = async function() {
        const userId=document.getElementById("inputId").value;
        let responseBody = await fetch('http://jsonplaceholder.typicode.com/users'); //'https://randomuser.me/api/'
        let json = await responseBody.json();
        const user = json.results;
        user.filter(user=>user.postId===userId)
            .forEach(user => {
            document.getElementById('name').innerHTML = 'Name: '+user.name.first + ' ' + user.name.last;
            document.getElementById('phone').innerHTML = 'phone:' + user.phone;
            document.getElementById('email').innerHTML = 'Email: '+user.email;
            document.getElementById('address').innerHTML='Street: '+user.location.street.number+" "+user.location.street.name;
            document.getElementById('address1').innerHTML='City: '+user.location.city+' State: '+user.location.state;
            document.getElementById('address2').innerHTML='Country: '+user.location.state+' ZipCode: '+user.location.postcode;
            });
            
    }

}

*/