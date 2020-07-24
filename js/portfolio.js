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

// ABOUT TAB PAGE
function makeAboutItem(item) {
    let name = "<h3>" + item.name + "<span class=\"title-span\">" + item.title + "</span>" + "</h3>";
    let contact_div = "<div class=\"contact\"> <ul>" +
        "<li>" + "<i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>" + "<a href=\"https://maps.google.com/?q=6.670752866299279, 79.92809486119278\" target=\"_blank\">" + item.address + "</a></li>" +
        "<li>" + "<i class=\"fa fa-phone\" aria-hidden=\"true\"></i>" + "<a href=\"tel:94778396415\">" + item.phone + "</a></li>" +
        "<li>" + "<i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>" + "<a href=\"mailto:chamantha97anju@gmail.com\" target=\"_blank\">" + item.email + "</a></li>" +
        "<li>" + "<i class=\"fa fa-linkedin\" aria-hidden=\"true\"></i>" + "<a href=\"https://www.linkedin.com/in/anjuchamantha/\" target=\"_blank\">" + item.linkedin + "</a></li>" +
        "<li>" + "<i class=\"fa fa-github\" aria-hidden=\"true\"></i>" + "<a href=\"https://github.com/anjuchamantha\" target=\"_blank\">" + item.github + "</a></li>" +
        "</ul> </div>";
    let profile_content = "<div class=\"profile-content\">" + name + contact_div + "</div>";
    let profile_pic = "<div class=\"profile-pic-container\"><img class=\"profile-pic\" src=\"" + item.profile_pic + "\">" + "</div>";

    let about = "<div class=\"about\">" + profile_pic + profile_content + "</div>";
    let section = "<section class=\"item item-about\" id=\"about\">" + about + "</section>";
    return section;
}

function makeTechnicalItem(item) {
    let languages = item.technical.languages;
    let web = item.technical.web;
    let database = item.technical.database;
    let robotics = item.technical.robotics;
    let technical_list = [languages, web, database, robotics];
    let technical_fields = item.technical_fields;
    let tech_content = "";
    for (let j = 0; j < technical_list.length; j++) {
        let tech_field = technical_list[j];
        console.log(tech_field);
        let name = "<h3>" + technical_fields[j] + "</h3>";
        let tech_item_li_list = "";

        for (let i = 0; i < tech_field.length; i++) {
            const tech = tech_field[i].tech;
            const level = tech_field[i].level;
            const img_path = tech_field[i].img;
            let progress = "<div class=\"progress-container\"><div class=\"progress-inside \" style=\"width:" + level + "%\"></div></div><br>";
            let tech_progress = "<div class=\"tech-progress\">" + tech + progress + "</div";
            let detail = "<div class=\"overlay\">" + tech_progress + "</div>";
            let img = "<img src=\"" + img_path + "\">";
            let tech_item = "<li><div class=\"tech-logo-div\">" + img + detail + "</div></li>";
            tech_item_li_list += tech_item;
        }
        let tech_item_ul = "<div class=\"technical-item\">" + name + "<ul>" + tech_item_li_list + "</ul></div>";
        tech_content += tech_item_ul;

    }
    let section_name = "<h2 class=\"about\">" + "Technical Skills" + "</h2>";
    let section = "<section class=\"item item-technical\" id=\"tech-skills\">" + section_name + tech_content + "</section>";
    return section;
}

// EDUCATION TAB PAGE
function makeEducationItem(item) {
    let date = "<span title=\"Date\">" + "<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>" + item.date + "</span>"
    let name = "<h3>" + item.institute + date + "</h3>"
    let programs = "";
    for (let i = 0; i < item.programs.length; i++) {
        const program = item.programs[i];
        let grade = "<span class=\"item-li-span\">" + item.grades[i] + "</span>";
        let detail = "<div class=\"item-li-detail\">" + item.details[i] + "</div>";
        let program_li = "<li>" + "<a target=\"_blank\" href=\"" + item.certificates[i] + "\">" + program + "</a>" + grade + detail + "</li>";
        programs += program_li;
    }
    let programs_div = "<div class=\"item-detail\"><ul>" + programs + "</ul></div>";
    let section = "<section class=\"item item-education\" id=\"education\">" + name + programs_div + "</section>";
    return section;
}

