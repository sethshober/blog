var postTitle = document.getElementById('postInput');
var postContent = document.getElementById('postTextArea');
var postButton = document.getElementById('addPostDisabled');
var postList = document.getElementById('postList');
var saving = false;

postContent.focus();

function isContent (content) {
	if ( content != "" ) { return true; }
	else { return false; }
}

function addPost () {

	if ( isContent(postContent.value) ) {

		var article = document.createElement('article');
		article.classList.add("post");
		var title = document.createElement('h2');
		title.classList.add("postTitle");
		var content = document.createElement('p');
		content.classList.add("postContent");

		title.innerHTML = postTitle.value;
		content.innerHTML = postContent.value;

		article.appendChild(title);
		article.appendChild(content);

		postList.insertBefore(article, postList.firstChild);

		postTitle.value = "";
		postContent.value = "";
		postButton.id = "addPostDisabled";

		removeItemFromLocalStorage('savedPost');

	}

}


function saveCheck () {
	if ( ! saving && postContent.value != "" ) {
		save();
		saving = true;
	}
}


function buttonEnable () {
	
	if ( postContent.value != "" ) { postButton.id = "addPostActive"; }

	else { postButton.id = "addPostDisabled"; }

	saveCheck();

}


function save () {

	var title = postTitle.value;
	var content = postContent.value;
	var savedPost = { "title": title, "content": content };

	saving = setInterval( saveItemToLocalStorage, 5000, savedPost, 'savedPost' );

}


function stopSave () {
	clearInterval(saving);
	saving = false;
}


postButton.addEventListener('click', addPost, false);
postContent.addEventListener('input', buttonEnable, false);
postContent.addEventListener('blur', stopSave, false);






function saveItemToLocalStorage (item, keyname) {
    
    localStorage.setItem( keyname, JSON.stringify(item) ); //create new key values and store in localStorage. convert object to string.
    console.log("saved");

}

function getItemFromLocalStorage (keyname) {

        var key,
            keystring;

        if ( localStorage.getItem(keyname) ) {  //if note exists in localStorage get it and parse from string to object.

            keyString = localStorage.getItem(keyname);
            key = JSON.parse(keyString);

        }
        return key;
    }

function removeItemFromLocalStorage (keyname) {
    localStorage.removeItem(keyname);
    console.log("removed");
}



function init () {
	if ( getItemFromLocalStorage('savedPost') ) {
		savedPost = getItemFromLocalStorage('savedPost');
		postTitle.value = savedPost.title;
		postContent.value = savedPost.content;
	}

	buttonEnable();
}


init();
















