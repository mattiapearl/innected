// DECLARATIONS
let controller;
let slideScene;
let pageScene;
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
const burger = document.querySelector(".burger");
let navLink = document.querySelector(".navigation"); //Possible future iteration to close the navbar before navigating
const headphones = document.querySelector("#headphones");
const nav = document.querySelector(".nav-header");

// FUNCTIONS
function animateSlides() {
    // init controller
    controller = new ScrollMagic.Controller();
    // Create animation
    const sliders = document.querySelectorAll(".slide");
    // Loop over each slide
    sliders.forEach((slide) => {
        //,slides, index per la parte commentata sotto
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector(".one-hundred");
        const revealText = slide.querySelector(".reveal-text");
        // Gsap
        const slideTl = gsap.timeline({
            defaults: {
                duration: 1.2,
                ease: "power3.inOut",
            },
        });
        if (revealImg) slideTl.fromTo(revealImg, { x: "-1%" }, { x: "100%" });
        if (img) slideTl.fromTo(img, { scale: 2 }, { scale: 1 }, "-=1");
        if (revealText) slideTl.fromTo(revealText, { x: "-1%" }, { x: "100%" }, "-=0.75");
        slideTl.fromTo(nav, { y: "-100%" }, { y: "0" }, "-=0.5");
        // Create Scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
        })
            .reverse(false)
            .setTween(slideTl)
            // .addIndicators({
            //     colorStart:"white",
            //     colorTrigger:"white",
            //     name: "slide"
            // })
            .addTo(controller);

        // // New Animation
        // const pageTl = gsap.timeline();
        // let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
        // pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
        // pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 });
        // pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
        // // Create new scene
        // pageScene = new ScrollMagic.Scene({
        // 	triggerElement: slide,
        // 	duration: "100%",
        // 	triggerHook: 0,
        // })
        // 	.addIndicators({
        // 		colorStart: "white",
        // 		colorTrigger: "white",
        // 		name: "slide",
        // 		indent: 200,
        // 	})
        // 	.setPin(slide, { pushFollowers: false })
        // 	.setTween(pageTl)
        // 	.addTo(controller);
    });
}

function showUpload() {
    const form = document.querySelector("form");
    const upload = form.querySelector(".upload");
    const uploadForm = document.querySelector(".upload-form");
    const obscure = document.querySelector(".obscure");
    const close = uploadForm.querySelector(".close-upload-form");
    if (upload) {
        const uploadBtn = upload.querySelector("button");
        uploadBtn.addEventListener("click", (event) => {
            event.preventDefault();
            if (!uploadBtn.classList.contains("form-open")) {
                uploadBtn.classList.add("form-open");
                document.body.classList.add("hide");
                uploadForm.style.pointerEvents = "all";
                obscure.style.pointerEvents = "all";
                const uploadTl = gsap.timeline({
                    defaults: {
                        duration: 0.5,
                        ease: "power2.inOut",
                    },
                });
                uploadTl.to(".obscure", { opacity: 0.9 });
                uploadTl.to(".upload-form", { opacity: 1 }, "-=0.5");
            }
        });
        close.addEventListener("click", () => {
            if (uploadBtn.classList.contains("form-open")) {
                uploadBtn.classList.remove("form-open");
                const uploadTl = gsap.timeline({
                    defaults: {
                        duration: 0.5,
                        ease: "power2.inOut",
                    },
                });
                uploadTl.to(".obscure", { opacity: 0 });
                uploadTl.to(".upload-form", { opacity: 0 }, "-=0.5");
                uploadForm.style.pointerEvents = "none";
                obscure.style.pointerEvents = "none";
                document.body.classList.remove("hide");
            }
        });
    }
}

//Cursor Circle Position
function cursor(e) {
    mouse.style.top = e.pageY + "px";
    mouse.style.left = e.pageX + "px";
    if (e.target.childNodes[0]) {
        if (e.target.childNodes[0].tagName == "IFRAME") {
            gsap.to(mouse, 0.1, { opacity: "0" });
        } else {
            gsap.to(mouse, 0.1, { opacity: "1" });
        }
    }
}

