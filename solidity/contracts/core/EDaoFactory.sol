// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../interfaces/IEDaoFactory.sol";
import "./EDaoBasicFactory.sol";
import "./EvidenceDao.sol";

contract EDaoFactory is EDaoBasicFactory, IEDaoFactory { 

    constructor(address _registry) EDaoBasicFactory(_registry) {        
        name = "RESERVED_EVIDENCE_DAO_FACTORY"; 
        version = 1; 
    }

    function getEvidenceDao(DaoSeed memory _seed, address _proofNFT, address _atheneum) external returns (address _evidenceDao){
        evidenceDaoCoreOnly();
        _evidenceDao = address(new EvidenceDao(_seed, _proofNFT, _atheneum, address(registry)));
        addresses.push(_evidenceDao);
        return _evidenceDao; 
    }

}