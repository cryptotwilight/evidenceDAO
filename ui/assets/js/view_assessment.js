const queryString 						= window.location.search;
const urlParams 						= new URLSearchParams(queryString);
const assessmentAddress 				= urlParams.get("assessment");

const assessmentNameSpan				= ge("assessment_name_span");
const assessmentDetailsSpan				= ge("assessment_details_span");
const leaveOrCancelSpan					= ge("leave_or_cancel_span");

const listAssigneesTable				= ge("list_assignees_table");

const assessmentMessageSpan				= ge("assessment_message_span");
const assigneeMessageSpan				= ge("assignee_message_span");

const listDeliverableFilesTable			= ge("list_assessment_files_table");

const approveRewardSpan 				= ge("approve_reward_span");
const allowProductUpdateSpan 			= ge("allow_product_update_span");
const addAssigneeSpan	 				= ge("add_assignee_span");
const cancelDeliverablSpan 				= ge("cancel_deliverable_span");
const claimAssessmenteSpan 				= ge("claim_assessment_span");


var isAssessor = false; 
var isRegisteredAssessor = false;; 

function bootPageContracts() { 
	iEvidenceDaoRewardedProduct.methods.getSeed().call({from : account})
	.then(function(resp){
		console.log(resp);
		deliverableSeed = resp; 
		iEvidenceDaoProject = getContract(iEvidenceDaoProjectAbi, deliverableSeed.project);

		iEvidenceDaoProject.methods.getSeed().call({from : account})
		.then(function(resp){
			console.log(resp);
			projectSeed = resp; 
			iEvidenceDaoMemberRegister = getContract(iEvidenceDaoMemberRegisterAbi, projectSeed.dao);	
			iEvidenceDao = getContract(iEvidenceDaoAbi, projectSeed.dao);	
			iEvidenceDao.methods.getSeed().call({from : account}) 
			.then(function(resp){
				console.log(resp);
				daoSeed = resp; 				
			})
			.catch(function(err){
				console.log(err);
			})
		})
		.catch(function(err){
			console.log(err);
		})
		deliverableNameSpan.innerHTML = ""; 
		deliverableNameSpan.append(text(deliverableSeed.name));
	})
	.catch(function(err){
		console.log(err);
	})
}

function loadPageData() { 
	getViewerRole();
	
	
}

function populatePage(){
	console.log("ROLE: " + roleName);
	populateDeliverableDetails();
	populateAssignees();
	// if in claim or later
	populateDeliverableFiles(); 
}

