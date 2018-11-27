document.addEventListener("DOMContentLoaded", function(e) {
    "use strict";
    const PROMPT_CHAR = "$";
    const WHOAMI = "whoami";
    // specified in Unicode
    const CURSOR_CHAR = "\u2588";
    const TYPE_TIME = 180;
    const ARTSY_PHOTO_URLS = ["A Decadent Girl, Casas.jpg", "Abend_im_Moor_fritz_overbeck.jpg", "apple - Harold_Edgerton.png", 
                              "banksy-butterfly-girl-suicide-stencil.jpg", "bus_on_the_open_road.jpg", "Caspar_David_Friedrich_-_Meeresstrand_im_Nebel.jpg",
                              "Caspar_David_Friedrich-Wanderer_above_the_sea_of_fog.jpg", "Das_Eismeer - Caspar_David_Friedrich.jpg",
                              "Eiche_im_Schnee_-_Caspar_David_Friedrich.jpg", "freewheelin_bob_dylan.jpg", "Happiness, Steve Cutts.jpg",
                              "Melancholy, Edvard Munch.jpg", "milk_drop - Harold_Edgerton.jpg", "Newton, William Blake.jpg", "observatory-time-the-lovers-man-ray.jpg",
                              "one_of_these_days - megatruh.jpeg", "Photo of Joan Fontaine, 1951.jpg", "Pygmalion and Galatea, Gerome.jpg", "Rock n' Roll, Sagmeister & Walsh.jpg",
                              "Separation, Edvard Munch.jpg", "sunday_morning - jonas_de_ro.jpeg", "Train Smoke, Edvard Munch.jpg", "Vulture_on_a_Spade - Caspar_Friedrich.jpg",
                              "Weeping Nude, Edvard Munch.jpg", "Workers on their Way Home, Edvard Munch.jpg"];
    
    // set artsy photo
    (function() {
        document.getElementById("artsy-pic-bg").style.backgroundImage = `url('images/${ARTSY_PHOTO_URLS[Math.floor(ARTSY_PHOTO_URLS.length * Math.random())]}')`;
    })();
    
    // create type effect
    (async function() {        
        async function timeoutPromise(time) {
            return new Promise((resolve, reject) => {
                setTimeout(() => { return resolve(); }, time);
            });
        }
        
        var len = WHOAMI.length, whoamiElem = document.getElementById("whoami"), typed_str = "";
        for (let i = 0; i < len; i++) {
            typed_str += WHOAMI.charAt(i);
            whoamiElem.textContent = `${PROMPT_CHAR} ${typed_str + CURSOR_CHAR}`;
            // to produce the typing effect
            await timeoutPromise(TYPE_TIME);
        }
        
        // now show the text
        document.getElementById("whoami-reply").style.visibility = "visible";
    })();
});