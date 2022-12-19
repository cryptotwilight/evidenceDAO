function ce(element) {
	return document.createElement(element);
}

function ge(element) {
	return document.getElementById(element);
}

function text(txt) {
	return document.createTextNode(txt);
}

function getContract(abi, address) {
	return new web3.eth.Contract(abi, address);
}

function clear(table) {

	if(table.tBodies != null && table.tBodies.length > 0){
		var tbody = table.tBodies[0];
		tbody.innerHtml = ""; 
	}
	else {
		table.innerHtml = ""; 
	}
}

function getBlockchainTimeFormat(dataStr) {
	return new Date(dataStr).getTime() / 1000; 
}

function isAddressMatch(a, b) {
	return a.toLowerCase() === b.toLowerCase(); 
}