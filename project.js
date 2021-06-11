async function fetchSingleUser() {
    let responseBody = await fetch('http://jsonplaceholder.typicode.com/users');
    let json = await responseBody.json();
    return json;
}

async function displayUserInHtml() {
    const employeeDiv = document.getElementById("employee-list");
    const id= document.getElementById("inputId").value;
    const users = await fetchSingleUser();
     users.filter(user=>user.id==id)
         .forEach(user => {
              let template = `     
            
            <div class="col">
                <h>${user.name} </h3>
                <p>phone: ${user.phone}</p>
                <p>${user.email}</p>
                <p>${user.address.street} ${user.address.suite}</p>
                <p>${user.address.city} ${user.address.zipcode}</p>
                <p>${user.address.geo.lat} ${user.address.geo.lng}</p>
            </div>     
        `
        const div = document.createElement("div");
        // div.classList = 'row border-top';
        div.innerHTML = template;
        employeeDiv.append(div);
        // document.body.appendChild(div);
         }); 
      
    }

window.onload = async function() {
    await displayUserInHtml();

    document.getElementById("getBtn").onclick = async function() {
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