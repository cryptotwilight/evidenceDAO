// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../interfaces/IEDAO.sol";

import "./EDAOProject.sol";

contract EDAO is IEDAO { 

    string name; 
    address[] projects; 
    address administrator; 
    address skillWalletAddress; 
    address unlockAddress; 
    address evidencewDAONFTAddress;
    mapping(string=>address) projectsByName;
    address self; 

    constructor(string memory _name, address _firstAdministrator, address _unlockAddress, address _skillWalletAddress, address _evidencewDAONFTAddress) {
        name = _name; 
        administrator = _firstAdministrator; 
        unlockAddress = _unlockAddress; 
        skillWalletAddress = _skillWalletAddress; 
        evidencewDAONFTAddress = _evidencewDAONFTAddress; 
        self = address(this);
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

    function getSkillWalletAddress() view external returns (address _skillWalletAddress) {
        return skillWalletAddress;
    }

    function getDocumentNFTContractAddress () view external returns (address _documentNFTContratAddress){
         return evidencewDAONFTAddress; 
    }

    function createProject(string memory _name, 
                                address _teamLead,
                                 uint256 _projectDueDate, 
                                     uint256 _assessmentDueDate) external returns (address _projectAddress) {   
        EDAOProject project_ = new EDAOProject(self, _name, _teamLead, _projectDueDate, _assessmentDueDate, unlockAddress, skillWalletAddress, evidencewDAONFTAddress  );
        _projectAddress = address(project_);
        projectsByName[_name];

        return _projectAddress; 
    }

}