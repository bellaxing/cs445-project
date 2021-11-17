const { from } = rxjs;
const { filter } = rxjs.operators;
window.onload = function () {
   
    document.getElementById('searchbtn').addEventListener('click', userFetch)
}
async function userFetch() {

    let result = await fetch('https://jsonplaceholder.typicode.com/users')
    let res = await result.json()
    document.getElementById('detailcol').innerHTML = ""
    document.getElementById('commentcol').innerHTML = ""

    postEmployees(res)
}
function postEmployees(users) {
    let inputId = +document.getElementById('userinput').value;
   
    from(users).pipe(
        filter(x => x.id == inputId)
    ).subscribe(data => {
       
        let innerdiv = document.getElementById('uInfo');
        innerdiv.innerHTML = "";

        let user = `
           <div style="text-align:center"class="col">
           <p class="text-end"><b>Name: ${data.name}</b></p>
           <p class="text-end">Email: ${data.email}</p>
           <p class="text-end">Address: ${data.address.city +" "+ data.address.street +" "+ data.address.zipcode}</p>
           <p class="text-end">Current Location: ${data.address.geo.lng + ' '+data.address.geo.lat}</p>
           </div>
           
           `;
        let importPost = fetch('https://jsonplaceholder.typicode.com/posts?userId=' + inputId)
        importPost.then(x => x.json()).then(p => showPosts(p))


        let row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = user;
        innerdiv.appendChild(row);

    })
}
function showPosts(p){
    
    let innerdiv = document.getElementById('detailcol');
    let phead = document.createElement('h4')
    phead.innerHTML = 'POSTS'
    innerdiv.appendChild(phead)
    from(p).subscribe(data=>{
     let post = `
       <div class="col">
       
       <p class="text-end"><b> ${data.title}</b></p>
       <p class="text-end">${data.body}</p>
       </div>
       
       `;
    let row = document.createElement('div');
    let hr = document.createElement('hr')
       row.className = 'row';
       row.innerHTML = post;
       let dBtn = document.createElement('button')
       row.appendChild(dBtn)
       row.appendChild(hr)
       dBtn.onclick = createDetail
       dBtn.className = "btn btn-secondary";
       dBtn.innerHTML = "Show Comment";
       innerdiv.appendChild(row);
    })
}
function createDetail(){
   
    let inputId = +document.getElementById('userinput').value;
    
    let innerdiv = document.getElementById('commentcol');
    innerdiv.innerHTML=""
    let chead = document.createElement('h4')
    chead.innerHTML = 'Comments'
    innerdiv.appendChild(chead)
    from(fetch('https://jsonplaceholder.typicode.com/comments?postId='+inputId).then(x=>x.json()))
    .subscribe(data=>{
     
     data.forEach(com=>{
       
         let post = `
            <div class="col">
            <p class="text-end"><b>Name: ${com.name}</b></p>
            <p class="text-end"><b>email: ${com.email}</b></p>
            <p class="text-end">Comment: ${com.body}</p>
            </div>
            
            `;
         let row = document.createElement('div');
         let hr = document.createElement('hr')
            row.className = 'row';
            row.innerHTML = post;
            row.appendChild(hr)
            innerdiv.appendChild(row);
     })
    })
}
