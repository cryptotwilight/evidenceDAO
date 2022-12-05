// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-version/blob/e161e8a2133fbeae14c45f1c3985c0a60f9a0e54/blockchain_ethereum/solidity/V1/interfaces/IOpenVersion.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";
import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";

import "../interfaces/IEvidenceDaoMemberRegister.sol";


contract EvidencDaoMemberRegister is IEvidenceDaoMemberRegister, IOpenVersion { 

    using LOpenUtilities for address; 

    address self;     
    string constant name                = "RESERVED_EVIDENCE_DAO_ASSESSOR_REGISTER";
    uint256 constant version            = 2; 

    string constant evidenceDAOAdminCA  = "RESERVED_EVIDENCE_DAO_GLOBAL_ADMINISTRATOR";
    string constant registryCA          = "RESERVED_OPEN_REGISTER_LITE";

    IOpenRegisterLite registry; 

    address [] members; 
    mapping(address=>bool) knownMembers; 

    mapping(address=>bool) knownAdministrators; 

    constructor(address _registry) {
        registry = IOpenRegisterLite(_registry);
        addAdminInternal(registry.getAddress(evidenceDAOAdminCA), true);
        self = address(this);
    }

    function getName() pure external returns (string memory _name) {
        return name; 
    }

    function getVersion() pure external returns (uint256 _version) {
        return version; 
    }

    function getRegisteredMembers() view external returns (address [] memory _members){
        return members; 
    }

    function isRegisteredMember(address _member) view external returns (bool _isRegistered){
        return knownMembers[_member];
    }

    function isAdministrator(address _member) view external returns(bool _isAdministrator){
        return knownAdministrators[_member];
    }

    function setAdministrator(address _member, bool _isAdmin) external returns (bool _set){
        adminOnly(); 
        addAdminInternal(_member, _isAdmin);
        return true; 
    }

    function registerMembers(address [] memory _members) external returns (uint256 _registerCount, uint256 _totalMembers){       
        adminOnly(); 
        for(uint256 x = 0; x < _members.length; x++) {
            address member_ = _members[x];
            members.push(member_);
            knownMembers[member_] = true; 
            _registerCount++;        
        }
        return (_registerCount, members.length);
    }

    function deRegisterMembers(address [] memory _members) external returns (uint256 _deRegisterCount, uint256 _totalMembers){
        adminOnly(); 
        for(uint256 x = 0; x < _members.length; x++) {
            address member_ = _members[x];
            if(knownAdministrators[member_]){
                addAdminInternal(member_, false);
            }
            if(knownMembers[member_]){
                members = member_.remove(members);
                delete knownMembers[member_]; 
                _deRegisterCount++;
            }
        }
        return (_deRegisterCount, members.length);
    }

    function notifyChangeOfAddress() external returns (bool _recieved) {
        evidenceDAOAdminOnly();
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        addAdminInternal(registry.getAddress(evidenceDAOAdminCA), true);
        return true; 
    }
    //============================== INTERNAL ===============================================
    function addAdminInternal(address _member, bool _isAdmin) internal returns (bool) {
        knownAdministrators[_member] = _isAdmin; 
        return true; 
    }

    function evidenceDAOAdminOnly() view internal returns (bool) {
        require(registry.getAddress(evidenceDAOAdminCA) == msg.sender, "evidence dao admin only");
        return true; 
    }

    function adminOnly() view internal returns (bool) {
        require(knownAdministrators[msg.sender], "admin only");
        return true; 
    }
}