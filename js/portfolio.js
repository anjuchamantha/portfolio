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
    let img = "<a href=\"" + item.img + "\">" +
        "<div class=\"item-img\" >" +
        "<img src=\"" + item.img + "\">" +
        "</div ></a>"
    let section = "<section class=\"item\">" + name + img + "</section>"
    return section;
}

function displaySection(items) {
    let sec = ""
    for (let i = 0; i < items.length; i++) {
        sec += makeItem(items[i]);
    }
    document.getElementById('content').innerHTML = sec;
}

loadJSON('data/achievements.json', function (response) {
    // Parse JSON string into object
    var achievements = JSON.parse(response);
    displaySection(achievements)


});


