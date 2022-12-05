// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IEvidenceDaoMemberRegister.sol";
import "../interfaces/IEvidenceDaoProject.sol";
import "../interfaces/IEvidenceDaoProofNFT.sol";
import "../interfaces/IEvidenceDaoRewardedProduct.sol";

contract EvidenceDaoRewardedProduct is IEvidenceDaoRewardedProduct, IOpenVersion { 

    using LOpenUtilities for address; 

    string name                         = "EVIDENCE_DAO_REWARDED_PRODUCT" ;
    uint256 version                     = 10; 
    
    string constant registryCA          = "RESERVED_OPEN_REGISTER_LITE";

    RewardedProductSeed seed; 
    IOpenRegisterLite registry; 
    IEvidenceDaoProject project; 

    address [] assignees; 
    mapping(address=>bool) knownAssignees; 

    uint256 completedDate;
    string contentManifest; 
    string status; 
    bool filed = false;
    bool approved = false; 
    bool cancelled = false;  
    
    constructor(RewardedProductSeed memory _seed, address _registry){
        seed = _seed; 
        registry = IOpenRegisterLite(_registry);
        project = IEvidenceDaoProject(_seed.project);
        for(uint256 x = 0; x < _seed.assignees.length; x++) {
            assignInternal(_seed.assignees[x]);
        }                
        status = "OPEN";
    }

    function getName() view external returns (string memory _name){
        return name; 
    }

    function getVersion() view external returns (uint256 _version) {
        return version; 
    }

    function getStatus() virtual view external returns (string memory _status){
        return status; 
    }

    function getSeed() view external returns (RewardedProductSeed memory _seed){
        return seed; 
    }

    function getAssignees() view external returns (address [] memory _assignees){
        return assignees; 
    }

    function getCompletedDate() view external returns (uint256 _completedDate){
        return completedDate; 
    }

    function getContentManifest() view external returns (string memory _ipfsHash){
        return contentManifest; 
    }

    function getProofsNFTAddress() view external returns (address _erc721){
        return seed.proofNft; 
    }

    function claimReward(string memory _ipfsManifest) external returns (bool _claimed){
        checkCancelled();
        assigneeOnly();
        IEvidenceDaoProofNFT mint_ = IEvidenceDaoProofNFT(seed.proofNft);
        mint_.mint(msg.sender, _ipfsManifest);
        completedDate = block.timestamp; 
        filed = true; 
        contentManifest = _ipfsManifest;
        status = "IN_CLAIM";
        return true; 
    }

    function approveReward() virtual external returns (bool _approved){
        checkCancelled();
        adminOnly(); 
        return approveRewardInternal();
    }

    function allowProductUpdate() external returns (bool _allowed){
        checkCancelled();
        adminOnly(); 
        require(approved == false, "product already approved");        
        filed = false;
        return true; 
    }

    function addAssignee(address _assignee) external returns (bool _added){
        checkCancelled();
        leaderOrAdminOnly(); 
        assignInternal(_assignee);
        return true; 
    }

    function removeAssignee(address _assignee) external returns (bool _removed){
        selfOrLeaderOrAdminOnly(_assignee);
        require(knownAssignees[_assignee], "unknown assignee");
        delete knownAssignees[_assignee];
        assignees = _assignee.remove(assignees);
        return true; 
    }

    function cancel() external returns (bool _cancelled){
        adminOnly();
        status = "PRODUCT_CANCELLED"; 
        return true;         
    }

    function notifyChangeOfAddress() external returns (bool _recieved) {
        adminOnly(); 
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        return true; 
    }

     
    // ====================================== INTERNAL =================================================

    function assignInternal(address _assignee) internal returns (bool) {
        if(seed.projectMemberAssignmentsOnly) {
            require(project.isMember(_assignee),"assignee not project member");
        }
        require(!knownAssignees[_assignee], "already assigned");
        knownAssignees[_assignee] = true; 
        assignees.push(_assignee);
        return true; 
    }

    function approveRewardInternal() internal returns (bool){        
        require(filed, "deliverable not filed");
        approved = true;         
        status = "PRODUCT_APPROVED";
        return approved; 
    }


    function checkCancelled() view internal returns (bool) {
        require(!cancelled, "product cancelled");
        return true; 
    }

    function adminOnly() view internal returns (bool) {
        require(getMemberRegister().isAdministrator(msg.sender), "admin only");
        return true; 
    }

    function selfOrLeaderOrAdminOnly(address _self) view internal returns (bool) {
        require(msg.sender == _self || project.getLeader() == msg.sender || getMemberRegister().isAdministrator(msg.sender), "self or admin only");
        return true; 
    }

    function assigneeOnly() view internal returns (bool) {
        require(knownAssignees[msg.sender], "assignee only");
        return true; 
    }

    function leaderOrAdminOnly() view internal returns (bool) {
        require( project.getLeader() == msg.sender || getMemberRegister().isAdministrator(msg.sender), "admin or leader or assignee only");
        return true; 
    }


    function getMemberRegister() view internal returns (IEvidenceDaoMemberRegister _register) {
        return IEvidenceDaoMemberRegister(project.getSeed().dao); 
    }


}