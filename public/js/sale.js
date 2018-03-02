// ******************************************************************************
//This file sets up the jQuery to used for the sale.html page.
// ******************************************************************************

$(document).ready(function() {
   //This section declares the variables that will be used throughout the file.
   // =============================================================
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");
    //This section enables the delete, edit and submit buttons when clicked on.
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);
$("#filter-zip").on("submit", handleZipChange)
    postCategorySelect.on("change", handleCategoryChange);
    var yardsales;

    // This section sets up the getPosts function which pulls information from the database and updates the view in the html file.
    // =============================================================
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
    //This section sets up the getZips function which works identical to the getPosts function except it pulls from the zip column.
    function getZips(zip) {
    var zipString = zip || "";
    if (zipString) {
      zipString = "/zip/" + zipString;
    }
    $.get("/api/yardsales" + zipString, function(data) {
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

    // This section sets up the deletPost function which does an API call to the database to delete a single post by id.
    function deletePost(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/yardsales/" + id
            })
            .then(function() {
                getPosts(postCategorySelect.val());
            });
    }

    //This section calls the getPosts function referenced above.
    getPosts();
    // This section sets up the InitializeRows function handles ad appends the constructed posts into the HTML file inside of the
    // blogContainer
    function initializeRows() {
        blogContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < yardsales.length; i++) {
            postsToAdd.push(createNewRow(yardsales[i]));
        }
        blogContainer.append(postsToAdd);
    }

    // This section sets up the createNewRow function which will construct a yard sale post in HTML.
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
        editBtn.addClass("edit btn btn-warning");
        var newPostName = $("<h2>");
        var newPostAddress = $("<h5>");
        var newPostCity = $("<p>");
        var newPostState = $("<p>");
        var newPostZip = $("<p>");
        var newPostDate = $("<small>");
        var newPostStart = $("<small>");
        var newPostEnd = $("<small>");
        var newPostCategory = $("<h5>");
        newPostCategory.text("Category : " + yardsale.category);
        newPostCategory.css({
            float: "right",
            "font-weight": "700",
            "margin-top": "-15px"
        });
        var newPostPanelBody = $("<div>");
        newPostPanelBody.addClass("panel-body");
        var newPostBody = $("<p>");
        newPostName.text(yardsale.submitterName + " ");
        newPostAddress.text("Location : " + yardsale.address + " ");
        newPostBody.text("Description: " + yardsale.description);
        newPostDate.text("Sale Date :" + yardsale.yardDate + " ");
        newPostStart.text("Start Time : " + yardsale.startTime + " ");
        newPostEnd.text("- End Time : " + yardsale.endTime + " ");
        newPostAddress.append(", " + yardsale.city + ", " + yardsale.state + ", " + yardsale.zip);
        
        console.log(newPostAddress);

        newPostPanelHeading.append(deleteBtn);
        newPostPanelHeading.append(editBtn);
        newPostPanelHeading.append(newPostName);
        newPostPanelHeading.append(newPostAddress);
        newPostPanelHeading.append(newPostStart);
        newPostPanelHeading.append(newPostEnd);
        newPostPanelHeading.append(newPostCategory);
        newPostPanelBody.append(newPostBody);
        newPostPanel.append(newPostPanelHeading);
        newPostPanel.append(newPostPanelBody);
        newPostPanel.data("yardsale", yardsale);
        return newPostPanel;
    }

    // This section sets up the handlePostDelete function which deciphers which post to delete and calls
    //  the deletePost function referenced above.
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("yardsale");
        deletePost(currentPost.id);
    }

    // This section sets up the handlePostEdit function which works the same as the handlePostDelete function.
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("yardsale");
        window.location.href = "/addSale?yardsale_id=" + currentPost.id;
    }

    // This section sets up the display Empty function which displays a messgae when there is no yard sale information for a particular category.
    function displayEmpty() {
        blogContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("No Yard Sales yet for this category, navigate <a href='/addSale'>here</a> in order to submit a new Yard Sale.");
        blogContainer.append(messageh2);
    }

    // This section sets up the handleCategoryChange function which loads new yard sale posts when the category name is changed.
    function handleCategoryChange() {
        var newPostCategory = $(this).val();
        getPosts(newPostCategory);
    }

    //This section sets up the handleZipChange function which searches for zip codes 
    //using the search section and filters the results based on the search input.
  function handleZipChange(e) {
    e.preventDefault();
    var newPostZip = $("#srch-term").val().trim(); 
    console.log(newPostZip);
    getZips(newPostZip);

  }

});