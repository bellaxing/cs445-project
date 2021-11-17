
window.onload = function () {
    document.getElementById("user-btn").addEventListener("click", fetchUsers );
}

// fetchusers gets users using the url provided and with the resolved data it populates user detials on the web page.
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/' + document.getElementById("user-id").value)
    const user = await response.json()
    
    const divUserInfo = document.querySelector(".col-4");
    divUserInfo.innerHTML = "<pre></pre>" 
        + "<h3>User Information</h3>"
        + "<p class='ps-3'> <b>Name</b>: " + user.name + "</p>" 
        + "<p class='ps-3'>" + user.email + "</p>" 
        + "<h3>Address</h3>"
        + "<p class='ps-3'> <b>Street</b>: " + user.address.street + "</p>"
        + "<p class='ps-3'> <b>City</b>: " + user.address.city + "</p>"
        + "<p class='ps-3'> <b>Zip</b>: " + user.address.zipcode + "</p>"
        + "<p class='ps-3'> <b>Current location</b>: " + user.address.zipcode + "</p>"
        + "<button class='btn btn-secondary' id='post-btn'> Get post</button>";
        
    document.getElementById("post-btn").addEventListener("click", fetchPosts)

}

// fetchPosts gets the posts posted by a user and populate the posts on the web pages
async function fetchPosts () {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + document.getElementById("user-id").value)
    const userPost = await response.json()

    userPost.forEach(function(post, index){
        let count = index + 1;
        const divUserInfo = document.querySelector(".col-7.row");
        const divPost= document.createElement("div")
        divPost.classList = "col-12 postId-" + document.getElementById("user-id").value
        divPost.innerHTML = 
        "<hr>"
        + " <h5>User Post </h5>"
        + "<p><b>Title</b>:" + post.title +"</p> "
        + "<p><b>Body</b>:" + post.body + "</p>"
        + `<button data-id='${count++}' class='btn btn-secondary comment-btn' type='button'> Comment </button>"`

        divUserInfo.appendChild(divPost)
    });
    fetchComments ()
}

// fetchComments fetches comments on button click and display the text in the web page
async function fetchComments () {
    const commentBtns = Array.from(document.querySelectorAll(".comment-btn"));
    // for(let i = 0 ; i < commentBtns.length; i++){
    //     let count = i + 1;
    //     commentBtns[i].id =  count++;
    // }

    commentBtns.forEach(btn => {
        btn.addEventListener('click', async function (e) {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' +  e.currentTarget.dataset.id);
            const result = await response.json();

            result.forEach(comment => {
                const divPost = document.querySelector(".postId-" + document.getElementById("user-id").value);
                divPost.innerHTML += "<div class='showtext'>"
                    + "<h5>Comment</h5>"
                    + "<p>Name: " + comment.name + "</p>"
                    + "<p>Email: " + comment.email + "</p>"
                    + "<p>Body: " + comment.body + "</p>"
                "</div>"
            });
        });
    });
}