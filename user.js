
(async () => {
    // Get User Details
    const response = await fetch('http://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log('User Details---->', data);
  
    data.forEach((user, index) => {
      document.getElementById('user').innerHTML += `<label>Name:</label>
      <input type = "text"  id=${index}name value=${user.name} />
      <label>Email:</label>
      <input type = "text"  id=${index}email value=${user.email} />
      <label>Address:</label>
      <input type = "text" id=${index}address value=${user.address.city} />
      <br/>`;
    });
})();
