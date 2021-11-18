//This is the project javascript file in feature-jyoti branch.
async function fetchSingleUser(id) {
    let responseBody = await fetch('http://jsonplaceholder.typicode.com/users');
    let json = await responseBody.json();
    return json[id];
}

async function fetchLocation(lat,lng){
    const url = "http://www.mapquestapi.com/geocoding/v1/reverse?key=Q3wki3UwkqnZrHPKJDz69sSvAF4oijG5&location="+lat+','+lng;
    //consumer key: Q3wki3UwkqnZrHPKJDz69sSvAF4oijG5
    return fetch(url).then(response => response.json())     
}


async function displayPostComment(id){
    console.log(id);
    const fetchComment = await fetch("http://jsonplaceholder.typicode.com/comments?postId="+id).then(response =>response.json());
    console.log(fetchComment[0].email);
    const commentDisplay = document.getElementById("postcomment"+id);
    fetchComment.forEach(element =>{
        let template =`
        <div class="col">
                <p> Name: ${element.name}</p>
                <p> Comments :${element.body}</p>

                `
        const div = document.createElement('div');
        div.classList = 'row border-top';
        div.innerHTML = template;
        commentDisplay.appendChild(div);
        
        
    })
    
    
}



async function displayUserPost(id){
    const userPost = document.getElementById("userpost");
    userPost.innerHTML = '';
    const fetchPost = await fetch('http://jsonplaceholder.typicode.com/posts?userId='+id);
    const postArray = await fetchPost.json();

    for(let i=0; i< postArray.length; i++){
        let template = `     
            <div class="col">
                <h6>Title : ${postArray[i].title}</h6>
                <h6>Body : ${postArray[i].body} </h6>
                <button id='comment${i+1}' class="btn btn-success"> View Comment</button>
                </div>
                </div>     
            <div class="col">
            <div id="postcomment${i+1}"></div>
            </div>
    `
        const div = document.createElement('div');
        div.classList = 'row border-top';
        div.innerHTML = template;
        userPost.appendChild(div);
        document.getElementById(`comment${i+1}`).onclick= async function(){
            await displayPostComment(i+1);
        }
       
        
        
    }
//     postArray.forEach(user => {
//     let template = `     
//             <div class="col">
//                 <h6>Title : ${user.title}</h6>
//                 <h6>Body : ${user.body} </h6>
//                 <button id='comment'> See comment</button>
//                 </div>
//     `
//         const div = document.createElement('div');
//         div.classList = 'row border-top';
//         div.innerHTML = template;
//         userPost.appendChild(div);

// });
}


async function displayUserInHtml() {
    const inputId = parseInt(document.getElementById("userId").value);
        try {
        if (inputId >10){
            throw new Error("Error: ID not Found (Available Id :1 to 10)");
        }
       }catch (e){
          alert(e.message)
       }
    const userInformation = document.getElementById('userInfo');
    userInformation.innerHTML = '';
    const user = await fetchSingleUser(inputId -1);
    console.log(user)
    const lat = user.address.geo.lat;
    const lng = user.address.geo.lng;
    console.log(lat)
    console.log(lng)
    const currentObject = await fetchLocation(lat, lng);
    const currentLocation = currentObject.results;
    console.log(currentLocation)
    
        let template = `     
            <div class="col">
                <h6>Username : ${user.username}</h6>
                <h6>Name : ${user.name} </h6>
                <p>Phone : ${user.phone}</p>
                <p>Email : ${user.email}</p>
                <h5>Address:</h5>
                <p> ${user.address.suite}, ${user.address.street}.</P>
                <p>  ${user.address.city}, ${user.address.zipcode}.</P>
                <h5>Current Location:</h5>
                <p> ${currentLocation[0].locations[0].street},</P>
                <p> ${currentLocation[0].locations[0].adminArea3}, ${currentLocation[0].locations[0].postalCode}.</P>
            </div>     
            <div class="col-md-9">
            <button id="postbtn" class="btn btn-success">View Post</button>
            <h5>User Posts<h5>
            <div id="userpost"></div>
            </div>

        `;
        const div = document.createElement('div');
        div.classList = 'row border-top';
        div.innerHTML = template;
        userInformation.appendChild(div);

        document.getElementById('postbtn').onclick= async function(){
            await displayUserPost(inputId);
        }
        

}
window.onload = async function() {
    //await displayUserInHtml();
    document.getElementById('button').onclick = async function() {
        await displayUserInHtml();
    }

}