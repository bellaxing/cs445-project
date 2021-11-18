let { from } = rxjs;

window.onload = function () {
    document.getElementById("search-btn").onclick = loadUserInfo;
    document.body.style.backgroundColor = "#BEC3C7"
    
}


async function loadUserInfo() {

    document.getElementById("user-info").innerHTML = ""
    document.getElementById("posts").innerHTML = ""
    let userId = document.getElementById("user-id").value;
    let user = await (((await fetch("https://jsonplaceholder.typicode.com/users/" + userId)).json()));

    document.getElementById("user-info").innerHTML =
        `<p style="color: rgb(33,10,15)"><b>User information:</b> </p> 
   <p> name: ${user.name} </p> 
   <p> Email: ${user.email} </p>  
   <p>Address: </p>
   <p> Street: ${user.address.street} </p>  
   <p>City: ${user.address.city}  </p>  
   <p>Zip: ${user.address.zipcode}  </p> 
   `
    let location = document.createElement('div');
 
    location.innerHTML = `Location: ${getLocation(user.address.geo.lat, user.address.geo.lng)}`;
    document.getElementById("user-info").append(location);
    let getPosts = document.createElement("button");
    getPosts.innerHTML = "Get Posts";
    getPosts.style.backgroundColor = "#0B5264";
    getPosts.style.color = "white";
    document.getElementById("user-info").append(getPosts);
    getPosts.onclick = function(){
        loadPosts(userId);
    }
    

}


async function loadPosts(id) {

    document.getElementById("posts").innerHTML = "";
    let posts = await (((await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id)).json()));

    from(posts).subscribe(post => {
        let postDiv = document.createElement('posts');
        postDiv.innerHTML = `<p> </P><p style="color: rgb(33,10,15)"><b> User Post:</b></P>
                             <p>Title: ${post.title}</p>
                             <p>Body: ${post.body} </p>
                             <p></P> `

        let viewComments = document.createElement("button");
        viewComments.innerHTML = "View Comments";
        viewComments.style.backgroundColor = "#0B5264";
        viewComments.style.color = "white";

        let commentBox = document.createElement('div');

        viewComments.onclick = function(){
            loadComments(post.id, commentBox);
        };
        document.getElementById("posts").append(postDiv)
        document.getElementById("posts").append(viewComments)
        document.getElementById("posts").append(commentBox)

    })

}

async function loadComments(id, commentBox){
   commentBox.innerHTML = "";
    let comments = await (((await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + id)).json()));
    from(comments).subscribe(comment => {
        let content = document.createElement('div');
        content.innerHTML = `<p style="color: rgb(33,10,15)"><b>Comment:</b></p>
                             <p>name: ${comment.name}</p> 
                             <p>email:${comment.email}</p>
                             <p>body:${comment.body}</p>`

                             commentBox.append(content);
    })


}

async function getLocation(lat, lng) {
    let loc = await fetch(`https://www.mapquestapi.com/geocoding/v1/reverse?key=YdlfBrWgjcb9PgGjYy8cjBY7EbLAAaHd&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`);
    let location = await loc.json();
    return (location.results[0].locations[0]);

}




