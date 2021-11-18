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

                let get_posts = document.getElementById("get_posts")
       
        get_posts.addEventListener("click",()=>{
            let posts = from(fetch(`http://jsonplaceholder.typicode.com/posts?userId=${val.id}`).then(response=>response.json()))
                
                posts.subscribe(result=>{
                     
                       let post_div_child,div_id,titles,tite_tex,bodys,bod_tex,commentbtn,btnid,btn_txt,post_header,header_tex
                       
                   result.map((postarr,index) =>{
                    post_div_child = document.createElement("div")
                    div_id = document.createAttribute("id")
                    div_id.value = "post_div_child_id"
                    post_div_child.setAttributeNode(div_id)
                    post_div.appendChild(post_div_child)

                        post_header = document.createElement("h3")
                        header_tex = document.createTextNode("user posts")
                        post_header.appendChild(header_tex)
                        post_div_child.appendChild(post_header)
                       
                         titles = document.createElement("p")
                         tite_tex = document.createTextNode(`title:-${postarr.title}`)
                        titles.appendChild(tite_tex)
                        post_div_child.appendChild(titles)

                         bodys = document.createElement("p")
                         bod_tex = document.createTextNode(`body:-${postarr.body}`)
                        bodys.appendChild(bod_tex)
                        post_div_child.appendChild(bodys)

                         commentbtn = document.createElement("button")
                         btnid = document.createAttribute("id")
                        btnid.value = `${index+1}`
                         btn_txt = document.createTextNode("comments")
                        commentbtn.appendChild(btn_txt)
                        post_div_child.appendChild(commentbtn)
                        //console.log()
                        commentbtn.addEventListener("click",function(){
                            //let sam =this.id
                            let coment_fetch = from(fetch(`http://jsonplaceholder.typicode.com/comments?postId=${index+1}`).then(response=>response.json()))
                            coment_fetch.subscribe(fetch_result =>{
                                fetch_result.map(item=>{
    
                                    let coment_headers = document.createElement("h5")
                                    let com_header_tex = document.createTextNode("comments")
                                    coment_headers.appendChild(com_header_tex)
                                    post_div.children[index].appendChild(coment_headers)
    
                                    let coment_name = document.createElement("p")
                                    let com_tex = document.createTextNode(`name:-${item.name}`)
                                    coment_name.appendChild(com_tex)
                                   post_div.children[index].appendChild(coment_name)
    
                                   let coment_email = document.createElement("p")
                                   let email_tex = document.createTextNode(`email:-${item.email}`)
                                   coment_email.appendChild(email_tex)
                                  post_div.children[index].appendChild(coment_email)
    
                                  let coment_body = document.createElement("p")
                                   let body_tex = document.createTextNode(`body:-${item.body}`)
                                   coment_body.appendChild(body_tex)
                                  post_div.children[index].appendChild(coment_body)
    
                                })
                            })
                        })
                   })
                })
                })
                })
            })
        })
                })

                }