function populateAssignees() { 
	clear(listAssigneesTable);
	iEvidenceDaoRewardedProduct.methods.getAssignees().call({from : account})
	.then(function(resp){
		console.log(resp);
		var assignees = resp; 
		for(var x = 0; x < assignees.length; x++) {
			var assignee = assignees[x];
			var row = listAssigneesTable.insertRow(); 
			addAssigneeRow(assignee, row);
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function addAssigneeRow(assignee, row) {
	var assigneeCell = row.insertCell();
	assigneeCell.append(text(assignee));

	var actionsCell = row.insertCell();
	console.log(roleName);
	console.log(isLeader);
	if(isAdmin || isLeader) {

		var a = ce("a");
		a.setAttribute("href", "javascript:remove(\""+assignee+"\")");
		var i = ce("i");
		i.setAttribute("class", "bx bx-user-x");
		a.append(i);
		a.append(text("REMOVE"));
		actionsCell.append(a);
	}

	if(isAssignee && isAddressMatch(assignee, account)) {
		var a = ce("a");
		a.setAttribute("href", "javascript:remove(\""+assignee+"\")");
		var i = ce("i");
		i.setAttribute("class", "bx bx-x-circle");
		a.append(text("LEAVE"));
		actionsCell.append(a);
	}
}

function populateAssessmentFiles() { 
	clear(listAssessmentFilesTable);
	iEvidenceDaoRewardedProduct.methods.getContentManifest().call({from : account})
	.then(function(resp){
		console.log(resp);		
		var manifest = resp; 
		if(manifest != ""){
			processManifest(manifest);
		}		
	})
	.catch(function(err){
		console.log(err);
	})
}
	
function processManifest(manifest) {
	fetch(ipfsRoot+manifest)
	.then(function(resp){
		console.log(resp);
		return resp.text();				
	})
	.then(function(text){
		console.log(text);
		var json = JSON.parse(text);
		var files = json.files; 
		for(var x = 0; x < files.length; x++){
			var file = files[x];
			var row = listAssessmentFilesTable.insertRow(); 
			addFileRow(file, row);
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

/*
{name : "original name of the file ",
 summary : "summary of what the file is ", 
 contents : "ipfsHash"}
*/

function addFileRow(file, row) {
	var name = row.insertCell();
	name.append(text(file.name));
	var summary = row.insertCell();
	summary.append(text(file.summary));
	var download = row.insertCell(); 
	
	var a = ce("a");
	a.setAttribute("href", "ipfs://"+ file.contents);
	a.setAttribute("target", "_blank");
	a.append(text("download"));

	download.append(a);
}

function approveReward() { 
	iEvidenceRewardedProduct.methods.approveReward().send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		assessmentMessageSpan.innerHTML = ""; 
		assessmentMessageSpan.append(text("REWARD APPROVED: "))
		assessmentMessageSpan.append(a);
	})
	.catch(function(err){
		console.log(err);
	})
}

function addAssignee(){
	var assignee = document.getElementById("add_assignee_field").value+"";
	console.log(assignee);
	iEvidenceRewardedProduct.methods.addAssignee(assignee).send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		assigneeMessageSpan.innerHTML = ""; 
		assigneeMessageSpan.append(text("ASSIGNEE ADDED: "))
		assigneeMessageSpan.append(a);
	})
	.catch(function(err){
		console.log(err);
	})
}

function removeAssignee(assignee){
	iEvidenceRewardedProduct.methods.removeAssignee(assignee).send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		assigneeMessageSpan.innerHTML = ""; 
		assigneeMessageSpan.append(text("ASSIGNEE REMOVED: "))
		assigneeMessageSpan.append(a);
	})
	.catch(function(err){
		console.log(err);
	})
}



function cancelDeliverable() { 
	iEvidenceRewardedProduct.methods.cancel().send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		assessmentMessageSpan.innerHTML = ""; 
		assessmentMessageSpan.append(text("DELIVERABLE CANCELLED: "))
		assessmentMessageSpan.append(a);
	})
	.catch(function(err){
		console.log(err);
	})
}
function getRespLink(resp) {
	var a = ce("a");
	a.setAttribute("href",chain.blockExplorerUrls[0] +"hash/"+ resp.blockHash);
	a.append(text(resp.blockHash));
	a.setAttribute("target", "_blank");
	return a; 
}
function allowProductUpdate() { 
	iEvidenceRewardedProduct.methods.allowProductUpdate().send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		assessmentMessageSpan.innerHTML = ""; 
		assessmentMessageSpan.append(text("PRODUCT UPDATE ENABLED: "))
		assessmentMessageSpan.append(a);
	})
	.catch(function(err){
		console.log(err);
	})
}

function generateManifestAndPost() { 
	var manifest = {};
	manifest.assessment 	= assessmentAddress; 
	manifest.projectAddress = assessmentSeed.project; 
	manifest.daoAddress 	= projectSeed.dao; 
	manifest.assessor		= account; 
	manifest.chain 			= chain.id; 
	manifest.chainName 		= chain.name;
	manifest.date			= new Date().getTime(); 
	manifest.humanDate		= new Date().toISOString(); 
	manifest.type			= "ASSESSMENT"; 		
	manifest.files 			= claimFiles;

	console.log(manifest);

	var manifestString = JSON.stringify(manifest);
	ipfs.add(manifestString)
	.then(function(resp){
		console.log(resp);
		var hash = resp[0].hash; 
		postClaimToChain(hash);
	})
	.catch(function(err){
		console.log(err);
	})
}

function claimReward() {
	generateManifestAndPost(); 	
}

