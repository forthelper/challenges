var challengesJSON = {};

var sidenavList = $("#sidenavcollection");

// Transform JSON data into ready form
function dataReady(data){
  challengesJSON = data;
  console.log(challengesJSON)

  for(var i=1; i<=3; i++){
    let sli = document.createElement('a');
    sli.innerHTML = data[i]["Title"];
    sli.className = "collection-item waves-effect"
    sli.id = "s" + i;

    let l = localStorage.getItem('progress' + i);
    if(l == null){
      l = 11;
    }

    let left = document.createElement('span');
    left.innerHTML = "  " + l;
    left.id = "l" + i;
    left.style['color'] = "white";
    left.style['background-color'] = "#e65100";
    left.style['border-radius'] = "20px";
    left.style['padding'] = "2px";
    left.style['width'] = "20px";
    left.style['height'] = "20px";
    left.style['position'] = "absolute";
    left.style['right'] = "10px";
    left.style['line-height'] = "20px";
    left.style['text-align'] = "center";

    if(getStatus(i) == 11){
      left.style['background-color'] = "#2e7d32";
      // sli.style['animation-name'] = "collapse"
      // sli.style['animation-duration'] = '2s';
      // sli.style['animation-fill-mode'] = "forwards"
//      sli.style['animation-']
  //    sli.style['display'] = 'none';
    }

    let onc = "loadWeek(" + i + ")";

    sli.setAttribute('onclick', onc);
    sli.appendChild(left);

    sidenavList.append(sli);

  }
  //Display first week on start
  loadWeek(1);
}

// Transform array into ul
function makeListFromArray(array, week){

var ul = document.createElement('ul');
  for(var i=0; i<array.length; i++){
    var li = document.createElement('li');

    let label = document.createElement("label");
    let check = document.createElement("input");
    label.className = "waves-effect bt"
    check.setAttribute("type", "checkbox");
    check.className = "filled-in";
    check.setAttribute("value", week + "/" + i)
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
$.getJSON( "https://forthelper.github.io/assets/challenges/all.json", function( data ) {
  dataReady(data);
});

// Display selected week
function loadWeek(week){
  let w = challengesJSON[week];

  let normal = w["Challenges"];
//  let prestige = w["Prestige"]

  $(".active").removeClass("active");
  $("#s" + week).addClass("active")

  $("#cellN").css('background-color', '')
//  $("#cellP").css('background-color', '')

  $("#Normal").html("").append(makeListFromArray(normal, week));
//  $("#Prestige").html("").append(makeListFromArray(prestige, week, "p"));

  // if(getStatus(week, "n") == "7"){
  //   $("#cellN").css("background-color", "#2e7d32")
  // }
  //
  // if(getStatus(week, "p") == "7"){
  //   $("#cellP").css("background-color", "#2e7d32")
  // }

  loadCheckboxes();
  // starMap(week);
}

// On checkbox change update all
function setCheckboxes(){
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  let amount = 0;
  let w;

  for (i = 0; i < checkboxes.length; i++) {
        localStorage.setItem(checkboxes[i].value, checkboxes[i].checked);

        if(checkboxes[i].checked == true){
          amount += 1;
        }

        w = checkboxes[i].value.split("/")[0];
    }

    localStorage.setItem("progress" + w, (11 - amount));
    $("#l"+w).html((11 - amount))
}

// Load checkboxes on page load
function loadCheckboxes(){
  var checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (i = 0; i < checkboxes.length; i++) {
       checkboxes[i].checked = localStorage.getItem(checkboxes[i].value) === 'true' ? true:false;
    }
}

function getStatus(week){
  let searchFor = week + "/";
  let checked = 0;

  for(var i=0; i<11; i++){
    let item = localStorage.getItem(searchFor + i);

    if(item == "true"){
      checked++;
    }

//    console.log(item);
  }

  return checked;
}

function starMap(week){
  let hyperlink = document.createElement('a');
  hyperlink.href = "http://forthelper.github.io/map/?locations/" + "star" + week + ".json"
  hyperlink.innerHTML = "Map locations"

  $("#link").html("").append(hyperlink);
}
