// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;


import {ProjectSeed} from "./IEvidenceDaoProject.sol";

/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDao 
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this interface represents a given DAO registered and operating within Evidence DAO 
 */
 /** 
  * @dev this representes the type of token used to qualify membership to the given DAO
  */
enum MEMBERSHIP_TOKEN_TYPE{NFT, ERC20}

/**  
 * @dev DaoSeed represents the basic information necessary to register a DAO within Evidence DAO 
 */
struct DaoSeed { 
    /**@dev name represents the name of the DAO */
    string name; 
    /**@dev logoIpfsHash represents storage location for the logo for the DAO */
    string logoIpfsHash; 
    /**@dev nftSymbol represents symble that will be used for NFT proofs issued by the DAO */    
    string nftSymbol; 
    /**@dev membershipToken this is the actual membership token contract for the DAO */
    address membershipToken;
    /**@dev membershipTokenLimit represents minimum number of membership tokens necessary to be considered an unregistered DAO member */
    uint256 membershipTokenLimit; 
    /**@dev administrator represents initial administrator of the DAO */
    address administrator; 
    /**@dev memberTokenType represents type of membership token used by the DAO */
    MEMBERSHIP_TOKEN_TYPE memberTokenType; 
}

interface IEvidenceDao { 

    /**
     * @dev this function returns the seed used to register this DAO
     * @return _daoSeed used to register the DAO
     */
    function getSeed() view external returns (DaoSeed memory _daoSeed);

    /**
     * @dev this function returns the ERC721 contract that is used to issue NFT based proofs for submissions
     * @return _proofsNFT an ERC721 contract used to issue proofs against submissions
     */
    function getProofsNFT() view external returns (address _proofsNFT);

    /**
     * @dev this returns the current status of the DAO 
     * @return _status of the DAO 
     */
    function getStatus() view external returns (string memory _status);

    /**
     * @dev this returns the Atheneum contract that holds all community public deliverabls from the DAO 
     * @return _atheneum with deliverables
     */
    function getAtheneum() view external returns (address _atheneum);

    /**
     * @dev this is used to search for a given project with the given name 
     * @param _projectName for the project sought
     * @return _project address if found 
     */
    function findProject(string memory _projectName) view external returns (address _project);

    /**
     * @dev this returns all the active projects in this DAO
     * @return _projects list 
     */
    function getProjects() view external returns (address[] memory _projects);

    /**
     * @dev this returns whether the given address holds a project known to this DAO 
     * @param _project address in question 
     * @return _isKnown true if the project is known 
     */
    function isKnownProject(address _project) view external returns (bool _isKnown);

    /**
     * @dev this returns whether the given address represents a known member of the DAO
     * @param _member address in question 
     * @return _isMember true if the member is known 
     */
    function isMember(address _member) view external returns (bool _isMember);

    /**
     * @dev this creates a project within this DAO 
     * @param _projectSeed basic information necessary to create the project 
     * @return _project created from the given seed
     */
    function createProject(ProjectSeed memory _projectSeed) external returns (address _project);

    /**
     * @dev this enables the DAO to update it's configuration after Evidence DAO maintenance changes
     * @return _recieved true if the notification was recieved
     */
    function notifyChangeOfAddress() external returns (bool _recieved);

    /**
     * @dev this shuts down the DAO. 
     * @return _isShutdown true if the DAO is successfully shutdown 
     */
    function shutdownDao() external returns (bool _isShutdown);
}