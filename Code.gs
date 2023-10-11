// https://www.youtube.com/watch?v=DHYOk4aAgJE
const favicon = "https://cdn-icons-png.flaticon.com/512/3426/3426748.png";
const backgroundImage = "https://source.unsplash.com/random/?dark,education";

const url = ScriptApp.getService().getUrl();
let ss = SpreadsheetApp.getActiveSpreadsheet();
let ws = ss.getSheetByName("Data");
let originalData = ws.getDataRange().getDisplayValues();

function doGet (e) {
  console.log("Welcome to Google Apps Scripts ... Multi-Uploader Demo");

  if (e.queryString.length == 0) {
    var htmlPage = HtmlService.createTemplateFromFile('form');
    htmlPage.url = url;
    return htmlPage.evaluate().
      setFaviconUrl(favicon).
      setTitle("Welcome to MoRA & IH - Online Recruitment System").      
      setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } // end of if
  else if (e.parameter.vu == "viewData") {
    var htmlPage = HtmlService.createTemplateFromFile('viewData');
    htmlPage.tableData = originalData.slice(1);
    return htmlPage.evaluate().
      setFaviconUrl(favicon).
      setTitle("Display Images from Google Drive").
      setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } // end of else if

} // end of doGet ()
// -------------------------------------------- //
// let link = newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW).getDownloadUrl();
function addData(formData) {
  try {
    let uploadingFolder = DriveApp.getFolderById("GOOGLE_FOLDER_ID_COMES_HERE");
    let attachment_a = uploadingFolder.createFile(formData.attachment_a).setName(formData.cnic + "_a.jpg").setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    //console.log("attachment_a = " + attachment_a.getId());    
    let attachment_b = uploadingFolder.createFile(formData.attachment_b).setName(formData.cnic + "_b.jpg").setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    let attachment_c = uploadingFolder.createFile(formData.attachment_c).setName(formData.cnic + "_c.jpg").setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    ws.appendRow([
      formData.name,
      formData.cnic,
      //attachment_a.getUrl(),
      //attachment_b.getUrl(),
      //attachment_c.getUrl(),
      "https://drive.google.com/uc?export=view&id="+attachment_a.getId(),
      "https://drive.google.com/uc?export=view&id="+attachment_b.getId(),
      "https://drive.google.com/uc?export=view&id="+attachment_c.getId()
    ]); return true;
  } // end of try
  catch { console.log("Something is Fishy ... Unable to Save Data into System!"); return false; } // end of catch
} // end of addData()
// -------------------------------------------- //
function isRegistered(cnic) {
  var filteredData = originalData.filter(function (item) { return item[1] == cnic; });
  return filteredData.length > 0 ? true : false;
} // end of verifyCandidate()
