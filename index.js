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