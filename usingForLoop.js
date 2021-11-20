window.onload = function () {

    document.getElementById('searchBtn').onclick = fetchUser;

}

async function fetchUser() {

    const userId = document.getElementById('userId').value;

    let result = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
    let userInfoObject = await result.json();
    renderUserInfo(userInfoObject);
    /**
     * all users are in an array but when I call the link with a userId it returns an object instead
     * so now I don't need a for loop to get the data I just call renderUserInfo with the object
     */
}

function renderUserInfo(user) {

    const userInfoDiv = document.getElementById('userInfo');
    userInfoDiv.innerHTML = '';

    let template = `
        <h3>User Information:</h3>
        <div class="mt-3">name: ${user.name}</div>
        <div class="mt-3">Email:${user.email}></span></div>
        <div class="mt-3">
            <h4 style="color: red">Address</h4>
        </div>
        <div class="mt-3">Street:${user.address.street}</div>
        <div class="mt-3">City:${user.address.city}</div>
        <div class="mt-3">Zip:${user.address.zipcode}</span></div>
        <div class="mt-3">Current location:</div>
        <div>lat:${user.address.geo.lat} long:${user.address.geo.lng}</div>
        <div class="mt-3">
            <button id="getPostsBtn" style="color: black; background-color: #07ffff;">Get posts</button>
        </div>

    `
    const div = document.createElement('div');
    div.innerHTML = template;
    userInfoDiv.appendChild(div);

    document.getElementById('getPostsBtn').onclick = fetchUserPosts;

}

async function fetchUserPosts() {
    const userId = document.getElementById('userId').value;

    let result = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId);
    let userPostsArray = await result.json();
    renderUserPosts(userPostsArray);
}


function renderUserPosts(post) {

    const userPostsDiv = document.getElementById('userPosts');
    userPostsDiv.innerHTML = '';

    let template;

    for (let i = 0; i < post.length; i++) {
        let postId = post[i].id;
        template = `
                
                <div>
                    <h3 style="color: blue">User Post:</h3>
                </div>
                <div class="mt-3"><span>Title: </span>${post[i].title}</div>
                <div class="mt-3"><span>Body:</span>${post[i].body}</div><div class="mt-3">
                

            </div>
                
        
                `

        const div = document.createElement('div');
        div.innerHTML = template;
        userPostsDiv.appendChild(div);
        let viewCommentsButton = document.createElement('button');
        viewCommentsButton.id = postId;
        viewCommentsButton.innerHTML = "View comments";
        viewCommentsButton.style = "color: black; background-color: #07ffff;"
        userPostsDiv.appendChild(viewCommentsButton);
        let commentsDiv = document.createElement('div');
        commentsDiv.id = "comment" + postId;
        userPostsDiv.appendChild(commentsDiv);

        viewCommentsButton.onclick = function () {
            let postIdTemp = document.getElementById(postId).id;
            fetchPostComments(postIdTemp);
        }


    }

}

async function fetchPostComments(postId) {
    let result = await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId);
    let postCommentsArray = await result.json();
    renderPostComments(postCommentsArray, postId);
}

function renderPostComments(commentsArray, postId) {

    let commentsDiv = document.getElementById("comment" + postId);
    commentsDiv.innerHTML = '';

    for (let i = 0; i < commentsArray.length; i++) {
        let template = `

        <div style="color: red">Comment</div>
        <div class="mt-3">name: ${commentsArray[i].name}</div>
        <div class="mt-3">email: ${commentsArray[i].email}></span></div>
        <div class="mt-3">body: ${commentsArray[i].body}</div>

        `

        let div = document.createElement('div');
        div.innerHTML = template;
        commentsDiv.appendChild(div);
    }

}
