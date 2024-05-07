// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

$(".saveBtn").on("click", function () {
  var blockId = $(this).parent().attr("id");
  
  var userInput = $(this).siblings(".description").val();
  
  localStorage.setItem(blockId, userInput);
});

var currentHour = dayjs().hour();

$(".time-block").each(function () {
  var blockHour = parseInt($(this).attr("id").split("-")[1]);

  if (blockHour < currentHour) {
    $(this).addClass("past");
  } else if (blockHour === currentHour) {
    $(this).removeClass("past").addClass("present");
  } else {
    $(this).removeClass("past present").addClass("future");
  }
});

$(".time-block").each(function () {
  var blockId = $(this).attr("id");
  var storedInput = localStorage.getItem(blockId);

  if (storedInput) {
    $(this).find(".description").val(storedInput);
  }
});

$("#currentDay").text(dayjs().format("MMMM D, YYYY"));

$(function () {
  
  var startHour = 9;
  
  var endHour = 17;

  var timeBlocksContainer = $(".container-lg");

  for (var hour = startHour; hour <= endHour; hour++) {
    
    var timeBlock = $("<div>")
      .attr("id", "hour-" + hour)
      .addClass("row time-block");

    var formattedHour = (hour % 12) || 12; 
    
    var period = hour >= 12 ? "PM" : "AM";
    
    var hourColumn = $("<div>")
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(formattedHour + period);

    var descriptionTextarea = $("<textarea>")
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3");

    var saveButton = $("<button>")
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .html('<i class="fas fa-save" aria-hidden="true"></i>');

    timeBlock.append(hourColumn, descriptionTextarea, saveButton);

    timeBlocksContainer.append(timeBlock);
  }

});

$(function () {
  
  function updateTimeBlockColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      $(this).removeClass("past present future");

      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  updateTimeBlockColors();

});


$(function () {
  
  function updateTimeBlockColors() {
  }

  updateTimeBlockColors();

  $(".saveBtn").on("click", function () {
    
    var userInput = $(this).siblings(".description").val().trim();

    var blockHour = $(this).parent().attr("id").split("-")[1];

    localStorage.setItem("event-" + blockHour, userInput);
  });

  function displaySavedEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id").split("-")[1];
      
      var savedEvent = localStorage.getItem("event-" + blockHour);

      $(this).find(".description").val(savedEvent);
    });
  }

  displaySavedEvents();

});


