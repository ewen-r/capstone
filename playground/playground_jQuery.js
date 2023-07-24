


// Get a list of elements using class querySelect.
let elements = $("h1");
const firstH1 = elements[0];
elements.text("This text was modified from jQuery script");

// Get a list of elements using id querySelect.
elements = $("#myh2");
elements.css("color", "red");

// Get a list of elements using style querySelect.
elements = $(".pImportant");
elements.css("font-weight", "Bold");

// Get a list of elements using nested querySelect.
elements = $("div .pImportant");
elements.css("color", "blue");

