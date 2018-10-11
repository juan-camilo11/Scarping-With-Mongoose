$(() => {
  // Grab the articles as a json
  $.get("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      let titleRow = $("<tr>").attr("data-id", data[i]._id);
      titleRow.append(
        "<td><a href='https://www.reddit.com" +
          data[i].link +
          "'>Title: " +
          data[i].title +
          "</td>"
      );
      $("#scraped-table > tbody").append(titleRow);

      data[i].comments.forEach(element => {
        let commentRow = $("<tr>").attr("data-id", data[i]._id);
        commentRow.append($("<td>").text(`Comment: ${element.body}`));
        $("#scraped-table > tbody").append(commentRow);
      });

      let commentAdd = $("<tr>").attr("data-id", data[i]._id);
      commentAdd.append(
        "<input class='form-control' type='text' id='add-comment-"+data[i]._id+"' placeholder='Add comment here'><br><button class='btn btn-primary commentSubmit'data-id = '" +
          data[i]._id +
          "'>Add comment</button>"
      );
      $("#scraped-table > tbody").append(commentAdd);
      $("#scraped-table > tbody").append("<br>");

      // Append the new row to the table
    }
  });

  $(document).on("click", ".commentSubmit", function(event) {
    event.preventDefault();
    let thisId = $(this).attr("data-id");
    let comment = {
      title: "Comment",
      body: $(`#add-comment-${$(this).attr("data-id")}`)
        .val()
        .trim()
    };

    $.ajax({
      type: "POST",
      url: "/articles/" + thisId,
      data: comment
    })
      .then(function(result) {
        console.log(result);
        $(this).val("");
        $.ajax({
          type: "GET",
          url: "/articles/" + thisId
        }).then(function(result) {
          console.log(result);
          window.location.href = "/";
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  $("#scrapeNewData").on("click", function(event) {
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "/scrape"
    }).then(function(result){
        window.location.href = "/";
    })
  });
});
