// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDaoProjectDeliverable
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev this interface represents a project deliverable for a given DAO
 */

interface IEvidenceDaoProjectDeliverable { 

    /**
     * @dev this is used to get the search terms associated with this deliverable 
     * @return _searchTerms list of search terms associated with the deliverable 
     */
    function getSearchTerms() view external returns (string [] memory _searchTerms);

    /**
     * @dev this is used to get the assessor for this deliverable 
     * @return _assessor address of assessor 
     */
    function getAssessor() view external returns (address _assessor);

    /**
     * @dev this is used to get the assessment for this deliverable 
     * @return _assessment address of the assessment 
     */
    function getAssessment() view external returns(address _assessment);

    /**
     * @dev this is used to "book" the assessment for this deliverable 
     * @return _assessment this returns the assessment that needs to be completed 
     */
    function bookAssessment() external returns (address _assessment);

    /**
     * @dev this adds the given search terms to this deliverable 
     * @param _terms for this deliverable    
     * @return _added true if the terms are successfully added
     */
    function addSearchTerms(string [] memory _terms) external returns(bool _added);

    /**
     * @dev this removes the given search terms from this deliverable 
     * @param _terms to be removed
     * @return _removed true if the terms are successfully removed
     */
    function removeSearchTerms(string [] memory _terms) external returns (bool _removed);

    /**
     * @dev this is used to push completed deliverables to the Atheneum for this DAO
     * @return _pushed true if successfully pushed 
     */
    function pushToAtheneum() external returns (bool _pushed); 

}

