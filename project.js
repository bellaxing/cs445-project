async function fetchSingleUser() {
    let responseBody = await fetch('http://jsonplaceholder.typicode.com/comments'); //'https://randomuser.me/api/'
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
    const userId=document.getElementById("inputId").value;
    const user = await fetchSingleUser();
    user.filter(user=>user.id===userId)
        .forEach(user => {
        document.getElementById('name').innerHTML = 'Name: '+user.name.first + ' ' + user.name.last;
        document.getElementById('phone').innerHTML = 'phone:' + user.phone;
        document.getElementById('email').innerHTML = 'Email: '+user.email;
        document.getElementById('address').innerHTML='Street: '+user.location.street.number+" "+user.location.street.name;
        document.getElementById('address1').innerHTML='City: '+user.location.city+' State: '+user.location.state;
        document.getElementById('address2').innerHTML='Country: '+user.location.state+' ZipCode: '+user.location.postcode;
        });
        
}

window.onload = function() {
     

    document.getElementById('getBtn').onclick = async function() {
        await displayUserInHtml();
    }

}