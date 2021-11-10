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

function loadmaincontent() {
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

function pagetransitoright(nextpage) {
    let contentsection = document.querySelector(".b-content-section")

    let mainDiv = loadmaincontent()
    mainDiv.classList.add("slide-right")

    let slideDiv = create("div", contentsection, "")
    slideDiv.setAttribute('id', 'slidecontent');
    changepageto("slidecontent", nextpage)

    setTimeout(function() {
        mainDiv.remove()
        slideDiv.classList.remove("slide-left")
        slideDiv.id = "maincontent"
    }, 100)
}

function checkandchangepage(navDivs) {
    switch (sessionStorage.getItem('idpage')) {
        case "-1": // when on the home page, user go back - return to the last page
            pagetransitoright("contact")
            sessionStorage.setItem('idpage', 3)
            underlined(navDivs)
            break

        case "0":
            pagetransitoright("home")
            underlined(navDivs)
            break
        case "1":
            pagetransitoright("about")
            underlined(navDivs)
            break
        case "2":
            pagetransitoright("cv")
            underlined(navDivs)
            break
        case "3":
            pagetransitoright("contact")
            underlined(navDivs)
            break
        default: // when on the last page, user keep going - return to the home page
            sessionStorage.setItem('idpage', 0)
            pagetransitoright("home")
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
    sessionStorage.setItem('flag-roll', true)

    let navDivs = [homeDiv, aboutDiv, cvDiv, contactDiv]
    sessionStorage.setItem('idpage', 0)

    let underlineDiv = loadunderline()
    setInterval(function() {
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
        console.log("attempted -- " + sessionStorage.getItem('flag-roll'))
        if (sessionStorage.getItem('flag-roll') === "true") {
            console.log("got it -- " + sessionStorage.getItem('flag-roll'))

            sessionStorage.setItem('flag-roll', false)
            console.log("flag down -- " + sessionStorage.getItem('flag-roll'))
            setTimeout(function() {
                sessionStorage.setItem('flag-roll', true)
                console.log("reset -- " + sessionStorage.getItem('flag-roll'))
            }, 500)
            if (event.deltaY > 0)
                sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll')) + 1) //Increment
            else if (event.deltaY < 0)
                sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll')) - 1) //Decrement

            if (parseInt(sessionStorage.getItem('roll')) >= 1) { // Check roll down
                sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage')) + 1)
                sessionStorage.setItem('roll', 0)
            } else if (parseInt(sessionStorage.getItem('roll')) <= -1) { //  Check roll up
                sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage')) - 1)
                sessionStorage.setItem('roll', 0)
            }

            checkandchangepage(navDivs)

        }


    });
})