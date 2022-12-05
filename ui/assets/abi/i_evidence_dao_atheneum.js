iEvidenceDaoAtheneum = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_deliverable",
				"type": "address"
			}
		],
		"name": "addDeliverable",
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
				"name": "_searchTerm",
				"type": "string"
			}
		],
		"name": "findDeliverable",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_deliverables",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllDeliverables",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_deliverables",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAvailableDeliverableCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "_count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDao",
		"outputs": [
			{
				"internalType": "address",
				"name": "_dao",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dao",
				"type": "address"
			}
		],
		"name": "init",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_set",
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
		"name": "removeDeliverable",
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