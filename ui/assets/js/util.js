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

function convertToDateString(dte){
	return new Date(dte*1000).toISOString();
}

function setValue(table, label, value) {
	var row = table.insertRow(); 
	var labelCell = row.insertCell();            
	labelCell.append(text(label));
	var valueCell = row.insertCell();
	valueCell.append(text(value));
}

function setValueElement(table, label, value) {
	var row = table.insertRow(); 
	var labelCell = row.insertCell();            
	labelCell.append(text(label));
	var valueCell = row.insertCell();
	valueCell.append(value);
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

const size = 4; 

function shortenLinkCopyAddress(address) {
  var aCopy = ce("a") ;
  aCopy.setAttribute("href","javascript:copyAddress(\""+address+"\")");
  var copyIcon = ce("i");
  aCopy.append(copyIcon);
  copyIcon.setAttribute("class", "bx bx-copy");

  chain.blockExplorerUrls
  var start = address.slice(0, size +1);
  var end = address.slice(-size);
  var shortAddress = start +"..."+ end; 

  var aAddress = ce("a");
  aAddress.setAttribute("href", chain.blockExplorerUrls[0] +"address/"+ address);
  aAddress.setAttribute("target", "_blank");
  aAddress.append(shortAddress);
  var holder = ce("span");
  holder.append(aAddress);
  holder.append(aCopy);
  
  return holder; 
}

function shortenIpfsHash(ipfsHash) {
	var aCopy = ce("a") ;
	aCopy.setAttribute("href","javascript:copyAddress(\""+ipfsHash+"\")");
	var copyIcon = ce("i");
	aCopy.append(copyIcon);
	copyIcon.setAttribute("class", "bx bx-copy");



	var start = ipfsHash.slice(0, size +1);
	var end = ipfsHash.slice(-size);
	var shortHash = start +"..."+ end; 
  
	var aHash = ce("a");
	aHash.setAttribute("href","ipfs://"+ ipfsHash);
	aHash.setAttribute("target", "_blank");
	aHash.append(shortHash);
	var holder = ce("span");
	holder.append(aHash);
	holder.append(aCopy);
	
	return holder; 
}

function copyAddress(address) {
	console.log("copying " + address);

	// Create a dummy input to copy the string array inside it
	  var dummy = document.createElement("input");

	// Add it to the document
	document.body.appendChild(dummy);

	// Set its ID
	dummy.setAttribute("id", "dummy_id");

	// Output the array into it
	document.getElementById("dummy_id").value=address;

	// Select it
	dummy.select();

	// Copy its contents
	document.execCommand("copy");

	// Remove it as its not needed anymore
	document.body.removeChild(dummy);
  }

  function getRespLink(resp) {
	var a = ce("a");
	a.setAttribute("href",chain.blockExplorerUrls[0] +"hash/"+ resp.blockHash);
	a.append(text(resp.blockHash));
	a.setAttribute("target", "_blank");
	return a; 
}

function wrap(span, title, value) {
	var wrapper = ce("div");
	span.append(wrapper);
	wrapper.setAttribute("class", "col-lg-12 col-md-12 col-6 mb-4");
	span.append(wrapper);
	var card = ce("card");
	wrapper.append(card);
	card.setAttribute("class","card");
	var cardBody = ce("div");
	cardBody.setAttribute("class", "card-body");              
	card.append(cardBody);
	var cardTitle = ce("div");
	cardTitle.setAttribute("class","card-title d-flex align-items-start justify-content-between");
	var h5 = ce("h5"); 
	h5.setAttribute("class", "card-title text-primary");
	h5.append(title);
	cardTitle.append(h5);
	cardBody.append(cardTitle);
	
	cardBody.append(value);
}