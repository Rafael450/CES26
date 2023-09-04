// Pure JavaScript to dynamically change styles based on the page
document.addEventListener("DOMContentLoaded", function() {
    let body = document.querySelector("body");
    let page = window.location.pathname.split("/").pop();
  
    if (page === "students.html") {
      body.className = "students";
    } else if (page === "teachers.html") {
      body.className = "teachers";
    } else if (page === "administration.html") {
      body.className = "administration";
    } else if (page === "external_visitors.html") {
      body.className = "external-visitors";
    } else {
      body.className = "landing-page";
    }
  });
  