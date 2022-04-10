// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/28dd490726f045f7137fa1903b7a6b8a52d6ffcb/contracts/token/ERC721/ERC721.sol";


contract EvidenceDAONFT is ERC721 { 


    uint256 evidenceIds = 0; 
    mapping(uint256=>string) contentByNFTId; 
    mapping(uint256=>address) submitterByNFTId; 
    mapping(uint256=>string) projectByNFTid; 
    

    constructor(string memory _daoName, string memory _symbol) ERC721(_daoName, _symbol) {
    }

    function mintDocument(address _submitter, string memory _project, string memory _ipfsHash) external returns (uint256 _documentNFTId) {
        _documentNFTId = evidenceIds++;
        contentByNFTId[_documentNFTId] = _ipfsHash;
        projectByNFTid[_documentNFTId] = _project; 
        _safeMint(_submitter, _documentNFTId);
        return _documentNFTId; 
    }

    function getProjectData(uint256 _nftId) view external returns (string memory _project, address submitter){
        return (projectByNFTid[_nftId], submitterByNFTId[_nftId]);
    }


    function getContent(uint256 _nftId) view external returns (string memory _ipfsHash) {
        return contentByNFTId[_nftId];
    }
    
    function getTotalEvidenceCount() view external returns (uint256 _evidenceCount) {
        return evidenceIds; 
    }
}