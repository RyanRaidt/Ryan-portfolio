console.log("Hello World");

document.getElementById("form").addEventListener("submit", function(event) {
  event.preventDefault(); 
  window.location.href = "success.html"; 
});