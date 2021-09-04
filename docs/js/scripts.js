function setMembersList(membersString) {
	document.getElementById("members").innerHTML = membersString;
}

function setProjectsList(nodes) {
	var list = document.getElementById("projects");
	for(node of nodes) {
		list.appendChild(node);
	}
}

function getProjectsFromData() {
	let req = new XMLHttpRequest();
	req.open("GET", "/data/projects.json", true);
	req.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var responseObject = JSON.parse(this.response);
			var projects = responseObject["projects"];
			var nodes = [];
			
			for(var i = 0; i < projects.length; i++) {
				var project = projects[i];
				var node = document.createElement("li");
				node.innerHTML = ("<a href=\""+project["link"]+"\">"+project["name"]+"</a>")
				nodes.push(node);
			}
			setProjectsList(nodes);
		}
	}
	req.send();
}

function getMembersFromData() {
	let req = new XMLHttpRequest();
	req.open("GET", "/data/members.json", true);
	req.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			var responseObject = JSON.parse(this.response);
			var members = responseObject["members"]
			var outputString = "We are "	
			
			for(var i = 0; i < members.length; i++) {
				var member = members[i];
				if(i == members.length-1) {
					outputString+=("and <a href=\""+member["link"]+"\">"+member["name"]+"</a>.");
				} else {
					outputString+=("<a href=\""+member["link"]+"\">"+member["name"]+"</a>, ");
				}
			}
			setMembersList(outputString);
		}
	}
	req.send();
}

function pageLoaded() {
	getMembersFromData();
	getProjectsFromData();
}