function playAudio(id) {
  console.log(id); // gets the button

  var audioID = $(id).find("audio")[0].id;

  console.log(audioID);

  var audio = document.getElementById(audioID);

  audio.play();
  updateString(audioID);
}

document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;

  var id = e.key.toString().toUpperCase(); // gets the key pressed

  // console.log($("#"+id)[0]) jquery
  // console.log(document.getElementById(id)) javascript

  var audioID = $("#" + id)[0]; // Retrieves the element

  // var audioID = $(e.toString().toUpperCase()).find('audio')[0].id;
  // console.log(audioID)
  if (audioID != null) {
    // Check to see if the element exists
    console.log(e.key.toString().toUpperCase());
    audioID.play();
    updateString(id);
  } else {
    console.log(
      "The key " + id.toString() + " does not exist in the Drum Machine."
    );
  }
}

function updateString(id) {
  document.getElementById("string").innerHTML = "Playing: " + id.toString();
}
