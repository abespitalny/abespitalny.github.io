document.addEventListener("DOMContentLoaded", function(e) {
    "use strict";
    const PROMPT_CHAR = "$";
    const WHOAMI = "whoami";
    // specified in Unicode
    const CURSOR_CHAR = "\u2588";
    const TYPE_TIME = 180;
    
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