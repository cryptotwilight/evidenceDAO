const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectAddress = urlParams.get("project");

const projectNameSpan         		= ge("project_name_span");
const projectDetailsSpan      		= ge("project_details_span");
const listProjectMembersTable		= ge("list_project_members_table");

const createDeliverableSpan   		= ge("create_deliverable_span");

const listProjectDeliverablesTable 	= ge("list_project_deliverables_table");
const deliverablesMessageSpan 		= ge("deliverables_message_span");
var deliverableAssignees 			= [];
const joinOrLeaveSpan				= ge("join_or_leave_span");

async function bootPageContracts() { 
	iEvidenceDaoProject = getContract(iEvidenceDaoProjectAbi, projectAddress);
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
		projectNameSpan.innerHTML = ""; 
		projectNameSpan.append(text(projectSeed.name));
	})
	.catch(function(err){
		console.log(err);
	})
}


function loadPageData() { 
	getViewerRole();			
}

function populateProjectDetails() { 
	projectDetailsSpan.innerHTML = ""; 
	 var table = ce("table");
	 projectDetailsSpan.append(table);	 
	setValue(table, "Project Name: ", projectSeed.name);
	setValue(table, "Leader: "		, projectSeed.leader);
	setValue(table, "Start date: "	, convertToDateString(projectSeed.startDate));
	setValue(table, "End date: "	, convertToDateString(projectSeed.endDate));
	setValue(table, "DAO: "			, daoSeed.name);	
}


function loadProfiles() {
	populateProjectDetails();
	if(isAdmin) {
		getMembersModule();			
		getCreateDeliverableModule();
		getListDeliverablesModule();	
		getShutdownModule(); 
		getDisburseModule(); 		
	}	
	
	if(isLeader){			
		getMembersModule();			
		getCreateDeliverableModule();
		getListDeliverablesModule();
	}
	else {
		if(isProjectMember) {
			getLeaveModule(); 
			getMembersModule();	
			getListDeliverablesModule();
		}
		
		if(isRegisteredMember) {
			getJoinModule();
		}
		
		if(isDaoMember) {
			// nothing special 
		}
		if(isUnknown) {
			// nothing special 
		}
	}
}

function getJoinModule() { 
	joinOrLeaveSpan.innerHTML = ""; 
	var joinButton = ce("a");
	joinButton.setAttribute("class", "btn btn-outline-success");
	joinButton.append(text("Join Project"));
	joinButton.setAttribute("href","javascript:joinProject()");
	joinOrLeaveSpan.append(joinButton);
}

function getLeaveModule() { 
	joinOrLeaveSpan.innerHTML = ""; 
	var leaveButton = ce("a");
	leaveButton.setAttribute("class", "btn btn-outline-danger");
	leaveButton.append(text("Leave Project"));
	leaveButton.setAttribute("href","javascript:leaveProject()");
	joinOrLeaveSpan.append(leaveButton);
}

