$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?yardsale_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var itemsInput = $("#items");
  var addressInput = $("#address");
  var dateInput = $("#date");
  var cmsForm = $("#cms");
  var postCategorySelect = $("#category");
  // Giving the postCategorySelect a default value
  postCategorySelect.val("Yard Sale");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!addressInput.val().trim() || !itemsInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      address: addressInput.val().trim(),
      date: dateInput.val().trim(),
      items: itemsInput.val().trim(),
      category: postCategorySelect.val()
    };

    console.log(newPost);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitPost(Yardsale) {
    $.post("/api/yardsales/", Yardsale, function() {
      window.location.href = "/blog";
    });
  }

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get("/api/yardsales/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        addressInput.val(data.address);
        dateInput.val(data.date);
        itemsInput.val(data.items);
        postCategorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updatePost(yardsale) {
    $.ajax({
      method: "PUT",
      url: "/api/yardsales",
      data: yardsale
    })
    .then(function() {
      window.location.href = "/blog";
    });
  }
});
