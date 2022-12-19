var isAdmin 			= false; 
var isLeader 			= false; 
var isProjectMember	 	= false; 
var isRegisteredMember 	= false; 
var isDaoMember			= false; 
var isUnknown 			= false; 


function getViewerRole() { 
	checkIsDaoAdmin();	
}

function checkIsDaoAdmin() { 
	iEvidenceDaoMemberRegister.methods.isAdministrator(account).call({from : account})
	.then(function(resp){
		console.log(resp);
		isAdmin = resp; 
		if(!isAdmin) {
			checkIsLeader(); 
		}
		else { 
			loadProfiles();
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsLeader() {
	console.log("checking admin");
	iEvidenceDaoProject.methods.getLeader().call({from : account})
	.then(function(resp){
		console.log(resp);
		var leader = resp; 
		isLeader = leader.toLowerCase() === account.toLowerCase(); 		
		if(!isLeader){
			checkIsProjectMember(); 
		}
		else {
			isProjectMember = true; 
			loadProfiles();			
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsProjectMember() { 
	iEvidenceDaoProject.methods.isMember(account).call({from : account})
	.then(function(resp){
		console.log(resp);
		isProjectMember = resp; 		
		if(!isProjectMember){
			checkIsRegisteredMember(); 
		}
		else { 
			loadProfiles();
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsRegisteredMember() {
	iEvidenceDaoMemberRegister.methods.isRegisteredMember(account).call({from : account})
	.then(function(resp){
		console.log(resp);
		isRegisteredMember = resp; 
		if(!isRegisteredMember) {
			checkIsDaoMember(); 
		}
		else { 
			loadProfiles();
		}
	})
	.catch(function(err){
		console.log(err);
	})
}

function checkIsDaoMember() {

	if(daoSeed.memberTokenType === 0){
		var iErc721 = getContract(iErc721MetadataAbi, daoSeed.membershipToken);
		iErc721.methods.balanceOf(account).call({from : account})
		.then(function(resp){
			var balance = resp; 
			if(balance >= daoSeed.memberTokenLimit){
				isDaoMember = true; 
			}
			else { 
				isUnknown = true; 
			}
			loadProfiles();
		})
		.catch(function(err){
			console.log(err);
		})
	}
	if(daoSeed.memberTokenType === 1){
		var iErc20 = getContract(iErc20MetadataAbi, daoSeed.membershipToken);
		iErc20.methods.balanceOf(account).call({from : account})
		.then(function(resp){
			var balance = resp; 
			if(balance >= daoSeed.memberTokenLimit){
				isDaoMember = true; 
			}
			else { 
				isUnknown = true; 
			}
		})
		.catch(function(err){
			console.log(err);
		})
	}		

}

