// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface IEDAOProjectDeliverable { 

    function getName() view external returns(string memory _name);
    function getAssigned() view external returns (address _teamMember);
    function getDueDate() view external returns (uint256 _dueDate);
    function getAssessmentDueDate() view external returns (uint256 _dueDate);
    function getAssessmentDate() view external returns (uint256 _assessmentDate);
    function getDeliveredDate() view external returns (uint256 _deliveredDate);

    function getReward() view external returns (uint256 _reward);
    function getDenominatedREwardOnCreation() view external returns (uint256 _price);
    function getRewardCurrency() view external returns (string memory _currency);
    function getStatus() view external returns (string memory status); 
    function getIpfsContentHash() view external returns (string memory _contentHash);
    function getIpfsCommentaryHash() view external returns (string memory _commentaryHash);
    function getDocumentNFTContract() view external returns (address _erc721Address);

}
