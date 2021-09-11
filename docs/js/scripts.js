let membersURL = "/data/members.json";
let projectsURL = "/data/projects.json";

function getData(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				let text = response.text();
				resolve(text);
			})
	})
}

function getProjects() {
	getData(projectsURL).then(response => {
		let responseObject = JSON.parse(response);
		let projects = responseObject["projects"];
		var nodes = [];
		
		for(var i = 0; i < projects.length; i++) {
			let project = projects[i];
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.href = project["link"];
			a.innerHTML = project["name"];
			li.appendChild(a);
			nodes.push(li);
		}
		
		let list = document.getElementById("projects");
		for(node of nodes) {
			list.appendChild(node);
		}
	});
}

function getMembers() {
	getData(membersURL).then(response => {
		let responseObject = JSON.parse(response);
		let members = responseObject["members"];
		var outputString = "We are ";
		
		for(var i = 0; i < members.length; i++) {
			let member = members[i];
			if(i == members.length-1) {
				outputString+=("and <a href=\""+member["link"]+"\">"+member["name"]+"</a>.");
			} else {
				outputString+=("<a href=\""+member["link"]+"\">"+member["name"]+"</a>, ");
			}
		}
		
		document.getElementById("members").innerHTML = outputString;
	});
}

window.onload = function() {
	getMembers();
	getProjects();
}