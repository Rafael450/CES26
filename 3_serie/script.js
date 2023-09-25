$(document).ready(function() {
    let selectedElement = null;

    // Selecting an element
    $("body").on("click", "*", function(event) {
        if (selectedElement) {
            $(selectedElement).removeClass("selected");
        }
        selectedElement = this;
        $(this).addClass("selected");
        event.stopPropagation();
    });

    // Remove selected element
    $("#removeBtn").click(function() {
        if (selectedElement) {
            $(selectedElement).remove();
        }
    });

    // Change properties of the selected element (e.g., change text)
    $("#changePropsBtn").click(function() {
        if (selectedElement) {
            let newText = prompt("Enter new text:");
            $(selectedElement).text(newText);
        }
    });

    // Insert child for the selected element
    $("#insertChildBtn").click(function() {
        if (selectedElement) {
            let childText = prompt("Enter text for new child:");
            let newChild = $("<div>").text(childText);
            $(selectedElement).append(newChild);
        }
    });
});
