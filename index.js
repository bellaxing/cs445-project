window.onload = function () {
  let input = document.getElementById("inp");
  let btn = document.getElementById("btn");
  btn.onclick = data;

  function data() {
    fetch("http://jsonplaceholder.typicode.com/users")
      .then((data) => data.json())
      .then((data) => doSome(data));
  }
  function doSome(arr) {
    let card = "";
    userId = arr.filter((item) => item.id == input.value);
    userId.forEach((item) => {
      card = `
        <p>${item.name}</p>
        <p>${item.email}</p>
        <p>${item.address.street} ${item.address.suite} ${item.address.city} ${item.address.zipcode}</p>
        <p>${item.address.geo.lat} ${item.address.geo.lng}</p>
        <br>
        `;
    });

    document.getElementById("con").innerHTML = card;
  }
};
