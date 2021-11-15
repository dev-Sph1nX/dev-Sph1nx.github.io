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

function discordhoverupdate(discordicon) {
    let hover = document.querySelector(".discord-hover")
    hover.style.top = discordicon.offsetTop - 25 + "px"
    hover.style.left = discordicon.offsetLeft - 27 + "px"
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

function pagetransitoleft(nextpage) {
    let contentsection = document.querySelector(".b-content-section")

    let mainDiv = loadmaincontent()
    mainDiv.id = "slidecontent"

    let slideDiv = create("div", contentsection)
    slideDiv.style.left = -100 + "vw";
    slideDiv.setAttribute('id', 'maincontent');
    changepageto("maincontent", nextpage)

    setTimeout(function() {
        mainDiv.remove()
        slideDiv.style.left = 0;
    }, 100)
}

function checkandchangepage(tag, navDivs) {
    switch (sessionStorage.getItem('idpage')) {
        case "-1": // when on the home page, user go back - return to the last page
            if (tag == 'forward') {
                pagetransitoright("contact")
            } else if (tag == 'backward') {
                pagetransitoleft("contact")
            }
            sessionStorage.setItem('idpage', 4)
            underlined(navDivs)
            break

        case "0":
            if (tag == 'forward') {
                pagetransitoright("home")
            } else if (tag == 'backward') {
                pagetransitoleft("home")
            }
            underlined(navDivs)
            break
        case "1":
            if (tag == 'forward') {
                pagetransitoright("about")
            } else if (tag == 'backward') {
                pagetransitoleft("about")
            }
            underlined(navDivs)
            break
        case "2":
            if (tag == 'forward') {
                pagetransitoright("skills")
            } else if (tag == 'backward') {
                pagetransitoleft("skills")
            }
            underlined(navDivs)
            break
        case "3":
            if (tag == 'forward') {
                pagetransitoright("project")
            } else if (tag == 'backward') {
                pagetransitoleft("project")
            }
            underlined(navDivs)
            break
        case "4":
            if (tag == 'forward') {
                pagetransitoright("contact")
            } else if (tag == 'backward') {
                pagetransitoleft("contact")
            }
            underlined(navDivs)
            break
        default: // when on the last page, user keep going - return to the home page
            sessionStorage.setItem('idpage', 0)
            if (tag == 'forward') {
                pagetransitoright("home")
            } else if (tag == 'backward') {
                pagetransitoleft("home")
            }
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
    let skillsDiv = document.querySelector(".skills")
    let projectDiv = document.querySelector(".project")
    let contactDiv = document.querySelector(".contact")

    let discordIcon = document.querySelector(".discord")
    let discordhover = document.querySelector(".discord-hover")
    let discordtag = true

    sessionStorage.setItem('roll', 0)
    sessionStorage.setItem('flag-roll', true)

    let navDivs = [homeDiv, aboutDiv, skillsDiv, projectDiv, contactDiv]
    sessionStorage.setItem('idpage', 0)

    let underlineDiv = loadunderline()
    setInterval(function() {
        underlined(navDivs)
        if (discordtag)
            discordhoverupdate(discordIcon)
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
                body.classList.add("fondu-in") // let the body appear
            }, 1200)
        }, 2000)
    }, 1000)

    window.addEventListener('wheel', function(event) { // Check mouse wheel
        if (sessionStorage.getItem('flag-roll') === "true") {

            sessionStorage.setItem('flag-roll', false)
            setTimeout(function() {
                sessionStorage.setItem('flag-roll', true)
            }, 300)

            if (event.deltaY > 0)
                sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll')) + 1) //Increment
            else if (event.deltaY < 0)
                sessionStorage.setItem('roll', parseInt(sessionStorage.getItem('roll')) - 1) //Decrement

            if (parseInt(sessionStorage.getItem('roll')) >= 1) { // Check roll down
                sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage')) + 1)
                sessionStorage.setItem('roll', 0)
                checkandchangepage('forward', navDivs)
            } else if (parseInt(sessionStorage.getItem('roll')) <= -1) { //  Check roll up
                sessionStorage.setItem('idpage', parseInt(sessionStorage.getItem('idpage')) - 1)
                sessionStorage.setItem('roll', 0)
                checkandchangepage('backward', navDivs)
            }
        }
    })

    homeDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 0)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("home-content.html");
        })
    })
    aboutDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 1)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("about-content.html");
        })
    })
    skillsDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 2)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("skills-content.html");
        })
    })
    projectDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 3)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("project-content.html");
        })
    })
    contactDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 4)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("contact-content.html");
        })
    })

    discordIcon.addEventListener("mouseover", function() {
        if (discordtag)
            discordhover.innerHTML = " Copy to clipboard"
        discordhover.visibility = "visible";
        discordhover.classList.add("opacity-in")
    })
    discordIcon.addEventListener("click", function() {
        discordtag = false
        setTimeout(function() {
            discordhover.innerHTML = " Copy to clipboard"
            discordtag = true
            discordhoverupdate(discordIcon)
        }, 1000)
        discordhover.style.top = discordIcon.offsetTop - 25 + "px"
        discordhover.style.left = discordIcon.offsetLeft - 43 + "px"
        navigator.clipboard.writeText("Sphinx#7851");
        discordhover.innerHTML = " Copied : Sphinx#7851"
    })
    discordIcon.addEventListener("mouseleave", function() {
        discordhover.innerHTML = " Copy to clipboard"
        discordhoverupdate(discordIcon)
        discordhover.classList.remove("opacity-in")
        discordhover.classList.add("opacity-out")
        setTimeout(function() {
            discordhover.classList.remove("opacity-out")
        }, 2000)
    })
})