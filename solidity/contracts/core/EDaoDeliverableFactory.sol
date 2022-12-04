// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../interfaces/IEvidenceDAOCore.sol";
import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoProject.sol";
import "../interfaces/IEDaoDeliverableFactory.sol";

import "./EDaoBasicFactory.sol";
import "./EvidenceDaoProjectDeliverable.sol";

contract EDaoDeliverableFactory is EDaoBasicFactory, IEDaoDeliverableFactory { 

    constructor(address _registry) EDaoBasicFactory(_registry) {
        name = "RESERVED_EVIDENCE_DAO_DELIVERABLE_FACTORY";
        version = 1; 
    }

    function getDeliverable(RewardedProductSeed memory _deliverableSeed, RewardedProductSeed memory _assessmentSeed) external returns (address _deliverable) {
        knownProjectOnly();
        _deliverable = address(new EvidenceDaoProjectDeliverable(_deliverableSeed, _assessmentSeed, address(registry)));
        addresses.push(_deliverable);
        return _deliverable;
    }

    // ================================= INTERNAL =================================================

    function knownProjectOnly() view internal returns (bool) {
        IEvidenceDao dao_ = IEvidenceDao(IEvidenceDaoProject(msg.sender).getSeed().dao); 
        require(IEvidenceDAOCore(registry.getAddress(evidenceDAOCA)).isKnownDao(address(dao_)) && dao_.isKnownProject(msg.sender), "unknown project");
        return true; 
    }
}