function postClaimToChain(ipfsManifest) {
	console.log(ipfsManifest);
	iEvidenceDaoRewardedProduct.methods.claimReward(ipfsManifest).send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		assessmentMessageSpan.innerHTML = ""; 
		assessmentMessageSpan.append(text("REWARD CLAIMED: "))
		assessmentMessageSpan.append(a);
	})
	.catch(function(err){
		console.log(err);
	})
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


function getApproveRewardModule(){
	approveRewardSpan.innerHTML = "";	
	var a = ce("a");
	wrap(approveRewardSpan,"Approve Reward" ,a);
	a.setAttribute("class","btn btn-outline-danger");
	a.setAttribute("href", "javascript:approveReward()");
	a.append(text("Approve Reward"));
	
}

function getAllowProductUpdateModule(){
	allowProductUpdateSpan.innerHTML = "";	
	var a = ce("a");
	wrap(allowProductUpdateSpan,"Allow Product Update" ,a);
	a.setAttribute("class","btn btn-outline-success");
	a.setAttribute("href", "javascript:allowProductUpdate()");
	a.append(text("Allow Product Update"));	
}

function getAddAssigneeModule(){
	addAssigneeSpan.innerHTML = "";
	var center = ce("center");
	var table = ce("table");
	center.append(table);
	var row = table.insertRow();
	wrap(allowProductUpdateSpan,"Add Assignee" ,center);
	
	var input = ce("input");
	input.setAttribute("type","text");
	input.setAttribute("placeholder", "enter assignee");
	input.setAttribute("class","form-control");
	input.setAttribute("id", "assignee_input_field");
	var cell = row.insertCell();
	cell.append(input);

	var a = ce("a");
	a.setAttribute("class","btn btn-outline-warning");
	a.setAttribute("href", "javascript:addAssignee();");
	a.append(text("Add Assignee"));
	cell = row.insertCell();
	cell.append(a);
}

function getCancelDeliverableModule(){
	cancelDeliverablSpan.innerHTML = "";	
	var a = ce("a");
	wrap(cancelDeliverablSpan,"Allow Product Update" ,a);
	a.setAttribute("class","btn btn-outline-danger");
	a.setAttribute("href", "javascript:cancelDeliverable();");
	a.append(text("Cancel Deliverable"));	
}

var claimFiles = [];

function getClaimRewardModule(){
	claimDeliverableSpan.innerHTML = "";
	var table = ce("table");
	wrap(claimDeliverableSpan, " Claim Assessment Reward", table);

	var row = table.insertRow(); 
	var name = row.insertCell(); 
	var value = row.insertCell(); 		
	name.append(text("File :"));
	var upload = ce("input");
	upload.setAttribute("type", "file");
	upload.setAttribute("id", "file_upload");
	value.append(upload);

	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append(text("Summary :"));
	value = row.insertCell(); 
	var summary = ce("textarea");
	summary.setAttribute("placeholder", "Enter file content summary 150 chars max");
	summary.setAttribute("maxlength", 150);
	summary.setAttribute("id","file_summary");
	value.append(summary);

	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append(text("Claim Files:"))
	value = row.insertCell(); 
	var span = ce("span");
	value.append(span);
	span.setAttribute("id","claim_file_display");

	row = table.insertRow(); 
	var cell = row.insertCell();  
	var center = ce("center");	
	var addFileButton = ce("a");
	addFileButton.setAttribute("href", "javascript:addClaimRewardFile()");
	addFileButton.setAttribute("class","btn btn-outline-primary");
	addFileButton.append(text("Add File"));
	center.append(addFileButton);
	cell.append(center);

	row = table.insertRow(); 
	cell = row.insertCell(); 
	cell.setAttribute("colspan", 2);
	center = ce("center");	
	var claimButton = ce("a");
	claimButton.setAttribute("href", "javascript:claimReward()");
	claimButton.setAttribute("class","btn btn-outline-success");
	claimButton.append(text("Claim Reward"));
	center.append(claimButton);
	cell.append(center);
}

