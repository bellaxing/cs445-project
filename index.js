

window.onload = function () {
    document.getElementById('btn').addEventListener('click', function () {
        document.getElementById('wrapper').innerHTML = null
        document.getElementById('posts').innerHTML = null
        document.getElementById('comment').innerHTML = null
        renderEmp()

    });

}

async function renderEmp() {
    let result = await fetch('http://jsonplaceholder.typicode.com/users')
    let temp = await result.json()
    const TempDiv = document.getElementById('wrapper');
    const input = document.getElementById('input').value;
    let temps;

    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == input) {
            temps = temp[i]
        }
    }


    let x = `
  
            <div class="col-8">
                <p> Name:${temps.name}</p>
                <p >Email : ${temps.email}</p>
                <p> Adress: ${temps.address.city + " " + temps.address.street + " " + temps.address.zipcode}</p>
                <p >Current Location: ${temps.address.geo.lng + ' ' + temps.address.geo.lat}</p>
                <button id="btn2" onclick="posts()">see posts</button><br><br>
                
            </div>
            <hr> 
            
     `

    let newDiv = document.createElement('div');
    newDiv.innerHTML = x;
    newDiv.classList = 'row';
    TempDiv.appendChild(newDiv);

}
async function posts() {
   
    const TempDiv = document.getElementById('posts');
    const input = document.getElementById('input').value;

    let result1 = await fetch('http://jsonplaceholder.typicode.com/posts?userId=' + input)
    let post = await result1.json();

    for (let i = 0; i < post.length; i++) {

        let y = `
    <p><span>Title:</span> ${post[i].title}</p><br>
    <p> ${post[i].body}</p>
    <button id="btn3" onclick="comment()">comment</button><br><br>
<hr>
`
        let newDiv = document.createElement('div');
        newDiv.innerHTML = y;
        TempDiv.appendChild(newDiv);

    }

}

