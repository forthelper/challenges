var challengesJSON = {};

var sidenavList = $("#sidenavcollection");

// Transform JSON data into ready form
function dataReady(data){
  challengesJSON = data;

  for(var i=1; i<=10; i++){
    let sli = document.createElement('a');
    sli.innerHTML = data[i]["Title"];
    sli.className = "collection-item waves-effect"
    sli.id = "s" + i;

    let l = localStorage.getItem('progress' + i);
    if(l == null){
      l = 14;
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

    let onc = "loadWeek(" + i + ")";

    sli.setAttribute('onclick', onc);
    sli.appendChild(left);

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
    label.className = "waves-effect bt"
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
  dataReady(data);
});

// Display selected week
function loadWeek(week){
  let w = challengesJSON[week];

  let normal = w["Normal"];
  let prestige = w["Prestige"]

  $(".active").removeClass("active");
  $("#s" + week).addClass("active")

  $("#Normal").html("").append(makeListFromArray(normal, week, "n"));
  $("#Prestige").html("").append(makeListFromArray(prestige, week, "p"));

  loadCheckboxes();
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

    localStorage.setItem("progress" + w, (14 - amount));
    $("#l"+w).html((14 - amount))
}

// Load checkboxes on page load
function loadCheckboxes(){
  var checkboxes = document.querySelectorAll('input[type=checkbox]');

  for (i = 0; i < checkboxes.length; i++) {
       checkboxes[i].checked = localStorage.getItem(checkboxes[i].value) === 'true' ? true:false;
    }
}
