// TAB NAV

let tabButtons = document.querySelectorAll(".tabContainer .buttonContainer button");
let tabPanels = document.querySelectorAll(".tabContainer .tabPanel");

function showPanel(panelIndex) {
    // change button style when clicked
    tabButtons.forEach(function (node) {
        node.style.backgroundColor = "rgba(0, 0, 0, 0.13)";
        node.style.color = "rgba(17, 17, 17, 0.8)";
    });
    tabButtons[panelIndex].style.backgroundColor = "rgba(17, 17, 17, 0.5)";
    tabButtons[panelIndex].style.color = "white";

    // show relevant tab panel
    tabPanels.forEach(function (node) {
        node.style.display = "none";
    });
    tabPanels[panelIndex].style.display = "block";
}

function loadJSON(filepath, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', filepath, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function makeAchievementItem(item) {
    let place = "<span title=\"Placement\">" + "<i class=\"fa fa-trophy\" aria-hidden=\"true\"></i>" + item.place + "</span>"
    let date = "<span title=\"Date\">" + "<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>" + item.date + "</span>"
    let organizer = "<span title=\"Organizer\">" + "<i class=\"fa fa-globe\" aria-hidden=\"true\"></i>" + item.organizer + "</span>"
    let name = "<h3>" + item.name + place + date + organizer + "</h3>"
    let detail = "<div class=\"overlay\">" + item.detail + "</div>"
    let img = "<a href=\"" + item.img + "\">" +
        "<div class=\"item-img\" >" +
        "<img class=\"image\" src=\"" + item.img + "\">" +
        detail +
        "</div ></a>"
    let section = "<section class=\"item\">" + name + img + "</section>"
    return section;
}
function makeEducationItem(item) {
    let date = "<span title=\"Date\">" + "<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>" + item.date + "</span>"
    let name = "<h3>" + item.institute + date + "</h3>"
    let programs = "";
    for (let i = 0; i < item.programs.length; i++) {
        const program = item.programs[i];
        let grade = "<span class=\"item-li-span\">" + item.grades[i] + "</span>";
        let detail = "<div class=\"item-li-detail\">" + item.details[i] + "</div>";
        let program_li = "<li>" + program + grade + detail + "</li>";
        programs += program_li;
    }
    let programs_div = "<div class=\"item-detail\"><ul>" + programs + "</ul></div>";
    let section = "<section class=\"item item-education\">" + name + programs_div + "</section>";
    return section;
}

function displaySection(items, element) {
    let sec = ""
    for (let i = 0; i < items.length; i++) {
        switch (element) {
            case "achievements":
                sec += makeAchievementItem(items[i]);
                break;
            case "education":
                sec += makeEducationItem(items[i]);
                break;
        }
    }
    document.getElementById(element).innerHTML = sec;
}




// show first panel when page loads
showPanel(0);

loadJSON('data/achievements.json', function (response) {
    // Parse JSON string into object
    var items = JSON.parse(response);
    displaySection(items, "achievements")
});

loadJSON('data/education.json', function (response) {
    // Parse JSON string into object
    var items = JSON.parse(response);
    displaySection(items, "education")
});