
var cSpeed = 7;
var cWidth = 128;
var cHeight = 128;
var cTotalFrames = 12;
var cFrameWidth = 128;
var cImageSrc = "css/images/sprites.gif";

var cImageTimeout = false;
var cIndex = 0;
var cXpos = 0;
var cPreloaderTimeout = false;
var SECONDS_BETWEEN_FRAMES = 0;



function startAnimation(x) {
    document.getElementById('loaderImage'+x).style.backgroundImage = 'url(' + cImageSrc + ')';
    document.getElementById('loaderImage'+x).style.width = cWidth + 'px';
    document.getElementById('loaderImage'+x).style.height = cHeight + 'px';

    //FPS = Math.round(100/(maxSpeed+2-speed));
    FPS = Math.round(100 / cSpeed);
    SECONDS_BETWEEN_FRAMES = 1 / FPS;

    cPreloaderTimeout = setTimeout('continueAnimation('+x+')', SECONDS_BETWEEN_FRAMES / 1000);

}
function continueAnimation(y) {

    cXpos += cFrameWidth;
    //increase the index so we know which frame of our animation we are currently on
    cIndex += 1;

    //if our cIndex is higher than our total number of frames, we're at the end and should restart
    if (cIndex >= cTotalFrames) {
        cXpos = 0;
        cIndex = 0;
    }

    if (document.getElementById('loaderImage'+y))
        document.getElementById('loaderImage'+y).style.backgroundPosition = (-cXpos) + 'px 0';

    cPreloaderTimeout = setTimeout('continueAnimation('+y+')', SECONDS_BETWEEN_FRAMES * 1000);
}

function stopAnimation() {//stops animation
    clearTimeout(cPreloaderTimeout);
    cPreloaderTimeout = false;
}

function imageLoader(s, fun)//Pre-loads the sprites image
{
    clearTimeout(cImageTimeout);
    cImageTimeout = 0;
    genImage = new Image();
    genImage.onload = function() {
        cImageTimeout = setTimeout(fun, 0);
    };
    genImage.onerror = new Function('alert(\'Could not load the image\')');
    genImage.src = s;
}
    