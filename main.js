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
        console.log(listUser)
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
                    const userDiv = document.createElement("user-list");
                    userDiv.innerHTML = userTemplate;
                    userList.append(userDiv);
                    let getPost = document.getElementById("idBut");
                    getPost.onclick = fetchUserPost;
                    //let userPost = document.getElementById("user-post");
                    //userPost.innerHTML = "";
       
                   function fetchUserPost(){
                       alert(getPost.value)
                   }
        // console.log(userJson)
        // console.log(userJson[0].id)
        // console.log(userJson[0].name)
        // console.log(userJson[0].email)

    }

}