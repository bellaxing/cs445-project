const getUser=async()=>{
    const response=await fetch("http://jsonplaceholder.typicode.com/users");
    const data=await response.json();
    console.log(data);
}
getUser();


const input=`<input type="text" />`
document.getElementById("root").append(input);