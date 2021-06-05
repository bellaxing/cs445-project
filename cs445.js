window.onload=function(){
    function main(){
        let user= fetch('http://jsonplaceholder.typicode.com/users')
        user.then(data=>data.json()).then(console.log)
        }
        main();
}
