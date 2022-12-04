// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEDaoProofsNFTFactory
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this is a background interface for creating proof NFT contracts 
 */
import "./IEvidenceDaoRewardedProduct.sol";

interface IEDaoProofsNFTFactory { 

    function getProofsNFT(string memory _daoName, string memory _daoSymbol) external returns (address _erc721);    
}