function addClaimRewardFile() {
	var crFile = document.getElementById("file_upload");
	var crFileSummary = document.getElementById("file_summary");
	var claimFile = {};
	console.log(crFile);
	claimFile.name = crFile.files[0].name; 
	claimFile.summary = crFileSummary.value;
	ipfs.add(crFile.files[0])
	.then(function(resp){
		console.log(resp);
		var hash = resp[0].hash; 
		claimFile.contents = hash; 
		console.log(claimFile);
		claimFiles.push(claimFile);
		console.log(claimFiles);
		displayClaimFiles();
	})
	.catch(function(err){
		console.log(err);
	})
}

function displayClaimFiles() { 
	var claimFilesDisplaySpan = document.getElementById("claim_file_display");
	claimFilesDisplaySpan.innerHTML = ""; 
	var table = ce("table");
	claimFilesDisplaySpan.append(table);

	var header = table.insertRow(); 
	cell = header.insertCell();
	cell.append(text("File"));
	cell = header.insertCell();
	cell.append(text("Summary"));
	cell = header.insertCell();
	cell.append(text("Content"));

	for(var x = 0; x < claimFiles.length; x++){
		var row = table.insertRow(); 
		var claimFile = claimFiles[x];
		var dataCell = row.insertCell(); 
		dataCell.append(text(claimFile.name));
		dataCell = row.insertCell(); 
		dataCell.append(text(claimFile.summary));
		dataCell = row.insertCell(); 
		dataCell.append(shortenIpfsHash(claimFile.contents));
	}
}

function loadProfiles() {
	console.log("loading profiles");
	configureRoleForStatus();
}

function populateAssessmentDetails() { 
	deliverableDetailsSpan.innerHTML = ""; 
	var table = ce("table");
	deliverableDetailsSpan.append(table);	 
	setValue(table, "Assessment Name: "	, assessmentSeed.name);	
	setValue(table, "Due date: "			, convertToDateString(assessmentSeed.dueDate));
	
	var row = table.insertRow(); 
	var name = row.insertCell(); 
	var value = row.insertCell();
	name.append("Reward: ");
	addReward(value, assessmentSeed);
	
	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append("Reward Currency: ");
	addRewardCurrency(row.insertCell(), assessmentSeed);

	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append("Submission Proofs NFT: ");

	value = row.insertCell(); 
	var lnk = ce("a");
	lnk.setAttribute("href", chain.blockExplorerUrls[0] +"address/"+ assessmentSeed.proofNft);
	lnk.setAttribute("target", "_blank");
	lnk.append(text(assessmentSeed.proofNft));
	value.append(lnk); 

	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append("Project: ");

	value = row.insertCell(); 
	value.append(text(projectSeed.name));
	
	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append("DAO: ");

	value = row.insertCell(); 
	value.append(text(daoSeed.name));

	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append("Status: ");

	setStatus(row.insertCell());

	row = table.insertRow(); 
	name = row.insertCell(); 
	name.append("Completed Date: ");

	setCompletedDate(row.insertCell());
}

function configureRoleForStatus(){
	console.log(roleName);
	iEvidenceDaoRewardedProduct.methods.getStatus().call({from : account })
	.then(function(resp){
		console.log(resp);
		var status = resp; 

		if(isAdmin) {
			if(status === "OPEN"){	
				// Add Assignee
				getAddAssigneeModule(); 
				// Cancel Deliverable	
				getCancelDeliverableModule(); 
			}

			if(status === "IN_CLAIM"){
				// Approve Reward
				getApproveRewardModule(); 

				// Cancel Deliverable	
				getCancelDeliverableModule(); 

				// Allow Product Update 
				getAllowProductUpdateModule(); 
			}
	
	
			// Remove Assignee (in situ)

			if(status === "ALL_REWARDS_APPROVED" || status === "PRODUCT_APPROVED"){
				// Push to Atheneum
				getPushToAtheneumModule(); 
				getAssessmentModule(); 
			}
			populatePage();
		}	
		else {

			if(isLeader){		
				
				if(status === "OPEN"){
					// Add Assignee
					getAddAssigneeModule(); 
				}

				if(status === "IN_CLAIM"){
					// Get Assessment
					getAssessmentModule(); 
				}
				
				// Remove Assignee (in situ)

				if(status === "ALL_REWARDS_APPROVED" || status === "PRODUCT_APPROVED"){
					// Push to Atheneum
					getPushToAtheneumModule(); 
					getAssessmentModule(); 
				}
				populatePage();
			}
			else {
				processDeliverableSpecificRoles(status); 
			}
			
		}	
	})
	.catch(function(err){
		console.log(err);
	});

}

