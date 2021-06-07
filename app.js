


// Page elements 
// Starting with defining the page elements 
const inputfield = document.querySelector("#input");
const submitButton = document.querySelector("#submitbtn");
const responsefield = document.getElementById("responsefield");
const commentButton = document.querySelector("#commentbtn")

// Information to reach API


function request() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
            return response.json();
        })
        .then((response) => {
            console.log(response)
            responsefield.innerHTML = "Hello";
                //`User Id = ${response.userId}`
    })
}
submitButton.addEventListener('click', request);
// 