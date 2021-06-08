async function fetchSingleUser() {
    let responseBody = await fetch('https://randomuser.me/api/');
    let json = await responseBody.json();
    return json.results[0];
}

async function fetchUsers(len) {
    const users = [];
    for (let i = 0; i < len; i++) {
        users[i] = await fetchSingleUser();
    }
    return users;
}

async function displayUserInHtml() {
    const userArr = await fetchUsers(3);
    for (let i = 0; i < userArr.length; i++) {
        let user = userArr[i];
        document.getElementById('img' + i).src = user.picture.large;
        document.getElementById('name' + i).innerHTML = user.name.first + ' ' + user.name.last;
        document.getElementById('phone' + i).innerHTML = 'phone:' + user.phone;
        document.getElementById('email' + i).innerHTML = user.email;
    }

}

window.onload = async function() {
    await displayUserInHtml();

    document.getElementById('refeshBtn').onclick = async function() {
        await displayUserInHtml();
    }

}