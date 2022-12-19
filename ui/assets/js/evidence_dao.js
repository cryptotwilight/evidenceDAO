var isAdmin 			= false; 
var isLeader 			= false; 
var isProjectMember	 	= false; 
var isRegisteredMember 	= false; 
var isDaoMember			= false; 
var isUnknown 			= false; 

var roleName = ""; 

var deliverableSeed; 
var projectSeed; 
var daoSeed; 

var iEvidenceDaoProject; 
var iEvidenceDaoMemberRegister; 
var iEvidenceDao; 

function getViewerRole() { 
	checkIsDaoAdmin();	
}

function checkIsDaoAdmin() { 
	console.log("checking is admin");
	iEvidenceDaoMemberRegister.methods.isAdministrator(account).call({from : account})
	.then(function(resp){
		console.log(resp);
		isAdmin = resp; 
		if(!isAdmin) {
			checkIsLeader(); 
		}
		else { 
			roleName = "ADMINISTRATOR"; 
			loadProfiles();
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsLeader() {
	console.log("checking is leader");
	iEvidenceDaoProject.methods.getLeader().call({from : account})
	.then(function(resp){
		console.log(resp);
		var leader = resp; 
		isLeader = isAddressMatch(leader, account); 		
		console.log(isLeader);
		if(!isLeader){
			checkIsProjectMember(); 
		}
		else {
			roleName = "PROJECT_LEADER"; 
			isProjectMember = true; 
			console.log(roleName);
			loadProfiles();			
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsProjectMember() { 
	console.log("checking is project member");
	iEvidenceDaoProject.methods.isMember(account).call({from : account})
	.then(function(resp){
		console.log(resp);
		isProjectMember = resp; 		
		if(!isProjectMember){
			checkIsRegisteredMember(); 
		}
		else { 
			roleName = "PROJECT_MEMBER"; 
			loadProfiles();
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsRegisteredMember() {
	console.log("checking is registered member");
	iEvidenceDaoMemberRegister.methods.isRegisteredMember(account).call({from : account})
	.then(function(resp){
		console.log(resp);
		isRegisteredMember = resp; 
		if(!isRegisteredMember) {
			checkIsDaoMember(); 
		}
		else { 
			roleName = "REGISTERED_MEMBER"; 
			loadProfiles();
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsDaoMember() {
	console.log("checking is dao member");
	if(daoSeed.memberTokenType === 0){
		var iErc721 = getContract(iErc721MetadataAbi, daoSeed.membershipToken);
		iErc721.methods.balanceOf(account).call({from : account})
		.then(function(resp){
			var balance = resp; 
			if(balance >= daoSeed.memberTokenLimit){
				roleName = "DAO_MEMBER"; 
				isDaoMember = true; 
			}
			else { 
				roleName = "UNKNOWN"; 
				isUnknown = true; 
			}
			loadProfiles();
		})
		.catch(function(err){
			console.log(err);
		})
	}
	if(daoSeed.memberTokenType === 1){
		console.log("checking is dao member");
		var iErc20 = getContract(iErc20MetadataAbi, daoSeed.membershipToken);
		iErc20.methods.balanceOf(account).call({from : account})
		.then(function(resp){
			var balance = resp; 
			if(balance >= daoSeed.memberTokenLimit){
				roleName = "DAO_MEMBER";
				isDaoMember = true; 
			}
			else { 
				roleName = "UNKNOWN"; 
				isUnknown = true; 
			}
		})
		.catch(function(err){
			console.log(err);
		})
	}		

}

function addReward(cell, seed) {
	var iErc20Metadata = getContract(iErc20MetadataAbi, seed.rewardCurrency);
	iErc20Metadata.methods.decimals().call({from : account})
	.then(function(resp){
		console.log(resp);
		var decimals = resp; 
		var reward = seed.reward / Number("1e"+decimals); 
		cell.append(text(reward));
	})
	.catch(function(err){
		console.log(err);
	})
}

function addRewardCurrency(cell, seed) {	
	iErc20Metadata = getContract(iErc20MetadataAbi, seed.rewardCurrency);
	iErc20Metadata.methods.symbol().call({from : account})
	.then(function(resp){
		console.log(resp);
		var symbol = resp;
		var lnk = ce("a");
		lnk.setAttribute("href", chain.blockExplorerUrls[0] +"address/"+  seed.rewardCurrency);
		lnk.setAttribute("target", "_blank"); 
		lnk.append(text(symbol));
		cell.append(lnk);
	})
	.catch(function(err){
		console.log(err);
	})
}
