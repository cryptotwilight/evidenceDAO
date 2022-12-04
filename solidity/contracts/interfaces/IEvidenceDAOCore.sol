// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;

import { DaoSeed } from "./IEvidenceDao.sol";

/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDAO
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev IEvidenceDAO is the entry point interface into the Evidence DAO dApp. It is used to locate DAOs and register them. 
 */
interface IEvidenceDAOCore { 

    /**
     * @dev this is used to retrieve all the DAOs within Evidence DAO 
     * @return _daoAddresses a list of addresses for DAOs registered with Evidence DAO 
     */
    function getDAOs() view external returns (address [] memory _daoAddresses);

    /**
     * @dev this is used to search for a specific DAO registered with Evidence DAO 
     * @param _name of the DAO sought 
     * @return _daoAddress for the DAO if found 
     */ 
    function findDAO(string memory _name) view external returns (address _daoAddress);

    /** 
     * @dev this is used to determine whether the given address represents a DAO known to the system 
     * @param _daoAddress of the potential DAO 
     * @return _isKnown true if known 
     */ 
    function isKnownDao(address _daoAddress) view external returns (bool _isKnown);

    /** 
     * @dev this is used to register a given DAO with Evidence DAO 
     * @param _daoSeed which represents basic inforamation about the DAO 
     * @return _daoAddress for the registered DAO in EvidenceDAO 
     */
    function registerDAO(DaoSeed memory _daoSeed) external returns (address _daoAddress);

}