var imagePaths = {
  "vanilla": "img/vanilla.jpg",
  "chocolate": "img/chocolate.jpg",
  "strawberry": "img/strawberry.jpg",
  "mint": "img/mint.jpg",
  "coffee": "img/coffee.jpg",
  "hazelnut": "img/hazelnut.jpg",
  "cookies": "img/cookies.jpg",
  "banana": "img/banana.jpg",
};

var presetTexts = {
  "vanilla_chocolate": "The combination of chocolate and vanilla ice cream offers a classic and complementary contrast of flavors. The velvety richness of chocolate intertwines with the smooth and mellow essence of vanilla, creating a well-balanced and indulgent taste experience that caters to both chocolate enthusiasts and vanilla lovers. Each scoop provides a harmonious blend, making it a timeless and satisfying choice for those seeking a deliciously familiar dessert.",
  "chocolate_vanilla": "The combination of chocolate and vanilla ice cream offers a classic and complementary contrast of flavors. The velvety richness of chocolate intertwines with the smooth and mellow essence of vanilla, creating a well-balanced and indulgent taste experience that caters to both chocolate enthusiasts and vanilla lovers. Each scoop provides a harmonious blend, making it a timeless and satisfying choice for those seeking a deliciously familiar dessert.",
  "item1_item4": "Preset text for Item 1 and Item 4 combination.",
  // ... Repeat for all combinations ...
  "item7_item8": "Preset text for Item 7 and Item 8 combination."
};

function updateImages() {
  var dropdown1 = document.getElementById("dropdown1");
  var dropdown2 = document.getElementById("dropdown2");
  var leftImage = document.getElementById("leftImage");
  var rightImage = document.getElementById("rightImage");

  var selectedValue1 = dropdown1.value;
  var selectedValue2 = dropdown2.value;

  // Set the src attribute of the leftImage based on the selected value in dropdown1
  leftImage.src = imagePaths[selectedValue1] || "";

  // Set the src attribute of the rightImage based on the selected value in dropdown2
  rightImage.src = imagePaths[selectedValue2] || "";
}

function updateText() {
  var dropdown1 = document.getElementById("dropdown1");
  var dropdown2 = document.getElementById("dropdown2");
  var resultDiv = document.getElementById("result");

  var selectedValue1 = dropdown1.value;
  var selectedValue2 = dropdown2.value;

  // Concatenate selected values to form a key for the presetTexts object
  var combinationKey = selectedValue1 + "_" + selectedValue2;

  // Check if the combination key exists in the presetTexts object
  if (presetTexts.hasOwnProperty(combinationKey)) {
    // Display the corresponding preset text
    resultDiv.innerHTML = presetTexts[combinationKey];
  } else {
    resultDiv.innerHTML = "No specific combination selected.";
  }
}