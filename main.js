var game = {
    score: 0,
    totalscore: 0,
    totalclicks: 0,
    clickvalue: 1,
    fps: 30,

    AddToScore: function(amount) {
        this.score += amount;
        this.totalscore += amount;
        display.updatescore();
    },

    getscorepersecond: function() {
        var scorepersecond = 0;
        for (i = 0; i < building.name.length; i++) {
            scorepersecond += building.income[i] * building.count[i];
      }
        return scorepersecond;
    }
};

var building = {
    name: [
        'Cursor',
        'LilPerson',
        'microwave',
        'Chips',
        'Oven',
        "Salsa Hat"
    ],
    image: [
        'Cursor.png',
        'little.png',
        'microwave.png',
        'download.png',
        'oven.png',
        'hat.png'
    ],
    count: [0, 0, 0, 0, 0, 0,],
    income: [
        1,
        13,
        100,
        2450,
        34567,
        500000,
    ],
    cost: [
        20,
        300,
        7800,
        50000,
        345670,
        9999999
    ],

    hasun: [
        false,
        false,
        false,
        false,
        false,
    ],
    
    unlocked: [
        1,
        100,
        2000,
        10000,
        135000,
        500000
    ],

    purchase: function (index) {
        if(game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.15);
            display.updatescore();
            display.updateshop();
        }
    }
}

var achievement = {
    name: [
 //       "WOw, fingers",
        "A start to something",
        "cool..., pain starts here"
    ],
    description: [
   //     "buy a cursor",
        "have one salsa",
        "click the salsa one time"
    ],
    image: [
     //   'Cursor.png',
        'download.png',
        'hat.png',
    ],
    type: [
       // 'building',
        'score',
        'click'
    ],
    requirement: [
        //1,
        1,
        1,
    ],
    objectindex: [
        //0,
        -1,
        -1,
    ],
    awarded: [false, false, false,],
    earn: function(index) {
        this.awarded[index] = true;
    }
};

var display = {
    updatescore: function() {
        document.getElementById("score").innerHTML = numberformat.format(game.score);
        document.getElementById("total").innerHTML = numberformat.format(game.totalscore);
        document.getElementById("scorepersecond").innerHTML = numberformat.format(game.getscorepersecond());
    },

    title: function() {
        document.title = numberformat.format(game.score) + " salsa - salsa clicker";
    },

    updateshop: function() {
        document.getElementById("updateShop").innerHTML = "";
        for(i = 0; i < building.name.length; i++) {
            if (building.hasun[i]) {
            document.getElementById("updateShop").innerHTML += '<table class="shopbutton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="'+building.image[i]+'"></td><td id="nameandcost"><p>'+building.name[i]+'</p><p><span>'+numberformat.format(building.cost[i])+'</span> salsa</p></td><td id="amount"><span>'+numberformat.format(building.count[i])+'</span></td></tr></table>';
            d += building.income[i] * building.count[i];
        }
    }
    sps=d;
    },

    updateachievement: function () {
        document.getElementById("achievements").innerHTML="";
        for (i=0;i<achievement.name.length; i++) {
            if (achievement.awarded[i]) {
                document.getElementById("achievements").innerHTML += '<img src="'+achievement.image[i]+'" title="'+achievement.name[i]+' &#10; '+achievement.description[i]+'">'
            }
        }
    }
};

var sps = 0;

var d = 0;

function savegame() {
    var gamesave = {
        score: game.score,
        sps: sps,
        d: d,
        clickvalue: game.clickvalue,
        totalclicks: game.totalclicks,
        totalscore: game.totalscore,
        buildingC: building.cost,
        buildingI: building.income,
        buildingJ: building.count,
        buildinghasun: building.hasun,
        buildingunlocked: building.unlocked,
        achievementawarded: achievement.awarded,
    };
    localStorage.setItem("gamesave", JSON.stringify(gamesave));
}

