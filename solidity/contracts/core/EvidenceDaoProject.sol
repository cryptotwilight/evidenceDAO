// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoMemberRegister.sol";
import "../interfaces/IEvidenceDaoProject.sol";
import "../interfaces/IEDaoDeliverableFactory.sol";
import "../interfaces/IEvidenceDaoProjectDeliverable.sol";

contract EvidenceDaoProject is IEvidenceDaoProject, IOpenVersion { 

    using LOpenUtilities for address; 
    using LOpenUtilities for string; 

    string constant name                        = "EVIDENCE_DAO_PROJECT"; 
    uint256 constant version                    = 3; 
    
    string constant registryCA                  = "RESERVED_OPEN_REGISTER_LITE";
    string constant deliverableFactoryCA        = "RESERVED_EVIDENCE_DAO_DELIVERABLE_FACTORY";

    address self; 
    ProjectSeed seed; 

    IOpenRegisterLite registry; 
    IEvidenceDao dao; 
    IEvidenceDaoMemberRegister registeredMembers; 
    IEDaoDeliverableFactory deliverableFactory; 

    address leader; 

    bool shutdown = false; 

    address [] joiners; 
    mapping(address=>bool) isJoined; 

    address [] leavers; 

    address [] members; 
    mapping(address=>bool) knownMembers;

    address [] deliverables; 
    mapping(address=>bool) knownDeliverables; 
    

    constructor(ProjectSeed memory _seed, address _registry) {
        seed = _seed; 
        dao = IEvidenceDao(_seed.dao);
        registeredMembers = IEvidenceDaoMemberRegister(_seed.dao);
        registry = IOpenRegisterLite(_registry);
        deliverableFactory = IEDaoDeliverableFactory(registry.getAddress(deliverableFactoryCA));
        self = address(this);
        joinInternal(_seed.leader);
        allowInternal(_seed.leader);
        assignLeaderInternal(_seed.leader);        
    }

    function getName() pure external returns (string memory _name){
        return name; 
    }

    function getVersion() pure external returns (uint256 _version) {
        return version; 
    }

    function getSeed() view external returns (ProjectSeed memory _seed){
        return seed; 
    }

    function getStatus() view external returns (string memory _status){
        if(shutdown) {
            return "SHUTDOWN";
        }
        if(block.timestamp > seed.endDate) {
            return getStatusFromDeliverables();
        }
        return "ACTIVE";
    }

    function getDeliverables() view external returns (address [] memory _deliverableAddresses){
        projectMembersOrAdminOnly();
        return deliverables; 
    }

    function isKnownDeliverable(address _deliverable) view external returns (bool _isKnown) {
        return knownDeliverables[_deliverable];
    }

    function getLeader() view external returns (address _teamLeader){
        return leader; 
    }
    
    function getMembers() view external returns(address []  memory _teamMembers){
        return members; 
    }

    function isMember(address _member) view external returns (bool _isMember) {
        return knownMembers[_member];
    }

    function assignLeader(address _newLeader) external returns (bool _assigned){
        checkShutdown();
        leaderOrAdminOnly(); 
        return assignLeaderInternal(_newLeader); 
    }

    function getJoiners() view external returns (address[] memory _joiners) {
        leaderOrAdminOnly(); 
        return joiners; 
    }

    function getLeavers() view external returns (address [] memory _leavers) {
        leaderOrAdminOnly(); 
        return leavers; 
    }

    function executeMemberAction(address _member, MEMBER_ACTIONS _action) external returns (bool _executed){
        leaderOrAdminOnly(); 
        require(isJoined[_member], "member not joined");
        if(_action == MEMBER_ACTIONS.ALLOW){
            return allowInternal(_member); 
        }
        if(_action == MEMBER_ACTIONS.DISALLOW){
            members = _member.remove(members);
            delete knownMembers[_member];
            joiners.push(_member);  
            if(_member == leader){
                leader = address(0);
            }
            return true; 
        }
        if(_action == MEMBER_ACTIONS.BOOT){
            return leaveInternal(_member);
        }
        return false; 
    }
    
    function joinProject() external returns(bool _joined){
        checkShutdown();
        registeredMemberOnly();
        return joinInternal(msg.sender); 
    }
    
    function leaveProject() external returns (bool _left){
        require(knownMembers[msg.sender] || isJoined[msg.sender], " unknown member / joiner ");
        return leaveInternal(msg.sender);        
    }

    
    function createDeliverable(RewardedProductSeed memory _deliverableSeed, RewardedProductSeed memory _assessmentSeed)  external returns (address _deliverableAddress){
        checkShutdown();
        leaderOrAdminOnly(); 
        _deliverableAddress = deliverableFactory.getDeliverable(_deliverableSeed, _assessmentSeed);
        deliverables.push(_deliverableAddress);
        knownDeliverables[_deliverableAddress] = true; 
        return _deliverableAddress; 
    }

    function shutdownProject() external returns (bool _isShutdown){
        adminOnly();
        shutdown = true; 
        return shutdown; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved) {
        adminOnly(); 
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        deliverableFactory = IEDaoDeliverableFactory(registry.getAddress(deliverableFactoryCA));    
        return true; 
    }
    //============================== INTERNAL ===============================================

    function joinInternal(address _joiner) internal returns (bool _joined){
        require(!isJoined[_joiner], "already joined");
        joiners.push(_joiner);
        isJoined[_joiner] = true; 
        return true; 

    }

    function allowInternal(address _member) internal returns (bool _allowed){
        joiners = _member.remove(joiners);
        members.push(_member);
        knownMembers[_member] = true; 
        return true; 
    }

    function assignLeaderInternal(address _newLeader) internal returns (bool _assigned) {
        require(knownMembers[_newLeader], " leader must be project member ");
        leader = _newLeader; 
        return true; 
    }

    function getStatusFromDeliverables() view internal returns (string memory _status) {
        for(uint256 x = 0; x < deliverables.length; x++){
            IEvidenceDaoProjectDeliverable deliverable = IEvidenceDaoProjectDeliverable(deliverables[x]);
            string memory deliverableStatus_ = deliverable.getStatus(); 
            if(!deliverableStatus_.isEqual("ALL_REWARDS_APPROVED")){
                return "OVERDUE";
            }
        }
        return "COMPLETED";
    }

    function leaveInternal(address _leaver) internal returns (bool) {

        delete isJoined[_leaver];
        if(_leaver.isContained(joiners)) {
            joiners = _leaver.remove(joiners);
        }
        else { 
            members = _leaver.remove(members);   
            delete knownMembers[_leaver];
        }
        leavers.push(_leaver);
        
        return true; 
    }

    function checkShutdown() view internal returns (bool) { 
        require(!shutdown, "project shutdown");
        return true; 
    }

    function projectMembersOrAdminOnly() view internal returns (bool ){
        require(knownMembers[msg.sender] || registeredMembers.isAdministrator(msg.sender), "project members or admin only");
        return true;
    }

    function registeredMemberOnly() view internal returns (bool) {
        require(registeredMembers.isRegisteredMember(msg.sender),"registered member only");
        return true; 
    }

    function adminOnly() view internal returns (bool) {
        require(registeredMembers.isAdministrator(msg.sender), "admin only");
        return true; 
    }

    function leaderOrAdminOnly() view internal returns (bool) {
        require(msg.sender == leader || registeredMembers.isAdministrator(msg.sender), "leader or admin only"  );
        return true; 
    }

}