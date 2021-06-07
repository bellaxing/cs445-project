

// Information to reach API
const geolocatorapiKey = '';
const url1 = '';

const url = "https://jsonplaceholder.typicode.com/posts/1";

// Page elements 
const inputfield = document.querySelector("#input");
const commentsButton = document.querySelector("comments");
const responsefield = document.querySelector("#responsefield");

// AJAX functions
const identity = () => {
    const userId = inputfield.value;
    const data = JSON.stringify({ destination: userId });
    const xhr = new XMLHttpRequest();
    const xhr.responseType = 'json';
    if (xhr.readyState == XMLHttpRequest.DONE) {
        renderRawResponse(xhr.response);
}

}

window.onload = function () {
    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=tWbaBBw92lD6YInMlGnx6xwwj8GpGZVO&location=30.333472,-81.470448';
    fetch(url).then(response => response.json())
        .then(console.log);
}

// const data = JSON.stringify({ id: '200' });
// xhr.responseType = 'json';
// xhr.onreadystatechange = () => {
//     if (xhr.readyState === XMLHttpRequest.DONE) {
//         return xhr.response;
//     }
// }

xhr.open("POST", url)
xhr.send(data)

fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((json) => console.log(json));