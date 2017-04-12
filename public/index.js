var countriesObject;
var country;

var app = function(){

  var url = "https://restcountries.eu/rest/v2";
  var button = document.querySelector("button");
  var select = document.querySelector("#countries");
  var selectElement = document.querySelector("#countries");


  selectElement.addEventListener( "change" , function () {
    var index = this.selectedIndex;
    console.log(index);

    country = countriesObject[index]
    console.log(country)
    populateList(country)
  })
  makeRequest( url , requestComplete );
}

var requestComplete = function () {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateDropDown(countries);
  countriesObject = countries
}

var populateDropDown = function ( countries ) {

  var select = document.querySelector("#countries");

  countries.forEach(function ( country ) {
    var option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  })
}


var populateList = function (country) {

    var ul = document.querySelector("#details");
    

    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    var flag = document.createElement("img");

    li1.innerText = "Name: " +country.name;
    li2.innerText = "Population: " +country.population;
    li3.innerText = "Capital: " + country.capital;
    flag.width = 100;
    flag.src = country.flag;

    while(ul.hasChildNodes()){
      ul.removeChild(ul.firstChild)
    }

    ul.appendChild(flag);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
  }


var makeRequest = function ( url , callback ) {
  var request = new XMLHttpRequest();
  request.open( "GET" , url );
  request.onload = callback;
  request.send();
  console.log("this is running");
}

window.onload = app;
