// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";



contract EDaoBasicFactory is IOpenVersion { 

    string  name = "RESERVED_EVIDENCE_DAO_FACTORY"; 
    uint256 version = 1; 

    string constant evidenceDAOCA   = "RESERVED_EVIDENCE_DAO_CORE";
    string constant evidenceDAOAdminCA = "RESERVED_EVIDENCE_DAO_GLOBAL_ADMINISTRATOR";
    string constant registryCA          = "RESERVED_OPEN_REGISTER_LITE";

    address [] addresses; 

    IOpenRegisterLite registry; 

    constructor(address _registry) {
        registry = IOpenRegisterLite(_registry);
    }

    function getAddresses() view external returns (address [] memory _daos) {
        adminOnly(); 
        return addresses; 
    }

    function getName() view external returns (string memory _name) {
        return name; 
    }

    function getVersion() view external returns (uint256 _version) {
        return version; 
    }

    function notifyChangeOfAddress() external returns (bool _recieved) {
        adminOnly(); 
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        return true; 
    }

    // ================================= INTERNAL =================================================
    function evidenceDaoCoreOnly() view internal returns (bool) {
        require(registry.getAddress(evidenceDAOCA) == msg.sender, "evidence DAO only");
        return true;
    }

    function adminOnly() view internal returns (bool) {
        require(registry.getAddress(evidenceDAOAdminCA) == msg.sender, "admin only");
        return true; 
    }
}