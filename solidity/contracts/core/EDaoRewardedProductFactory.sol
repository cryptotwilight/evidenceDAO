// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../interfaces/IEDaoRewardedProductFactory.sol";

import "../interfaces/IEvidenceDAOCore.sol";
import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoProject.sol";
import "../interfaces/IEvidenceDaoProjectDeliverable.sol";

import "./EDaoBasicFactory.sol";
import "./EvidenceDaoRewardedProduct.sol";

contract EDaoRewardedProductFactory is EDaoBasicFactory, IEDaoRewardedProductFactory { 

    constructor(address _registry) EDaoBasicFactory(_registry) {
        name = "RESERVED_EVIDENCE_DAO_REWARDED_PRODUCT_FACTORY";
        version = 1; 
    }

    function getRewardedProduct(RewardedProductSeed memory _seed) external returns (address _product) {
        knownDeliverableOrAdminOnly();
        _product = address(new EvidenceDaoRewardedProduct(_seed, address(registry)));
        addresses.push(_product);
        return _product;
    }

    // ==================================== INTERNAL ==================================================

    function knownDeliverableOrAdminOnly() view internal returns (bool) {
        if(msg.sender != registry.getAddress(evidenceDAOAdminCA)){
            IEvidenceDaoProject project_ = IEvidenceDaoProject(IEvidenceDaoProjectDeliverable(msg.sender).getSeed().project); 
            address dao_ = project_.getSeed().dao;
            require((IEvidenceDAOCore(registry.getAddress(evidenceDAOCA)).isKnownDao(address(dao_)) 
                    && IEvidenceDao(dao_).isKnownProject(address(project_)) 
                    && project_.isKnownDeliverable(msg.sender)) , "unknown deliverable" );
        }
        return true; 
    }


}