function getMembersModule() { 
	clear(listProjectMembersTable);
	var tbody = listProjectMembersTable.tBodies[0];
	iEvidenceDaoProject.methods.getMembers().call({from : account})
	.then(function(resp){
		console.log(resp);
		var members = resp; 
		for(var x = 0; x < members.length; x++ ){
			var row = tbody.insertRow(); 
			var member = members[x];
			addMember(member, row);
		}
	})
	.catch(function(err){
		console.log(err);
	})
	iEvidenceDaoProject.methods.getJoiners().call({from : account})
	.then(function(resp){
		console.log(resp);
		var joiners = resp; 
		for(var x = 0; x < joiners.length; x++ ){
			var row = tbody.insertRow(); 
			var joiner = joiners[x];
			addJoiner(joiner, row);
		}
	})
	.catch(function(err){
		console.log(err);
	})
	iEvidenceDaoProject.methods.getLeavers().call({from : account})
	.then(function(resp){
		console.log(resp);
		var leavers = resp; 
		for(var x = 0; x < leavers.length; x++ ){
			var row = tbody.insertRow(); 
			var leaver = leavers[x];
			addLeaver(leaver, row);
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function addMember(member, row) {
	var memberCell = row.insertCell(); 
	memberCell.append(text(member));
	var memberTypeCell = row.insertCell(); 
	var skipControls = false; 
	if(member.toLowerCase() === projectSeed.leader.toLowerCase()){
		memberTypeCell.append("Project Leader");
		skipControls = true; 
	}
	else {
		memberTypeCell.append("Project Member");
	}
	var actionsCell = row.insertCell(); 
	
	if(!skipControls && (isLeader|| isAdmin)){
		var table = ce("table");
		actionsCell.append(table);
		var tRow = table.insertRow();
		var tCell = tRow.insertCell(); 
		
		var disAllowIcon = ce("i");
		disAllowIcon.setAttribute("class", "bx bx-user-x");
		var disallow = ce("a");
		disallow.append(disAllowIcon);
		disallow.setAttribute("href", "javascript:disallow(\""+member+"\")");
		disallow.append(text("Disallow Member"));
		tCell.append(disallow);

		tRow = table.insertRow();
		tCell = tRow.insertCell(); 
		var boot = ce("a");
		var bootIcon = ce("i");
		bootIcon.setAttribute("class", "bx bxs-hot");
		boot.append(bootIcon);
		boot.setAttribute("href", "javascript:boot(\""+member+"\")");
		boot.append(bootIcon);
		boot.append(text("Boot Member"));
		tCell.append(boot);
	}
}

function addJoiner(joiner, row) {
	var memberCell = row.insertCell(); 
	memberCell.append(text(joiner));
	var memberTypeCell = row.insertCell(); 
	memberTypeCell.append("Joiner");
	var actionsCell = row.insertCell(); 
	if(isLeader || isAdmin){
		var allowIcon = ce("i");
		allowIcon.setAttribute("class", "bx bx-user-check");

		var allow = ce("a");
		allow.append(allowIcon);
		allow.append(text("Allow Member"));
		allow.setAttribute("href", "javascript:allowMember(\""+joiner+"\")");
		actionsCell.append(allow);
	}
}

function addLeaver(leaver, row) {
	var memberCell = row.insertCell(); 
	memberCell.append(text(leaver));
	var memberTypeCell = row.insertCell(); 
	memberTypeCell.append("Leaver");
	var actionsCell = row.insertCell(); 
}

function getShutdownModule() { 

}

function getDisburseModule() { 

}




function allowMember(member) { 
	iEvidenceDaoProject.methods.executeMemberAction(member, 0).send({from : account})
	.then(function(resp){
		console.log(resp);

		getMembersModule(); 
	})
	.catch(function(err){
		console.log(err);
	})
}

function disallowMember(member) {
	iEvidenceDaoProject.methods.executeMemberAction(member, 1).send({from : account})
	.then(function(resp){
		console.log(resp);

		getMembersModule(); 
	})
	.catch(function(err){
		console.log(err);
	})
}

function bootMember(member)  {
	iEvidenceDaoProject.methods.executeMemberAction(member, 2).send({from : account})
	.then(function(resp){
		console.log(resp);
		getMembersModule();

	})
	.catch(function(err){
		console.log(err);
	})
}

function assignLeader(member) {
	iEvidenceDaoProject.methods.assginLeader(member).send({from : account})
	.then(function(resp){
		console.log(resp);

		loadPageData(); 
	})
	.catch(function(err){
		console.log(err);
	})
}

function joinProject() { 
	iEvidenceDaoProject.methods.joinProject().send({from : account})
	.then(function(resp){
		console.log(resp);
		getProjectContributorsModule(); 
	})
	.catch(function(err){
		console.log(err);
	})
}

function leaveProject() { 
	iEvidenceDaoProject.methods.leaveProject().send({from : account})
	.then(function(resp){
		console.log(resp);
		loadPageData();
	})
	.catch(function(err){
		console.log(err);
	})
}

function getCreateDeliverableModule() {
	createDeliverableSpan.innerHTML = ""; 
 		/*<div class="col-lg-12 col-md-12 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <h5 class="card-title text-primary">Create Deliverable</h5> 
                    </div>
                    <table>
                          <tr> 
                            <td>Deliverable Name</td><td><input type="text" id="project_name" class="form-control"></td>
						  </tr>
						  <tr>
						  	<td>Allow External Contributors</td><td><select id="allow_external_contributors"></select></td>
						  <tr>
						  <tr>
                            <td>Deliverable Assignees</td><td><span id="assignee_select_span"></span></td>
                          </tr>
						  <tr>
						  	<td>Selected</td><td><span id="selected_assignees"></span></td> 
						  </tr>
						  <tr>
						  	<td>Reward Amount</td>
							<td><input type="text" id="reward" placeholder="enter reward with no decimals" class="form-control"></td>
						   </tr>
						   <tr>
							<td>Reward Currency</td>
							<td><input type="text" id="reward_currency" placeholder="enter reward token address" class="form-control"></td>
						  </tr>
                          <tr> 						  	                           
                            <td>Due Date</td><td><input type="text" id="deliverable_end_date" class="form-control"></td>
                          </tr>
                          <tr> 
                            <td colspan="2"><center><a href="javascript:createDeliverable()" class="btn btn-outline-primary">Create Deliverable</a></center></td>
                          </tr>
                    </table>
                  </div>
                </div>
              </div>
          */
			  
		var wrapper = ce("div");
		wrapper.setAttribute("class", "col-lg-12 col-md-12 col-6 mb-4");
		createDeliverableSpan.append(wrapper);
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
		h5.append("Create Deliverable");
		cardTitle.append(h5);
		cardBody.append(cardTitle);

		var table = ce("table");
		cardBody.append(table);

		var row = table.insertRow();
		var deliverableNameLabelCell = row.insertCell(); 
		deliverableNameLabelCell.append(text("Deliverable Name: "));

		var deliverableNameValueCell = row.insertCell();
		var deliverableName = ce("input");
		deliverableName.setAttribute("id", "deliverable_name");
		// projectName.setAttribute("class","form-control");
		deliverableNameValueCell.append(deliverableName);

		row = table.insertRow();
		var allowExternalContributorsLabelCell = row.insertCell(); 
		allowExternalContributorsLabelCell.append("Allow External Contributors: ");

		var allowExternalContributorsValueCell = row.insertCell();
		

		var allowExternalsSelect = ce("select");
		allowExternalsSelect.setAttribute("id", "allow_external_contributors");
		var optionYES = ce("option");
		optionYES.setAttribute("value", "TRUE");
		optionYES.append(text("YES"));
		allowExternalsSelect.append(optionYES);

		var optionNO = ce("option");
		optionNO.setAttribute("value", "FALSE");
		optionNO.append(text("NO"));
		allowExternalsSelect.append(optionNO);

		allowExternalContributorsValueCell.append(allowExternalsSelect);


		row = table.insertRow();
		var deliverableAssigneesLabelCell = row.insertCell(); 
		deliverableAssigneesLabelCell.append(text("Deliverable Assignees: "));

		var deliverableAssigneeChoicesValueCell = row.insertCell();             
		getMemberSelect(deliverableAssigneeChoicesValueCell);
		
		row = table.insertRow();
		row.insertCell(); // filler
		var displayAssigneesCell = row.insertCell(); 
		var displayAssigneesSpan = ce("span");
		displayAssigneesSpan.setAttribute("id", "display_assignees");
		displayAssigneesCell.append(displayAssigneesSpan);

		var row = table.insertRow();
		var deliverableDueDateLabelCell   = row.insertCell(); 
		deliverableDueDateLabelCell.append(text("Deliverable Due Date: "));

		var deliverableDueDateCell        = row.insertCell(); 
		var dueDate = ce("input");
		dueDate.setAttribute("type", "datetime-local");
		//startDate.setAttribute("class","form-control");
		dueDate.setAttribute("id", "due_date");
		deliverableDueDateCell.append(dueDate);
	
		var row = table.insertRow();
		var rewardLabelCell = row.insertCell(); 
		rewardLabelCell.append(text("Reward: "));
		var rewardCell = row.insertCell(); 
		var reward = ce("input");
		reward.setAttribute("id", "deliverable_reward"); 
		reward.setAttribute("type", "text");
		reward.setAttribute("placeholder", "enter reward with decimals");
		rewardCell.append(reward);

		var row = table.insertRow();
		var rewardCurrencyLabelCell = row.insertCell(); 
		rewardCurrencyLabelCell.append(text("Reward Currency: "));
		var rewardCurrencyCell = row.insertCell(); 
		var currency = ce("input");
		currency.setAttribute("type", "text");
		currency.setAttribute("id", "deliverable_reward_currency");
		currency.setAttribute("placeholder", "enter ERC20 currency contract address");
		rewardCurrencyCell.append(currency);


		var row = table.insertRow();
		var rewardLabelCell = row.insertCell(); 
		rewardLabelCell.append(text("Assessment Reward: "));
		var rewardCell = row.insertCell(); 
		var reward = ce("input");
		reward.setAttribute("id", "assessment_reward"); 
		reward.setAttribute("type", "text");
		reward.setAttribute("placeholder", "enter assessment reward with decimals");
		rewardCell.append(reward);

		var row = table.insertRow();
		var rewardCurrencyLabelCell = row.insertCell(); 
		rewardCurrencyLabelCell.append(text("Assessment Reward Currency: "));
		var rewardCurrencyCell = row.insertCell(); 
		var currency = ce("input");
		currency.setAttribute("type", "text");
		currency.setAttribute("id", "assessment_reward_currency");
		currency.setAttribute("placeholder", "enter Assessment ERC20 currency contract address");
		rewardCurrencyCell.append(currency);

		var row = table.insertRow();
		var deliverableDueDateLabelCell   = row.insertCell(); 
		deliverableDueDateLabelCell.append(text("Assessment Due Date: "));

		var deliverableDueDateCell        = row.insertCell(); 
		var dueDate = ce("input");
		dueDate.setAttribute("type", "datetime-local");

		dueDate.setAttribute("id", "assessment_due_date");
		deliverableDueDateCell.append(dueDate);

		
		var row = table.insertRow();
		var createDeliverableButtonCell = row.insertCell(); 
		createDeliverableButtonCell.setAttribute("colspan","2");
		var createDeliverableButton = ce("a");
		createDeliverableButton.setAttribute("class", "btn btn-outline-primary");
		createDeliverableButton.setAttribute("href", "javascript:createDeliverable()");
		createDeliverableButton.append(text("Create Deliverable"));
		var c = ce("center");
		c.append(createDeliverableButton);
		createDeliverableButtonCell.append(c);
}

function getMemberSelect(cell) {
	iEvidenceDaoProject.methods.getMembers().call({from : account})
	.then(function(resp){
		console.log(resp);
		var members = resp; 
		var select = ce("select");
		select.setAttribute("id","member_select");
		for(var x = 0; x < members.length; x++) {
			var member = members[x];
			var option = ce("option");
			option.setAttribute("value", member);
			option.append(text(member));
			select.append(option);
		}

		cell.append(select);
		var addButton = ce("a");
		addButton.setAttribute("href","javascript:addAssigneeToList()");
		addButton.append(text("add"));
		cell.append(addButton);

	})
	.catch(function(err){
		console.log(err);
	});
}

function addAssigneeToList() {
	var assignee = document.getElementById("member_select").value; 
	deliverableAssignees.push(assignee);
	displayDeliverableAssignees(); 
}

function displayDeliverableAssignees() {
	var displayAssigneesSpan = document.getElementById("display_assignees");
	displayAssigneesSpan.innerHTML = ""; 
	var table = ce("table");
	for(var x = 0; x < deliverableAssignees.length; x++) {
		var assignee = deliverableAssignees[x];
		var row = table.insertRow(); 
		var cell = row.insertCell(); 
		cell.append(text(assignee));
	}
	displayAssigneesSpan.append(table);
}

function createDeliverable() { 
	var deliverableName 						= document.getElementById("deliverable_name");
	var deliverableReward						= document.getElementById("deliverable_reward"); 
	var deliverableRewardCurrency 				= document.getElementById("deliverable_reward_currency");
	var deliverableDueDate 						= document.getElementById("due_date");
	var deliverableProjectMemberAssignmentsOnly = document.getElementById("allow_external_contributors");

	var assessmentReward						= document.getElementById("assessment_reward"); 
	var assessmentRewardCurrency				= document.getElementById("assessment_reward_currency");
	var assessmentDueDate						= document.getElementById("assessment_due_date");

	var rewardedProductSeed = {};
	rewardedProductSeed.name 							= deliverableName.value; 
	rewardedProductSeed.assignees 						= deliverableAssignees; 
	rewardedProductSeed.reward 							= deliverableReward.value	
	rewardedProductSeed.rewardCurrency 					= deliverableRewardCurrency.value; 
	rewardedProductSeed.proofNft 						= ""; // get from dao process 
	rewardedProductSeed.project 						= projectAddress; 
	rewardedProductSeed.dueDate 						= getBlockchainTimeFormat(deliverableDueDate.value);
	rewardedProductSeed.projectMemberAssignmentsOnly 	= getFlipBoolean(deliverableProjectMemberAssignmentsOnly.value); 

	console.log(rewardedProductSeed);

	var assessmentSeed = {}; 
	assessmentSeed.name				= rewardedProductSeed.name + " Assessment";
	assessmentSeed.assignees		= []; 
	assessmentSeed.reward			= assessmentReward.value; 
	assessmentSeed.rewardCurrency	= assessmentRewardCurrency.value;
	assessmentSeed.proofNft			= "";
	assessmentSeed.project 			= projectAddress; 
	assessmentSeed.dueDate 			= getBlockchainTimeFormat(assessmentDueDate.value);
	assessmentSeed.projectMemberAssignmentsOnly = false; // assessment has to be done by someone outside the project

	console.log("assessement seed");
	console.log(assessmentSeed);

	setDecimals(rewardedProductSeed, assessmentSeed);

}

function getFlipBoolean(text) {
	if(text === "TRUE") {
		return false; 
	}
	return true; 
}

async function getDecimals(seed) {	
	iErc20Metadata = getContract(iErc20MetadataAbi, seed.rewardCurrency);
	iErc20Metadata.methods.decimals().call({from : account})
	.then(function(resp){
		console.log(resp);
		var decimals = resp; 
		seed.reward = (seed.reward * Number("1e"+decimals))+"";
		console.log(seed);		
	})
	.catch(function(err){
		console.log(err);
	});
	return true;
}

function setDecimals(rewardedProductSeed, assessmentSeed) {
	getDecimals(rewardedProductSeed)
	.then(function(resp){
		console.log(resp);
		console.log(rewardedProductSeed);
		console.log("sorting assessment seed");
		getDecimals(assessmentSeed)
		.then(function(resp){
			console.log(resp);
			console.log(assessmentSeed);
			getProofsNFT(rewardedProductSeed, assessmentSeed);
		})
		.catch(function(err){
			console.log(err);
		});
	})
	.catch(function(err){
		console.log(err);
	});
}

async function getProofsNFT(rewardedProductSeed, assessmentSeed) {
	iEvidenceDao.methods.getProofsNFT().call({from : account})
	.then(function(resp){
		console.log(resp);
		var proofsNft = resp;
		rewardedProductSeed.proofNft 	= proofsNft; 
		assessmentSeed.proofNft 		= proofsNft 
		createOnChainDeliverable(rewardedProductSeed, assessmentSeed);
	})
	.catch(function(err){
		console.log(err);
	});
}

function createOnChainDeliverable(rewardedProductSeed, assessmentSeed) {
	console.log("deliverable seed going on chain");
	console.log(rewardedProductSeed);
	console.log("assessment seed going on chain");
	console.log(assessmentSeed);
	iEvidenceDaoProject.methods.createDeliverable(rewardedProductSeed, assessmentSeed).send({from : account})
	.then(function(resp){
		console.log(resp);
		deliverablesMessageSpan.innerHTML = ""; 
		deliverablesMessageSpan.append(text("CREATED: "));
		var a = ce("a");
		a.setAttribute("href", chain.blockExplorerUrls[0]+"hash/"+resp.blockHash);		
		a.append(text(resp.blockHash));
		loadPageData();
	})
	.catch(function(err){
		console.log(err);
	});
}

function getListDeliverablesModule() { 
	clear(listProjectDeliverablesTable);
	iEvidenceDaoProject.methods.getDeliverables().call({from : account})
	.then(function(resp){
		console.log(resp);
		var deliverables = resp; 
		for(var x = 0; x < deliverables.length; x++) {
			var deliverableAddress = deliverables[x];
			var row = listProjectDeliverablesTable.insertRow(); 
			addDeliverable(deliverableAddress, row);
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function addDeliverable(deliverableAddress, row) {
	var iEvidenceDaoRewardedProduct = getContract(iEvidenceDaoRewardedProductAbi, deliverableAddress);
	
	iEvidenceDaoRewardedProduct.methods.getSeed().call({from : account})
	.then(function(resp){
		console.log(resp);
		var seed = resp; 

		var nameCell = row.insertCell();
		var assigneesCell = row.insertCell(); 
		var rewardCell = row.insertCell();
		var rewardcurrencyCell = row.insertCell(); 
		var dueDateCell = row.insertCell(); 
		var statusCell = row.insertCell(); 
		var actionsCell = row.insertCell(); 

		nameCell.append(text(seed.name));

		addAssignees(assigneesCell, seed);
		addReward(rewardCell, seed);
		addRewardCurrency(rewardcurrencyCell, seed);
		dueDateCell.append(convertToDateString(seed.dueDate));
		addStatus(statusCell, iEvidenceDaoRewardedProduct);
		addActions(actionsCell, iEvidenceDaoRewardedProduct, deliverableAddress);
	})	
	.catch(function(err){
		console.log(err);
	})
}

function addAssignees(assigneesCell, seed) {
	var assignees = seed.assignees;
	var table = ce("table");
	for(var x = 0; x < assignees.length; x++) {
		var row = table.insertRow(); 
		var cell = row.insertCell(); 
		cell.append(text(assignees[x]));
	}
	assigneesCell.append(table);
}

function addReward(rewardCell, seed) {
	var iErc20Metadata = getContract(iErc20MetadataAbi, seed.rewardCurrency);
	iErc20Metadata.methods.decimals().call({from : account})
	.then(function(resp){
		console.log(resp);
		var decimals = resp; 
		var reward = seed.reward / Number("1e"+decimals); 
		rewardCell.append(text(reward));
	})
	.catch(function(err){
		console.log(err);
	})
}

function addRewardCurrency(rewardCurrencyCell, seed) {
	var iErc20Metadata = getContract(iErc20MetadataAbi, seed.rewardCurrency);
	iErc20Metadata.methods.symbol().call({from : account})
	.then(function(resp){
		console.log(resp);
		var symbol = resp; 		
		rewardCurrencyCell.append(text(symbol));
	})
	.catch(function(err){
		console.log(err);
	})
}

function addStatus(statusCell, iEvidenceDaoRewardedProduct) { 
	iEvidenceDaoRewardedProduct.methods.getStatus().call({from : account})
	.then(function(resp){
		console.log(resp);
		var status = resp; 
		statusCell.append(text(status));
	})
	.catch(function(err){
		console.log(err);
	})
}

function addActions(actionsCell, iEvidenceDaoRewardedProduct, deliverableAddress) { 
	iEvidenceDaoRewardedProduct.methods.getStatus().call({from : account})
	.then(function(resp){
		console.log(resp);
		var status = resp;
		var table = ce("table");
		actionsCell.append(table);

		var row = table.insertRow(); 
		var cell = row.insertCell(); 
		var viewIcon = ce("i");
		viewIcon.setAttribute("class", "bx bx-glasses");
		var view = ce("a");
		view.setAttribute("href","03_view_deliverable.html?deliverable="+deliverableAddress);
		view.append(viewIcon);
		view.append(text("view"));
		cell.append(view);
		if(status === "OPEN") {
			// view 
			if(isAdmin){
				row = table.insertRow(); 
				cell = row.insertCell(); 						
				// cancel
				addCancelDeliverable(cell, deliverableAddress);
			}
		}
		if(status === "IN_CLAIM") {
			// view 
			// cancel
			if(isAdmin){
				row = table.insertRow(); 
				cell = row.insertCell(); 						
				// cancel
				addCancelDeliverable(cell, deliverableAddress);
			}
		}
		if(status === "PRODUCT_CANCELLED") {
			// view 			
		}
		if(status === "PRODUCT_APPROVED") {
			// view 
			// cancel
			if(isAdmin){
				row = table.insertRow(); 
				cell = row.insertCell(); 						
				// cancel
				addCancelDeliverable(cell, deliverableAddress);
			}			
		}
		if(status === "ALL_REWARDS_APPROVED") {
			// view

			// Push to Atheneum 
			if(isAdmin || isLeader){
				row = table.insertRow(); 
				cell = row.insertCell(); 
				var pushIcon = ce("i");
				pushIcon.setAttribute("class", "bx bx-x-circle");
				var push = ce("a");
				push.setAttribute("href","javascript:pushToAtheneum(\""+deliverableAddress+"\")"); 
				push.append(pushIcon);
				push.append(text("Push To Atheneum"));
				cell.append([push]);	
			}			
		}

	})
	.catch(function(err){
		console.log(err);
	})
}

function cancelDeliverable(deliverableAddress) {
	iEvidenceDaoRewardedProduct = getContract(iEvidenceDaoRewardedProductAbi, deliverableAddress); 
	iEvidenceDaoRewardedProduct.methods.cancel().send({from : account})
	.then(function(resp){
		console.log(resp);
		deliverablesMessageSpan.innerHTML = ""; 
		deliverablesMessageSpan.append(text("CANCELLED: <a href="+chain.blockExplorerUrls[0]+"hash/"+resp.blockHash+">" +resp.blockHash +"</a>"));
	})
	.catch(function(err){
		console.log(err);
	})
}

function pushToAtheneum(deliverableAddress) {
	iEvidenceDaoProjectDeliverable = getContract(iEvidenceDaoProjectDelvierableAbi, deliverableAddress);
	iEvidenceDaoProjectDeliverable.methods.pushToAtheneum().send({from : account})
	.then(function(resp){
		console.log(resp);
		deliverablesMessageSpan.innerHTML = ""; 
		deliverablesMessageSpan.append(text("PUSHED: <a href="+chain.blockExplorerUrls[0]+"hash/"+resp.blockHash+">" +resp.blockHash +"</a>"));
	})
	.catch(function(err){
		console.log(err);
	})
}

function addCancelDeliverable(cell, deliverableAddress) {
	var cancelIcon = ce("i");
	cancelIcon.setAttribute("class", "bx bx-x-circle");
	var cancel = ce("a");
	cancel.setAttribute("href","javascript:cancelDeliverable(\""+deliverableAddress+"\")"); 
	cancel.append(cancelIcon);
	cancel.append(text("Cancel"));
	cell.append(cancel);
}

function populateSeedData(projectDetailsTable) {
	iEvidenceDaoProject.methods.getSeed().call({from : account})
	.then(function(resp){
	  console.log(resp);
	  var seed = resp; 	  
	  projectNameSpan.innerHTML = ""; 
	  projectNameSpan.append(text(seed.name));
	  setValueElement(projectDetailsTable,"Project Leader", shortenLinkCopyAddress(seed.leader));
	  setValue(projectDetailsTable,"Start Date", convertToDateString(seed.startDate));
	})
	.catch(function(err){
	  console.log(err);
	});
  }




