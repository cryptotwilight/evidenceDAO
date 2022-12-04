// SPDX-License-Identifier: GPL-3.0
// Block Star Logic (c) 2022
pragma solidity ^0.8.17;
/**
 * @author Block Star Logic (Git: cryptotwilight)
 * @title IEvidenceDaoMemberRegister
 * @notice Evidence DAO - Filecoin Next Steps Grant Community Contribution - Issue #555
 * @dev the Member Register represents the register for the members of a given DAO
 */
interface IEvidenceDaoMemberRegister { 

    /** 
     * @dev this returns all the registered members for this DAO in Evidence DAO 
     * @return _members list of members registered for this DAO
     */
    function getRegisteredMembers() view external returns (address [] memory _members);

    /** 
     * @dev this determines whether the given address is that of a member registered with the DAO for Evidence DAO 
     * @param _member address to be checked
     * @return _isRegistered true if the address is that of a registered member
     */
    function isRegisteredMember(address _member) view external returns (bool _isRegistered);

    /** 
     * @dev this determines whether the given address is that of a administrator of the DAO 
     * @param _member address to be checked 
     * @return _isAdministrator true if the address is that of an administrator
     */
    function isAdministrator(address _member) view external returns(bool _isAdministrator);

    /** 
     * @dev this sets whether the given member has administrative priviledges or not 
     * @param _member member to be granted or stripped of administrative priviledges
     * @param _isAdmin true if administrative priviledges are to be granted 
     * @return _set true if the action is successfully set 
     */
    function setAdministrator(address _member, bool _isAdmin) external returns (bool _set);

    /** 
     * @dev this registers the given members as Evidence DAO users for this DAO 
     * @param _members to be registered 
     * @return _registerCount of members successfully registered
     * @return _totalMembers registered for the DAO
     */
    function registerMembers(address [] memory _members) external returns (uint256 _registerCount, uint256 _totalMembers);

    /** 
     * @dev this de registers the given members of the DAO as Evidence DAO users
     * @param _members to be de-registered 
     * @return _deRegisterCount of members successfully de-registered 
     * @return _totalMembers registered for the DAO 
     */
    function deRegisterMembers(address [] memory _members) external returns (uint256 _deRegisterCount, uint256 _totalMembers);
}