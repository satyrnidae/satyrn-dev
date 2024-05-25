//#region Interfaces
//#endregion
//#region Data Definitions
var globalSettings = {
    startingSpeed: 5,
    audioVolume: 0.45,
    tombstoneMaxAge: 1500,
    shadowOffset: 0.5,
    rubberMult: 1,
    autoSpawnRate: 1
};
var bingoMp3 = new Audio('./res/bingo.mp3');
bingoMp3.load();
var karaMp3 = new Audio('./res/kara.mp3');
karaMp3.load();
var oofMp3 = new Audio('./res/oof.mp3');
oofMp3.load();
var oof2Mp3 = new Audio('./res/oof2.mp3');
oof2Mp3.load();
var images = [];
var tombstoneDefinitions = [
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/bstone.png", weight: 8 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/istone.png", weight: 8 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/nstone.png", weight: 8 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/gstone.png", weight: 8 },
    { rubberness: 0.5, soundSource: "./res/bingo.mp3", path: "./res/tombstones/ostone.png", weight: 8 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/eyestone.png", weight: 2 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/flowerstone.png", weight: 1 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/pridestone.png", weight: 4 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/ghoststone.png", weight: 1 },
    { rubberness: 0.3, soundSource: "./res/bingo.mp3", path: "./res/tombstones/moiststone.png", weight: 1 },
    { rubberness: 0.6, soundSource: "./res/bingo.mp3", path: "./res/tombstones/ohnostone.png", weight: 4 },
    { rubberness: 0.15, soundSource: "./res/oof.mp3", path: "./res/tombstones/oofstone.png", weight: 2 },
    { rubberness: 0.15, soundSource: "./res/oof2.mp3", path: "./res/tombstones/oofstone.png", weight: 2 },
    { rubberness: 0.25, soundSource: "./res/bingo.mp3", path: "./res/tombstones/karastone.png", weight: 1 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/thinkstone.png", weight: 4 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/tombstone.png", weight: 64 },
    { rubberness: 0.01, soundSource: "./res/bingo.mp3", path: "./res/tombstones/tombstowone.png", weight: 4 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/weirdseedstone.png", weight: 1 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/transstone.png", weight: 2 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/heartstone.png", weight: 4 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/blankstone.png", weight: 16 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/shortstone.png", weight: 4 },
    { rubberness: 0, soundSource: "./res/bingo.mp3", path: "./res/tombstones/wolfstone.png", weight: 8 },
    { rubberness: 0, soundSource: "./res/bingo.mp3", path: "./res/tombstones/oldwolfstone.png", weight: 1 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/sideeyestone.png", weight: 2 },
    { rubberness: 0.6, soundSource: "./res/bingo.mp3", path: "./res/tombstones/googlystone.png", weight: 2 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/nottombfine.png", weight: 2 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/seestone.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/seestone1.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/seestone2.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/seestone3.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/seestone4.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/frankerfacestone.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/bingo.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/bingobox.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/fancybingo.png", weight: 1 },
    { rubberness: 0.1, soundSource: "./res/bingo.mp3", path: "./res/tombstones/buffstone.png", weight: 1 },
    { rubberness: 0.15, soundSource: "./res/bingo.mp3", path: "./res/tombstones/enbystone.png", weight: 1 },
];
tombstoneDefinitions.forEach(function (def) {
    var img = new Image();
    img.src = def.path;
    img.onload = function () { return console.log('Loaded', def.path); };
    images.push(img);
});
//precache UI elements
['res/ui/exitbutton.png',
    'res/ui/exitbutton.hover.png',
    'res/ui/exitbutton.activate.png',
    'res/ui/menubutton.png',
    'res/ui/menubutton.hover.png',
    'res/ui/menubutton.activate.png',
    'res/ui/settingsbutton.png',
    'res/ui/settingsbutton.hover.png',
    'res/ui/settingsbutton.activate.png'].forEach(function (item) {
    var img = new Image();
    img.src = item;
    img.onload = function () { return console.log('Loaded', item); };
    images.push(img);
});
//#endregion
//#region Utility Functions
function getLocalPath(path) {
    var _a = path.match(/^(https?\:\/\/[^\/]+\/|\.\.\/)(.+)$/);
    var localPath = _a[2];
    return './'.concat(localPath);
}
//#endregion
// #region Singleton Classes
var WeightedTombstones = /** @class */ (function () {
    function WeightedTombstones() {
        this._totalSize = undefined;
    }
    WeightedTombstones.prototype.getTotalSize = function () {
        if (!this._totalSize) {
            var i = 0;
            tombstoneDefinitions.forEach(function (tombstone) {
                i += tombstone.weight;
            });
            this._totalSize = i;
        }
        return this._totalSize + 1;
    };
    WeightedTombstones.prototype.getRandomTombstone = function () {
        var index = Math.floor(Math.random() * this.getTotalSize());
        var k = 0;
        var selected;
        tombstoneDefinitions.forEach(function (tombstone) {
            if (selected)
                return;
            if (tombstone.weight + k >= index) {
                selected = tombstone;
            }
            else {
                k += tombstone.weight;
            }
        });
        return selected;
    };
    return WeightedTombstones;
}());
var weightedTombstones = new WeightedTombstones();
//#endregion
//#region Pools
var AudioPool = /** @class */ (function () {
    function AudioPool() {
        this.pool = [];
    }
    AudioPool.prototype.get = function (source) {
        var pooledAudio;
        this.pool.forEach(function (audio) {
            if (pooledAudio)
                return;
            if (audio.currentTime == 0 && getLocalPath(audio.currentSrc) == source) {
                pooledAudio = audio;
            }
        });
        if (!pooledAudio) {
            pooledAudio = new Audio(source);
            pooledAudio.onended = function () {
                pooledAudio.pause();
                pooledAudio.currentTime = 0;
            };
            pooledAudio.load();
            this.pool.push(pooledAudio);
        }
        return pooledAudio;
    };
    return AudioPool;
}());
var audioPool = new AudioPool();
var TombstonePool = /** @class */ (function () {
    function TombstonePool() {
        this.pool = [];
    }
    TombstonePool.prototype.get = function (x) {
        var pooled;
        this.pool.forEach(function (item) {
            if (pooled)
                return;
            if (!item.isAlive) {
                pooled = item;
                pooled.x = x;
                pooled.reset();
            }
        });
        if (!pooled) {
            pooled = new Tombstone(x);
            this.pool.push(pooled);
        }
        return pooled;
    };
    return TombstonePool;
}());
var tombstonePool = new TombstonePool();
//#endregion
//#region Entity Types
var Tombstone = /** @class */ (function () {
    function Tombstone(x) {
        this.x = x;
        this.reset();
    }
    Tombstone.prototype.reset = function () {
        this.speed = globalSettings.startingSpeed + Math.floor(10 * Math.random());
        this.opacity = 1;
        this.age = 0;
        this.isAlive = true;
        this.y = 0;
        this.collidedAny = false;
        this.imageLoaded = false;
        this.tombstoneType = weightedTombstones.getRandomTombstone();
        this.tombstone = new Image();
        this.tombstone.src = this.tombstoneType.path;
        if (!this.tombstone.complete) {
            this.tombstone.style.visibility = 'hidden';
            this.tombstone.onload = this.imageDoneLoading.bind(this);
        }
        else {
            this.imageDoneLoading();
        }
        this.tombstone.classList.value = 'tombstone';
        document.body.appendChild(this.tombstone);
    };
    Tombstone.prototype.imageDoneLoading = function () {
        this.x -= this.tombstone.width / 2;
        this.width = this.tombstone.width;
        this.height = this.tombstone.height;
        this.y -= this.tombstone.height;
        if (!this.shine) {
            this.shine = new Shine(this.x, this.width);
        }
        else {
            this.shine.x = this.x;
            this.shine.width = this.width;
            this.shine.reset();
        }
        this.imageLoaded = true;
        this.tombstone.style.top = this.y + "px";
        this.tombstone.style.left = this.x + "px";
        this.tombstone.style.opacity = "" + this.opacity;
        this.tombstone.style.visibility = "visible";
        var bingo = audioPool.get(this.tombstoneType.soundSource);
        bingo.volume = globalSettings.audioVolume;
        bingo.play();
    };
    Tombstone.prototype.update = function () {
        if (!this.imageLoaded)
            return;
        if (this.shine)
            this.shine.update();
        this.age++;
        if (this.y < window.innerHeight - this.tombstone.height) {
            if (!this.collidedAny) {
                this.y += this.speed;
                if (this.age % 15 == 0) {
                    this.speed++;
                }
            }
            else {
                this.speed = this.speed * -(this.tombstoneType.rubberness * globalSettings.rubberMult);
            }
        }
        else {
            this.speed = this.speed * -(this.tombstoneType.rubberness * globalSettings.rubberMult);
            this.y = window.innerHeight - this.tombstone.height;
            if (Math.abs(this.speed) >= 1) {
                this.y -= this.tombstoneType.rubberness;
            }
            else {
                this.speed = 0;
            }
        }
        if (this.age >= globalSettings.tombstoneMaxAge - 500 && this.age < globalSettings.tombstoneMaxAge) {
            this.speed *= 0.95;
            this.opacity -= 0.005;
            if (this.opacity <= 0) {
                this.opacity = 0;
            }
        }
        if (this.age >= globalSettings.tombstoneMaxAge) {
            this.kill();
        }
    };
    Tombstone.prototype.draw = function () {
        this.tombstone.style.visibility = this.imageLoaded ? "visible" : "hidden";
        this.tombstone.style.left = this.x + "px";
        this.tombstone.style.top = this.y + "px";
        this.tombstone.style.opacity = "" + this.opacity;
        if (this.shine)
            this.shine.draw();
    };
    Tombstone.prototype.kill = function () {
        this.isAlive = false;
        this.age = 0;
        if (this.shine) {
            this.shine.kill();
        }
        if (this.tombstone.remove) {
            return this.tombstone.remove();
        }
        document.body.removeChild(this.tombstone);
    };
    Tombstone.prototype.isCollidedWith = function (other) {
        var tombstone = other;
        if (!tombstone)
            return false;
        if (this.opacity < 1 || tombstone.opacity < 1 || tombstone.age < 1 || this.age < 1) {
            return false;
        }
        if (this.y <= tombstone.y &&
            this.y + this.tombstone.height >= tombstone.y) {
            if ((this.x >= tombstone.x &&
                this.x <= tombstone.x + tombstone.tombstone.width) ||
                tombstone.x >= this.x && tombstone.x <= this.x + this.tombstone.width) {
                this.y = tombstone.y - this.tombstone.height + 1;
                var otherOldSpeed = tombstone.speed;
                var myOldSpeed = this.speed;
                tombstone.speed = Math.max(otherOldSpeed, myOldSpeed);
                this.speed = Math.min(otherOldSpeed, myOldSpeed) + (1 * -(this.tombstoneType.rubberness * globalSettings.rubberMult));
                if (Math.abs(this.speed) >= 1) {
                    this.y -= (this.tombstoneType.rubberness * globalSettings.rubberMult);
                }
                else {
                    this.speed = 0;
                }
                return true;
            }
        }
        return false;
    };
    return Tombstone;
}());
var Shine = /** @class */ (function () {
    function Shine(x, width) {
        this.x = x;
        this.width = width;
        this.reset();
    }
    Shine.prototype.reset = function () {
        this.opacity = 0.75;
        this.age = 0;
        this.height = 16000 + window.innerHeight;
        this.y = -8000;
        this.xStart = this.x;
        this.widthStart = this.width;
        this.isAlive = true;
        this.collidedAny = false;
        this.shine = document.createElement('div');
        document.body.appendChild(this.shine);
        this.shine.classList.value = 'shine';
        this.shine.style.left = this.x + "px";
        this.shine.style.top = this.y + "px";
        this.shine.style.opacity = "" + this.opacity;
        this.shine.style.width = this.width + "px";
        this.shine.style.height = this.height + "px";
    };
    Shine.prototype.update = function () {
        this.age++;
        if (this.opacity > 0) {
            this.opacity -= 0.005;
            if (this.width > 0 && this.age % 2 == 0) {
                this.width-=3;
                this.x = this.xStart + ((this.widthStart - this.width) / 2);
            }
        }
        if (this.age >= 200) {
            this.kill();
        }
    };
    Shine.prototype.draw = function () {
        this.shine.style.left = this.x + "px";
        this.shine.style.top = this.y + "px";
        this.shine.style.width = this.width + "px";
        this.shine.style.height = this.height + "px";
        this.shine.style.opacity = "" + this.opacity;
    };
    Shine.prototype.kill = function () {
        this.isAlive = false;
        if (this.shine.remove) {
            return this.shine.remove();
        }
        document.body.removeChild(this.shine);
    };
    Shine.prototype.isCollidedWith = function (_other) { return false; };
    return Shine;
}());
//#endregion
//#region Main Functionality
var entities = [];
function main() {
    document.body.style.height = window.innerHeight + "px";
    document.getElementById('overlay').onclick = function (ev) { return tombstone(ev.clientX); };
    setInterval(drawLoop, 16);
    setInterval(updateLoop, 10);
    setInterval(moveShadow, 1500);
}
var shadow = [globalSettings.shadowOffset, globalSettings.shadowOffset];
function moveShadow() {
    if (shadow[0] == globalSettings.shadowOffset) {
        if (shadow[1] == -globalSettings.shadowOffset) {
            shadow[1] = globalSettings.shadowOffset;
        }
        else {
            shadow[0] = -globalSettings.shadowOffset;
        }
    }
    else {
        if (shadow[1] == -globalSettings.shadowOffset) {
            shadow[0] = globalSettings.shadowOffset;
        }
        else {
            shadow[1] = -globalSettings.shadowOffset;
        }
    }
    document.getElementById('bingo').style.textShadow = "#ff375e " + shadow[0] + "vw " + shadow[1] + "vw";
}
function updateLoop() {
    if (Math.random() > (1 - globalSettings.autoSpawnRate / 1000)) {
        tombstone(Math.floor(Math.random() * innerWidth));
    }
    document.body.style.height = window.innerHeight + "px";
    entities.forEach(function (entity) {
        if (!entity.isAlive)
            return;
        entity.collidedAny = false;
        entities.forEach(function (other) {
            if (other.isAlive && other !== entity) {
                entity.collidedAny = entity.isCollidedWith(other);
            }
        });
        entity.update();
    });
}
function drawLoop() {
    entities.forEach(function (entity) {
        if (!entity.isAlive)
            return;
        entity.draw();
    });
}
function tombstone(xPos) {
    var tombstone = tombstonePool.get(xPos);
    if (entities.indexOf(tombstone) < 0)
        entities.push(tombstone);
}
function showMenu(menuName) {
    document.getElementById(menuName).style.visibility = 'visible';
    document.getElementById('menu').style.visibility = 'hidden';
}
function hideMenu(menuName) {
    document.getElementById(menuName).style.visibility = 'hidden';
    document.getElementById('menu').style.visibility = 'visible';
}
function bindSettings() {
    document.getElementById('tombstoneMaxAge').value = "" + globalSettings.tombstoneMaxAge;
    document.getElementById('audioVolume').value = "" + globalSettings.audioVolume;
    document.getElementById('initialTombstoneSpeed').value = "" + globalSettings.startingSpeed;
    document.getElementById('shadowOffset').value = "" + globalSettings.shadowOffset;
    document.getElementById('rubberMult').value = "" + globalSettings.rubberMult;
    document.getElementById('autoSpawnRate').value = "" + globalSettings.autoSpawnRate;
    rebindViewModel('initialTombstoneSpeed');
    rebindViewModel('tombstoneMaxAge');
    rebindViewModel('audioVolume');
    rebindViewModel('shadowOffset');
    rebindViewModel('rubberMult');
    rebindViewModel('autoSpawnRate');
}
function applySettings() {
    globalSettings.tombstoneMaxAge = +document.getElementById('tombstoneMaxAge').value;
    globalSettings.audioVolume = +document.getElementById('audioVolume').value;
    globalSettings.startingSpeed = +document.getElementById('initialTombstoneSpeed').value;
    globalSettings.shadowOffset = +document.getElementById('shadowOffset').value;
    globalSettings.rubberMult = +document.getElementById('rubberMult').value;
    globalSettings.autoSpawnRate = +document.getElementById('autoSpawnRate').value;
}
function rebindViewModel(id) {
    var self = document.getElementById(id);
    if (!self)
        return;
    var viewId = self.getAttribute('view');
    if (!viewId)
        return;
    var view = document.getElementById(viewId);
    if (!view)
        return;
    view.innerText = self.value;
}
function resetSettings() {
    globalSettings.startingSpeed = 5;
    globalSettings.audioVolume = 0.45;
    globalSettings.tombstoneMaxAge = 1500;
    globalSettings.shadowOffset = 0.5;
    globalSettings.rubberMult = 1;
    globalSettings.autoSpawnRate = 1;
    bindSettings();
}
//#endregion
//# sourceMappingURL=nugflow.js.map