//Cursor hover animation
function activeCursor(e) {
    const item = e.target;
    const defaults = {
        ease: "power2.inOut",
        duration: 0.5,
    };
    const defaultUp = {
        ...defaults,
        height: "100%",
    };
    const defaultDown = {
        ...defaults,
        height: "0%",
    };
    if (item.id === "logo" || item.classList.contains("burger")) {
        mouse.classList.add("nav-active");
    } else {
        mouse.classList.remove("nav-active");
    }
    if (!!document.querySelector(".back")) {
        if (item.classList.contains("back")) {
            mouse.classList.add("back-active");
        } else {
            mouse.classList.remove("back-active");
        }
    }
    if (item.classList.contains("explore")) {
        mouse.classList.add("explore-active");
        gsap.to(".title-swipe", 1, { y: "0%" });
        // mouseTxt.innerHTML="Tap";
    } else {
        mouse.classList.remove("explore-active");
        gsap.to(".title-swipe", 1, { y: "100%" });
        // mouseTxt.innerHTML="";
    }
    if (item.classList.contains("n-link1")) {
        gsap.to(".n-swipe1", defaultUp);
    } else {
        gsap.to(".n-swipe1", defaultDown);
    }
    if (item.classList.contains("n-link2")) {
        gsap.to(".n-swipe2", defaultUp);
    } else {
        gsap.to(".n-swipe2", defaultDown);
    }
    if (item.classList.contains("n-link3")) {
        gsap.to(".n-swipe3", defaultUp);
    } else {
        gsap.to(".n-swipe3", defaultDown);
    }
    if (item.classList.contains("a-link1")) {
        gsap.to(".a-swipe1", defaultUp);
    } else {
        gsap.to(".a-swipe1", defaultDown);
    }
    if (item.classList.contains("a-link2")) {
        gsap.to(".a-swipe2", defaultUp);
    } else {
        gsap.to(".a-swipe2", defaultDown);
    }
    if (item.classList.contains("a-link3")) {
        gsap.to(".a-swipe3", defaultUp);
    } else {
        gsap.to(".a-swipe3", defaultDown);
    }
}

function blockNone(target, blocked) {
    target.style.display = "none";
    blocked.classList.remove("no-events");
}
function unBlockFlex(target, blocked) {
    target.style.display = "flex";
    blocked.classList.remove("no-events");
}

// Navbar toggle
function navToggle(e) {
    // const logoAnimW = gsap.to("#logo", 0.5, {color: "white"});
    // const logoAnimB = gsap.to("#logo", 0.5, {color: "black"});
    const navBar = document.querySelector(".nav-bar");

    if (e.target.classList.contains("nav-active")) {
        e.target.classList.remove("nav-active");
        // Non so perchè, ma risolve il problema ¯\_(ツ)_/¯
        burger.classList.add("no-events");
        if (document.querySelector(".podcast-burger")) {
            document.querySelector(".podcast-burger").style.zIndex = "8 ";
        }
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("#logo", 0.5, { color: "white" });
        gsap.to(".nav-bar", 1.2, {
            clipPath: "circle(0% at 100% -10%)",
            onCompleteParams: [navBar, burger],
            onComplete: blockNone,
        });
        mouse.classList.toggle("high-up");
        document.body.classList.remove("hide");
    } else {
        e.target.classList.add("nav-active");
        burger.classList.add("no-events");
        navBar.style.display = "flex";
        if (document.querySelector(".podcast-burger")) {
            document.querySelector(".podcast-burger").style.zIndex = "1 ";
        }
        gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
        gsap.to("#logo", 0.5, { color: "black" });
        gsap.to(".nav-bar", 1, {
            clipPath: "circle(190% at 100% -10%)",
            onCompleteParams: [navBar, burger],
            onComplete: unBlockFlex,
        });
        mouse.classList.toggle("high-up");
        document.body.classList.add("hide");
    }
}

