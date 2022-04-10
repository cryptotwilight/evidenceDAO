// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../interfaces/IEDAOProject.sol";

import "./EDAOProjectDeliverable.sol";

contract EDAOProject is IEDAOProject {

    address dao; 
    string name; 
    address teamLead;  
    address unlockAddress; 
    address skillWalletAddress;
    address evidencewDAONFTAddress;

    address [] deliverables; 
    mapping(string=>address) deliverableByName;
    address [] teamMembers; 
    mapping(address=>bool) isTeamMemberByTeamMember; 
    address self; 
    uint256 dueDate; 
    uint256 assessmentDueDate;
    

    constructor(address _dao, string memory _name, address _teamLead, uint256 _dueDate, uint256 _assessmentDueDate, address _unlockAddress, address _skillWalletAddress, address _evidencewDAONFTAddress) {
        dao = _dao; 
        name = _name; 
        teamLead = _teamLead; 
        teamMembers.push(teamLead);
        isTeamMemberByTeamMember[teamLead] = true; 
        unlockAddress = _unlockAddress; 
        skillWalletAddress = _skillWalletAddress; 
        self = address(this);
        evidencewDAONFTAddress = _evidencewDAONFTAddress; 
        dueDate = _dueDate; 
        assessmentDueDate = _assessmentDueDate;
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
        return true; 
    }

    function leaveProject() external returns (bool _left) {
        delete isTeamMemberByTeamMember[msg.sender];
        return true; 

    }

    function getDeliverables() view external returns (address [] memory _deliverables){
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
                                         evidencewDAONFTAddress );
        _deliverableAddress = address(deliverable_);
        deliverableByName[_name] = _deliverableAddress; 
        deliverables.push(_deliverableAddress);
        return _deliverableAddress;
    }

}