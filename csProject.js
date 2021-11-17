window.onload = function () {
  document.getElementById("btn").addEventListener("click", userIdSearch);
};

async function userIdSearch() {
  const IdNumber = document.getElementById("idNo").value;

  const idUser = await fetch(
    "http://jsonplaceholder.typicode.com/users/" + IdNumber
  );
  const userInfo = await idUser.json();

  const userInformation = document.getElementById("userInfo");
  userInformation.innerHTML = "";
  let template = `
            <div class="col-6" >
                <div> <h1> User Information </h1></div>
                
                 <div> Name: ${userInfo.name}</div>
                 <div> Email: ${userInfo.email}</div>
                 <div> <h3>Addrees <h3></div>
                 <div> Street: ${userInfo.address.street}</div>
                 <div> City: ${userInfo.address.city}</div>
                 <div> Zip: ${userInfo.address.zipcode}</div>

            </div>
            <div class="col-6">

            </div>
            <hr>
            `;
  let div = document.createElement("div");
  div.classList = "row";
  div.innerHTML = template;
  userInformation.appendChild(div);
}
