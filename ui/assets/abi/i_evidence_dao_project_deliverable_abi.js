const iEvidenceDaoProjectDeliverableAbi = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_terms",
				"type": "string[]"
			}
		],
		"name": "addSearchTerms",
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
		"name": "bookAssessment",
		"outputs": [
			{
				"internalType": "address",
				"name": "_assessment",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAssessment",
		"outputs": [
			{
				"internalType": "address",
				"name": "_assessment",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAssessor",
		"outputs": [
			{
				"internalType": "address",
				"name": "_assessor",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSearchTerms",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "_searchTerms",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pushToAtheneum",
		"outputs": [
			{
				"internalType": "bool",
				"name": "_pushed",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "_terms",
				"type": "string[]"
			}
		],
		"name": "removeSearchTerms",
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
