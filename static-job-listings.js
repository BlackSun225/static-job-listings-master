const dev = document.getElementsByClassName("dev");
const filterDiv = document.getElementById("filter");
const filterList = document.querySelector("#filter > div");
const keywordBtn = document.querySelectorAll(".keywords button");
var filterKeywordChecker = false; //check is the filter don't already contain a value
const filterKeyword = document.getElementsByClassName("filterKeyword");
const closeElem = document.getElementsByClassName("close");
var removed = false; //check if one filterKeyword has been removed
const filterbtn = document.querySelector("#filter > button");


window.addEventListener("resize", function() {
  Array.from(dev).forEach(elem => {
    if(window.innerWidth >= 768) {
      if(elem.style.display == "block") {
        elem.style.display = "flex";
      }
      
    }else {
      if(elem.style.display == "flex") {
        elem.style.display = "block";
      }
    }  
  })
  
})

function refilter() {
  if(removed) {//if one filterKeyword has been removed adjust the filter
    Array.from(dev).forEach(elem => {
      if(window.innerWidth >= 768) {//cancel the filter
        elem.style.display = "flex";
      }else {
        elem.style.display = "block";
      }
       
    });
    Array.from(closeElem).forEach(elem => {
      let a = elem.previousElementSibling.innerText.toLowerCase();
      keywordBtn.forEach(kwb => {
        if(kwb.innerText.toLowerCase() === a) {
          kwb.click(); //filter again for each filterKeyword
        }
      });
    });
  }
};

keywordBtn.forEach(elem => { 
  elem.addEventListener("click", function(event) {
    if(filterDiv.style.display != "flex") { //if filter isn't displayed display it
      filterDiv.style.display = "flex";
    }

    if(filterList.children.length < 1) {
      filterKeywordChecker = true; //if the filter div don't contain element, we can add any new element
    }else{
      //if the filter contain one or more elements we must check we don't add the same element again
      filterKeywordChecker = Array.from(filterKeyword).every(a => {
        return a.classList[1] !== event.target.innerText.toLowerCase();
      });
    }

    if(filterKeywordChecker) {//add new element to the filter div if filterKeywordChecker is true
      //creata a new div with a class attribute egal to filterKeyword and text content of the clicked button
      let nelem = document.createElement("div");
      nelem.setAttribute("class", `filterKeyword ${event.target.innerText.toLowerCase()}`);
      //create a span that contains the content of the clicked button 
      let spanOne = document.createElement("span");
      let spanOneText = document.createTextNode(event.target.innerText);
      spanOne.appendChild(spanOneText);
      //create a span that contains an img (icon-remove)
      let spanTwo = document.createElement("span");
      spanTwo.setAttribute("class", "close");
      let spanTwoContent = document.createElement("img");
      spanTwoContent.setAttribute("src", "images/icon-remove.svg");
      spanTwo.appendChild(spanTwoContent);
      //add the span elements to the div
      nelem.appendChild(spanOne);
      nelem.appendChild(spanTwo);
      filterList.appendChild(nelem);
      Array.from(closeElem).forEach(elem => {
        elem.addEventListener("click", function() {
          this.parentElement.remove(); //for each click on a filterKeyword img, remove the parent element
          removed = true;
          refilter(); 
        });
      });
    }
    //the first class of the event target
    let dataProp = event.target.classList[0]; 
    //a regexp to check if the .dev element has a data-(event.target.innerText) attribute
    let valueRegex = new RegExp(event.target.innerText.toLowerCase());
    Array.from(dev).forEach(x => {
      //if dev data-... don't contains the innertext of the button, hide the element
      if(!valueRegex.test(x.dataset[dataProp])) {
        x.style.display = "none";
      }
    });
  });
})

filterbtn.addEventListener("click", function() {
  Array.from(closeElem).forEach(elem => {
    elem.click();
  });
  filterDiv.style.display = "none";
});
