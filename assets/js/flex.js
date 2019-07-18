(function(){
    var flex = ["PROGRAMMER", "MOTION GRAPHIC DESIGNER", "SKATER", "GUITARIST", "ANIME FAN", "DATA SCIENCE ENTHUSIAST", "GAMER", "CINEPHILE", "ABSOLUTE MADLAD"];
    var rand_flex = flex[Math.floor(Math.random() * flex.length)];
    document.getElementById("who").innerHTML = rand_flex;
    var flex_key;
    if (rand_flex == "MOTION GRAPHIC DESIGNER") flex_key = "design"
    else if (rand_flex == "ANIME FAN") flex_key = "anime"
    else if (rand_flex == "CINEPHILE") flex_key = "cinema"
    else if (rand_flex == "ABSOLUTE MADLAD") flex_key = "crazy"
    else if (rand_flex == "DATA SCIENCE ENTHUSIAST") flex_key = "data science"
    else if (rand_flex == "GUITARIST") flex_key = "guitar"
    else flex_key = rand_flex;
    var bg_img_url = "url(https://source.unsplash.com/random/?" + encodeURI(flex_key) + ')';
    document.documentElement.style.setProperty('--bg-img-url', bg_img_url);
})();