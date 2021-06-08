


// Page elements 
// Starting with defining the page elements 
const inputfield = document.querySelector("#input");
const searchbutton = document.querySelector("#searchbtn");
const userinfo = document.getElementById("responsefield");
//const commentButton = document.querySelector("#commentbtn")

// Information to reach API


function userLoader() {                 // This is the main function on page load

    async function getUser() {
        let userId = parseInt(inputfield.value);
        let users = await fetch(`https://jsonplaceholder.typicode.com/users`);
        let userJasonfetched = await users.json();
        const listUser = userJasonfetched.filter(element => element.id === userId); // this filters out the users' json based on id
        listUser = listUser[0];
        console.log(listUser);
        // Let's now prepare the template to append to our div in the page to display the list of users
        userinfo.innerHTML = "";
        let ourUserTemplate = `
        <div class='col'>
        <h3>User Info: </h3>
        <p>name: ${listUser.name}</p>
        <p>Email:${listUser.email}</p>
        <p>Address</p>
        <p>Street:${listUser.address.street}</p>
        <p>City:${listUser.address.city}</p>
        <p>Zip-Code:${listUser.address.zipcode}</p>
        <button id="buttonId" value= = "${listUser.id}">Posts</button>
        </div>
        `;
        const userContainer = document.createElement("user-list");
        userContainer.innerHTML = ourUserTemplate;
        userList.append(userContainer);
        let getPost = document.getElementById("buttonId");
        getPost.onclick = document.getElementById('user-post');
        userPost.innerHTML = "";
    }
    searchbutton.addEventListener('click', getUser);
    
}