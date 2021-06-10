const { from } = rxjs;
const { filter } = rxjs.operators;
window.onload = function() {
    document.getElementById("btn").onclick = async function() {
        let userId = document.getElementById("inputId").value;
        let result = await fetch("https://jsonplaceholder.typicode.com/users")
            // .then(response => response.json())
        let userObj = await result.json();
        let userArr = from(userObj)

        userArr.pipe(
            filter(user => user.id === userId)
        ).subscribe(value => console.log(value))

    }
}

//    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=dO3a4FAviRC1A3StSlMVtX2L3XfRQvcd&location=81.1496,-37.3159&includeRoadMetadata=true&includeNearestIntersection=true';