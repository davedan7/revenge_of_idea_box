$(document).ready(function() {
  // populateIdeas();
  $('.modal-trigger').leanModal();
  bindCreateIdea();
  bindDeleteIdea();
  bindThumbsUp();
  bindThumbsDown();
  bindEditIdea();
});

// function populateIdeas () {
//   $.getJSON('/ideas');
// }

bindCreateIdea = function() {
  $('#newIdea').on('click', function(idea) {
    idea.preventDefault();
    createIdea();
  });
};

bindDeleteIdea = function() {
  $('.deleteIdea').on('click', function(idea) {
    var daddy = $(this).parents(".idea").data('id'); // ew
    idea.preventDefault();
    deleteTheIdea(daddy);
  });
};

bindThumbsUp = function() {
  $('.thumbsUp').on('click', function(idea) {
    idea.preventDefault();
    var daddy = $(this).parents(".idea").data('id'); // ew
    var currentQuality = $(this).siblings(".brother").children('.ideaQuality');

    if (currentQuality.html() == "Swill") {
      currentQuality.text("Plausible");
    } else if (currentQuality.html() == "Plausible") {
      currentQuality.text("Genius");
    }

    $.ajax({
      type: "POST",
      url: "/like",
      dataType: "json",
      data: {
        "id": String(daddy)
      }

    }).then(console.log("Success"));
  });
};

bindThumbsDown = function() {
  $('.thumbsDown').on('click', function(idea) {
    idea.preventDefault();
    var daddy = $(this).parents(".idea").data('id'); // ew
    var currentQuality = $(this).siblings(".brother").children('.ideaQuality');

    if (currentQuality.html() == "Genius") {
      currentQuality.text("Plausible");
    } else if (currentQuality.html() == "Plausible") {
      currentQuality.text("Swill");
    }

    $.ajax({
      type: "POST",
      url: "/dislike",
      dataType: "json",
      data: {
        "id": String(daddy)
      }
    });
  });
};

bindEditIdea = function() {
  $('#saveEditIdea').on('click', function(button) {
    button.preventDefault();
    // var $title = $(this).parents(".card-content").children(".ideaBody").html();
    var $title = $('#editIdeaTitle').val();
    var $body  = $('.editIdeaBody').val();
    var $id = $(this).parents("#modal1").siblings(".allIdeas").children(".idea").data("id");

    $.ajax({
      method: "put", 
      url: "/ideas/" + $id,
      // dataType: "json",
      data: {
        title: $title, 
        body: $body, 
        id: $id
      }
    }).then(console.log(data));
  });
};

createIdea = function() {
  var $title = $('#newIdeaTitle').val();
  var $body  = $('.newIdeaBody').val();

  $.ajax({
    type: "POST", 
    url: "/ideas",
    dataType: "json",
    data: {
      idea: {title: $title, body: $body}
    }
  }).then(function(data) {
    appendIdeaToDom(data);
  });
};

deleteTheIdea = function(id) {
  $.ajax({
    type: "delete",
    url: "/ideas/" + id,
    dataType: "json",
    data: {
      "id": String(id),
    }
  }).then(function() {
    removeIdeaFromDom(id);
  });
};

appendIdeaToDom = function(idea) {
  $id = idea.id;
  $title = idea.title;
  $body = idea.body;
  $quality = "Swill";

  $('.allIdeas')
  .append(
    "<div class='col s12 m6 idea' data-id=" + $id + ">" + 
      "<div class='card blue-grey darken-1'>" + 
        "<div class='card-content white-text'>" + 
          "<span class='card-title'>" + $title + "</span>" + 
          "<p><strong>Description:</strong><span class='ideaBody'> " + $body + "</span></p>" + 
          "<p class='brother'><strong>Quality:</strong> <span class='ideaQuality'>" +  $quality + "</span></p>" + 
          "<a href='' class='thumbsUp'>Like</a> " + 
          "<a href='' class='thumbsDown'>Dislike</a>" + 
        "</div>" + 
        "<div class='card-action'>" + 
          "<a href='' class='deleteIdea'>Delete</a>" + 
          "<a href='' class='editIdea'>Edit Idea</a>" + 
        "</div>" + 
      "</div>" + 
    "</div>"
  );
  bindDeleteIdea();
  bindThumbsUp();
  bindThumbsDown();
};

removeIdeaFromDom = function(id) {
  $('[data-id=' + id + ']').remove();
};



