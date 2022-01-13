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

function changepageto(idDiv, filename) { // C'est dans cette fonction que je chnage le contenu de ma div principal, où il y a le contenu
    $(function() {
        $("#" + idDiv).load("html/" + filename + "-content.html");
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
// function test(){
//     let test = document.querySelector(".about-left");
//     console.log("about")
//     test.addEventListener("click", function(){
//         test.classList.add("about-left-entry")
//     })
//         console.log("clicked")
// }

function checkandchangepage(tag, navDivs) { // La fonction s'active dès lors que l'on scroll (en haut ou en bas peu importe) 
    switch (sessionStorage.getItem('idpage')) { // Recupere l'id de la page sur laquelle on est 
        case "-1": // La valeur est a -1 quand, sur la page d'acceuil, on va en arriére et donc on va sur la page contact
            if (tag == 'forward') { // On regarde sur on 'avance' ou si on 'recule' pour savoir si on fait la transition vers la droite ou vers la gauche
                pagetransitoright("contact")
            } else if (tag == 'backward') {
                pagetransitoleft("contact")
            }
            sessionStorage.setItem('idpage', 6) // Change l'id pour mettre celui_ de la derniére page : Contact
            underlined(navDivs) // On appelle underlined() pour dire au petit souligenement dans la navbar que l'on a changé de page
            break

        case "0": // Même principe pour la page home et le reste des pages
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
                // test()
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
                pagetransitoright("education")
            } else if (tag == 'backward') {
                pagetransitoleft("education")
            }
            underlined(navDivs)
            break
        case "4":
            if (tag == 'forward') {
                pagetransitoright("we")
            } else if (tag == 'backward') {
                pagetransitoleft("we")
            }
            underlined(navDivs)
            break
        case "5":
            if (tag == 'forward') {
                pagetransitoright("project")
            } else if (tag == 'backward') {
                pagetransitoleft("project")
            }
            underlined(navDivs)
            break
        
            case "6": // Ici par exemple, on arrive sur la page Contact
            if (tag == 'forward') {
                pagetransitoright("contact")
            } else if (tag == 'backward') {
                pagetransitoleft("contact")
            }
            underlined(navDivs)
            break
        default: // Cela s'active quand sur la page Contact on continue de scroll, on reviens à la page d'acceuil 
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
    let educationDiv = document.querySelector(".education")
    let weDiv = document.querySelector(".we")
    let projectDiv = document.querySelector(".project")
    let contactDiv = document.querySelector(".contact")

    let discordIcon = document.querySelector(".discord")
    let discordhover = document.querySelector(".discord-hover")
    let discordtag = true

    setInterval(function() {
        if (sessionStorage.getItem("idpage") == 0) {
            let moreaboutme = document.querySelector(".but-more-about-me")
            moreaboutme.addEventListener("click", function() {
                sessionStorage.setItem('idpage', 1)
                underlined(navDivs)
                $(function() {
                    $("#maincontent").load("html/about-content.html");
                })
            })
        }
    }, 2000)


    sessionStorage.setItem('roll', 0)
    sessionStorage.setItem('flag-roll', true)

    let navDivs = [homeDiv, aboutDiv, skillsDiv, educationDiv, weDiv, projectDiv, contactDiv]
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
            $("#maincontent").load("html/home-content.html");
        })
    })
    aboutDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 1)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("html/about-content.html");
        })
    })
    skillsDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 2)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("html/skills-content.html");
        })
    })
    educationDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 3)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("html/education-content.html");
        })
    })
    weDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 4)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("html/we-content.html");
        })
    })
    projectDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 5)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("html/project-content.html");
        })
    })
    contactDiv.addEventListener("click", function() {
        sessionStorage.setItem('idpage', 6)
        underlined(navDivs)
        $(function() {
            $("#maincontent").load("html/contact-content.html");
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