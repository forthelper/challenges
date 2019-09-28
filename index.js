var counter = 1;
var challengesJSON = {};

var sidenavList = $("#sidenavcollection");


// Transform JSON data into ready form
function dataReady(data){
  challengesJSON = data;


  for(var i=1; i<=10; i++){
    var week = data[i]["Normal"];

    let sli = document.createElement('a');
    sli.innerHTML = data[i]["Title"];
    sli.className = "collection-item"
    sli.id = "s" + i;

    let onc = "loadWeek(" + i + ")";

    sli.setAttribute('onclick', onc);

    sidenavList.append(sli);

  }
  //Display first week on start
  loadWeek(1);
}

// Transform array into ul
function makeListFromArray(array){

var ul = document.createElement('ul');
  for(var i=0; i<array.length; i++){
    var li = document.createElement('li');

    let s = array[i]["description"] + " (" + array[i]["objective"] + ")"
    li.innerHTML = s;
    ul.appendChild(li);
  }

  return ul;
}

// Get all challenges in JSON form
$.getJSON( "https://andreymrovol.github.io/fortnitechallenges/challenges.json", function( data ) {
  console.warn(data);

  dataReady(data);
});

// Display selected week
function loadWeek(week){
  let w = challengesJSON[week];

  let normal = w["Normal"];
  let prestige = w["Prestige"]

  $(".active").removeClass("active");
  $("#s" + week).addClass("active")

  // $("#Normal").html(w["Normal"]);
  console.log(w)

  $("#Normal").html("");
  $("#Prestige").html("");

  $("#Normal").append(makeListFromArray(normal))
  $("#Prestige").append(makeListFromArray(prestige))
}
