// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDaoAtheneum 
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this interface represents the Atheneum which is the curation contract for all deliverables successfully completed from all projects 
 */
interface IEvidenceDaoAtheneum { 

    /** 
     * @dev this returns the address of the associated DAO
     * @return _dao address to DAO contract 
     */ 
    function getDao() view external returns (address _dao);

    /** 
     * @dev this is used to search for a given deliverable(s) by search term 
     * @param _searchTerm associated with the deliverable(s)
     * @return _deliverables list 
     */
    function findDeliverable(string memory _searchTerm) view external returns (address [] memory _deliverables);

    /** 
     * @dev this is used to determine whether the given address contains a known deliverable 
     * @param _deliverable address containing potential deliverable 
     * @return _isKnown true if the deliverable is known 
     */
    function isKnownDeliverable(address _deliverable) view external returns (bool _isKnown);

    /** 
     * @dev this is used to get a count of all the deliverables that are available to members of the DAO in this Atheneum
     * @return _count of all deliverables in the Atheneum 
     */ 
    function getAvailableDeliverableCount() view external returns (uint256 _count);

    /** 
     * @dev this returns all the deliverables contained within this Atheneum
     * @return _deliverables list for all deliverables in this Atheneum
     */
    function getAllDeliverables() view external returns (address [] memory _deliverables);

    /** 
     * @dev this is used to add the given deliverable to the Atheneum 
     * @param _deliverable to be added 
     * @return _added true if the deliverable is added 
     */
    function addDeliverable(address _deliverable) external returns (bool _added);

    /** 
     * @dev this is used to remove the given deliverable from the Atheneum 
     * @param _deliverable to be removed 
     * @return _removed true if the deliverable is removed 
     */
    function removeDeliverable(address  _deliverable) external returns (bool _removed);

    /** 
     * @dev this is used to link the Atheneum to the given DAO 
     * @param _dao address of DAO to which to link Atheneum
     * @return _set true if successfully linked
     */
    function init(address _dao) external returns (bool _set);

    /**
     * @dev this enables the Atheneum to update it's configuration after Evidence DAO maintenance changes
     * @return _recieved true if the notification was recieved
     */
    function notifyChangeOfAddress() external returns (bool _recieved);

}