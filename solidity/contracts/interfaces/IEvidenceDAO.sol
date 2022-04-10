// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


interface IEvidenceDAO { 

    function registerDAO(string memory _daoName, address _unlockAddress, address _skillWalletAddress) external returns (address _edaoAddress);

    function getDAOs() view external returns (address [] memory _edaoAddresses);

}