// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEDaoDeliverableFactory
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this is a background interface for creating deliverables
 */
import { RewardedProductSeed } from "./IEvidenceDaoRewardedProduct.sol";

interface IEDaoDeliverableFactory { 

    function getDeliverable(RewardedProductSeed memory _deliverableSeed, RewardedProductSeed memory _assessmentSeed) external returns (address _deliverable);
    
}