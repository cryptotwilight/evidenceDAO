// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;

import {RewardedProductSeed} from "./IEvidenceDaoRewardedProduct.sol";
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvdienceDaoProject
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev represents a project within a given DAO
 */

 /** 
  * @dev this represents the Administrative actions that can be taken against member of the project
  */
enum MEMBER_ACTIONS {ALLOW, DISALLOW, BOOT}
 
 /** 
  * @dev ProjectSeed represents the basic information necessary to create a project for a given DAO 
  */
struct ProjectSeed { 
    /** @dev name of the project */
    string name; 
    /** @dev leader of the project */
    address leader;
    /** @dev start date for the project */ 
    uint256 startDate; 
    /** @dev end date for the project */
    uint256 endDate; 
    /** @dev dao which is running the project */
    address dao; 
}

interface IEvidenceDaoProject { 

    /** 
     * @dev this returns the seed used to create this project
     * @return _seed for this project
     */
    function getSeed() view external returns (ProjectSeed memory _seed);

    /** 
     * @dev this returns the status of the project
     * @return _status of the project
     */
    function getStatus() view external returns (string memory _status);

    /** 
     * @dev this returns the deliverables that are configured for this project
     * @return _deliverableAddresses list of contract addresses representing deliverables 
     */
    function getDeliverables() view external returns (address [] memory _deliverableAddresses);

    /** 
     * @dev this ise used to determine whether the given address represents a deliverable for this project 
     * @param _deliverable address potentially holding deliverable contract
     * @return _isKnown true if this is a known deliverable 
     */
    function isKnownDeliverable(address _deliverable) view external returns (bool _isKnown);
    
    /** 
     * @dev this is used to return the team leader for this project 
     * @return _teamLeader address for this project 
     */
    function getLeader() view external returns (address _teamLeader);
    
    /** 
     * @dev this is used to return the current team members on this project 
     * @return _teamMembers address list 
     */
    function getMembers() view external returns(address []  memory _teamMembers);

    /** 
     * @dev this is used to return the current joiners on this projectt 
     * @return _joiners address list 
     */
    function getJoiners() view external returns (address[] memory _joiners);

    /** 
     * @dev this is used to return the current leavers for this project
     * @return _leavers address list
     */
    function getLeavers() view external returns (address [] memory _leavers);

    /** 
     * @dev this is used to determine whether the given address is that of a current project member 
     * @param _member address of potential member
     * @return _isMember true if the address is a current member
     */
    function isMember(address _member) view external returns (bool _isMember);

    /** 
     * @dev this is used to assign a new leader for this project 
     * @param _newLeader address of new leader      
     * @return _assigned true if the leader is successfully assigned 
     */
    function assignLeader(address _newLeader) external returns (bool _assigned);

    /** 
     * @dev this is used to execute actions against members of this project 
     * @param _member against whom action is to be taken
     * @param _action to be taken against member
     * @return _executed true if the action is successfully executed 
     */
    function executeMemberAction(address _member, MEMBER_ACTIONS _action) external returns (bool _executed);
    
    /** 
     * @dev this is used by members of the DAO to join the project
     * @return _joined true if the project is successfully joined 
     */
    function joinProject() external returns(bool _joined);
    
    /** 
     * @dev this is used by members of the project to leave the project
     * @return _left true if the project is successfully left 
     */
    function leaveProject() external returns (bool _left);
    
    /** 
     * @dev this is used to create a deliverable for this contract 
     * @param _deliverableSeed seed for the deliverable 
     * @param _assessmentSeed seed for the deliverable assessment 
     * @return _deliverableAddress address of the deliverable contract 
     */
    function createDeliverable(RewardedProductSeed memory _deliverableSeed, RewardedProductSeed memory _assessmentSeed)  external returns (address _deliverableAddress);

    /** 
     * @dev this is used by deliverables to notify them of other deliverables created by the deliverable so they are recognised by the security scheme 
     * @param _deliverable address that has been newly created 
     * @return _recieved true if the notification has been successfully recieved 
     */
    function notifyDerivativeDeliverable(address _deliverable) external returns (bool _recieved);
    /**
     * @dev this enables the Project to update it's configuration after Evidence DAO maintenance changes
     * @return _recieved true if the notification was recieved
     */
    function notifyChangeOfAddress() external returns (bool _recieved);

    /**
     * @dev this shuts down the Project. 
     * @return _isShutdown true if the Project is successfully shutdown 
     */
    function shutdownProject() external returns (bool _isShutdown);
}