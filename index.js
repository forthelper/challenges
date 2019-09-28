var counter = 1;
var challengesJSON = {};
var checkboxes;

var sidenavList = $("#sidenavcollection");

var currWeek;

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
function makeListFromArray(array, week, type){

var ul = document.createElement('ul');
  for(var i=0; i<array.length; i++){
    var li = document.createElement('li');

    let label = document.createElement("label");
    let check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.className = "filled-in";
    check.setAttribute("value", week + "/" + type + "/" + i)
    check.setAttribute("onchange", "setCheckboxes()")
    let sp = document.createElement("span");

    let s = array[i]["description"] + " (" + array[i]["objective"] + ")";
    sp.innerHTML = s;

    label.appendChild(check);
    label.appendChild(sp);
    li.appendChild(label);

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

  $("#Normal").html("").append(makeListFromArray(normal, week, "n"));
  $("#Prestige").html("").append(makeListFromArray(prestige, week, "p"));

  loadCheckboxes();
}

function setCheckboxes(){
  checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (i = 0; i < checkboxes.length; i++) {
        localStorage.setItem(checkboxes[i].value, checkboxes[i].checked);
    }
    console.log(localStorage)
}

function loadCheckboxes(){
  checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (i = 0; i < checkboxes.length; i++) {
       checkboxes[i].checked = localStorage.getItem(checkboxes[i].value) === 'true' ? true:false;
    }
}
