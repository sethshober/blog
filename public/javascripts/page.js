// PAGE VARIABLES

var postTitle = document.getElementById('postInput');
var postContent = document.getElementById('postTextArea');
var postButton = document.getElementById('addPostDisabled');
var postList = document.getElementById('postList');
var saving = false;



// FUNCTIONS


// ADD POST TO PAGE. HANDLES STYLING AND RESETTING INPUTS, AS WELL AS REMOVING A SAVED POST FROM LOCAL STORAGE
function addPost () {

	if ( postContent.value != "" ) {

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


// CHECK IS SAVING ALREADY AND THAT THERE IS A POST CONTENT VALUE. RUN SAVE.
function saveCheck () {
	if ( ! saving && postContent.value != "" ) {
		save();
		saving = true;
	}
}


// CHECK FOR POST CONTENT AND ADJUST BUTTON DISABLING ACCORDINGLY. RUN SAVE CHECK, WHICH CALLS SAVE.
function buttonEnable () {
	
	if ( postContent.value != "" ) { postButton.id = "addPostActive"; }

	else { postButton.id = "addPostDisabled"; }

	saveCheck();

}


// SAVE POST EVERY FIVE SECONDS
function save () {

	var title = postTitle.value;
	var content = postContent.value;
	var savedPost = { "title": title, "content": content };

	saving = setInterval( saveItemToLocalStorage, 5000, savedPost, 'savedPost' );

}


// STOP SAVING
function stopSave () {
	clearInterval(saving);
	saving = false;
}


// SAVE ITEM TO LOCAL STORAGE
function saveItemToLocalStorage (item, keyname) {
    
    localStorage.setItem( keyname, JSON.stringify(item) ); //create new key values and store in localStorage. convert object to string.
    console.log("saved");

}


// GET ITEM FROM LOCAL STORAGE
function getItemFromLocalStorage (keyname) {

        var key,
            keystring;

        if ( localStorage.getItem(keyname) ) {  //if note exists in localStorage get it and parse from string to object.

            keyString = localStorage.getItem(keyname);
            key = JSON.parse(keyString);

        }
        return key;
    }


// DELETE ITEM FROM LOCAL STORAGE
function removeItemFromLocalStorage (keyname) {
    localStorage.removeItem(keyname);
    console.log("removed");
}


// SET FOCUS. GET POST FROM LOCALSTORAGE. RUN BUTTON ENABLE WHICH CALLS SAVE CHECK, WHICH CALLS SAVE.
function init () {
	postContent.focus();
	if ( getItemFromLocalStorage('savedPost') ) {
		savedPost = getItemFromLocalStorage('savedPost');
		postTitle.value = savedPost.title;
		postContent.value = savedPost.content;
	}

	buttonEnable();
}


// EVENT LISTENERS

postButton.addEventListener('click', addPost, false);
postContent.addEventListener('input', buttonEnable, false);
postContent.addEventListener('blur', stopSave, false);



// INITIAL PAGE LOAD STUFF
init();
















