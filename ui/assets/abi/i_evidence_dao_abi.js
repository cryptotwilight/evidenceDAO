iEvidenceDAOAbi = [
	{
		"inputs": [],
		"name": "getDAOs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_edaoAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_daoName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_unlockAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_skillWalletAddress",
				"type": "address"
			}
		],
		"name": "registerDAO",
		"outputs": [
			{
				"internalType": "address",
				"name": "_edaoAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]