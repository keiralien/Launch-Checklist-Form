// Write your JavaScript code here!
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let missionTarget = document.getElementById("missionTarget");
         let x = Math.floor(Math.random()*json.length);
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[x]["name"]}</li>
               <li>Diameter: ${json[x]["diameter"]}</li>
               <li>Star: ${json[x]["star"]}</li>
               <li>Distance from Earth: ${json[x]["distance"]}</li>
               <li>Number of Moons: ${json[x]["moons"]}</li>
            </ol>
            <img src="${json[x]["image"]}">
      `});
   });
   
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel");
   let cargoMass = document.querySelector("input[name=cargoMass]");

   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");

   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");

   form.addEventListener("submit", function() {
      if (pilotName.value === ""
         || !isNaN(pilotName.value)
         || copilotName.value === ""
         || !isNaN(copilotName.value)
         || fuelLevel.value === ""
         // || isNaN(fuelLevel.value)
         || cargoMass.value === ""
         // || isNaN(cargoMass.value)
         ) {
         alert(`All fields are required. -  Pilot Name and Co-Pilot Name and must be text. -  Fuel Level and Cargo Mass must be numbers.`);
         event.preventDefault();
      } else {
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`;
         
         if (fuelLevel.value < 10000) {
            faultyItems.style.visibility = "visible";
            fuelStatus.innerHTML = `Not enough fuel for the journey.`;
            launchStatus.innerHTML = `Shuttle Not Ready For Launch.`;
            launchStatus.style.color = "red";
            if(cargoMass.value > 10000) {
               cargoStatus.innerHTML = `Too much mass for the shuttle to take off.`;
            } else {
               cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
            }
            event.preventDefault();
         } else if (cargoMass.value > 10000) {
            faultyItems.style.visibility = "visible";
            cargoStatus.innerHTML = `Too much mass for the shuttle to take off.`;
            launchStatus.innerHTML = `Shuttle Not Ready For Launch.`;
            launchStatus.style.color = "red";
            if(fuelLevel.value >= 10000) {
               fuelStatus.innerHTML = `Fuel level high enough for launch.`;
            }
            event.preventDefault();
         } else {
            launchStatus.innerHTML = `Shuttle is ready for launch`;
            launchStatus.style.color = "green";
            fuelStatus.innerHTML = `Fuel level high enough for launch.`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
            event.preventDefault();
         }
      }
   });
});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
