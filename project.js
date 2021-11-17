"use strict"
window.onload = function(){
    document.getElementById("search").onclick = getData;

}

async function getData(){
        const id = document.getElementById("idInput").value;
        if(id==="" || id<0 || id >10){
            return;
        }else{
            const response = await fetch("http://jsonplaceholder.typicode.com/users/"+id);
            const user = await response.json();
            let template = ` <div class="col-4">
                    <h3 class="fw-bold">User Information:</h3>
                    <p>Name: ${user.name}</p>
                    <p>Email: ${user.email}</p>
                    <h4 class="">Address</h4>
                    <p>Street: ${user.address.street}</p>
                    <p>City: ${user.address.city}</p>
                    <p>Zip: ${user.address.zipcode}</p>
                     <p>current location: ${user.address.geo.lat}-${user.address.geo.lng}</p>
                    <button id="posts">Get Posts</button>`
                const div = document.getElementById("userDiv");
                div.innerHTML = template;
        }


           
    }
    