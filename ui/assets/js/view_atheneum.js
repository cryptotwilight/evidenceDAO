const queryString 						= window.location.search;
const urlParams 						= new URLSearchParams(queryString);
const atheneumAddress	 				= urlParams.get("atheneum");

const atheneumNameSpan					= ge("atheneum_name_span");
const atheneumDetailsSpan				= ge("atheneum_details_span");

const atheneumMessageSpan				= ge("atheneum_message_span");

const listDeliverablesTable				= ge("list_deliverables_table");

var isAssessor 				= false; 
var isRegisteredAssessor 	= false; 
var daoAddress; 

function bootPageContracts() { 
	iEvidenceDaoAtheneum = getContract(iEvidenceDaoAtheneumAbi, atheneumAddress);
	iEvidenceDaoAtheneum.methods.getDao().call({from : account})
	.then(function(resp){
		console.log(resp);
		daoAddress = resp; 
		iEvidenceDao = getContract(iEvidenceDaoAbi, daoAddress);
		iEvidenceDaoMemberRegister = getContract(iEvidenceDaoMemberRegisterAbi, daoAddress);
		iEvidenceDao.methods.getSeed().call({from : account})
		.then(function(resp){
			console.log(resp);
			daoSeed = resp; 
			atheneumNameSpan.innerHTML = ""; 
			atheneumNameSpan.append(text(daoSeed.name));
		})
		.catch(function(err){
			console.log(err);
		})
	})
	.catch(function(err){
		console.log(err);
	})
}

function loadPageData() { 
	checkForAdminOnly();	
}

function loadProfiles() {
	console.log("loading profiles");
	populateAtheneumDeliverables();
	populateAtheneumDetails();
}

function populateAtheneumDetails() { 
	atheneumDetailsSpan.innerHTML = "";
	console.log("loading atheneum details");
	iEvidenceDaoAtheneum.methods.getAvailableDeliverableCount().call({from : account})
	.then(function(resp){
		console.log(resp);
		var count = resp; 
		var table = ce("table");
		var row = table.insertRow();
		var cell = row.insertCell(); 
		cell.append(text("Deliverable Count: "));
		cell = row.insertCell(); 
		cell.append(text(count));
		atheneumDetailsSpan.append(table);
	})
	.catch(function(err){
		console.log(err);
	});	
}

function populateAtheneumDeliverables() { 
	atheneumDetailsSpan.innerHTML = ""; 
	iEvidenceDaoAtheneum.methods.getAllDeliverables().call({from : account})
	.then(function(resp){
		console.log(resp);
		var deliverableAddresses = resp; 		
		var table = ce("table");
		atheneumDetailsSpan.append(table);

		for(var x = 0; x < deliverableAddresses.length; x++){
			var row = table.insertRow(); 
			var deliverableAddress = deliverableAddresses[x];
			var deliverable = getContract(iEvidenceDaoProjectDeliverable, deliverableAddress);
			var product 	= getContract(iEvidenceDaoRewardedProductAbi, deliverableAddress);
			addDeliverableRow(row, deliverable, product, deliverableAddress);
		}
	})
	.catch(function(err){
		console.log(err);
	});	

}

function remove(deliverableAddress) {
	iEvidenceDaoAtheneum.methods.removeDeliverable(deliverableAddress).send({from : account})
	.then(function(resp){
		console.log(resp);
		var a = getRespLink(resp);
		atheneumMessageSpan.innerHTML = ""; 
		atheneumMessageSpan.append(text("DELIVERABLE REMOVED: "))
		atheneumMessageSpan.append(a);
	})			
	.catch(function(err){
		console.log(err);
	});	
}

function addDeliverableRow(row, deliverable, product, deliverableAddress){
	var nameCell 		= row.insertCell(); 
	var assessmentCell 	= row.insertCell(); 
	var projectCell 	= row.insertCell(); 
	var completedDateCell = row.insertCell(); 
	var removeCell		= row.insertCell(); 

	if(isAdmin) {
		var rem = ce("a");
		rem.setAttribute("href","javascript:remove(\""+deliverableAddress+"\")");
		var i = ce("i");
		i.setAttribute("class", "bx bx-x-circle");
		rem.append(i);
		rem.append(text(" Remove"));
		removeCell.append(rem);
	}

	product.methods.getSeed().call({from : account})
	.then(function(resp){
		console.log(resp);
		var seed = resp; 
		var project = getContract(iEvidenceDaoProjectAbi, seed.project);
		project.methods.getSeed().call({from : call})
		.then(function(resp){
			console.log(resp);
			var pSeed = resp; 			
			var aa = ce("a");
			aa.setAttribute("href","04_view_assessment.html?assessment="+seed.project);
			aa.append(text(pSeed.name));
			projectCell.append(aa);
		})			
		.catch(function(err){
			console.log(err);
		});	

		var a = ce("a");
		a.setAttribute("href","03_view_deliverable.html?deliverable="+deliverableAddress);
		a.append(text(seed.name));
		nameCell.append(a);
		deliverable.methods.getAssessment().call({from : account})
		.then(function(resp){
			var assessmentAddress = resp; 
			var assessment = getContract(iEvidenceDaoRewardedProductAbi, assessmentAddress);
			assessment.methods.getSeed().call({from : account})
			.then(function(resp){
				console.log(resp);
				var aSeed = resp; 
				var aa = ce("a");
				aa.setAttribute("href","04_view_assessment.html?assessment="+assessmentAddress);
				aa.append(text(aSeed.name));
				assessmentCell.append(aa);
			})			
			.catch(function(err){
				console.log(err);
			});	
			assessment.methods.getCompletedDate().call({from : account})
			.then(function(resp){
				console.log(resp);
				var completedDate = resp; 
				completedDateCell.append(text(convertToDateString(completedDate)));
			})			
			.catch(function(err){
				console.log(err);
			});	
		})
		.catch(function(err){
			console.log(err);
		});
		
		
	})
	.catch(function(err){
		console.log(err);
	});	
}

