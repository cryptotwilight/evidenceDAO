iEvidenceDAOCore = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "findDAO",
		"outputs": [
			{
				"internalType": "address",
				"name": "_daoAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDAOs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_daoAddresses",
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
				"name": "_daoAddress",
				"type": "address"
			}
		],
		"name": "isKnownDao",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_isKnown",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "logoIpfsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nftSymbol",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "membershipToken",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "membershipTokenLimit",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "administrator",
						"type": "address"
					},
					{
						"internalType": "enum MEMBERSHIP_TOKEN_TYPE",
						"name": "memberTokenType",
						"type": "uint8"
					}
				],
				"internalType": "struct DaoSeed",
				"name": "_daoSeed",
				"type": "tuple"
			}
		],
		"name": "registerDAO",
		"outputs": [
			{
				"internalType": "address",
				"name": "_daoAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]