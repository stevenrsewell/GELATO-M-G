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