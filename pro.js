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