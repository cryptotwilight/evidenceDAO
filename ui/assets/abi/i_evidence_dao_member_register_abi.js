const iEvidenceDaoMemberRegisterAbi = 
[
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_members",
				"type": "address[]"
			}
		],
		"name": "deRegisterMembers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_deRegisterCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalMembers",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRegisteredMembers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_members",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_member",
				"type": "address"
			}
		],
		"name": "isAdministrator",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_isAdministrator",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_member",
				"type": "address"
			}
		],
		"name": "isRegisteredMember",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_isRegistered",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_members",
				"type": "address[]"
			}
		],
		"name": "registerMembers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_registerCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalMembers",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_member",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isAdmin",
				"type": "bool"
			}
		],
		"name": "setAdministrator",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]