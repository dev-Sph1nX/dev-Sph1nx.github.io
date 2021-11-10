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

function loadunderline() {
    return document.querySelector(".underline")
}
function loadmaincontent(){
    return document.querySelector("#maincontent")
}

function changepageto(idDiv, filename) {
    $(function() {
        $("#" + idDiv).load(filename + "-content.html");
    })
}

function underlined(navDivs) {

    let rightDiv = navDivs[sessionStorage.getItem('idpage')]
    let underline = loadunderline()
    underline.style.top = rightDiv.offsetTop + rightDiv.offsetHeight + 2 + "px"
    underline.style.left = rightDiv.offsetLeft + rightDiv.offsetWidth - 10 + "px"

}

function pagetransitoright(){
    let mainDiv = loadmaincontent()
    mainDiv.classList.add("slide-right")
    console.log("add")
    setTimeout(function(){
        mainDiv.classList.remove("slide-right")
        console.log("removes")
    }, 500)
}
function checkandchangepage(navDivs) {
    switch (sessionStorage.getItem('idpage')) {
        case "-1": // when on the home page, user go back - return to the last page
            changepageto("maincontent", "contact")
            sessionStorage.setItem('idpage', 3)
            pagetransitoright()
            underlined(navDivs)
            break

        case "0":
            changepageto("maincontent", "home")
            pagetransitoright()
            underlined(navDivs)
            break
        case "1":
            changepageto("maincontent", "about")
            pagetransitoright()
            underlined(navDivs)
            break
        case "2":
            changepageto("maincontent", "cv")
            pagetransitoright()
            underlined(navDivs)
            break
        case "3":
            changepageto("maincontent", "contact")
            pagetransitoright()
            underlined(navDivs)
            break
        default: // when on the last page, user keep going - return to the home page
            changepageto("maincontent", "home")
            sessionStorage.setItem('idpage', 0)
            pagetransitoright()
            underlined(navDivs)
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

    let header = document.querySelector(".b-header")
    let main = loadmaincontent()
    let footer = document.querySelector(".b-footer")

    let homeDiv = document.querySelector(".home")
    let aboutDiv = document.querySelector(".about")
    let cvDiv = document.querySelector(".cv")
    let contactDiv = document.querySelector(".contact")

    sessionStorage.setItem('roll', 0)

    let navDivs = [homeDiv, aboutDiv, cvDiv, contactDiv]
    sessionStorage.setItem('idpage', 0)

    let underlineDiv = loadunderline()
    setInterval(function(){
        underlined(navDivs)
    }, 50)
    
    
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
                // header.classList.add("absolute")
                // main.classList.add("absolute")
                // footer.classList.add("absolute")
                body.classList.add("fondu-in") // let the body appear
            }, 1200)
        }, 2000)
    }, 1000)

    window.addEventListener('wheel', function(event) { // Check mouse wheel
        if (event.deltaY > 0)
            sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll')) + 1) //Increment
        else if (event.deltaY < 0)
            sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll')) - 1) //Decrement

        if (parseInt(sessionStorage.getItem('roll')) >= 1) { // Check roll down
            sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage')) + 1)
            sessionStorage.setItem('roll', 0);
        } else if (parseInt(sessionStorage.getItem('roll')) <= -1) { //  Check roll up
            sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage')) - 1)
            sessionStorage.setItem('roll', 0);
        }

        checkandchangepage(navDivs);
    });
})