// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../interfaces/IEDAOProject.sol";

import "./EDAOProjectDeliverable.sol";

import "https://github.com/unlock-protocol/unlock/blob/7af56a956b75b8c210c99b7af0ceb52fe8d5c64b/smart-contracts/contracts/interfaces/IPublicLock.sol";

contract EDAOProject is IEDAOProject {

    address dao; 
    string name; 
    address teamLead;  

    address evidencewDAONFTAddress;

    address [] deliverables; 
    mapping(string=>address) deliverableByName;
    address [] teamMembers; 
    mapping(address=>bool) isTeamMemberByTeamMember; 
    address self; 
    uint256 dueDate; 
    uint256 assessmentDueDate;
    IPublicLock lock; 

    constructor(address _dao, string memory _name, address _teamLead, uint256 _dueDate, uint256 _assessmentDueDate, address lockAddress, address _evidencewDAONFTAddress) {
        dao = _dao; 
        name = _name; 
        teamLead = _teamLead; 
        teamMembers.push(teamLead);
        isTeamMemberByTeamMember[teamLead] = true;         
        self = address(this);
        evidencewDAONFTAddress = _evidencewDAONFTAddress; 
        dueDate = _dueDate; 
        assessmentDueDate = _assessmentDueDate;
        lock = IPublicLock(lockAddress);
    }

    function getDocumentNFTContract() view external returns (address _evidencewDAONFTAddress){
        return evidencewDAONFTAddress;
    }

    function getTeamLeader() view external returns (address _teamLeader) {
        return teamLead; 
    }

    function assign(address _teamMember, string memory _deliverable) external returns (bool _assigned) {
        require(isTeamMemberByTeamMember[_teamMember], " not a team member ");
        EDAOProjectDeliverable deliverable_ = EDAOProjectDeliverable(deliverableByName[_deliverable]); 
        deliverable_.setAssigned(_teamMember);
        return true; 
    }

    function getTeamMembers() view external returns(address []  memory _teamMembers) {
        return teamMembers; 
    }

    function joinProject() external returns(bool _joined) {
        isTeamMemberByTeamMember[msg.sender] = true; 
        teamMembers.push(msg.sender);
        address[] memory memberAddress_ = new address[](1);
        memberAddress_[0] = msg.sender; 
        address[] memory keyManager = new address[](1);
        keyManager[0] = teamLead; 
        uint [] memory expiry_ = new uint[](1);
        expiry_[0] = (assessmentDueDate*24*60*60);
        lock.grantKeys(memberAddress_, expiry_, keyManager);
        return true; 
    }

    function leaveProject() external returns (bool _left) {        
        delete isTeamMemberByTeamMember[msg.sender];
        return true; 
    }

    function getDeliverables() view external returns (address [] memory _deliverables){
        require(lock.getHasValidKey(msg.sender) || (block.timestamp > (assessmentDueDate *24*60*60)), "invalid key"); // check the content lock
        return deliverables; 
    }

    function createDeliverable(string memory _name, uint256 _reward, uint256 _denominatedRewardonCreation, string memory _rewardCurrency)  external returns (address _deliverableAddress){
        EDAOProjectDeliverable deliverable_ = new EDAOProjectDeliverable(self, 
                    name, 
                        dueDate, 
                            assessmentDueDate, 
                                _reward, 
                                     _rewardCurrency,
                                    _denominatedRewardonCreation,
                                         evidencewDAONFTAddress);
        _deliverableAddress = address(deliverable_);
        deliverableByName[_name] = _deliverableAddress; 
        deliverables.push(_deliverableAddress);
        return _deliverableAddress;
    }

}