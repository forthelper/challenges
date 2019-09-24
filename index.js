var counter = 1;

$(".cell").each(function() {

  this.id = "c" + counter;

    counter++;
});

$.getJSON( "https://andreymrovol.github.io/fortnitechallenges/challenges.json", function( data ) {
  console.warn(data);

  for(var i=1; i<=10; i++){
    var week = data[i]["Normal"];

    var b = "";

    var ul = document.createElement('ul');

    for(var o=0; o<week.length; o++){
      var li = document.createElement('li');
      li.innerHTML = week[o]["description"]
      ul.appendChild(li);
      console.log(week[o]["description"])
      b = b + week[o]["description"] + '\n';
    }

    $("#c" + i).append(ul)

  }
});
