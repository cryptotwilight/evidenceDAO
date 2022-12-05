// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoAtheneum.sol";
import "../interfaces/IEvidenceDaoProjectDeliverable.sol";
import "../interfaces/IEDaoRewardedProductFactory.sol";

import "./EvidenceDaoRewardedProduct.sol";

contract EvidenceDaoProjectDeliverable is EvidenceDaoRewardedProduct, IEvidenceDaoProjectDeliverable {

    using LOpenUtilities for string; 

    string constant assessorsRegisterCA         = "RESERVED_EVIDENCE_DAO_ASSESSOR_REGISTER";
    string constant rewardedProductFactoryCA    = "RESERVED_EVIDENCE_DAO_REWARDED_PRODUCT_FACTORY"; 

    string constant APPROVED_STATUS             = "PRODUCT_APPROVED";
    
    address self; 
    address assessor; 
    address assessment; 
    bool booked; 
    RewardedProductSeed assessmentSeed; 
    string [] searchTerms; 


    constructor(RewardedProductSeed memory _seed, 
                RewardedProductSeed memory _assessmentSeed, 
                address _registry ) EvidenceDaoRewardedProduct(_seed, _registry) {
        name = "EVIDENCE_DAO_PROJECT_DELIVERABLE"; 
        version = 10; 
        assessmentSeed = _assessmentSeed;
        self = address(this);
    }

    function getStatus() override view external returns (string memory _status){
        if(status.isEqual(APPROVED_STATUS)){
            return "ALL_REWARDS_APPROVED";
        }
        return status; 
    }

    function approveReward() override external returns (bool _approved){
        checkCancelled(); 
        adminOnly(); 
        require(IEvidenceDaoRewardedProduct(assessment).getStatus().isEqual(APPROVED_STATUS), " assessment still outstanding ");
        return approveRewardInternal(); 
    
    }

    function getSearchTerms() view external returns (string [] memory _searchTerms ) {
        return searchTerms; 
    }

    function addSearchTerms(string [] memory _terms) external returns(bool _added){
        for(uint256 x = 0; x < _terms.length; x++) {
           string memory term_ = _terms[x];
           searchTerms.push(term_);
        }
        return true; 
    }

    function removeSearchTerms(string [] memory _terms) external returns (bool _removed){
        for(uint256 x = 0; x < _terms.length; x++) {
           string memory term_ = _terms[x];
           searchTerms = term_.remove(searchTerms);           
        }
        return true; 
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
        
        assessor = msg.sender;  

        address [] memory assessor_ = new address[](1);
        assessor_[0] = msg.sender;

        assessmentSeed = setAssignees(assessmentSeed, assessor_);  
        
        IEDaoRewardedProductFactory rewardedProductFactory = IEDaoRewardedProductFactory(registry.getAddress(rewardedProductFactoryCA));
        _assessment =  rewardedProductFactory.getRewardedProduct(assessmentSeed);
        assessment = _assessment; 
        project.notifyDerivativeDeliverable(assessment);
        return _assessment; 
    }

    function pushToAtheneum() external returns (bool _pushed){ 
        string memory status_ = IEvidenceDaoRewardedProduct(assessment).getStatus();
        require(status_.isEqual(APPROVED_STATUS) &&  (msg.sender == project.getLeader() || adminOnly()), "assessment not approved / project leader only");
        IEvidenceDaoAtheneum atheneum_ = IEvidenceDaoAtheneum(IEvidenceDao(project.getSeed().dao).getAtheneum());
        atheneum_.addDeliverable(self);
        return true; 
    }

    //======================== INTERNAL ========================================================

    function setAssignees(RewardedProductSeed memory _seed, address [] memory _assignees) pure internal returns (RewardedProductSeed memory seed) {
        seed = RewardedProductSeed({
                                        name            : _seed.name, 
                                        assignees       : _assignees,
                                        reward          : _seed.reward,
                                        rewardCurrency  : _seed.rewardCurrency,
                                        proofNft        : _seed.proofNft,
                                        project         : _seed.project,
                                        dueDate         : _seed.dueDate,
                                        projectMemberAssignmentsOnly : _seed.projectMemberAssignmentsOnly
                                    });
        return seed;  
    }

}