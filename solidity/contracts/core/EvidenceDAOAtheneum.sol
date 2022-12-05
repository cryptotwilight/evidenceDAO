// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoMemberRegister.sol";
import "../interfaces/IEvidenceDaoProject.sol";
import "../interfaces/IEvidenceDaoRewardedProduct.sol";
import "../interfaces/IEvidenceDaoProjectDeliverable.sol";
import "../interfaces/IEvidenceDaoAtheneum.sol";

contract EvidenceDaoAtheneum is IEvidenceDaoAtheneum, IOpenVersion { 

    using LOpenUtilities for address; 
    
    string constant evidenceDAOCA   = "RESERVED_EVIDENCE_DAO_CORE";    
    string constant registryCA      = "RESERVED_OPEN_REGISTER_LITE";

    address self; 
    address daoAddress; 
    IEvidenceDao dao; 
    IOpenRegisterLite registry;

    string constant name        = "EVIDENCE_DAO_ATHENEUM";  
    uint256 constant version    = 4; 

    address [] deliverables; 
    mapping(address=>bool) knownDeliverables; 
    mapping(string=>address[]) deliverablesByTerms; 

    mapping(address=>bool) removedDeliverable; 

    constructor(address _registry) {
        registry    = IOpenRegisterLite(_registry);
        self        = address(this);
    }

    function getName() pure external returns (string memory _name){
        return name; 
    }

    function getVersion() pure external returns (uint256 _version) {
        return version; 
    }

    function getDaoName() view external returns (string memory _daoName) {
        return dao.getSeed().name; 
    }

    function getDao() view external returns (address _dao) {
        return daoAddress; 
    }

    function getAvailableDeliverableCount() view external returns (uint256 _count) {
        return deliverables.length; 
    }

    function getAllDeliverables() view external returns (address [] memory _deliverables) {
        require(dao.isMember(msg.sender), "not dao member");
        return deliverables; 
    }

    function findDeliverable(string memory _searchTerm) view external returns (address [] memory _deliverables){
        require(dao.isMember(msg.sender), "not dao member");
        address [] memory deliverables_ = deliverablesByTerms[_searchTerm];
        _deliverables = new address[](deliverables.length);
        uint256 y = 0; 
        for( uint256 x = 0; x < deliverables_.length; x++ ){
            address deliverable_ = deliverables_[x];
            if(!removedDeliverable[deliverable_]){
                _deliverables[y] = deliverable_; 
                y++;
            }
        }
        return _deliverables; 
    }

    function isKnownDeliverable(address _deliverable) view external returns (bool _isKnown){
        return knownDeliverables[_deliverable];
    }

    function addDeliverable(address _deliverable) external returns (bool _added){
        require(!knownDeliverables[_deliverable], "already added");
        deliverableOnly(); 
        deliverables.push(_deliverable);
        knownDeliverables[_deliverable] = true;
        string [] memory searchTerms_ = IEvidenceDaoProjectDeliverable(_deliverable).getSearchTerms();
        for(uint256 x = 0; x < searchTerms_.length; x++) {
            deliverablesByTerms[searchTerms_[x]].push(_deliverable);
        }
        return true; 
    }

    function removeDeliverable(address  _deliverable) external returns (bool _removed){
        require(knownDeliverables[_deliverable], "unknown deliverable");
        adminOnly(); 
        deliverables = _deliverable.remove(deliverables);
        removedDeliverable[_deliverable] = true; 
        return true; 
    }

    function init(address _dao) external returns (bool _set){
        require(registry.getAddress(evidenceDAOCA) == msg.sender, "evidence dao core only");
        daoAddress = _dao; 
        dao = IEvidenceDao(_dao);
        return true; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved) {
        adminOnly();
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        return true; 
    }

    //======================================= INTERNAL ==========================================================================

    function deliverableOnly() view internal returns (bool) {
        require(IEvidenceDaoProject(IEvidenceDaoRewardedProduct(msg.sender).getSeed().project).getSeed().dao == daoAddress, "dao deliverables only");
        return true; 
    }

    function adminOnly() view internal returns (bool) {
        require(IEvidenceDaoMemberRegister(daoAddress).isAdministrator(msg.sender), "admin only");
        return true; 
    }
}