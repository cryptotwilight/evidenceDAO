eDAOProjectDeliverableAbi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_project",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_dueDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_assessmentDueDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_reward",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_rewardCurrency",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_denominatedRewardonCreation",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_erc721Address",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getAssessmentDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_assessmentDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAssessmentDueDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_dueDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAssessmentResult",
		"outputs": [
			{
				"internalType": "string",
				"name": "_result",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAssigned",
		"outputs": [
			{
				"internalType": "address",
				"name": "_teamMember",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContentName",
		"outputs": [
			{
				"internalType": "string",
				"name": "_contentName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDeliveredDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_deliveredDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDenominatedREwardOnCreation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDocumentNFTContract",
		"outputs": [
			{
				"internalType": "address",
				"name": "_erc721Address",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDueDate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_dueDate",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIpfsCommentaryHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "_commentaryHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIpfsContentHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "_contentHash",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProject",
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
		"name": "getReward",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_reward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRewardCurrency",
		"outputs": [
			{
				"internalType": "string",
				"name": "_currency",
				"type": "string"
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
				"internalType": "string[]",
				"name": "_users",
				"type": "string[]"
			}
		],
		"name": "setAdditionalContributors",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_additionalContributors",
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
				"name": "_assigned",
				"type": "address"
			}
		],
		"name": "setAssigned",
		"outputs": [
			{
				"internalType": "bool",
				"name": "set",
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
				"name": "_ipfsContentHash",
				"type": "string"
			}
		],
		"name": "setContentHash",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsCommentaryHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assessmentResult",
				"type": "string"
			}
		],
		"name": "setIpfsCommentaryHash",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_contentName",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_additionalContributors",
				"type": "string[]"
			},
			{
				"internalType": "string",
				"name": "_ipfsContentHash",
				"type": "string"
			}
		],
		"name": "submitDeliverable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_submitted",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]