//Podcast expand
function podcastExpand() {
    const expand = document.querySelectorAll(".expand");
    expand.forEach((item) => {
        item.addEventListener("click", () => {
            const podcastText = item.parentNode;
            const desc = podcastText.querySelector(".desc");
            const guests = podcastText.querySelector(".guests");
            if (item.classList.contains("expanded")) {
                item.classList.remove("expanded");
                desc.style.display = "none";
                guests.style.display = "none";
                item.innerHTML = `<i class="lni lni-plus"></i> Expand`;
            } else {
                item.classList.add("expanded");
                desc.style.display = "block";
                guests.style.display = "block";
                item.innerHTML = `<i class="lni lni-minus"></i> Collapse`;
            }
        });
    });
}
//FETCH run with Barba
function updateSubmit() {
    const upload = document.querySelector(".upload-form");
    const fileError = document.querySelector(".upload-error");

    if (upload) {
        upload.addEventListener("submit", async (e) => {
            e.preventDefault();

            fileError.textContent = "";
            fileError.style.color = "red";

            const file = upload.file.files[0];
            const formData = new FormData();
            formData.append("file", file, file.name);
            try {
                const result = await fetch("/podcast/create/upload", {
                    method: "POST",
                    headers: {
                        "csrf-token": upload._csrf.value,
                    },
                    credentials: "same-origin",
                    body: formData,
                });
                const data = await result.json();
                if (!data.ok) {
                    fileError.textContent = data.msg;
                } else {
                    fileError.style.color = "green";
                    fileError.textContent = data.msg;

                    //Add value
                    console.log("> Picking selection box");
                    const selectionBox = document.querySelector("#image-select");
                    console.log("> Done ", selectionBox);
                    console.log("Creating option block");
                    const option = document.createElement("option");
                    option.value = data.fileName;
                    option.text = data.fileName;
                    console.log("> Done", option);
                    selectionBox.appendChild(option);
                    console.log("Option block appended to selectionBox");
                }
            } catch (err) {
                console.log(err);
            }
        });
    }
}
function javasignup() {
    const signup = document.querySelector(".sign-up");

    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");

    if (signup) {
        signup.addEventListener("submit", async (e) => {
            //Do no refresh
            e.preventDefault();

            //Get Form data
            const email = signup.email.value;
            const password = signup.password.value;

            //Reset errors
            emailError.textContent = "";
            passwordError.textContent = "";

            //Fetch
            try {
                const result = await fetch("/signup", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" },
                });
                const data = await result.json();
                if (data.errors) {
                    emailError.textContent = data.errors.email;
                    passwordError.textContent = data.errors.password;
                }
                if (data.user) {
                    location.assign("/");
                }
            } catch (err) {
                console.log(err);
            }
        });
    }
}
function javalogin() {
    const login = document.querySelector(".log-in");

    const loginError = document.querySelector(".login-error");

    if (login) {
        login.addEventListener("submit", async (e) => {
            //Do no refresh
            e.preventDefault();

            //Get f data
            const email = login.email.value;
            const password = login.password.value;

            //Reset errors
            loginError.textContent = "";

            //Fetch
            try {
                const result = await fetch("/login", {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: { "Content-Type": "application/json" },
                });
                const data = await result.json();
                if (data.errors) {
                    loginError.textContent = data.errors.email;
                }
                if (data.user) {
                    location.assign("/");
                }
            } catch (err) {
                console.log(err);
            }
        });
    }
}
//END FETCHES

//
function addEmbed(location, embed) {
    const parent = location.querySelector(".embed");
    if (embed == "drew") {
        const iframe = `<iframe src="https://open.spotify.com/embed/episode/1xQMm0vF270EP2BBjZAjVy" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
        parent.insertAdjacentHTML("beforeend", iframe);
    } else {
        const iframe = `<iframe src="https://open.spotify.com/embed/episode/6uiSLly6EGNIvmBPSTjBWI" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
        parent.insertAdjacentHTML("beforeend", iframe);
    }
}

function animateAboutSlides() {
    // Create animation
    const section1 = document.querySelector(".pres1");
    const section2 = document.querySelector(".pres2");
    const revealImg1 = section1.querySelector(".pres-img-swipe");
    const img1 = section1.querySelector("img");
    const revealText1 = section1.querySelector(".pres-text-swipe");
    const revealImg2 = section2.querySelector(".pres-img-swipe");
    const img2 = section2.querySelector("img");
    const revealText2 = section2.querySelector(".pres-text-swipe");
    const sectionTl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: "power3.inOut",
        },
    });
    sectionTl.to(revealImg1, { x: "100%" });
    sectionTl.fromTo(img1, { scale: 2 }, { scale: 1 }, "-=1");
    sectionTl.to(
        revealText1,
        {
            x: "100%",
            onCompleteParams: [section1, section1.dataset.embed],
            onComplete: addEmbed,
        },
        "-=0.75"
    );
    sectionTl.to(revealImg2, { x: "-100%" }, "-=0.6");
    sectionTl.fromTo(img2, { scale: 2 }, { scale: 1 }, "-=1");
    sectionTl.to(
        revealText2,
        {
            x: "-100%",
            onCompleteParams: [section2, section2.dataset.embed],
            onComplete: addEmbed,
        },
        "-=0.75"
    );
}

