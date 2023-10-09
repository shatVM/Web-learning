
let flag = 1; //Перемикач для додавання кнопок 0 або 1
let pauseTime = 3000;

console.clear();

var elements = document.querySelectorAll(".xHPsid ");
var button = document.createElement("button");
button.textContent = "Add";
button.addEventListener("click", function () {
    addClassroomButton();
})
element.append(button);

//Додаємо кнопки в журнал оцінок в Classroom
// setTimeout(function () {
//   console.clear();
//   if (flag == 1) addClassroomButton();
// }, pauseTime);

function addClassroomButton() {
  // Знайти всі елементи з класом .RUkyfb
  var elements = document.querySelectorAll(".RUkyfb ");
  // Пройтися по кожному елементу та додати кнопку
  elements.forEach(function (element) {
    // Створити кнопку
    var button = document.createElement("button");
    button.textContent = Array.from(elements).indexOf(element) + 1;
    console.log("Button created");
    // Додати обробник події для кнопки
    button.addEventListener("click", function () {
      // Обробник події
      //console.clear();
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
