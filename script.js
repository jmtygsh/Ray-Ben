document.addEventListener("DOMContentLoaded", function () {
    Shery.imageEffect("#back", {
        style: 4,
        config: {
            "uColor": {
                "value": true
            },
            "uSpeed": {
                "value": 0.6,
                "range": [0.1, 1],
                "rangep": [1, 10]
            },
            "uAmplitude": {
                "value": 0.10,
                "range": [0, 5]
            },
            "uFrequency": {
                "value": 2.14,
                "range": [0, 10]
            },
            "geoVertex": {
                "range": [1, 64],
                "value": 32
            },
            "zindex": {
                "value": -9996999,
                "range": [-9999999, 9999999]
            },
            "aspect": {
                "value": 2.280467445742905
            },
            "ignoreShapeAspect": {
                "value": true
            },
            "shapePosition": {
                "value": {
                    "x": 0,
                    "y": 0
                }
            },
            "shapeScale": {
                "value": {
                    "x": 0.5,
                    "y": 0.5
                }
            },
            "shapeEdgeSoftness": {
                "value": 0,
                "range": [0, 0.5]
            },
            "shapeRadius": {
                "value": 0,
                "range": [0, 2]
            },
            "currentScroll": {
                "value": 0
            },
            "scrollLerp": {
                "value": 0.07
            },
            "gooey": {
                "value": true
            },
            "infiniteGooey": {
                "value": true
            },
            "growSize": {
                "value": 4,
                "range": [1, 15]
            },
            "durationOut": {
                "value": 1,
                "range": [0.1, 5]
            },
            "durationIn": {
                "value": 1.5,
                "range": [0.1, 5]
            },
            "displaceAmount": {
                "value": 0.5
            },
            "masker": {
                "value": false
            },
            "maskVal": {
                "value": 1,
                "range": [1, 5]
            },
            "scrollType": {
                "value": 0
            },
            "noEffectGooey": {
                "value": true
            },
            "onMouse": {
                "value": 1
            },
            "noise_speed": {
                "value": 0.2,
                "range": [0, 10]
            },
            "metaball": {
                "value": 0.2,
                "range": [0, 2],
                "_gsap": {
                    "id": 3
                }
            },
            "discard_threshold": {
                "value": 0.5,
                "range": [0, 1]
            },
            "antialias_threshold": {
                "value": 0,
                "range": [0, 0.1]
            },
            "noise_height": {
                "value": 0.5,
                "range": [0, 2]
            },
            "noise_scale": {
                "value": 10,
                "range": [0, 100]
            }
        },
        gooey: true,
    });


    // Heading Animation 
    let elems = document.querySelectorAll(".elem")

    if (elems.length === 0) {
        console.log("elems Not found");
    } else {
        elems.forEach(function (elem) {
            let h1s = elem.querySelectorAll("h1");
            let animating = false;
            let idx = 0;

            document.querySelector("#main").addEventListener("click", function () {


                if (h1s.length === 0) {
                    console.log("h1s Not found");
                } else {

                    if (!animating) {
                        animating = true;
                        gsap.to(h1s[idx], {
                            top: '-=100%',
                            ease: Expo.easeInOut,
                            duration: 1,
                            onComplete: function () {

                                gsap.set(this._targets[0], {
                                    top: "100%"
                                })
                                animating = false;
                            }
                        })

                        idx === h1s.length - 1 ? (idx = 0) : idx++;

                        gsap.to(h1s[idx], {
                            top: '-=100%',
                            ease: Expo.easeInOut,
                            duration: 1,
                        })
                    }
                }

            })
        })
    }


    const btns = document.querySelectorAll("#heroleft button");
    let currentIndex = btns.length - 1;

    const positions = [0, 50, -50]; // center, back, top

    // Initial setup: all buttons at top
    btns.forEach((btn, i) => {
        gsap.set(btn, { y: positions[2], zIndex: 1 });
    });

    // Set current button to center
    gsap.set(btns[currentIndex], { y: positions[0], zIndex: 3 });

    document.querySelector("#main").addEventListener("click", () => {
        const tl = gsap.timeline();

        const prevIndex = currentIndex;
        currentIndex = currentIndex === 0 ? btns.length - 1 : currentIndex - 1;

        // Update z-index layers before animating
        btns.forEach((btn, idx) => {
            if (idx === currentIndex) {
                gsap.set(btn, { zIndex: 3 }); // front
            } else if (idx === prevIndex) {
                gsap.set(btn, { zIndex: 2 }); // behind current
            } else {
                gsap.set(btn, { zIndex: 1 }); // back
            }
        });

        // Animate previous button to bottom
        tl.to(btns[prevIndex], {
            y: positions[1],
            ease: "expo.inOut",
            duration: 1
        }, 0);

        // Animate new current button to center
        tl.to(btns[currentIndex], {
            y: positions[0],
            ease: "expo.inOut",
            duration: 1
        }, 0);

        // Reset all other buttons to top
        btns.forEach((btn, idx) => {
            if (idx !== currentIndex && idx !== prevIndex) {
                tl.to(btn, {
                    y: positions[2],
                    ease: "expo.inOut",
                    duration: 1,
                }, 0);
            }
        });
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    // --- Animate NAV ---
    tl.from("#nav", { y: -50, opacity: 0 })
        .from("#nleft img", { x: -30, opacity: 0 }, "-=0.5")
        .from("#nleft a", { x: -30, opacity: 0, stagger: 0.1 }, "-=0.4")
        .from("#nright a", { x: 30, opacity: 0, stagger: 0.1 }, "-=0.4");

    // --- Animate HERO RIGHT ---
    tl.from("#heroright p", {
        x: 50,
        opacity: 0,
        stagger: 0.2
    }, "-=0.3")
        .from("#imagediv", {
            scale: 0.5,
            opacity: 0,
            duration: 1
        }, "-=0.5");

    dynamicColor();


})


function dynamicColor() {
    const colors = [
        "rgba(185, 185, 185, 1)",  // blue
        "rgb(217, 129, 82)",      // orange
        "rgba(255, 255, 0, 1)",   // yellow
        "rgb(119, 184, 209)",     // teal
        "rgba(42, 240, 42, 1)",   // green
    ];

    let currentColorIndex = 0;

    // Set default color when the function runs
    gsap.set("#imagediv", {
        filter: `drop-shadow(0 0 10px ${colors[currentColorIndex]})`
    });

    document.querySelector("#main").addEventListener("click", () => {
        // Move to next color
        currentColorIndex = (currentColorIndex + 1) % colors.length;

        gsap.to("#imagediv", {
            filter: `drop-shadow(0 0 10px ${colors[currentColorIndex]})`,
            duration: 0.6,
            ease: "power2.inOut"
        });
    });
}