function loadgame(){
    var savedGame = JSON.parse(localStorage.getItem("gamesave"));
    if (localStorage.getItem("gamesave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalclicks !== "undefined") game.totalclicks = savedGame.totalclicks;
        if (typeof savedGame.clickvalue !== "undefined") game.clickvalue = savedGame.clickvalue;
        if (typeof savedGame.totalscore !== "undefined") game.totalscore = savedGame.totalscore;
        if (typeof savedGame.sps !== "undefined") sps = savedGame.sps;
        if (typeof savedGame.d !== "undefined") d = savedGame.d;
        if (typeof savedGame.buildingC !== "undefined") {
            for (i = 0; i<savedGame.buildingC.length; i++){
                building.cost[i] = savedGame.buildingC[i];
            }
        }
        if (typeof savedGame.buildinghasun !== "undefined") {
            for (i = 0; i < savedGame.buildinghasun.length; i++) {
              building.hasun[i] = savedGame.buildinghasun[i];
            }
          }
          if (typeof savedGame.buildingunlocked !== "undefined") {
            for (i = 0; i < savedGame.buildingunlocked.length; i++) {
              building.unlocked[i] = savedGame.buildingunlocked[i];
              
            }}
        if (typeof savedGame.buildingI !== "undefined") {
            for (i = 0; i<savedGame.buildingI.length; i++){
                building.income[i] = savedGame.buildingI[i];
            }
        }
        if (typeof savedGame.buildingJ !== "undefined") {
            for (i = 0; i<savedGame.buildingJ.length; i++){
                building.count[i] = savedGame.buildingJ[i];
            }
        }
        if (typeof savedGame.achievementawarded !== 'undefined'){
            for (i=0;i<savedGame.achievementawarded.length;i++){
                achievement.awarded[i] = savedGame.achievementawarded[i];
            }
        }
    }
}
  
function reset() {
    if(confirm("Are you sure you want to reset your game?")) {
        var gamesave = {};
        localStorage.setItem("gamesave", JSON.stringify(gamesave));
        location.reload();
    }
}

setInterval(function() {
    savegame();
}, 30000);

document.addEventListener("keydown", function(event) {
    if(event.ctrlKey && event.which == 83) {
        event.preventDefault();
        savegame();
    }
}, false);

document.addEventListener("keydown", function(event) {
    if(event.ctrlKey && event.which == 82) {
        event.preventDefault();
        reset();
    }
}, false);

setInterval(function(){
    for (i=0;i<achievement.name.length; i++) {
        if (achievement.type[i] == "score" && game.totalscore >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "click" && game.totalclicks >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "building" && building.count[achievement.objectindex[i]] >= achievement.requirement[i]) achievement.earn(i);
    }
    game.score += game.getscorepersecond() / 60;
    game.totalscore += game.getscorepersecond() / 60;
    display.updatescore() / 60;
    for (i = 0; i < building.name.length; i++) {
        if (!building.hasun[i] && building.unlocked[i] <= game.totalscore) {
          building.hasun[i] = true;
          display.updateshop();
        }
      }
      display.updateachievement();
}, 1000 / 60);

//setInterval(function(){
  ///  game.score += game.getscorepersecond()/30;
    //game.totalscore += game.getscorepersecond()/30;
  //  display.updatescore()/30;
    //for (i = 0; i < building.name.length; i++) {
      //  if (!building.hasun[i] && building.unlocked[i] <= game.totalscore) {
        //  building.hasun[i] = true;
//          //display.updateshop();
    //    }
  //    }    
//}, 1000/30);

setInterval(function() {
    display.title();
}, 2100);

window.onload = function() {
    loadgame();
    display.updatescore();
    display.updateachievement();
    display.updateshop();
}

document.getElementById("clicker").addEventListener(
    "click",
    function (event) {
      game.totalclicks++;
      game.AddToScore(game.clickvalue);
  
      createNumberOnSalsa(event);
    },
    false
  );
  
  function fadeOut(element, duration, finalOpacity, callback) {
    let opacity = 1;
  
    let elementFadingInterval = window.setInterval(function () {
      opacity -= 69 / duration;
  
      if (opacity <= finalOpacity) {
        clearInterval(elementFadingInterval);
        callback();
      }
  
      element.style.opacity = opacity;
    }, 50);
  }
  
  function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  
  function createNumberOnSalsa(event) {
    let clicker = document.getElementById("clicker");
  
    let clickeroffset = clicker.getBoundingClientRect();
    let position = {
      x: event.pageX - clickeroffset.left + randomNumber(-100, 100),
      y: event.pageY - clickeroffset.top,
    };
  
    let element = document.createElement("div");
    element.textContent = "+" + numberformat.format(game.clickvalue);
    element.classList.add("number");
    element.style.left = position.x + "px";
    element.style.top = position.y + "px";
  
    clicker.appendChild(element);
  
    let movementInterval = window.setInterval(function () {
      if (typeof element == "undefined" && element == null)
        clearInterval(movementInterval);
  
      position.y--;
      element.style.top = position.y + "px";
    }, 10);
  
    fadeOut(element, 2000, 0.65, function () {
      element.remove();
    });
  }
  