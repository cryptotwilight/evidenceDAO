// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";

import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";

import "../interfaces/IEvidenceDAOCore.sol";
import "../interfaces/IEDaoAtheneumFactory.sol";
import "../interfaces/IEvidenceDaoAtheneum.sol";
import "../interfaces/IEDaoProofsNFTFactory.sol";
import "../interfaces/IEDaoFactory.sol";

contract EvidenceDAOCore is IEvidenceDAOCore, IOpenVersion { 

    address self; 

    string constant name                = "RESERVED_EVIDENCE_DAO_CORE"; 
    uint256 constant version            = 3; 

    string constant evidenceDAOAdminCA  = "RESERVED_EVIDENCE_DAO_GLOBAL_ADMINISTRATOR";

    string constant registryCA          = "RESERVED_OPEN_REGISTER_LITE";
    
    string constant atheneumFactoryCA   = "RESERVED_EVIDENCE_DAO_ATHENEUM_FACTORY";
    string constant eDaoFactoryCA       = "RESERVED_EVIDENCE_DAO_FACTORY";
    string constant eDaoProofsNFTFactoryCA = "RESERVED_EVIDENCE_PROOF_NFT_FACTORY";

    IOpenRegisterLite registry; 
    IEDaoAtheneumFactory atheneumFactory;
    IEDaoFactory evidenceDaoFactory; 
    IEDaoProofsNFTFactory evidenceDaoProofsNFTFactory;

    address [] daos; 
    mapping(string=>address) daoByName; 
    mapping(string=>bool) knownDaoName; 

    mapping(address=>bool) knownDao; 

    constructor( address _registryLite) {
        registry        = IOpenRegisterLite(_registryLite);
        atheneumFactory = IEDaoAtheneumFactory(registry.getAddress(atheneumFactoryCA));
        evidenceDaoFactory = IEDaoFactory(registry.getAddress(eDaoFactoryCA));
        evidenceDaoProofsNFTFactory = IEDaoProofsNFTFactory(registry.getAddress(eDaoProofsNFTFactoryCA));
    }

    function getName() pure external returns (string memory _name) {
        return name; 
    }

    function getVersion() pure external returns (uint256 _version) {
        return version; 
    }

    function getDAOs() view external returns (address [] memory _edaoAddresses){
        return daos; 
    }

    function findDAO(string memory _name) view external returns (address _dao) {
        return daoByName[_name];
    }

    function isKnownDao(address _daoAddress) view external returns (bool isKnown) {
        return knownDao[_daoAddress];
    }

    function registerDAO(DaoSeed memory _daoSeed) external returns (address _edaoAddress){   
        require(!knownDaoName[_daoSeed.name], "known DAO");     
        knownDaoName[_daoSeed.name] = true; 

        address proofNft_ = evidenceDaoProofsNFTFactory.getProofsNFT(_daoSeed.name, _daoSeed.nftSymbol);

        IEvidenceDaoAtheneum atheneum_ = IEvidenceDaoAtheneum(atheneumFactory.getAtheneum());
        _edaoAddress = evidenceDaoFactory.getEvidenceDao(_daoSeed, proofNft_,  address(atheneum_));
        atheneum_.init(_edaoAddress);

        daos.push(_edaoAddress);
        daoByName[_daoSeed.name] = _edaoAddress; 
        knownDao[_edaoAddress] = true; 
        
        return _edaoAddress;
    }

    function notifyChangeOfAddress() external returns (bool _recieved) {
        adminOnly(); 
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        atheneumFactory = IEDaoAtheneumFactory(registry.getAddress(atheneumFactoryCA));
        evidenceDaoFactory = IEDaoFactory(registry.getAddress(eDaoFactoryCA));
        evidenceDaoProofsNFTFactory = IEDaoProofsNFTFactory(registry.getAddress(eDaoProofsNFTFactoryCA));
        return true; 
    }

    //================================ INTERNAL ==================================
    function adminOnly() view internal returns (bool) {
        require(msg.sender == registry.getAddress(evidenceDAOAdminCA), "admin only");
        return true;
    }

}