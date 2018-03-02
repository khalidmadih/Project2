// ******************************************************************************
//This file adds the jQuery for the addSale.html file//
// ******************************************************************************

$(document).ready(function() {
    //This section sets up all of the variables that will be used throughout the file. 
    // =============================================================
    var url = window.location.search;
    var postId;
    var updating = false;

    
    if (url.indexOf("?yardsale_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId);
    }

    // This section declares all jQuery variable references to each new yard sale field.


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
    postCategorySelect.val("Yard Sale");
    

    // This section adds the event listener for when the form is submitted
    $(cmsForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // This section is arranged to prevent the page from submitting if each of the following fields does not have information in it.
        if (!submitterNameInput.val().trim() || !yardDateInput.val().trim() ||
            !startTimeInput.val().trim() || !endTimeInput.val().trim() ||
            !descriptionInput.val().trim() || !addressInput.val().trim() ||
            !cityInput.val().trim() || !stateInput.val().trim() ||
            !zipInput.val().trim() || !emailInput.val().trim() ||
            !secretCodeInput.val().trim()) {
            return;
        }

        

        // This section constructs a newPost of yardsale field objects to send to the mySQL database.
        // =============================================================
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
            category: postCategorySelect.val()
        };

        console.log(newPost);

        // This section executes an IF/Else statement in which if a post is being update it will run updatePost
        // Otherwise it willI run submitPost to create a new post.
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        } else {
            submitPost(newPost);
        }
    });

    // This section submits a new yard sale post and brings user to sale.html page upon pushing the submit button.
    // =============================================================
    function submitPost(Yardsale) {
        $.post("/api/yardsales/", Yardsale, function() {
            window.location.href = "/sale";
        });
    }

    // This section sets up the getPostData function for updating/editing a yard sale post.
    function getPostData(id) {
        $.get("/api/yardsales/" + id, function(data) {
            if (data) {
                
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
                postCategorySelect.val(data.category);
                updating = true;
            }
        });
    }

    // This section sets up the updatePost function which we will be called in order to update a yardsale and bring user to the sale.html page when finished.
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
// time picker JS
//This section sets up the jQueary calls that enable the use of the Timepicker library for the start and end times.
// =============================================================
$('#startTime').timepicker();
$('#endTime').timepicker();


});