

window.onload = function () {

    document.getElementById("user-btn").addEventListener("click",  async function () {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + 
        document.getElementById("user-id").value)
        const user = await response.json()
        console.log(user)
        const divUserInfo = document.querySelector(".col-4");
        divUserInfo.innerHTML = "<pre> </pre>" 
            + "<p> <b>Name</b>: " + user.name + "</p>" 
            + "<p>" + user.email + "</p>" 
            + "<h3>Address</h3>"
            + "<p> <b>Street</b>: " + user.address.street + "</p>"
            + "<p> <b>City</b>: " + user.address.city + "</p>"
            + "<p> <b>Zip</b>: " + user.address.zipcode + "</p>"
            + "<p> <b>Current location</b>: " + user.address.zipcode + "</p>"
            + "<button class='btn btn-secondary' id='post-btn'> Get post</button>";
        
        // const postBtn = document.createElement('button')
        // postBtn.innerHTML = "Get post";
        // postBtn.id = "post-btn"
        // divUserInfo.appendChild(postBtn)
    })
}