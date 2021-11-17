const {from, of,Observable,fromEvent} = rxjs;
window.onload = function(){
//    document.getElementById('searchbtn').addEventListener('click',employeeFetch)
   let mike = document.getElementById('searchbtn')
 const click = fromEvent(mike,'click',)
 click.subscribe()
}
function employeeFetch(){
    let input = +document.getElementById('userinput').value;
    fetch('https://randomuser.me/api/?results='+input)
    .then(result=>result.json())
    .then(employees=>postEmployees(employees.results));
}

function postEmployees(empList){
    let innerdiv = document.getElementById('listcol');
    innerdiv.innerHTML = "";
    
       
       click.subscribe(data=>{
           let post = `
       <div class="col-4"><img src="${data.picture.large}"></div>
       <div class="col-8">
       <p class="text-end"><b>${data.name.first +" "+ data.name.last}</b></p>
       <p class="text-end">Phone:${ data.phone}</p>
       <p class="text-end">Email:${ data.email}</p>
       <button class="btn btn-success" onclick="createDetail()">Details</button>
       </div>
       <hr>
       
       `
       let row = document.createElement('div');
       row.className = 'row';
       row.innerHTML = post;
       innerdiv.appendChild(row);
    })
    // for(let i=0;i<=empList.length;i++){

    // let post = `
    // <div class="col-4"><img src="${empList[i].picture.large}"></div>
    // <div class="col-8">
    // <p class="text-end"><b>${empList[i].name.first +" "+ empList[i].name.last}</b></p>
    // <p class="text-end">Phone:${ empList[i].phone}</p>
    // <p class="text-end">Email:${ empList[i].email}</p>
    // <button class="btn btn-success" onclick="createDetail()">Details</button>
    // </div>
    // <hr>
    
    // `
    // let row = document.createElement('div');
    // row.className = 'row';
    // row.innerHTML = post;
    // innerdiv.appendChild(row);
    // }
    
}

// function createDetail(){
//     let detaildiv = document.getElementById("detailcol")
//     detaildiv.innerHTML = "";
// }