# Evidence DAO
This is the Evidence DAO prototype repository. The Evidence DAO project was created to help provide DAOs with a way to overcome 
the challenge of permissionless community and disparate data. This challenge becomes more significant with time as the frequency, 
quantity and importance of projects done by the DAO increase. Hence at Evidence DAO we have decided to tackle this problem early by 
providing a unified space on the decentralized web where DAOs can store and curate project data. 

## Architecture 
The architecture of Evidence DAO is completely decentralized we rely on EVM to provide compute and IPFS to provide scaleable decentralized storage. The diagram below describes the Prototype architecture. 
<img src="https://github.com/cryptotwilight/evidenceDAO/blob/e871004b6cf41cd62693625c80281258607ab0d2/media/Evidence%20DA%20Architecture.png" width=100 height=100>

## Testnet Deployments 
The table below contains the testnet deployments for the Evidence DAO test net prototype. This prototype is functional and useable 
and should provide DAOs with a feel for the commercial platform that is currently in development. 

**Notice: Data stored on the Prototype is stored on the decentralized web in the clear, no encryption has been implemented by design.**
### Smart Contracts
Below is the current testnet deployment on the Sepolia Network. 

|**Address** 							   | **Contract** 								  | **Version**|
|------------------------------------------|----------------------------------------------|--------|
|0x4a986D49ea91cD192422653052038aCF0bF209e3|RESERVED_OPEN_REGISTER_LITE					  |1	   |
|0x4acF881c2da88218ca6100AC60fEF4703D49FA63|RESERVED_EVIDENCE_DAO_ATHENEUM_FACTORY		  |1       |
|0x5194680Fb4be627CFb8D1F8Cf4986B3272c25B80|RESERVED_EVIDENCE_DAO_GLOBAL_ADMINISTRATOR	  |0       |
|0x17D73C5633324C5c4182EfEC1798aCEc8F91f0bf|RESERVED_EVIDENCE_DAO_FACTORY				  |1       |
|0x59D15E6c2549A53653d2082EFCb5b10069bd21D6|RESERVED_EVIDENCE_DAO_DELIVERABLE_FACTORY	  |1	   |
|0x14E9ddB971634F0da24196Ee83c35a16E65aA1f8|RESERVED_EVIDENCE_DAO_REWARDED_PRODUCT_FACTORY|1	   |
|0x7F692Cc99b5a3ef5B7f55e3ed0D80253EC18fa0F|RESERVED_EVIDENCE_PROOF_NFT_FACTORY			  |2	   |
|0x354C367f42A4ecAF3AA666b217D4555a818521c0|RESERVED_EVIDENCE_DAO_PROJECT_FACTORY		  |2	   |
|0x239ecDFeeD7A61c7B6333b8152aF644Fc22fd096|RESERVED_EVIDENCE_DAO_CORE					  |1	   |


### UI 
The User Interface for the prototype can be found at the following address 
https://raspy-frost-1289.on.fleek.co/


### Points to Note 
The following are some user points to note on usage of the prototype
* A DAO membership contract is required, this can be an NFT contract or a Token (ERC20) contract 
* The prototype will check whether the DAO registra is a member of the DAO i.e. you hold membership token 
* Only registered members can join projects 
* Unregistered members are able to browse all the deliverables of the DAO 
* Non-members are unable to see any of the deliverables of the DAO 
* Assessments have to be approved for deliverables to be approved 
* Assessments do not have to be passed to the Atheneum separately 



For more on Evidence DAO see
https://www.evidencedaocrypto.com
