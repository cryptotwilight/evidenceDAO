// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../interfaces/IEDaoAtheneumFactory.sol";
import "./EDaoBasicFactory.sol";
import "./EvidenceDaoAtheneum.sol";

contract EDaoAtheneumFactory is EDaoBasicFactory, IEDaoAtheneumFactory { 

    constructor(address _registry) EDaoBasicFactory(_registry) {
        name = "RESERVED_EVIDENCE_DAO_ATHENEUM_FACTORY"; 
        version = 3; 
    }

    function getAtheneum() external returns (address _atheneum) {
        evidenceDaoCoreOnly();
        _atheneum = address(new EvidenceDaoAtheneum(address(registry)));
        addresses.push(_atheneum);
        return _atheneum; 
    }

}