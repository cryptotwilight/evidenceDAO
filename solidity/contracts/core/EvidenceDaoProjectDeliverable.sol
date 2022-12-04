// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IEvidenceDaoAtheneum.sol";
import "../interfaces/IEDaoRewardedProductFactory.sol";
import "./EvidenceDaoRewardedProduct.sol";

contract EvidenceDaoProjectDeliverable is EvidenceDaoRewardedProduct {

    using LOpenUtilities for string; 

    string constant assessorsRegisterCA         = "RESERVED_EVIDENCE_DAO_ASSESSOR_REGISTER";
    string constant rewardedProductFactoryCA    = "RESERVED_EVIDENCE_DAO_REWARDED_PRODUCT_FACTORY"; 
    string constant atheneumCA                  = "RESERVED_EVIDENCE_DAO_CORE"; 

    string constant APPROVED_STATUS             = "PRODUCT_APPROVED";
    
    address assessor; 
    address assessment; 
    bool booked; 
    RewardedProductSeed assessmentSeed; 

    constructor(RewardedProductSeed memory _seed, 
                RewardedProductSeed memory _assessmentSeed, 
                address _registry ) EvidenceDaoRewardedProduct(_seed, _registry) {
        name = "EVIDENCE_DAO_PROJECT_DELIVERABLE"; 
        version = 4; 
        assessmentSeed = _assessmentSeed;
    }


    function getStatus() override view external returns (string memory _status){
        if(status.isEqual(APPROVED_STATUS)){
            return "ALL_REWARDS_APPROVED";
        }
        return status; 
    }

    function approveReward() override external returns (bool _approved){
        require(IEvidenceDaoRewardedProduct(assessment).getStatus().isEqual(APPROVED_STATUS), " assessment still outstanding ");
        return approveRewardInternal(); 
    
    }

    function getAssessment() view external returns (address _assessment){
        require(booked, "assessment not booked");
        string memory status_ = IEvidenceDaoRewardedProduct(assessment).getStatus();
        require(status_.isEqual(APPROVED_STATUS) || msg.sender == assessor || msg.sender == project.getLeader(), "project not approved / assessor / project leader only");
        return assessment; 
    }

    function getAssessor() view external returns (address _assessor) {
        return assessor; 
    }

    function bookAssessment() external returns (address _assessment){
        require(!booked, "already booked");
        booked = true; 
        require(msg.sender != project.getLeader() && !knownAssignees[msg.sender] && !project.isMember(msg.sender), "assessor cannot be part of project");        
        IEvidenceDaoMemberRegister assessors = IEvidenceDaoMemberRegister(registry.getAddress(assessorsRegisterCA));
        require(assessors.isRegisteredMember(msg.sender), "un-registered assessor");

        address [] memory assessor_ = new address[](1);
        assessor_[0] = msg.sender;
        assessmentSeed.assignees = assessor_; 
        
        IEDaoRewardedProductFactory rewardedProductFactory = IEDaoRewardedProductFactory(registry.getAddress(rewardedProductFactoryCA));
        _assessment =  rewardedProductFactory.getRewardedProduct(assessmentSeed);
        assessment = _assessment; 
        return _assessment; 
    }

    function pushToAtheneum() external returns (bool _pushed){ 
        string memory status_ = IEvidenceDaoRewardedProduct(assessment).getStatus();
        require(status_.isEqual(APPROVED_STATUS) ||  msg.sender == project.getLeader(), "assessment not approved / project leader only");
        IEvidenceDaoAtheneum atheneum_ = IEvidenceDaoAtheneum(registry.getAddress(atheneumCA));
        atheneum_.addDeliverable(self);
        return true; 
    }


}