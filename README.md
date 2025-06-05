# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Идентификатор развертывания
AKfycbxCNA7ZqibWnG9VI9G-Wsq0jV-ecrfcDHh8caVXZK4aZygrjXxUgcY50Pi0h8Ixhw0Eww

function doPost(e) {
const sheetUrl = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1-QtyAmrsCnmj-D7J0AfWPrrvD2bfl0AK-hs_Dh6Jo4I/edit?gid=0#gid=0')

const sheet = sheetUrl.getSheetByName('Users')

let data = e.parameter
sheet.appendRow([data.name, data.age, data.weight, data.height, data.goal, data.email])

return ContentService.createTextOutput('Added...')
}

// Утилита для добавления CORS-заголовков
function withCORS(output) {
output.setMimeType(ContentService.MimeType.JSON);
output.setHeader("Access-Control-Allow-Origin", "\*");
output.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
output.setHeader("Access-Control-Allow-Headers", "Content-Type");
return output;
}

function doPost(e) {
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
let data;

try {
data = JSON.parse(e.postData.contents);
} catch (err) {
return withCORS(ContentService.createTextOutput('Invalid JSON'));
}

sheet.appendRow([
new Date(),
data.name || '',
data.age || '',
data.weight || '',
data.height || '',
data.goal || '',
data.email || '',
data.calories || '',
data.steps || '',
data.sleep || '',
data.mood || ''
]);

return withCORS(ContentService.createTextOutput(JSON.stringify({ status: 'success' })));
}

function doOptions(e) {
return withCORS(ContentService.createTextOutput(''));
}

function doOptions(e) {
return withCORS(ContentService.createTextOutput(''));
}

function doGet(e) {
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const data = sheet.getDataRange().getValues();

const rows = data.slice(1).map(row => ({
name: row[1], // имя
email: row[6], // email (7-я колонка)
}));

return ContentService.createTextOutput(JSON.stringify(rows))
.setMimeType(ContentService.MimeType.TEXT);
}
