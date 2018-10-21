walk(document.body);

function walk(node) 
{
    //Inspired by https://github.com/panicsteve/cloud-to-butt
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;

	getValue(v, function (word) {
		if(word[v].length > 0){
			var regex = new RegExp(v,"gi");
			v = v.replace(regex, word[v]);
			textNode.nodeValue = v;
		}
	}); 
}

function getValue(word, callback) {
	chrome.storage.sync.get(word, callback);
}