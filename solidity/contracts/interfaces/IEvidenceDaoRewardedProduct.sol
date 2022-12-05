// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDaoRewardedProduct
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev the Rewarded Product represents the method by which compensation is governed and dispensed for a given project
 */
 /**
  * @dev RewardedProductSeed is the basic information necessary to create a rewarded product
  */
struct RewardedProductSeed {
    /** @dev name of the rewarded product */ 
    string name; 
    /** @dev assignees to work on the rewarded product */ 
    address [] assignees; 
    /** @dev reward allocated to the rewarded product */ 
    uint256 reward; 
    /** @dev rewardCurrency for the rewarded product */ 
    address rewardCurrency; 
    /** @dev proofNFT where proofs are issued to contributors rewarded product */ 
    address proofNft; 
    /** @dev project address owning the rewarded product */ 
    address project; 
    /** @dev dueDate for the rewarded product */ 
    uint256 dueDate; 
    /** @dev projectMemberAssignmentsOnly for this rewarded product */
    bool projectMemberAssignmentsOnly; 
}

interface IEvidenceDaoRewardedProduct { 

    /** 
     * @dev this returns the status of this Rewarded Product
     * @return _status of this rewarded product
     */ 
    function getStatus() view external returns (string memory _status); 

    /** 
     * @dev this returns the seed used to create this Rewarded Product 
     * @return _seed for this Rewarded Product
     */ 
    function getSeed() view external returns (RewardedProductSeed memory _seed);

    /** 
     * @dev this returns the members assigned to this Rewarded Product
     * @return _assignees list for this Rewarded Product
     */ 
    function getAssignees() view external returns (address [] memory _assignees);

    /** 
     * @dev this returns the date that work was completed on this deliverable
     * @return _completedDate for this deliverable 
     */ 
    function getCompletedDate() view external returns (uint256 _completedDate);

    /** 
     * @dev this returns the IPFS stored manifest for the product associated with this contract
     * @return _ipfsHash IPFS stored manifest to product data 
     */ 
    function getContentManifest() view external returns (string memory _ipfsHash);

    /** 
     * @dev this returns the erc721 from which submission proofs are issued
     * @return _erc721 contract containing proofs issued for this product
     */ 
    function getProofsNFTAddress() view external returns (address _erc721);

    /** 
     * @dev this enables an assignee to claim the reward associated with this Rewarded Product
     * @param _ipfsManifest submitted as completion of work on this Rewarded Product
     * @return _claimed true if the reward is successfully claimed 
     */ 
    function claimReward(string memory _ipfsManifest) external returns (bool _claimed);

    /** 
     * @dev this enables an administrator to approve and disbuse the reward claim 
     * @return _approved true if successfully approved and disbursed
     */ 
    function approveReward() external returns (bool _approved);

    /** 
     * @dev this enables the submitted product claim to be updated 
     * @return _allowed true if successfully allowed
     */ 
    function allowProductUpdate() external returns (bool _allowed);

    /** 
     * @dev this adds an assignee to this Rewarded Product
     * @param _assignee to be added to the Rewarded Product
     * @return _added true if the assignee is successfully added
     */ 
    function addAssignee(address _assignee) external returns (bool _added);

    /** 
     * @dev this removes an assignee from this Rewarded Product
     * @param _assignee to be removed from the Rewarded Product 
     * @return _removed true if the assignee is successfully removed
     */ 
    function removeAssignee(address _assignee) external returns (bool _removed);

    /** 
     * @dev this cancels this Rewarded Product
     * @return _cancelled true if successufully cancelled 
     */ 
    function cancel() external returns (bool _cancelled);

    /**
     * @dev this enables the RewardedProduct to update it's configuration after Evidence DAO maintenance changes
     * @return _recieved true if the notification was recieved
     */
    function notifyChangeOfAddress() external returns (bool _recieved);

}