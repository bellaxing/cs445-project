// window.onload=function(){
//     let url='http://www.mapquestapi.com/geocoding/v1/reverse?key=tWbaBBw92lD6YInMlGnx6xwwj8GpGZVO&location=81.1496,-37.3159';
//     fetch(url).then(response=>response.json())
//     .then(d=>console.log(d.results[0].locations[0].street))

//     let user=fetch('http://jsonplaceholder.typicode.com/users')
//     .then(data=>data.json()).then(console.log)
// }
// //locations
window.onload=pageLoad;
//https://jsonplaceholder.typicode.com/users
function pageLoad(){

document.getElementById("search-button").onclick=  fetchUser;
   async function fetchUser(){
    let userId= Number(document.getElementById("user-id").value)
        let users=await fetch('https://jsonplaceholder.typicode.com/users');
        let userJson=await users.json();
        let listUser=userJson.filter(elem=>elem.id===userId)
            listUser=listUser[0]
        //console.log(listUser)
        let userList=document.getElementById("user-info");
         userList.innerHTML="";
                     let userTemplate = ` 
                        <div class="col">
                        <h3>User information:</h3>
                        <p>name: ${listUser.name}</p>
                        <p>Email:${listUser.email} </p>
                        <p style="color: red;font-size: larger;">Address</p>
                        <p>Street:${listUser.address.street} </p>
                        <p>City:${listUser.address.city} </p>
                        <p>Zip:${listUser.address.zipcode} </p>
                        <button id="idBut" value="${listUser.id}">Get posts</button>
                        </div> 
                    `; 
   }
}

//https://jsonplaceholder.typicode.com/comments



