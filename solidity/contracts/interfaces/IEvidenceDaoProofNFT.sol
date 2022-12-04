// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDaoProofNFT
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this interface is used to mint proofs to contributors 
 */
interface IEvidenceDaoProofNFT { 
    
    /** 
     * @dev this mints the NFT proof to the submitter address 
     * @param _submitter to whom proof will be issued 
     * @param _ipfsHash to submitted content 
     * @return _nftId for the the proof 
     */ 
    function mint(address _submitter, string memory _ipfsHash) external returns (uint256 _nftId);

    /**
     * @dev this returns the content associated with the nft
     * @param _nftId for the nft
     * @return _ipfsHash for content 
     */ 
    function getContent(uint256 _nftId) view external returns (string memory _ipfsHash);

}