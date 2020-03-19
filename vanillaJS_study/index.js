const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked"
function hasClass(){
	/*if(title.classList.contains(CLICKED_CLASS)){
		title.classList.remove(CLICKED_CLASS);
	}
	else{
		title.classList.add(CLICKED_CLASS);
	}*/
	title.classList.toggle(CLICKED_CLASS);
}

function init(){
	title.addEventListener("click", hasClass);
}


init();