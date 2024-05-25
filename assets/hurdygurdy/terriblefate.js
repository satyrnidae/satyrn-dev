var globals = {
    index: 0,
    maxDancers: 8,
    bpm: 428.571,
    dancers: [],
    imgidx: 0
}

/**
 * The main function.  Starts the spawn / despawn loop.
 */
function main()
{
    // If audio element is not playing, attempt to start it up.
    var aud = document.getElementById('lostwoods');
    if(aud.paused) {
        aud.play();
    }
    //doLoop will kick off the actual logic loop.
    doLoop();
}

/**
 * This function runs a loop to handle the dancer spawn / despawn logic.
 */
function doLoop() {
    spawnDancer();

    var delay = 0;

    // If we have too many dancers, clean them up and start back from none again.
    if(globals.dancers.length > globals.maxDancers) {
        cleanupDancers();
    }
    else {
        /*
         * Round out the delay value based on the number of milliseconds
         *  in the duration of one quarter note at 140 BPM. Switching on
         *  index mod 2 allows us to round up and down for every other
         *  spawned dancer, as setTimeout only supports whole numbers.
         * This does mean that the loop desyncs eventually, but hopefully
         *  the user tires of the music before then.
         */
        delay = (globals.index % 2 == 0
                    ? Math.ceil // index was divisible by 2, round up
                    : Math.floor // index was not divisible by 2, round down
                )(globals.bpm);
    }

    // Delay and loop
    setTimeout(doLoop, delay);
}

/**
 * Creates and initializes a new dancer.
 */
function spawnDancer()
{
    // Check to make sure the audio element is not paused, and do not spawn a dancer if it is.
    var aud = document.getElementById('lostwoods');
    if(!aud.paused)
    {
        // Create a new dancer with the specified image and alt text.
        var danceBaby = new dancer(`../assets/hurdygurdy/rowtendo.apng?imgidx=${globals.imgidx}`, `dancer_${globals.index++}`);
        // Position the dancer
        danceBaby.prepare(213, 311);
        // Place the dancer on the page
        danceBaby.spawn();
        // Make sure to keep track of the dancer so we can remove them later
        globals.dancers.push(danceBaby);

        incrementImageIndex();
    }
}

/**
 * Increments the globals.imgidx value, resetting to zero when globals.maxDancers is reached
 */
function incrementImageIndex() {
    if(++globals.imgidx >= 8) {
        globals.imgidx = 0;
    }
}

/**
 * Creates a new dancer with the specified image source and alt text.
 * @param src The image source
 * @param alt The image alt text
 */
function dancer(src, alt) {
    // We define self here so that nested functions like prepare and purge can access the img property
    var self = this;

    // The dancer's image element, created via a jQuery call
    self.img = $("<img/>").attr("src", src)
                          .attr("alt", alt)
                          .attr("class", "dancer");

    /**
     * Prepares and spawns a dancer in the web page.
     * @param imgSizeX The X dimension of the image in pixels.
     * @param imgSizeY The Y dimension of the image in pixels.
     */
    self.prepare = function(imgSizeX, imgSizeY) {
        // Calculate the maximum coordinate we will allow a dancer to be placed at.
        var safeZoneMaxX = window.innerWidth - imgSizeX - 20;
        var safeZoneMaxY = window.innerHeight - imgSizeY - 20;

        // Get some random percentage values for X and Y coordinates.
        var randX = Math.random();
        var randY = Math.random();

        /*
         * Here we are scaling the image based on how far down the page it will appear.
         * Dancers higher on the page will appear smaller, so that they look further away.
         * This is coupled with the z-index value to make these dancers appear to be behind
         *  those further down on the page.
         */
        var percentSize = ((randY * 75) + 25) / 100;
        var scaleWidth = Math.ceil(imgSizeX * (percentSize * 1.75) / 1.75);

        /*
         * Calculate the actual X and Y coordinates based on the randomized percentage values
         *  and the maximum coordinates that we will allow a dancer to be placed at.
         */
        var randPosX = Math.floor(randX * safeZoneMaxX) + 10;
        var randPosY = Math.floor(randY * safeZoneMaxY) + 10;

        // Setting the z-index will allow us to
        var zIndex = randPosY - window.innerHeight;

        /*
         * Set up the image style values.
         * Top determines how far down the page the image appears at.
         * Left will determine how far from the left edge of the page the image appears at.
         * The z-index value determines which elements this image will appear on top of or behind.
         * The width value scales the image by the calculated width.
         * Setting height to "auto" preserves the original aspect ratio of the image and allows
         *  us to skip calculating its value.
         */
        self.img.attr("style", "top: " + randPosY + "px; "+
                                "left: " + randPosX + "px; " +
                                "z-index: " + zIndex + "; " +
                                "width: " + scaleWidth + "px; " +
                                "height: auto");
    };

    /**
     * This function adds a dancer's image to the page body.
     */
    self.spawn = function() {
        // Places the image on the page.
        $("body").append(self.img);
    };

    /**
     * This function removes a dancer from the page.
     */
    self.purge = function() {
        // Removes the image from the page.
        self.img.remove();
    };
}

/**
 * This function removes any spawned dancers from the page.
 */
function cleanupDancers() {
    while(globals.dancers.length > 0)
    {
        /*
         * We call dancer.purge to allow the stored dancer objects to remove themselves from the page.
         * Obtaining the dancer by calling array.pop also removes that dancer from the array.
         */
        var danceBaby = globals.dancers.pop();
        danceBaby.purge();
    }
}
