// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEDaoAtheneumFactory
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this is a background interface for the creation Atheneums 
 */
interface IEDaoAtheneumFactory { 

    function getAtheneum() external returns (address _atheneum);

}