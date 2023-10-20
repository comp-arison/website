var navbar = document.getElementById("navbar");
var bannerlink = document.getElementById("bannerlink");
var homebutton = document.getElementById("homebutton");
var maincontent = document.getElementById("maincontent");
var house = document.getElementById("house");
var arrow = document.getElementById("arrow");

function checkMenu() {
    if (window.innerWidth <= window.innerHeight * (4 / 3)) {
        bannerlink.href = "javascript:toggleMenu()";
        homebutton.style.display = "flex";
        navbar.style.top = "-" + navbar.offsetHeight + "px";
        maincontent.style.top = "-" + navbar.offsetHeight + "px";
        house.style.display = "none";
        arrow.style.display = "block";
        menuOpen = false;
    } else {
        navbar.style.display = "flex";
        bannerlink.href = "/";
        homebutton.style.display = "none";
        navbar.style.top = "0";
        maincontent.style.top = "0";
        house.style.display = "block";
        arrow.style.display = "none";
        menuOpen = true;
    }
}

addEventListener("load", (event) => {
    checkMenu();
});

addEventListener("resize", (event) => {
    checkMenu();
});

var menuOpen = false;
function toggleMenu() {
    if (!menuOpen) {
        menuOpen = true;
        navbar.style.display = "flex";
        navbar.style.top = "0";
        arrow.style.transform = "rotate(180deg)";
    } else {
        menuOpen = false;
        navbar.style.top = "-" + navbar.offsetHeight + "px";
        arrow.style.transform = "rotate(0deg)";
    }
}