function processDeliverableSpecificRoles(status) {
	iEvidenceDaoRewardedProduct.methods.getAssignees().call({from : account})
	.then(function(resp){
		var assignees = resp; 
		for(var x = 0; x < assignees.length; x++){
			var assignee = assignees[x];
			isAssignee = isAddressMatch(assignee, account);
			if(isAssignee) {
				roleName = "PROJECT DELIVERABLE_ASSIGNEE"; 
				if(status === "OPEN"){
					// Claim Reward 
					getClaimRewardModule();			
				
					// Remove Assignee  (self) (in situ)
				}
				populatePage();
				break; 
			}
		}
		if(roleName != "PROJECT DELIVERABLE_ASSIGNEE"){
			checkAssessorRole(status);
		}
	})
	.catch(function(err){
		console.log(err);
	});
}

function checkAssessorRole(status) {
	if(status === "IN_CLAIM") {
		iEvidenceDaoProjectDeliverable.methods.getAssessor().call({from :account})
		.then(function(resp){
			var assessor = resp; 
			isAssessor = isAddressMatch(assessor, account);
			if(isAssessor){
				// need to add contract status IN_ASSESSMENT
 				// Get Assessment
				getAssessmentModule(); 				
				populatePage();
			}
			else { 

			}
		})
		.catch(function(err){
			console.log(err);
		});
	
			if(isRegisteredAssessor){
				if(status === "IN_CLAIM"){ 
				// Book Assessment
				getBookAssessmentModule();
				} 
				populatePage();
			}
		
	}
	else { 
		populatePage();
	}
}


function configureForStatus(table){
	
	iEvidenceDaoRewardedProduct.methods.getStatus().call({from : account })
	.then(function(resp){
		console.log(resp);
		var status = resp; 

		if(status === "IN_CLAIM" || status === "ALL_REWARDS_APPROVED" || status === "PRODUCT_APPROVED") {
			var row = table.insertRow(); 
			var name = row.insertCell(); 
			name.append("Assessor: ");
			setAssessor(row.insertCell());


			row = table.insertRow(); 
			name = row.insertCell(); 
			name.append("Assessment: ");
			setAssessment(row.insertCell());
		}

	})
	.catch(function(err){
		console.log(err);
	});

}

function setStatus(cell){
	
	iEvidenceDaoRewardedProduct.methods.getStatus().call({from : account })
	.then(function(resp){
		console.log(resp);
		var status = resp; 
		cell.append(text(status));
	})
	.catch(function(err){
		console.log(err);
	});

}

function setAssessor(cell){
	
	iEvidenceDaoProjectDeliverable.methods.getAssessor().call({from : account })
	.then(function(resp){
		console.log(resp);
		var assessor = resp; 
		cell.append(assessor);
	})
	.catch(function(err){
		console.log(err);
	});
}

function setAssessment(cell) {
	iEvidenceDaoProjectDeliverable.methods.getAssessment().call({from : account })
	.then(function(resp){
		console.log(resp);
		var assessmentAddress = resp; 
		var a = ce("a");
		var icon = ce("i");
		icon.setAttribute("class", "bx bx-glasses");
		a.append(icon);
		a.setAttribute("href", "04_view_assessment.html?assessment="+assessmentAddress);
		a.append(text("View Assessment"));
		cell.append(a);
	})
	.catch(function(err){
		console.log(err);
	});	
}

function setCompletedDate(cell) {
	iEvidenceDaoRewardedProduct.methods.getCompletedDate().call({from : account })
	.then(function(resp){
		console.log(resp);
		var completedDate = resp; 
		if(Number(completedDate) === 0 ){
			cell.append(text("Still Working"));
		}
		else {
			cell.append(convertToDateString(completedDate));
		}
	})
	.catch(function(err){
		console.log(err);
	});
}

