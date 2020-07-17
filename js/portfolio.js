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

function makeItem(item) {
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

function displaySection(items) {
    let sec = ""
    for (let i = 0; i < items.length; i++) {
        sec += makeItem(items[i]);
    }
    document.getElementById('achievements').innerHTML = sec;
}

loadJSON('data/achievements.json', function (response) {
    // Parse JSON string into object
    var achievements = JSON.parse(response);
    displaySection(achievements)


});

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

// show first panel when page loads
showPanel(0);