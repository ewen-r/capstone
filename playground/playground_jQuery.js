/*
  © Copyright 2023-2023 E Reynolds, Inc. All rights reserved.

  This program is confidential and proprietary to E Reynolds, and
    may not be copied, reproduced, modified, disclosed to others, published or used,
    in whole or in part, without the express prior written permission.
*/


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

