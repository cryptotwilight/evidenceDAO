const openRegisterLiteAddress = "0xB0030f8Ec426b8b88104f5E807b5b25B300c8358"; 

const daoNameField        = ge("dao_search_field");
const searchForDaoButton  = ge("search_for_dao_button");

searchForDaoButton.addEventListener("onclick",search);

const registerDaoButton   = ge("register_dao_button");

const daoResultsTable     = ge("dao_results_table");

const newDaoLogo              = ge("new_dao_logo");
const daoName                 = ge("dao_name");
const membershipTokenContract = ge("membership_token_contract");
const membershipTokenLimit    = ge("membership_token_limit");
const membershipTokenType     = ge("membership_token_type");
const administratorAddress    = ge("administrator_address");
const proofsNFTSymbol         = ge("proofs_nft_symbol");



var iEvidenceDaoCoreContract;

function registerDao() { 
   var daoSeed = {};
  daoSeed.name = daoName.value; 
  waiting = true; 
  getLogoIpfsHash(daoSeed);
 
}

async function getLogoIpfsHash(daoSeed) {
  console.log(newDaoLogo.files[0]);
  return await ipfs.add(newDaoLogo.files[0])
				.then(function(resp){
					console.log(resp);
					var hash = resp[0].hash; 
					console.log("dao logo ipfs hash:" + hash);
					daoSeed.logoIpfsHash = hash; 
					daoSeed.nftSymbol = proofsNFTSymbol.value; 
					daoSeed.membershipToken = membershipTokenContract.value; 
					daoSeed.membershipTokenLimit = membershipTokenLimit.value; 
					daoSeed.administrator = administratorAddress.value; 
					daoSeed.memberTokenType = membershipTokenType.value; 
					iEvidenceDaoCoreContract.methods.registerDAO(daoSeed).send({from : account})
					.then(function(resp){
					  console.log(resp);          
					  console.log(daoSeed);
					  loadDaos();
					})
					.catch(function(err){
					  console.log(err);
					})
				   return hash; 
				})
				.catch(function(err){
				  console.log(err);
				  return "ERROR"; 
				}); 
}

function search() {
  var daoName = daoNameField.value; 
  iEvidenceDaoCoreContract.methods.findDAO(daoName).call({from : account})
  .then(function(resp){
	console.log(resp);
	clear(daoResultsTable);
	var dao = resp; 
	addDaoRow(dao);
  })
  .catch(function(err){
	console.log(err);
	dispError("DAO not found.");
  })
}

function loadPageData (){ 
  loadDaos();
}


async function configureCoreContracts() { 
  iOpenRegisterLiteContract =  getContract(iOpenRegisterLiteAbi, openRegisterLiteAddress);
  iOpenRegisterLiteContract.methods.getAddress("RESERVED_EVIDENCE_DAO_CORE").call({from : account})
  .then(function(resp){
	console.log(resp);
	var evidenceDAOCoreAddress = resp; 
	iEvidenceDaoCoreContract = getContract(iEvidenceDAOCoreAbi, evidenceDAOCoreAddress);          
   
  })
  .catch(function(err){
	console.log(err);               
  });
}

function loadDaos() { 
  iEvidenceDaoCoreContract.methods.getDAOs().call({from : account})
  .then(function(resp){
	console.log(resp);
	var daos = resp; 
	clear(daoResultsTable);
	for(var x = 0; x < daos.length;x++) {
	  var dao = daos[x];
	  addDaoRow(dao);
	}
  })
  .catch(function(err){
	console.log(err);
	dispError(err.message);
  })
}

function dispError(msg) {
  clear(daoResultsTable);
  var row = daoResultsTable.insertRow(); 
  var cell = row.insertCell(); 
  cell.setAttribute("colspan","5" );
  cell.append(text(msg));
}



function addDaoRow(daoAddress) {
  iEvidenceDaoContract =  getContract(iEvidenceDaoAbi, daoAddress);
  iEvidenceDaoContract.methods.getSeed().call({from : account})
  .then(function(resp){
	  console.log(resp);
	  var row = daoResultsTable.tBodies[0].insertRow(); 
	  
	  var seed = resp; 
	  
	  var logoCell = row.insertCell(); 
	  
	  var img = ce("img");
	  var hash = seed.logoIpfsHash;
	  if(hash.includes("http")){
		image = hash; 
	  }
	  else { 
		image = ipfsRoot + hash; 
	  }
	  img.setAttribute("src", image);
	  img.setAttribute("alt", seed.name);
	  logoCell.append(img);

	  var daoNameCell = row.insertCell(); 
	  daoNameCell.append(text(seed.name));

	  var membershipTokenCell = row.insertCell(); 
	  membershipTokenCell.append(text(seed.membershipToken));


	  var daoAdministratorCell = row.insertCell(); 
	  daoAdministratorCell.append(text(seed.administrator));

	  var nftProofsSymbolCell = row.insertCell(); 
	  nftProofsSymbolCell.append(text(seed.nftSymbol));

	  var viewDaoCell = row.insertCell(); 
	  var a = ce("a");
	  a.setAttribute("href","01_view_dao.html?dao="+daoAddress);
	  a.append(text("view dao"));
	  viewDaoCell.append(a);

	  var administerCell = row.insertCell(); 
	   setAdmin(administerCell, daoAddress);

  })
  .catch(function(err){
	console.log(err);
  })
}

function setAdmin(administerCell, daoAddress) { 
  iEvidenceDaoMemberRegister = getContract(iEvidenceDaoMemberRegisterAbi, daoAddress);
  iEvidenceDaoMemberRegister.methods.isAdministrator(account).call({from : account}) 
  .then(function(resp){
	console.log(resp);
	if(resp === true) {	 
	  administerCell.append(text("Viewer is Admin"));
	}
  })
  .catch(function(err){
	console.log(err);
  })
}

function clear(table) {
  console.log(table);
  console.log(table.tBodies);
  var tbody = table.tBodies[0];
  console.log("tbody " + tbody);
  tbody.innerHTML = ""; 
  console.log(tbody.rows); 

}