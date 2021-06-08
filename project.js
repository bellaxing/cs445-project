async function fetchSingleUser() {
    const responseBody = await fetch('https://randomuser.me/api/');
    const json = await responseBody.json();
    return json.results[0];
}


// async function fetchUsers(len) {
//     const users = [];
//     for (let i = 0; i < len; i++) {
//         users[i] = await fetchSingleUser();
//     }
//     return users;
// }

async function displayUserInHtml() {
    const user = await fetchSingleUser();
    user.filter(user=>user.id===document.getElementById('userId').value)
        .forEach(user=>{
            document.getElementById('name').innerHTML = 'Name: '+user.name.first + ' ' + user.name.last;
        document.getElementById('phone').innerHTML = 'phone:' + user.phone;
        document.getElementById('email').innerHTML = 'Email: '+user.email;
        document.getElementById('address').innerHTML='Street: '+user.location.street.number+" "+user.location.street.name;
        document.getElementById('address1').innerHTML='City: '+user.location.city+' State: '+user.location.state;
        document.getElementById('address2').innerHTML='Country: '+user.location.state+' ZipCode: '+user.location.postcode;
    
        })
    
        
        
}

window.onload = async function() {
    await displayUserInHtml();
    
    document.getElementById('getBtn').onclick = async function() {
        await displayUserInHtml();
    }
    await displayCommentHtml();
    document.getElementById("getPost").onclick=async function(){
        await displayCommentHtml();
    }

}
async function fetchComment(){
    const response=await fetch('http://jsonplaceholder.typicode.com/comments');
    const comments=await response.json();
    return comments;
}
async function displayCommentHtml(){
    const comm=document.getElementById('userId').value;
    const comment=await fetchComment();
    for(let i=0;i<comment.length;i++){
        if(comm=i){
            document.getElementById('comments').innerHTML=comment[i];
        }
        
    }
    ;
}

