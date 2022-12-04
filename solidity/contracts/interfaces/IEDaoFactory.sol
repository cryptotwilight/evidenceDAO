// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEDaoFactory
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this is a background interface for creating DAOs
 */
import { DaoSeed } from "./IEvidenceDao.sol";

interface IEDaoFactory { 

    function getEvidenceDao(DaoSeed memory _seed, address _proofNFT, address _atheneum) external returns (address _evidenceDao);

}