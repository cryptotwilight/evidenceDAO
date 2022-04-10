// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/unlock-protocol/unlock/blob/7af56a956b75b8c210c99b7af0ceb52fe8d5c64b/smart-contracts/contracts/interfaces/IUnlock.sol";
import "https://github.com/unlock-protocol/unlock/blob/7af56a956b75b8c210c99b7af0ceb52fe8d5c64b/smart-contracts/contracts/interfaces/IPublicLock.sol";

import "../interfaces/IEDAO.sol";

import "./EDAOProject.sol";

contract EDAO is IEDAO { 

    string name; 
    address[] projects; 
    address administrator; 
    address skillWalletAddress; 
    address unlockAddress; 
    address evidencewDAONFTAddress;
    mapping(string=>address[]) projectsByName;
    address self; 
    IUnlock unlock; 
    address governanceTokenAddress; 


    constructor(string memory _name, address _firstAdministrator, address _unlockAddress, address _governanceTokenAddress, address _skillWalletAddress, address _evidencewDAONFTAddress) {
        name = _name; 
        administrator = _firstAdministrator; 
        unlockAddress = _unlockAddress; 
        skillWalletAddress = _skillWalletAddress; 
        evidencewDAONFTAddress = _evidencewDAONFTAddress; 
        unlock = IUnlock(unlockAddress);
        self = address(this);
        governanceTokenAddress = _governanceTokenAddress; 
    }

    function getName() view external returns (string memory _name){
        return name; 
    }

    function getProjects() view external returns (address[] memory _projects){
        return projects; 
    }

    function getUnlockAddress() view external returns (address _unlockAddress) {
        return unlockAddress; 
    }

    function findProject(string memory _projectName) view external returns (address [] memory _project) {
        return projectsByName[_projectName];
    }

    function getSkillWalletAddress() view external returns (address _skillWalletAddress) {
        return skillWalletAddress;
    }

    function getDocumentNFTContractAddress () view external returns (address _documentNFTContratAddress){
         return evidencewDAONFTAddress; 
    }

    function createProject(string memory _name, 
                                address _teamLead,
                                uint256 _maxTeamSize, 
                                uint256 _participationStake, 
                                 uint256 _projectDueDate, 
                                     uint256 _assessmentDueDate) external returns (address _projectAddress) {   
        address lockAddress_ = unlock.createLock(_assessmentDueDate+24*60*60, governanceTokenAddress, _participationStake, _maxTeamSize, _name, bytes12(bytes("0xf020D5C5"))); // _salt
        IPublicLock lock_ = IPublicLock(lockAddress_);
        lock_.addKeyGranter(_teamLead);
        EDAOProject project_ = new EDAOProject(self, _name, _teamLead, _projectDueDate, _assessmentDueDate, lockAddress_, evidencewDAONFTAddress  );        
        _projectAddress = address(project_);
        lock_.addLockManager(_projectAddress);
        projects.push(_projectAddress);
        projectsByName[_name].push(_projectAddress);

        return _projectAddress; 
    }

}