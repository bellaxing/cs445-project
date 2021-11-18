const { from } = rxjs;

window.onload = function () {

    document.getElementById('searchBtn').onclick = fetchUser;

}

async function fetchUser() {

    const userId = document.getElementById('userId').value;

    let result = await fetch('http://jsonplaceholder.typicode.com/users/' + userId);
    let userInfoArray = await result.json();

    renderUserInfo(userInfoArray);
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

    document.getElementById('getPostsBtn').onclick = renderUserPosts;

}

async function renderUserPosts() {

    const userPostsDiv = document.getElementById('userPosts');
    userPostsDiv.innerHTML = '';

    const userId = document.getElementById('userId').value;
    let result = await fetch('http://jsonplaceholder.typicode.com/posts/?userId=' + userId);
    let userPostsArray = await result.json();


    from(userPostsArray)
        .subscribe(userPost => {


            let template = `

                <div>
                    <h3 style="color: blue">User Post:</h3>
                </div>
                <div class="mt-3"><span>Title: </span>${userPost.title}</div>
                <div class="mt-3"><span>Body:</span>${userPost.body}</div>
                
        
                `
            let div = document.createElement('div');
            div.innerHTML = template;
            userPostsDiv.append(div);
            let viewCommentsButton = document.createElement('button');
            viewCommentsButton.id = "viewCommentsBtn";
            viewCommentsButton.innerHTML = "View comments";
            viewCommentsButton.style = "color: black; background-color: #07ffff;"
            userPostsDiv.append(viewCommentsButton);
            viewCommentsButton.onclick = renderPostComments;
            let commDiv = document.createElement('div');
            userPostsDiv.append(commDiv);

            async function renderPostComments() {
                let result = await fetch('http://jsonplaceholder.typicode.com/comments/?postId=' + userPost.id);
                let userCommentsArray = await result.json();
                console.log(userCommentsArray);
                from(userCommentsArray)
                    .subscribe(userComment => {

                        let template = `

                            <div style="color: red">Comment</div>
                            <div class="mt-3">name: ${userComment.name}</div>
                            <div class="mt-3">email: ${userComment.email}></span></div>
                            <div class="mt-3">body: ${userComment.body}</div>

                        `

                        let div = document.createElement('div');
                        div.innerHTML = template;
                        commDiv.appendChild(div);
                    })
            }
        });

}




