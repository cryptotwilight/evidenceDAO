// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./IEDAO.sol";

interface IEDAOProject { 

    function getDocumentNFTContract() view external returns (address _erc721Address);

    function getDeliverables() view external returns (address [] memory _deliverableAddresses);

    function getTeamLeader() view external returns (address _teamLeader);
    function getTeamMembers() view external returns(address []  memory _teamMembers);
    function joinProject() external returns(bool _joined);
    function leaveProject() external returns (bool _left);
    function assign(address _teamMember, string memory _deliverable) external returns (bool _assigned);
    function createDeliverable(string memory _name, uint256 _reward, uint256 _denominatedRewardonCreation, string memory _rewardCurrency)  external returns (address _deliverableAddress);
}