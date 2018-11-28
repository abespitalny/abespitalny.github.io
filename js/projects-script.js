document.addEventListener("DOMContentLoaded", function(e) {
    "use strict";
    const PROJECTS_URI = "../projects.json";
    
    async function getJson(uri) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", uri, true);
            xhr.responseType = "json";

            xhr.onload = function(e) {
                if (this.status === 200)
                    resolve(this.response);
                else
                    reject(this.response);
            };
            xhr.onerror = err => reject(err);

            xhr.send();
        });
    }
    
    var parseHtml = (function() {
        var template = document.createElement("template");
        
        return function(str) {
            template.innerHTML = str;
            return template.content;
        };
    })();
    
    // get projects from uri
    (async function() {
        var projectsJson = await getJson(PROJECTS_URI), projectsHtml = document.createDocumentFragment();
        var projectHtmlTemplate = parseHtml('<div class="card project"><a class="img-link"><div class="my-screen"></div><img class="project-img" /></a><div class="card-body"><h1 class="card-title"><a class="project-title-link"></a></h1><p class="card-text description"></p></div><div class="card-footer"><div class="progress progress-bar-wrapper"><div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex justify-content-between"><span class="created">Created </span><span class="last-updated">Last updated </span></div></div></div>').firstElementChild;
        
        var len = projectsJson.length, project, title, progressBar, projectHtml;
        for (let i = 0; i < len; i++) {
            projectHtml = projectHtmlTemplate.cloneNode(true);
            project = projectsJson[i];
            projectHtml.getElementsByClassName("img-link")[0].setAttribute("href", project.link);
            title = projectHtml.getElementsByClassName("project-title-link")[0];
            title.textContent = project.title;
            title.setAttribute("href", project.link);
            projectHtml.getElementsByClassName("project-img")[0].setAttribute("src", project.image);
            projectHtml.getElementsByClassName("description")[0].textContent = project.description;
            projectHtml.getElementsByClassName("created")[0].textContent += project.creation_date;
            projectHtml.getElementsByClassName("last-updated")[0].textContent += project.last_updated;
            progressBar = projectHtml.getElementsByClassName("progress-bar")[0];
            progressBar.style.width = project.progress + "%";
            progressBar.setAttribute("aria-valuenow", project.progress);
            // project is completed
            if (project.progress === 100)
                progressBar.style.backgroundColor = "var(--my-green)";
            
            projectsHtml.appendChild(projectHtml);
        }
                        
        document.getElementsByClassName("main-content")[0].appendChild(projectsHtml);
    })();
});