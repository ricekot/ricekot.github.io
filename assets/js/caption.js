(function(){
    var captions = ["That's my name.", "Welcome to my humble abode.", "How you doin'?", "Want to work together? Contact me."];
    var rand_caption = captions[Math.floor(Math.random() * captions.length)];
    document.getElementById("caption").innerHTML = rand_caption;
})();