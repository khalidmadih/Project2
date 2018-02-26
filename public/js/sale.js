
// changed file name blog.js to sale.js//




$(document).ready(function() {
  /* global moment */
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  postCategorySelect.on("change", handleCategoryChange);
  var yardsales;

  // This function grabs posts from the database and updates the view
  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/yardsales" + categoryString, function(data) {
      console.log("Yardsales", data);
      yardsales = data;
      if (!yardsales || !yardsales.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/yardsales/" + id
    })
    .then(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // Getting the initial list of posts
  getPosts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < yardsales.length; i++) {
      postsToAdd.push(createNewRow(yardsales[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(yardsale) {
    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");
    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newPostName = $("<h2>");
    var newPostAddress = $("<h2>");
    var newPostCity = $("<p>");
    var newPostState = $("<p>");
    var newPostZip = $("<p>");
    var newPostDate = $("<small>");
    var newPostStart = $("<small>");
    var newPostEnd = $("<small>");
    var newPostCategory = $("<h5>");
    newPostCategory.text(yardsale.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostPanelBody = $("<div>");
    newPostPanelBody.addClass("panel-body");
    var newPostBody = $("<p>");
    newPostName.text(yardsale.submitterName + " ");
    newPostAddress.text(yardsale.address + " ");
    newPostCity.text(yardsale.city + " ");
    newPostState.text(yardsale.state + " ");
    newPostZip.text(yardsale.zip + " ");
    newPostBody.text(yardsale.description);
    // var formattedDate = new Date(post.date + " ");
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newPostDate.text(yardsale.yardDate + " ");
    newPostStart.text(yardsale.startTime + " ");
    newPostEnd.text(yardsale.endTime + " ");
    newPostAddress.append(newPostCity, newPostState, newPostZip, newPostDate);
    // newPostCity.append(newPostState);
    // newPostZip.append(newPostZip);
    newPostPanelHeading.append(deleteBtn);
    newPostPanelHeading.append(editBtn);
    newPostPanelHeading.append(newPostAddress);
    newPostPanelHeading.append(newPostCategory);
    newPostPanelBody.append(newPostBody);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("yardsale", yardsale);
    return newPostPanel;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("yardsale");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("yardsale");
    window.location.href = "/addSale?yardsale_id=" + currentPost.id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty() {
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("No Yard Sales yet for this category, navigate <a href='/addSale'>here</a> in order to submit a new Yard Sale.");
    blogContainer.append(messageh2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

});
