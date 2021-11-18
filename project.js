window.onload = function(){

    document.getElementById("search").addEventListener("click",()=>{

        
        let user_id_input =document.getElementById("user_id")
        let left_container = document.getElementById("user_list_div")
        let right_container = document.getElementById("right_container")
        let post_div = document.getElementById("posts_div")
        //let comment_div = document.getElementById("comment_div")
        post_div.innerHTML = ""

        const{from}= rxjs
        const{filter,map}=rxjs.operators
        let total_users = from(fetch("http://jsonplaceholder.typicode.com/users").then(response=>response.json()))
       
        //console.log(current_location)
        total_users.subscribe(vals=>{
            from(vals).pipe(filter(vals=>vals.id==user_id_input.value)).subscribe(val=>{
                let current_location = from(fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=IDr53bvFh1wXBMfIQEwvqWLj1vgY62jh&location=${val.address.geo.lat},${val.address.geo.lng}&includeRoadMetadata=true&includeNearestIntersection=true`).then(response=>response.json()))
                current_location.subscribe(location=>{
                    let curent_loc =location.results[0].locations[0].street
                    // console.log(curent_loc)
                    // console.log(val.address.geo.lat)
                left_container.innerHTML = `<h3>user information:</h3>
                <p><b>user name:</b> <span>${val.username}</span></p>
                <p><b>email:</b><span>${val.email}</span></p>
                <p><b><i>address<i><b></P>
                <p><b>street:</b><span>${val.address.street}</span></p>
                <p><b>city:</b><span>${val.address.city}</span></p>
                <p><b>zip-code:</b>${val.address.zipcode}</span></p>
                <pre><p><b>current location:</b><span>${curent_loc} </span></p></pre><br>
                <button id="get_posts" type="button">get post</button>`
                })
            })
        })
                })

                }
