//[START] Створення кастомного меню
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Перевірка')
    .addItem('Старт', 'start')
    .addSeparator()
    .addItem('Очистити', 'clearSheetData')
    .addToUi();
}
//[END] Створення кастомного меню

//[START] Очистка аркуша
function clearSheetData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var range = sheet.getRange(1, 4, 100, 100); 
  range.clearContent();  
}
//[END] Очистка аркуша

var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
var sheet = spreadsheet.getActiveSheet();
var sheets = spreadsheet.getSheets();
// Отримуємо індекс активного аркуша
var activeSheetIndex = sheet.getIndex();

// Визначаємо індекс попереднього аркуша
var previousSheetIndex = activeSheetIndex - 1;

// Переконайтеся, що індекс не виходить за межі діапазону аркушів 
if (previousSheetIndex >= 0) {
  var wellDoneSpreadsheet = sheets[previousSheetIndex-1];
  //Logger.log(wellDoneSpreadsheet.getName());
} else {
  // Якщо активний аркуш - перший

}

// 
var folderId = sheet.getRange("c1").getValue(); // ID папки для перевірки
var folder = DriveApp.getFolderById(folderId);

var lesson = sheet.getRange("e1");
var cellValue = sheet.getRange("B1").getValue();
var arrayOfDoneData = cellValue.split(' ');

//[START] Створення заголовку таблиці
function setTitle() {

  lesson.setValue(folder.getName()) //назва уроку

  lesson.offset(1, 0).setValue("Прізвище Ім'я");
  lesson.offset(1, 1).setValue("Назва аркуша");
  arrayOfDoneData.forEach(function (element) {
    lesson.offset(1, arrayOfDoneData.indexOf(element) + 2).setValue(element);// Перемістити до наступного стовпця
  })
  getFoldersList("D1","1e6ttvGCHa-oZ_0V0VZXbd6jB4UgvAnW97wwX4UvEfsEUXp0mpdkH54cDw6jKjW1jAk3N9zd3",'Інформатика')

}
//[END] Створення заголовку таблиці

//[START] Отримання списку папок Classroom
function getFoldersList(cellName, folderId,keyword) {
  var folder = DriveApp.getFolderById(folderId);
  var subfolders = folder.getFolders();
  var folderNamesArray = []; // Масив для збереження назв папок
  var folderIdsArray = []; // Масив для збереження ID папок

  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    folderNamesArray.push(subfolder.getName());
    folderIdsArray.push(subfolder.getId())


    // if (keyword !=""){
    //   if (subfolder.getName().indexOf(keyword) !== -1) {

    //   modifiedFolderName = subfolder.getName().replace(keyword, "");
    //   //Logger.log("Subfolder Name: " + modifiedFolderName)
    //   folderNamesArray.push(modifiedFolderName);
    //   folderIdsArray.push(subfolder.getId());
    // } else {
    //   folderNamesArray.push(subfolder.getName());
    //   folderIdsArray.push(subfolder.getId())
    // }
    // }
    
  }
  Logger.log(folderNamesArray)
  Logger.log(folderIdsArray)

  // Виводимо масив назв папок в клітинку як випадаючий список
  var cell = sheet.getRange(cellName);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(folderNamesArray, true)
    .setAllowInvalid(false)
    .build();
  cell.setDataValidation(rule);

  // Додаємо обробник подій для слідкування за змінами в комірці D1
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("folderNamesArray", folderNamesArray.join());
  scriptProperties.setProperty("folderIdsArray", folderIdsArray.join());

}
//[END] Отримання списку папок Classroom

function onEdit(e) {

  var editedRange = sheet.getRange("D1");

  // Перевіряємо, чи змінюється комірка D1 і чи не порожня

  var scriptProperties = PropertiesService.getScriptProperties();
  var folderNamesArray = scriptProperties.getProperty("folderNamesArray").split(",");

  var folderIdsArray = scriptProperties.getProperty("folderIdsArray").split(",");
  //Logger.log(folderNamesArray)  

  var selectedFolderName = editedRange.getValue();
  var index = folderNamesArray.indexOf(selectedFolderName);

  var selectedFolderId = folderIdsArray[index];
  sheet.getRange("D2").setValue(selectedFolderId);

  getFoldersList("E1",sheet.getRange("D2").getValue(),'')
}



function start() {
  //Очищення таблиці
  clearSheetData() 
  setTitle()
 

  var files = folder.getFiles();

  var cell = lesson.offset(2, 0); // Початковий рядок для виведення імен

  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() === MimeType.GOOGLE_SHEETS) {


      cell.setValue(swapFirstTwoWords(file.getName()));

      //setBlackBordersForRange(cell);

      // //Тест 1


      var test = cell.offset(0, 2);
      arrayOfDoneData.forEach(function (element) {
        // Обробка кожного елементу
        //Logger.log(element);

        test.setValue(checkCellValueAgainstFileID(element, file.getId(), wellDoneSpreadsheet));
        //setBlackBordersForRange(test1);
        test = test.offset(0, 1); // Перемістити до наступного стовпця
        // Ви можете виконувати бажані дії з кожним елементом масиву
      });

      cell = cell.offset(1, 0); // Перемістити до наступного рядка
    }
  }

}




function swapFirstTwoWords(inputString) {
  var words = inputString.split(" ");
  return words[1] + " " + words[0]

}

function setBlackBordersForRange(range) {
  var style = {};
  style.border = true;
  style.borderStyle = "SOLID";
  style.borderWidth = 1;
  style.horizontalAlignment = "LEFT"; // Додатково, якщо потрібно

  range.setBorder(true, true, true, true, true, true, "GREY", SpreadsheetApp.BorderStyle.SOLID_THICK);
  range.setHorizontalAlignment("left"); // Додатково, якщо потрібно
}


function checkCellValueAgainstFileID(cell, fileID, wellDoneSpreadsheet) {

  var testedSheet = SpreadsheetApp.openById(fileID);
  var wellDone = wellDoneSpreadsheet.getRange(cell).getValue();
  var tested = testedSheet.getRange(cell).getValue();
  
  Logger.log(wellDone);
  Logger.log(tested);

  // Logger.log('wellDone-', wellDone);
  //Logger.log('tested-', tested);

  if (wellDone === tested) {
    return "✅";
  } else {
    return "❌";
  }
}




