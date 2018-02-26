//******ALL MY COMMENTS ARE IN CAPS*******//

// CHANGED FILE NAME FROM cms.js TO addSale.js//


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

    // OLD VARIABLE INPUTS //
    //var itemsInput = $("#items");
    //var addressInput = $("#address");
    //var dateInput = $("#date");

    var submitterNameInput = $("#submitterName");
    var yardDateInput = $("#yardDate");
    var startTimeInput = $("#startTime");
    var endTimeInput = $("#endTime");
    var descriptionInput = $("#description");
    var addressInput = $("#address");
    var cityInput = $("#city");
    var stateInput = $("#state")
    var zipInput = $("#zip");
    var emailInput = $("#email");
    var secretCodeInput = $("#secretCode");


    var cmsForm = $("#cms");
    var postCategorySelect = $("#category");
    // Giving the postCategorySelect a default value
    postCategorySelect.val("Yard Sale");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body or a title
        if (!submitterNameInput.val().trim() || !yardDateInput.val().trim() ||
            !startTimeInput.val().trim() || !endTimeInput.val().trim() ||
            !descriptionInput.val().trim() || !addressInput.val().trim() ||
            !cityInput.val().trim() || !stateInput.val().trim() ||
            !zipInput.val().trim() || !emailInput.val().trim() ||
            !secretCodeInput.val().trim()) {
            return;
        }

        // Constructing a newPost object to hand to the database
        var newPost = {
            submitterName: submitterNameInput.val().trim(),
            yardDate: yardDateInput.val().trim(),
            startTime: startTimeInput.val().trim(),
            endTime: endTimeInput.val().trim(),
            description: descriptionInput.val().trim(),
            address: addressInput.val().trim(),
            city: cityInput.val().trim(),
            state: stateInput.val().trim(),
            zip: zipInput.val().trim(),
            email: emailInput.val().trim(),
            secretCode: secretCodeInput.val().trim(),
            // CHANGING DATE TO YARDDATE, MAY NEED TO CHANGE ON DATABASE???//

            //date: dateInput.val().trim()
            //NO ITEMS INPUT, SHOULD WE CHANGE THIS TO DESCRIPTION???//
            //items: itemsInput.val().trim(),
            category: postCategorySelect.val()
        };

        console.log(newPost);

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        } else {
            submitPost(newPost);
        }
    });

    // Submits a new post and brings user to sale page upon completion
    function submitPost(Yardsale) {
        $.post("/api/yardsales/", Yardsale, function() {
            window.location.href = "/sale";
        });
    }

    // Gets post data for a post if we're editing
    function getPostData(id) {
        $.get("/api/yardsales/" + id, function(data) {
            if (data) {
                // If this post exists, prefill our cms forms with its data
                submitterNameInput.val(data.submitterName);
                yardDateInput.val(data.yardDate);
                startTimeInput.val(data.startTime);
                endTimeInput.val(data.endTime);
                descriptionInput.val(data.description);
                addressInput.val(data.address);
                cityInput.val(data.city);
                stateInput.val(data.state);
                zipInput.val(data.zip);
                emailInput.val(data.email);
                secretCodeInput.val(data.secretCode);

                // addressInput.val(data.address);
                // CHANGING DATE TO YARDDATE, MAY NEED TO CHANGE ON DATABASE???//

                // dateInput.val(data.date);
                // yardDateInput.val(data.yardDate);
                //NO ITEMS INPUT SHOULD WE CHANGE THIS TO DESCRIPTION???//
                //itemsInput.val(data.items);
                postCategorySelect.val(data.category);
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // Update a given post, bring user to the sale page when done
    function updatePost(yardsale) {
        $.ajax({
                method: "PUT",
                url: "/api/yardsales",
                data: yardsale
            })
            .then(function() {
                window.location.href = "/sale";
            });
    }
});