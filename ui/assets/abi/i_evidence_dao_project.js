iEvidenceDaoProject = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newLeader",
				"type": "address"
			}
		],
		"name": "assignLeader",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_assigned",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
				"name": "_deliverableSeed",
				"type": "tuple"
			},
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
				"name": "_assessmentSeed",
				"type": "tuple"
			}
		],
		"name": "createDeliverable",
		"outputs": [
			{
				"internalType": "address",
				"name": "_deliverableAddress",
				"type": "address"
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
				"internalType": "enum MEMBER_ACTIONS",
				"name": "_action",
				"type": "uint8"
			}
		],
		"name": "executeMemberAction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_executed",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDeliverables",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_deliverableAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getJoiners",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_joiners",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLeader",
		"outputs": [
			{
				"internalType": "address",
				"name": "_teamLeader",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLeavers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_leavers",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMembers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_teamMembers",
				"type": "address[]"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_deliverable",
				"type": "address"
			}
		],
		"name": "isKnownDeliverable",
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
		"name": "joinProject",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_joined",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "leaveProject",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_left",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
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
				"name": "_deliverable",
				"type": "address"
			}
		],
		"name": "notifyDerivativeDeliverable",
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
		"name": "shutdownProject",
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