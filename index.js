var walk = function(node) {
    var child, next;
    if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
        child = node.firstChild;
        while (child) {
            next = child.nextSibling;
            walk(child);
            child = next;
        }
    } else if (node.nodeType === 3) {
        //console.log(node.nodeValue);
        var text = '';
        if (node.nodeValue) {
            if (node.tagName && (node.tagName === "EM" || 
            					 node.tagName === "STRONG") || 
            	node.parentNode && (node.parentNode.tagName === "EM" || 
            						node.parentNode.tagName === "STRONG")) {
                text = titleCase(node.nodeValue);
            } else {
                text = sentenceCase(node.nodeValue);
            }
            node.nodeValue = text;
        }
    }
};

var titleCase = function(str) {
    var newStr = str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    console.log('Title-cased', str, 'as', newStr);
    return newStr;
};

var sentenceCase = function(str) {
    if (str === null || str === undefined)
        return str;
	var lowerCase = str.toLowerCase();
	var regex = /(^[a-z])|\.\s+(.)/;
	var buffer = lowerCase.replace(regex, function (txt) {
		return txt.toUpperCase();
	});
	buffer = buffer.replace('hulk', 'Hulk');
    //console.log('Sentence-cased', str, 'as', buffer);
    return buffer;
};

var authorEl = document.getElementsByClassName('Article-author')[0];
if (authorEl && authorEl.innerText == 'FILM CRIT HULK') {
    var articleEl = document.getElementsByClassName('Article-content')[0];
    if (articleEl) {
        walk(articleEl);
    } else {
        console.error('Article was recognized as Film Crit Hulk but the content could not be found.');
    }
}
