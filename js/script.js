(function(){

  let indexArray = [];
  let isInArray = false;

  function readJSON(file, callback) {
    const jsonFile = new XMLHttpRequest();
    jsonFile.overrideMimeType("application/json");
    jsonFile.open("GET", file, true);
    jsonFile.onreadystatechange = function() {
        if (jsonFile.readyState === 4 && jsonFile.status == "200") {
            callback(jsonFile.responseText);
        }
    }
    jsonFile.send(null);
  }

  function makeContainerForOneRune() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('col-lg-4', 'col-sm-12');
    return newDiv;
  }

  function showRune(runeInfo, container) {
    const newImg = document.createElement('img');
    newImg.setAttribute('src', runeInfo);
    container.appendChild(newImg);
  }

  function runeDescription(description, container) {
    const newDesc = document.createElement('p');
    newDesc.innerHTML = description;
    container.appendChild(newDesc);
  }

  function makeArrayOfThreeChoice (array) {
    let d = 3;
    for (let i = 0; d > i; i++) {

      const newIndex = Math.floor(Math.random()*(array.length-1));

      for (let a = 0; indexArray.length > a; a++) {
        if (newIndex === indexArray[a]) {
          isInArray = true;
        }
      }

      if (isInArray === false) {
        indexArray.push(newIndex);
      } else {
        d++;
      }

      isInArray = false;
    }
    d = 3;
  }

  function makeCompleteRune(runeName, description, runeInfo, container) {
    const makeContainer = makeContainerForOneRune();
    showRune(runeInfo, makeContainer);
    runeDescription(runeName, makeContainer);
    runeDescription(description, makeContainer);
    container.appendChild(makeContainer);
  }

  document.querySelector('.three-runes').addEventListener('click', function() {
    readJSON("./json/rune.json", function(text){
        const runeMainContainer = document.querySelector('.show-runes');
        runeMainContainer.innerHTML = "";
        const data = JSON.parse(text);
        makeArrayOfThreeChoice(data.runeType);
        for (let g = 0; indexArray.length > g; g++) {
          makeCompleteRune(data.runeType[indexArray[g]].runeName, data.runeType[indexArray[g]].runeDescription, data.runeType[indexArray[g]].runeLink, runeMainContainer);
        }
        indexArray = [];
    });
  })



 }());
