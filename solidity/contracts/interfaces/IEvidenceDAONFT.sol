// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;



interface IEvidenceDAONFT { 
    
    function mintDocument(address _submitter, string memory _ipfsHash) external returns (uint256 _documentNFTId);

    function getContent(uint256 _nftId) view external returns (string memory _ipfsHash);

}