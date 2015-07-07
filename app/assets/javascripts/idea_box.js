$(document).ready(function() {
  // populateIdeas();
  bindListeners();
});

// function populateIdeas () {
//   $.getJSON('/ideas');
// }

bindListeners = function() {
  $('#newIdea').on('click', function(event) {
    event.preventDefault();
    createEvent();
  });
};

createEvent = function() {
  var $title = $('#newIdeaTitle').val();
  var $body = $('#newIdeaBody').val();

  $.ajax({
    type: "POST", 
    url: "/ideas",
    dataType: "json",
    data: {
      idea: {title: $title, body: $body}
    }
  }).then(function(data) {
    console.log(data);
  });
};