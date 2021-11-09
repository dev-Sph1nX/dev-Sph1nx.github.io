function create(tag, parent, text = null, classs = null) { //creating html element tool 
    let element = document.createElement(tag)
    parent.appendChild(element)
    if (text)
        element.appendChild(document.createTextNode(text))
    if (classs)
        element.classList.add(classs)
    return element
}

function count(p) { // 0 to 100 graphicaly
    let count = 0
    let tag = true
    if (tag) {
        setInterval(function() {
            if (count <= 100)
                p.innerHTML = count
            else
                tag = false
            count++
        }, 1)
    }

}

function createcircle(parent) { // create the circle use to the animation
    let loading = create("div", parent)
    loading.setAttribute('id', 'loading')
    let left = create("div", loading, "", "hold")
    left.classList.add("left")
    let right = create("div", loading, "", "hold")
    right.classList.add("right")
    create("div", left, "", "fill")
    create("div", right, "", "fill")
}
function checkandchangepage(){
    switch(sessionStorage.getItem('idpage')){
        case "1":
            console.log("Page : Home // idpage :" + sessionStorage.getItem('idpage'))
            $(function(){
                $("#maincontent").load("home-content.html"); 
            })
            break
        case "2":
            console.log("Page : CV // idpage :" + sessionStorage.getItem('idpage'))
            $(function(){
                $("#maincontent").load("CV-content.html"); 
            });
            break
        case "3":
            console.log("Page : Contact // idpage :" + sessionStorage.getItem('idpage'))
            $(function(){
                $("#maincontent").load("contact-content.html"); 
            });
            break
        default:
            console.log("Au sekours // idpage :" + sessionStorage.getItem('idpage'))
            sessionStorage.setItem('idpage', 1)
            break
    }
}
document.addEventListener("DOMContentLoaded", function() {

    let allcontent = document.querySelector(".all-content")
    let ladiv = document.querySelector(".la")
    let loading = document.querySelector("#loading")
    let lasvg = document.querySelector(".la svg")
    let lapercent = document.querySelector(".la-text-percentage")
    let latext = document.querySelector(".la-text")
    let body = document.querySelector(".body")
    let indicpageDiv = document.querySelector(".b-footer-indic-page")


    sessionStorage.setItem('roll', 0);

    let pages = ["home", "CV", "Contact"]
    sessionStorage.setItem('idpage', 1);
    
    setTimeout(function() { // Beginning animation
        loading.remove() // End 1st circle
        let circle = create("div", ladiv, "", 'circle')
        count(lapercent)
        setTimeout(function() { // End border animation
            circle.remove()
            createcircle(ladiv)
            latext.classList.add("la-text-rotate-second")
            ladiv.classList.add("fondu-out")
            setTimeout(function() { //End 2nd circle
                ladiv.remove()
                body.classList.remove("hidden")
                body.classList.add("fondu-in") // let the body appear
            }, 1200)
        }, 2000)
    }, 1000)

    window.addEventListener('wheel', function(event){ // Check mouse wheel
        if(event.deltaY > 0)
            sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll'))+1) //Increment
        else if(event.deltaY < 0)
            sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll'))-1) // Decrement
    
        if(parseInt(sessionStorage.getItem('roll')) > 2){
            sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage'))+1)
            sessionStorage.setItem('roll', 0);
        }
        else if(parseInt(sessionStorage.getItem('roll')) < -2){
            sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage'))-1)
            sessionStorage.setItem('roll', 0);
        }

        checkandchangepage();
    });
})

