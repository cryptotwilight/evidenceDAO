// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


interface IEDAO { 

    function getName() view external returns (string memory _name);

    function getProjects() view external returns (address[] memory _projects);

    function getSkillWalletAddress() view external returns (address _skillWalletAddress);

    function getUnlockAddress() view external returns (address _unlockAddress);

    function getDocumentNFTContractAddress () view external returns (address _documentNFTContratAddress);

}