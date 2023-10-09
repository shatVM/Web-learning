let flag = 1; //Перемикач для додавання кнопок 0 або 1
let pauseTime = 2000;

console.clear();

//Додаємо кнопки в журнал оцінок в Classroom
setTimeout(function () {
  console.clear();
  if (flag === 1) {
    addCreateButton();
} else {
    addClassroomButton();
}
}, pauseTime);

function addCreateButton() {
  var spanElement = document.getElementById("UGb2Qe");  
  var buttonElement = document.createElement("button");  
  buttonElement.textContent = "Add buttons";  
  buttonElement.addEventListener("click", function () {
    addClassroomButton();
    
  });
  spanElement.appendChild(buttonElement);


  if (spanElement) {
   
  } else {
    console.error("The <span> element with ID 'UGb2Qe' was not found.");
  }
}

function addClassroomButton() {
 
  var elements = document.querySelectorAll(".RUkyfb ");
  
  elements.forEach(function (element) {
    
    var button = document.createElement("button");
    button.textContent = Array.from(elements).indexOf(element) + 1;
    showModal("Button created");
  
    button.addEventListener("click", function () {

      let oznum = parseInt(this.textContent),
        table = document.getElementsByTagName("table"),
        tbody = table[0];
      const rows = tbody.children[1].children;
      let sdata = {},
        ozinki = "",
        tds = rows;
      for (let t = 0; t < tds.length; t++) {
        if (void 0 !== rows[t]) {
          let o = rows[t].children,
            i = o[0].innerText;
          i = i.split(" ", 2)[1] + " " + i.split(" ", 2)[0];
          (ozinki = ozinki + i + ": "), (sdata[i] = []);
          for (let n = 1; n < o.length - 1; n++) {
            let t = o[n].innerText.split("\n");
            1 < t.length &&
              ((t = t[1].split("/")), oznum == n) &&
              (0 < parseInt(t[0])
                ? ((ozinki = ozinki + t[0] + ", "), sdata[i].push(t[0]))
                : ((ozinki = ozinki + 0 + ", "), sdata[i].push(0)));
          }
          sdata[i];
        }
        ozinki = "";
      }
      navigator.clipboard.writeText(JSON.stringify(sdata)).then(
        function () {
          showModal("Оцінки скопійовано");
          console.log(
            "Успішно скопійовано у буфер обміну: " + JSON.stringify(sdata)
          );
        },
        function () {
          showModal("Не вдалося скопіювати текст у буфер обміну");
          console.error("Не вдалося скопіювати текст у буфер обміну");
        }
      );
    });
    element.append(button);
  });
}

function showModal(text) {
  var overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "10px";
  overlay.style.left = "10px";
  overlay.style.width = "250px";
  overlay.style.height = "100px";
  overlay.style.backgroundColor = "rgba(0, 155, 20, 0.7)";
  overlay.style.textAlign = "center";
  overlay.style.paddingTop = "70px";
  overlay.style.borderRadius = "10px";
  overlay.style.zIndex = "9999";
  overlay.style.display = "none";
  var messageText = document.createElement("p");
  messageText.textContent = text;
  messageText.style.fontWeight = "bold";
  messageText.style.fontSize = "20px";
  messageText.style.color = "white";
  overlay.appendChild(messageText);
  document.body.appendChild(overlay);
  overlay.style.display = "block";
  setTimeout(function () {
    overlay.style.display = "none";
  }, 1500);
}
