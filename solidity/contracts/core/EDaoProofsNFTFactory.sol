// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../interfaces/IEDaoProofsNFTFactory.sol";

import "./EDaoBasicFactory.sol";
import "./EvidenceDaoProofNFT.sol";

contract EDaoProofsNFTFactory is EDaoBasicFactory, IEDaoProofsNFTFactory { 

    constructor(address _registry) EDaoBasicFactory(_registry) {        
        name = "RESERVED_EVIDENCE_PROOF_NFT_FACTORY"; 
        version = 2; 
    }

    function getProofsNFT(string memory _daoName, string memory _daoSymbol) external returns (address _erc721){
        evidenceDaoCoreOnly();
        _erc721 = address(new EvidenceDaoProofNFT(address(registry), _daoName, _daoSymbol));
        addresses.push(_erc721);
        return _erc721; 
    }

}