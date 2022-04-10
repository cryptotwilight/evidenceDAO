// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "../interfaces/IEDAOProjectDeliverable.sol";
import "../interfaces/IEvidenceDAONFT.sol";

contract EDAOProjectDeliverable is IEDAOProjectDeliverable{

    address project; 
    string name; 
    address assigned; 
    uint256 dueDate; 
    uint256 assessmentDueDate; 
    uint256 reward; 
    uint256 denominatedRewardonCreation; 
    string  rewardCurrency; 
    address erc721Address;


    uint256 assessmentDate; 
    string ipfsContentHash;
    string ipfsCommentaryHash;
    string status; 
    uint256 deliveredDate; 
    string [] additionalContributors;
    string contentName;  
    string result; 

    IEvidenceDAONFT eDAONFT; 

    constructor(address _project, 
                    string memory _name, 
                        uint256 _dueDate, 
                            uint256 _assessmentDueDate, 
                                uint256 _reward, 
                                    string memory _rewardCurrency,
                                    uint256 _denominatedRewardonCreation,
                                         address _erc721Address ) {
        name = _name; 
        project = _project; 
        dueDate = _dueDate; 
        assessmentDueDate = _assessmentDueDate;
        reward = _reward; 
        denominatedRewardonCreation = _denominatedRewardonCreation;
        status = "OPEN";
        erc721Address = _erc721Address; 
        rewardCurrency = _rewardCurrency;
        eDAONFT = IEvidenceDAONFT(_erc721Address);
    }

    function getName() view external returns(string memory _name){
        return name; 
    }

    function getProject() view external returns(address _project) {
        return project; 
    }

    function getAssigned() view external returns (address _teamMember){
        return assigned; 
    }
    function getDueDate() view external returns (uint256 _dueDate){
        return dueDate; 
    }

    function getAssessmentDueDate() view external returns (uint256 _dueDate){
        return assessmentDueDate;
    }

    function getAssessmentDate() view external returns (uint256 _assessmentDate){
        return assessmentDate; 
    }

    function getAssessmentResult() view external returns (string memory _result) {
        return result; 
    }

    function getReward() view external returns (uint256 _reward){
        return reward; 
    }

    function getRewardCurrency() view external returns (string memory _currency){
        return rewardCurrency;
    }

    function getDenominatedREwardOnCreation() view external returns (uint256 _price){
        return denominatedRewardonCreation; 
    }
    function getStatus() view external returns (string memory _status){
        return status; 
    }

    function getContentName() view external returns (string memory _contentName){
        return contentName; 
    }

    function getIpfsContentHash() view external returns (string memory _contentHash){
        return ipfsContentHash; 
    }
    function getIpfsCommentaryHash() view external returns (string memory _commentaryHash){
        return ipfsCommentaryHash; 
    }
    function getDocumentNFTContract() view external returns (address _erc721Address){
        return erc721Address; 
    }

    function getDeliveredDate() view external returns (uint256 _deliveredDate){
        return deliveredDate; 
    }


    function submitDeliverable (string memory _contentName, string [] memory _additionalContributors, string memory _ipfsContentHash) external returns (bool _submitted) {
        contentName = _contentName; 
        additionalContributors = _additionalContributors; 
        ipfsContentHash = _ipfsContentHash;
        eDAONFT.mintDocument(msg.sender, _ipfsContentHash);
        deliveredDate = block.timestamp; 
        return true; 
    }

    function setAssigned( address _assigned) external returns (bool set){
        assigned = _assigned; 
        return true; 
    }

    function setAdditionalContributors(string [] memory _users) external returns (bool _additionalContributors) {
        additionalContributors = _users; 
        return true; 
    }

    function setContentHash(string memory _ipfsContentHash) external returns (bool _added) {
        ipfsContentHash = _ipfsContentHash; 
        deliveredDate = block.timestamp; 
        eDAONFT.mintDocument(msg.sender, _ipfsContentHash);
        status = "DELIVERED";
        return true; 
    }

    function setIpfsCommentaryHash(string memory _ipfsCommentaryHash, string memory _assessmentResult) external returns (bool _added) {
        ipfsCommentaryHash = _ipfsCommentaryHash; 
        assessmentDate = block.timestamp; 
        eDAONFT.mintDocument(msg.sender, _ipfsCommentaryHash);
        result = _assessmentResult;
        status = "ASSESSED";
        return true; 
    }


}