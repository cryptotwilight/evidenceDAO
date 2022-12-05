iEvidenceDao = [
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
						"internalType": "address",
						"name": "leader",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "startDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "endDate",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "dao",
						"type": "address"
					}
				],
				"internalType": "struct ProjectSeed",
				"name": "_projectSeed",
				"type": "tuple"
			}
		],
		"name": "createProject",
		"outputs": [
			{
				"internalType": "address",
				"name": "_project",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_projectName",
				"type": "string"
			}
		],
		"name": "findProject",
		"outputs": [
			{
				"internalType": "address",
				"name": "_project",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAtheneum",
		"outputs": [
			{
				"internalType": "address",
				"name": "_atheneum",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProjects",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_projects",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProofsNFT",
		"outputs": [
			{
				"internalType": "address",
				"name": "_proofsNFT",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSeed",
		"outputs": [
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStatus",
		"outputs": [
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_project",
				"type": "address"
			}
		],
		"name": "isKnownProject",
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
				"internalType": "address",
				"name": "_member",
				"type": "address"
			}
		],
		"name": "isMember",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_isMember",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "notifyChangeOfAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_recieved",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shutdownDao",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_isShutdown",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]