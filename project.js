async function fetchSingleUser() {
    let responseBody = await fetch('https://randomuser.me/api/');
    let json = await responseBody.json();
    return json.results[0];
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
        document.getElementById('name').innerHTML = user.name.first + ' ' + user.name.last;
        document.getElementById('phone').innerHTML = 'phone:' + user.phone;
        document.getElementById('email').innerHTML = user.email;
        document.getElementById('address').innerHTML='Street: '+user.location.street.number+" "+user.location.street.name;
        document.getElementById('address1').innerHTML='City '+user.location.city+' State: '+user.location.state;
        document.getElementById('address2').innerHTML='Country '+user.location.state+' ZipCode: '+user.location.postcode;
}

window.onload = async function() {
    await displayUserInHtml();

    document.getElementById('getBtn').onclick = async function() {
        await displayUserInHtml();
    }

}