function makeAchievementItem(item) {
    let place = "<span title=\"Placement\">" + "<i class=\"fa fa-trophy\" aria-hidden=\"true\"></i>" + item.place + "</span>"
    let date = "<span title=\"Date\">" + "<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>" + item.date + "</span>"
    let organizer = "<span title=\"Organizer\">" + "<i class=\"fa fa-globe\" aria-hidden=\"true\"></i>" + item.organizer + "</span>"


    let detail;
    let img;
    let name;
    if (item.img == "") {
        name = "<h3 class=\"no-border-bottom\">" + item.name + place + date + organizer + "</h3>"
        if (item.detail == "") {
            detail = "";
            img = "<div class=\"item-img no-img no-overlay\" >" + detail; +"</div>";
        }
        else {
            detail = "<div class=\"overlay\">" + item.detail + "</div>";
            img = "<div class=\"item-img no-img\" >" + detail; +"</div>";
        }

    }
    else {
        name = "<h3>" + item.name + place + date + organizer + "</h3>"
        let detail = "<div class=\"overlay\">" + item.detail + "</div>";
        img = "<a href=\"" + item.img + "\">" +
            "<div class=\"item-img\" >" +
            "<img class=\"image\" src=\"" + item.img + "\">" +
            detail +
            "</div ></a>"
    }
    let section = "<section class=\"item\" id=\"achievements\">" + name + img + "</section>"
    return section;
}

//PROJECTS TAB PAGE
function makeProjectItem(item) {
    let place = "<span title=\"Type\">" + "<i class=\"fa fa-laptop\" aria-hidden=\"true\"></i>" + item.type + "</span>"
    let date = "<span title=\"Date\">" + "<i class=\"fa fa-calendar\" aria-hidden=\"true\"></i>" + item.date + "</span>"
    let name = "<h3>" + item.name + place + date + "</h3>";
    let url;
    let git;
    if (item.url == "") {
        url = "";
    }
    else {
        url = "<a class=\"url\" href=\"" + item.url + "\"><i class=\"fa fa-link\" aria-hidden=\"true\"></i>" + "Project URL" + "</a>";
    }
    if (item.git == "") {
        git = "";
    }
    else {
        git = "<a class=\"url\" href=\"" + item.git + "\"><i class=\"fa fa-github\" aria-hidden=\"true\"></i>" + "Github Repository" + "</a>";
    }
    let links = "<div class=\"links-div\">" + url + git + "</div>"

    let tech_pills_str = "";
    for (let i = 0; i < item.tech.length; i++) {
        const tech_name = item.tech[i].name;
        const tech_img = item.tech[i].img;
        let tech_item = "<div class=\"tech-pill\"><img src=\"" + tech_img + "\"></img><div>" + tech_name + "</div></div>";
        tech_pills_str += tech_item;
    }
    let tech_pills = "<div class=\"tech-pills-container\">" + tech_pills_str + "</div>";

    let team_str = "";
    for (let i = 0; i < item.team.length; i++) {
        const member = item.team[i];
        let member_img = "<div title=\"" + member.name + "\" class=\"team-member-div\"><img class=\"team-member\" src=\"" + member.img + "\">" + "</div>";
        team_str += member_img;
    }
    let team = "<div class=\"team-container\">" + team_str + "</div>";

    let detail = "<div class=\"overlay\">" + item.detail + "</div>";
    let img;
    if (item.img == "") {
        img = "<div class=\"item-img no-img\" >" + detail; +"</div>";
    }
    else {
        img = "<a href=\"" + item.img + "\">" +
            "<div class=\"item-img\" >" +
            "<img class=\"image\" src=\"" + item.img + "\">" +
            detail +
            "</div ></a>"
    }
    let team_links_div = "<div class=\"team-links-div\">" + links + team + "</div>"

    let section = "<section class=\"item\" id=\"projects\">" + name + tech_pills + team_links_div + img + "</section>"
    return section;
}

function displaySection(items, element) {
    let sec = "";
    if (element == "about") {
        sec += makeAboutItem(items);
        sec += makeTechnicalItem(items);
    }
    else {
        for (let i = 0; i < items.length; i++) {
            switch (element) {
                case "achievements":
                    sec += makeAchievementItem(items[i]);
                    break;
                case "education":
                    sec += makeEducationItem(items[i]);
                    break;
                case "projects":
                    sec += makeProjectItem(items[i]);
                    break;
            }
        }
    }
    document.getElementById(element).innerHTML = sec;
}

// show first panel when page loads
showPanel(0);
loadJSON('data/about.json', function (response) {
    // Parse JSON string into object
    var items = JSON.parse(response);
    displaySection(items, "about")
});

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

loadJSON('data/projects.json', function (response) {
    // Parse JSON string into object
    var items = JSON.parse(response);
    displaySection(items, "projects")
});