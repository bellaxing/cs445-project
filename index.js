

window.onload = function () {

    document.getElementById("user-btn").addEventListener("click", fetchUsers )
}


async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + document.getElementById("user-id").value)
    const user = await response.json()
    
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
        
    document.getElementById("post-btn").addEventListener("click", fetchPosts)

}

 async function fetchPosts () {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + document.getElementById("user-id").value)
    const userPost = await response.json()
    
    userPost.forEach(function(post){
        const divUserInfo = document.querySelector(".col-7.row");
        const divPost= document.createElement("div")
        divPost.classList = "col-12 postId-" + document.getElementById("user-id").value
        divPost.innerHTML = 
            "<hr>"
            + " <h5>User Post </h5>"
            + "<p><b>Title</b>:" + post.title +"</p> "
            + "<p><b>Body</b>:" + post.body + "</p>"
            + "<button class='btn btn-secondary comment-btn' type='button'> Comment </button>"
        
        divUserInfo.appendChild(divPost)
    });
}