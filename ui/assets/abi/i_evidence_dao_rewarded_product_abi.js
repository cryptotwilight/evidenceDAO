const iEvidenceDaoRewardedProductAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_assignee",
				"type": "address"
			}
		],
		"name": "addAssignee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_added",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allowProductUpdate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_allowed",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approveReward",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cancel",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_cancelled",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsManifest",
				"type": "string"
			}
		],
		"name": "claimReward",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_claimed",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAssignees",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_assignees",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCompletedDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_completedDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContentManifest",
		"outputs": [
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProofsNFTAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "_erc721",
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
						"internalType": "address[]",
						"name": "assignees",
						"type": "address[]"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "rewardCurrency",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "proofNft",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "project",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "dueDate",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "projectMemberAssignmentsOnly",
						"type": "bool"
					}
				],
				"internalType": "struct RewardedProductSeed",
				"name": "_seed",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_assignee",
				"type": "address"
			}
		],
		"name": "removeAssignee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_removed",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]