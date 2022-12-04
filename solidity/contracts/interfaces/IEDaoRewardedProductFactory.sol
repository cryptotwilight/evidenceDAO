// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @titleIEDaoRewardedProductFactory
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this is background interface for creating rewarded products 
 */
import "./IEvidenceDaoRewardedProduct.sol";

interface IEDaoRewardedProductFactory { 

    function getRewardedProduct(RewardedProductSeed memory _seed) external returns (address _product);
    
}