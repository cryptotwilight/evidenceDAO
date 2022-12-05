// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../interfaces/IEvidenceDAOCore.sol";
import "../interfaces/IEDaoProjectFactory.sol";

import "./EDaoBasicFactory.sol";
import "./EvidenceDaoProject.sol";

contract EDaoProjectFactory is EDaoBasicFactory, IEDaoProjectFactory { 

    constructor(address _registry) EDaoBasicFactory(_registry) {
        name = "RESERVED_EVIDENCE_DAO_PROJECT_FACTORY";
        version = 3; 
    }

    function getProject(ProjectSeed memory _seed) external returns (address _project){
        require(msg.sender == _seed.dao, "dao <-> sender mis-match");
        knownDaoOnly(); 
        _project = address(new EvidenceDaoProject(_seed, address(registry)));
        addresses.push(_project);
        return _project; 
    }   

    // ================================= INTERNAL =================================================

    function knownDaoOnly() view internal returns (bool) {
        require(IEvidenceDAOCore(registry.getAddress(evidenceDAOCA)).isKnownDao(msg.sender), "unknown dao");
        return true; 
    }
}