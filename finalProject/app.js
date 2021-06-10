const { from } = rxjs;
const { filter, map } = rxjs.operators;
window.onload = async function() {
    document.getElementById("btn").onclick = async function() {
        const userList = document.getElementById('userList');
        let userId = document.getElementById("inputId").value;
        userList.innerHTML = '';

        let result = await fetch("https://jsonplaceholder.typicode.com/users");
        let userObj = await result.json();
        let userArr = from(userObj)


        userArr.pipe(
            filter(user => user.id === userId),
            map(map => {
                map.myName = map.name;
                map.myEmail = map.email;
                map.myAddress = map.address.street + " " + map.address.city + " " + map.address.zipcode;
                return map;
            })
        ).subscribe(subs => {
            let template = `     
            <div class="col">
            <h3>User's information:</h3>
            <p>name: ${subs.myName}</p>
            <p>Email:${subs.myEmail} </p>
            <p style="color: blue;font-size: larger;">Address</p>
            <p>Street:${subs.myAddress} </p>
            `;
            const div = document.createElement('userList');
            div.classList = 'row border-top';
            div.innerHTML = template;
            userList.appendChild(div);
        })
    }

}




//    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=dO3a4FAviRC1A3StSlMVtX2L3XfRQvcd&location=81.1496,-37.3159&includeRoadMetadata=true&includeNearestIntersection=true';