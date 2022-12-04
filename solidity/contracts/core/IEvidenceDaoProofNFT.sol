// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/28dd490726f045f7137fa1903b7a6b8a52d6ffcb/contracts/token/ERC721/ERC721.sol";

import "../interfaces/IEvidenceDAOCore.sol";
import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoProject.sol";
import "../interfaces/IEvidenceDaoRewardedProduct.sol";

import "../interfaces/IEvidenceDaoProofNFT.sol";

contract EvidenceDaoProofNFT is ERC721, IEvidenceDaoProofNFT { 

    string  cname = "EVIDENCE_DAO_PROOF_NFT"; 
    uint256 version = 1; 

    string constant evidenceDAOCA   = "RESERVED_EVIDENCE_DAO_CORE";
    string constant evidenceDAOAdminCA = "RESERVED_EVIDENCE_DAO_GLOBAL_ADMINISTRATOR";

    IOpenRegisterLite registry; 

    uint256 evidenceIds = 0; 
    mapping(uint256=>string) contentByNFTId; 
    mapping(uint256=>address) submitterByNFTId; 

    constructor(address _registry, string memory _daoName, string memory _symbol) ERC721(_daoName, _symbol) {
        registry = IOpenRegisterLite(_registry);
    }

    function mint(address _submitter, string memory _ipfsHash) external returns (uint256 _documentNFTId) {
        knownRewardedProductOrAdminOnly();
        _documentNFTId = evidenceIds++;
        contentByNFTId[_documentNFTId] = _ipfsHash;
        _safeMint(_submitter, _documentNFTId);
        return _documentNFTId; 
    }

    function getName() view external returns (string memory _name) {
        return cname; 
    }

    function getVersion() view external returns (uint256 _version) {
        return version; 
    }


    function getContent(uint256 _nftId) view external returns (string memory _ipfsHash) {
        return contentByNFTId[_nftId];
    }
    
    function getTotalEvidenceCount() view external returns (uint256 _evidenceCount) {
        return evidenceIds; 
    }

    // ==================================== INTERNAL ==================================================

    function knownRewardedProductOrAdminOnly() view internal returns (bool) {
        if(msg.sender != registry.getAddress(evidenceDAOAdminCA)){
            IEvidenceDaoProject project_ = IEvidenceDaoProject(IEvidenceDaoRewardedProduct(msg.sender).getSeed().project); 
            address dao_ = project_.getSeed().dao;
            require((IEvidenceDAOCore(registry.getAddress(evidenceDAOCA)).isKnownDao(address(dao_)) 
                    && IEvidenceDao(dao_).isKnownProject(address(project_)) 
                    && project_.isKnownDeliverable(msg.sender)) , " unknown rewarded product / admin " );
        }
        return true; 
    }

}