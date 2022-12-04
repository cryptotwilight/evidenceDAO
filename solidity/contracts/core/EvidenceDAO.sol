// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

import "https://github.com/Block-Star-Logic/open-libraries/blob/703b21257790c56a61cd0f3d9de3187a9012e2b3/blockchain_ethereum/solidity/V1/libraries/LOpenUtilities.sol";
import "https://github.com/Block-Star-Logic/open-register/blob/51af10e674ba2554d3d599ebdfa5a98b91cd85e9/blockchain_ethereum/solidity/Lite/VI/interfaces/IOpenRegisterLite.sol";

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/c30fad9955b060f6e337a0244b04ecae811121fb/contracts/token/ERC721/IERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/c30fad9955b060f6e337a0244b04ecae811121fb/contracts/token/ERC20/IERC20.sol"; 

import "../interfaces/IEDaoProjectFactory.sol";
import "../interfaces/IEvidenceDao.sol";
import "../interfaces/IEvidenceDaoMemberRegister.sol";
import "../interfaces/IEvidenceDaoAtheneum.sol";


contract EvidenceDao is IEvidenceDao, IEvidenceDaoMemberRegister { 
    
    using LOpenUtilities for address; 

    string constant name = "EVIDENCE_DAO_PUBLIC_DAO";  
    uint256 constant version = 1; 
    
    string constant registryCA                  = "RESERVED_OPEN_REGISTER_LITE";
    string constant EvidenceDaoProjectFactoryCA = "RESERVED_EVIDENCE_DAO_PROJECT_FACTORY";

    DaoSeed seed; 

    address self; 
    address administrator; 
    bool shutdown = false; 

    IOpenRegisterLite registry; 
    IEDaoProjectFactory projectFactory; 
    IEvidenceDaoAtheneum atheneum; 

    address [] registeredMembers; 
    mapping(address=>bool) isRegistered; 

    address[] projects; 
    mapping(address=>bool) knownProjects; 
    mapping(string=>address) projectsByName;
    mapping(string=>bool) knownProjectName; 

    mapping(address=>bool) knownAdministrator; 

    address proofsNFT; 

    address memberTokenAddress; 
    MEMBERSHIP_TOKEN_TYPE memberTokenType; 

    constructor(DaoSeed memory _daoSeed, address _atheneum, address _proofsNFT, address _registry) {
        seed            = _daoSeed; 
        proofsNFT       = _proofsNFT; 
        atheneum        = IEvidenceDaoAtheneum(_atheneum);        
        self            = address(this);
        registerInternal(seed.administrator);
        setAdministratorInternal(seed.administrator, true);
        registry        = IOpenRegisterLite(_registry);
        projectFactory  = IEDaoProjectFactory(registry.getAddress(EvidenceDaoProjectFactoryCA));
    }

    function getName() pure external returns (string memory _name){
        return name; 
    }

    function getVersion() pure external returns (uint256 _version) {
        return version; 
    }

    function getAtheneum() view external returns (address _atheneum){
        return address(atheneum); 
    }

    function getSeed() view external returns (DaoSeed memory _seed) {
        return seed; 
    }

    function getProofsNFT() view external returns (address _proofsNFT){
        return proofsNFT; 
    }

    function getStatus()  view external returns (string memory _status){
        if(shutdown) {
            return "SHUTDOWN";
        }
        return "ACTIVE"; 
    }

    function findProject(string memory _projectName) view external returns (address _project) {
        registeredMembersOnly();
        return projectsByName[_projectName];
    }

    function getProjects() view external returns (address[] memory _projects){
        registeredMembersOnly();
        return projects; 
    }

    function isKnownProject(address _project) view external returns (bool _isKnown) {
        return knownProjects[_project];
    }

    function getRegisteredMembers() view external returns (address [] memory _members){
        registeredMembersOnly();
        return registeredMembers; 
    }

    function isRegisteredMember(address _member) view external returns (bool _isRegistered){
        return isRegistered[_member];
    }

    function isMember(address _member) view external returns (bool _isMember){
        return isMemberInternal(_member);
    }

    function isAdministrator(address _member) view external returns (bool _isAdmin) {
        return knownAdministrator[_member];
    }

    function registerMembers(address [] memory _members) external returns (uint256 _registerCount, uint256 _totalMembers){
        checkShutdown();
        adminOnly(); 
        for(uint256 x = 0; x < _members.length; x++) {
            address member_ = _members[x];
            if(registerInternal(member_)){ 
                _registerCount++;
            }
        }
        return (_registerCount, registeredMembers.length);
    }

    function deRegisterMembers(address [] memory _members) external returns (uint256 _deRegisterCount, uint256 _totalMembers){
        adminOnly(); 
        for(uint256 x = 0; x < _members.length; x++) {
            address member_ = _members[x];
            if(isRegistered[member_]){
                registeredMembers = member_.remove(registeredMembers);
                delete isRegistered[member_]; 
                _deRegisterCount++;
            }
        }
        return (_deRegisterCount, registeredMembers.length);
    }

    function createProject(ProjectSeed memory _projectSeed) external returns (address _project){
        checkShutdown();
        adminOnly(); 
        require(self == _projectSeed.dao, "dao project mis-match");
        require(!knownProjectName[_projectSeed.name], "known project name ");
        knownProjectName[_projectSeed.name] = true; 
        _project = projectFactory.getProject(_projectSeed);
        projects.push(_project);
        projectsByName[_projectSeed.name] = _project; 
        knownProjects[_project] = true; 
        return _project; 
    }

    function shutdownDao() external returns (bool _isShutdown){
        adminOnly(); 
        shutdown = true; 
        return shutdown; 
    }

    function setAdministrator(address _member, bool _isAdministrator) external returns (bool _set) {
        adminOnly(); 
        require(isMemberInternal(_member), "non DAO member cannot be set as administrator");
        require(isRegistered[_member], "unregistered DAO member cannot be set as administrator");
        setAdministratorInternal(_member, _isAdministrator);
        return true; 
    }
        
    function notifyChangeOfAddress() external returns (bool _recieved) {
        adminOnly(); 
        registry = IOpenRegisterLite(registry.getAddress(registryCA));
        projectFactory = IEDaoProjectFactory(registry.getAddress(EvidenceDaoProjectFactoryCA));    
        return true; 
    }

    // ============================================ INTERNAL ==============================================================

    function registerInternal(address _member) internal returns (bool) {
        require(isMemberInternal(_member), "non DAO member registration attempt");
        if(!isRegistered[_member]){
            registeredMembers.push(_member);
            isRegistered[_member] = true; 
            return true; 
        }       
        return false; 
    }

    function setAdministratorInternal(address _member, bool _admin) internal returns (bool) {            
        knownAdministrator[_member] = _admin;        
        return true; 
    }

    function checkShutdown() view internal returns (bool) { 
        require(!shutdown, "dao shutdown");
        return true; 
    }

    function adminOnly() view internal returns (bool) {
        require(knownAdministrator[msg.sender], "admin only");
        return true; 
    }

    function registeredMembersOnly() view internal returns (bool) {
        require(isRegistered[msg.sender], "registered members only");
        return true; 
    }

    function isMemberInternal(address _member) view internal returns (bool) {
        MEMBERSHIP_TOKEN_TYPE mtt_ = seed.memberTokenType;
        if(mtt_ == MEMBERSHIP_TOKEN_TYPE.NFT) {
            IERC721 erc721_ = IERC721(seed.membershipToken);
            if(erc721_.balanceOf(_member) >= seed.membershipTokenLimit){
                return true; 
            }
        }
        if(mtt_ == MEMBERSHIP_TOKEN_TYPE.ERC20) {
            IERC20 erc20_ = IERC20(seed.membershipToken);
            if(erc20_.balanceOf(_member) >= seed.membershipTokenLimit) {
                return true; 
            }
        }
        return false; 
    }
}