function expandPlayer(event) {
    const overlay = document.querySelector(".expanded-player");
    overlay.style.display = "block";
    gsap.to(overlay, 0.2, { opacity: "1" });
}
function closePlayer(event) {
    const overlay = document.querySelector(".expanded-player");
    const search = document.querySelector(".iframe-player").src;
    document.querySelector(".iframe-player").src = "";
    gsap.to(overlay, 0.2, {
        opacity: "0",
        onComplete: function () {
            overlay.style.display = "none";
        },
    });
    document.querySelector(".iframe-player").src = search;
}
function eS(selector, target, bool) {
    if (bool) {
        target.style.pointerEvents = "all";
        selector.style.pointerEvents = "all";
    } else {
        target.style.pointerEvents = "all";
    }
}
function expandSelector(event) {
    const target = event.target;
    const selector = document.querySelector(".podcast-window");
    if (target.classList.contains("selector-open")) {
        target.style.pointerEvents = "none";
        document.body.style.overflowY = "auto";
        target.classList.remove("selector-open");
        target.innerHTML = `<p>More episodes   <i class="lni lni-plus"></i></p>`;
        selector.style.pointerEvents = "none";
        const bool = false;
        gsap.to(selector, 0.3, {
            top: "100%",
            onComplete: eS,
            onCompleteParams: [selector, target, bool],
            ease: Power2.easeInOut,
        });
        gsap.to(target, 0.3, { color: "white", background: "#17181a" });
    } else {
        target.style.pointerEvents = "none";
        document.body.style.overflowY = "hidden";
        target.classList.add("selector-open");
        target.innerHTML = `<p>Close   <i class="lni lni-minus"></i></p>`;
        selector.style.display = "flex";
        const bool = true;
        gsap.to(selector, 0.3, {
            top: "0%",
            onComplete: eS,
            onCompleteParams: [selector, target, bool],
            ease: Power2.easeInOut,
        });
        gsap.to(target, 0.3, { color: "black", background: "white" });
    }
}
// BARBA
barba.init({
    preventRunning: true,
    views: [
        {
            namespace: "home",
            beforeEnter() {
                animateSlides();
            },
            beforeLeave() {
                slideScene.destroy();
                controller.destroy();
            },
        },
        {
            namespace: "podcast",
            afterEnter() {
                document.body.style.overflowY = "hidden";
                const playBtn = document.querySelectorAll(".episode-play");
                playBtn[playBtn.length - 1].addEventListener("click", expandPlayer);
                console.log(playBtn[0]);
                const closeBtn = document.querySelectorAll(".window-controls");
                closeBtn[closeBtn.length - 1].addEventListener("click", closePlayer);
                const podcastBurger = document.querySelectorAll(".podcast-burger");
                podcastBurger[podcastBurger.length - 1].addEventListener("click", expandSelector);
                const description = document.querySelectorAll(".text-description");
                const inner = description[description.length - 1].innerHTML;
                description.innerHTML = "";
                description.innerHTML = inner;
            },
            beforeLeave() {
                document.body.style.overflowY = "auto";
            },
            // beforeEnter() {
            // 	podcastExpand();
            // },
        },
        {
            namespace: "podcastcreate",
            //Change in fetch request and not usual request
            beforeEnter() {
                showUpload();
                updateSubmit();
            },
        },
        {
            namespace: "details",
            beforeEnter() {
                document.body.style.overflowY = "hidden !important";
                const playBtn = document.querySelector(".episode-play");
                playBtn.addEventListener("click", expandPlayer);
                const closeBtn = document.querySelector(".window-controls");
                closeBtn.addEventListener("click", closePlayer);
                const podcastBurger = document.querySelector(".podcast-burger");
                podcastBurger.addEventListener("click", expandSelector);
            },
            beforeLeave() {
                document.body.style.overflowY = "auto";
            },
        },
        {
            namespace: "signup",
            beforeEnter() {
                javasignup();
            },
        },
        {
            namespace: "login",
            beforeEnter() {
                javalogin();
            },
        },
        {
            namespace: "about",
            beforeEnter() {
                animateAboutSlides();
            },
        },
    ],
    transitions: [
        {
            leave({ current, next }) {
                let done = this.async();
                //An Animation
                const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
                tl.fromTo(".swipe", 0.5, { x: "-100%" }, { x: "0%", onComplete: done }, "-=0.5");
            },
            enter({ current, next }) {
                let done = this.async();
                // Scroll to top
                window.scrollTo(0, 0);
                // Animation
                const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
                tl.fromTo(".swipe", 1, { x: "0%" }, { x: "100%", stagger: 0.25, onComplete: done });
                tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 }, "-=0.5");
                if (next.container.getAttribute("data-barba-namespace") != "home")
                    tl.fromTo(nav, 1.2, { y: "-100%" }, { y: "0" }, "-=0.5");
            },
        },
        {
            name: "episodes",
            from: {
                // A podcast page
            },
            to: {
                //Another return:true podcast page
            },
        },
    ],
});

// LISTENERS
window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
burger.addEventListener("click", navToggle);
