# Evidence DAO
This is the Evidence DAO prototype repository. The Evidence DAO project was created to help provide DAOs with a way to overcome 
the challenge of permissionless community and disparate data. This challenge becomes more significant with time as the frequency, 
quantity and importance of projects done by the DAO increase. Hence at Evidence DAO we have decided to tackle this problem early by 
providing a unified space on the decentralized web where DAOs can store and curate project data. 

## Architecture 
The architecture of Evidence DAO is completely decentralized we rely on EVM to provide compute and IPFS to provide scaleable decentralized storage. The diagram below describes the Prototype architecture. <br/>
<img src="https://github.com/cryptotwilight/evidenceDAO/blob/e871004b6cf41cd62693625c80281258607ab0d2/media/Evidence%20DA%20Architecture.png" width=300 height=300>

## Testnet Deployments 
The table below contains the testnet deployments for the Evidence DAO test net prototype. This prototype is functional and useable 
and should provide DAOs with a feel for the commercial platform that is currently in development. 

**Notice: Data stored on the Prototype is stored on the decentralized web in the clear, no encryption has been implemented by design.**
### Smart Contracts
Below is the current testnet deployment on the Sepolia Network. 

|**Address** 							   | **Contract** 								  	|**Version**|
|------------------------------------------|------------------------------------------------|-----------|
|0xB0030f8Ec426b8b88104f5E807b5b25B300c8358|RESERVED_OPEN_REGISTER_LITE						|1			|
|0xF5D7E2a655Aaab68495A6517C59bc42fe128DC94|RESERVED_EVIDENCE_DAO_CORE						|3			|
|0xa7a1093dE713fBC74b0B875349649380400Af153|RESERVED_EVIDENCE_DAO_ASSESSOR_REGISTER			|2			|
|0x5194680Fb4be627CFb8D1F8Cf4986B3272c25B80|RESERVED_EVIDENCE_DAO_GLOBAL_ADMINISTRATOR		|0			|
|										   |												|			|
|0x53510E6Ebe28a4b647AA6F90169c9eaE66Ac8Ea3|RESERVED_EVIDENCE_DAO_FACTORY					|1			|
|0x39dB32b88B57337F06B32033869382D159931840|RESERVED_EVIDENCE_PROOF_NFT_FACTORY				|2			|
|0xdF571f9C8E2bb488BB91f979B07694838ed5C89D|RESERVED_EVIDENCE_DAO_ATHENEUM_FACTORY			|3			|
|0x208ca36882CDc81374B55b54c9fd514dFcf7e448|RESERVED_EVIDENCE_DAO_PROJECT_FACTORY			|3			|
|0x6963e5252b6D4ae0D41718C6411072f249e63161|RESERVED_EVIDENCE_DAO_DELIVERABLE_FACTORY		|7			|


 
 
### UI 
The User Interface for the prototype can be found at the following address <br/>
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

### Executing The Prototype
The Evidence DAO prototype requires several users that in a normal DAO scenario would naturally be available these are 
* DAO Administrator - responsible for registering the DAO with Evidence DAO and administering projects on behalf of the DAO, they are also responsible for management of the Atheneum. 
* DAO Project Leader - responsible for, allowing project members, managing deliverables and assigning members to deliverables
* DAO Project Member - responsible for executing delivery of deliverables 
* Project Assessor - responsible for conducting an assessment of the project. This individual does not have to be a member of the DAO and cannot be a member of the project. 

For the prototype you will also need a membership token contract. This is checked by Evidence DAO when verifying that members are indeed part of your DAO before they can do anything. There are several conditions for DAO members with different permissions 
* Unregistered Member - these are members of the DAO that are not registered with Evidence DAO. They are able to fully access the Atheneum and review the outputs from complete projects permissionlessly 
* Registered Member - these are members of the DAO that have been registered by a DAO administrator with Evidence DAO. These members are able to join projects, contribute and lead projects. They have all the same privileges that unregistered Members have 

To execute the Prototype the following steps have to be followed 

1. Ensure all addresses to be used in roles except for the Project Assessor are registered members of the DAO via the DAO token contract
Note: For the demo DAOs will only be able to use project assessors that are outside the project but inside the DAO  
2. DAO Administrator - needs to register the DAO 
3. DAO Administrator - needs to register all DAO members that are going to be using Evidence DAO 
4. DAO Administrator - needs to create a project, and assign the leader (in a live DAO this will typically be after the DAO has approved a proposal)
5. Project Members   - need to join the project 
6. Project Leader - needs to allow Project Members to contribute to the project 
7. Project Leader - needs to create the deliverables for the project, and assign the relevant members 
8. Project Members - on completion of delivery, need to claim their deliverables [NFT based proof will be issued to the Project Assessor]
9. Project Assessor - needs to book assessment of "IN CLAIM" deliverables 
10. Project Assessor - on completion of assessment needs to claim against the submitted assessment [NFT based proof will be issued to the Project Assessor]
11. DAO Administrator - needs to approve the project assessment 
12. DAO Administrator - needs to approve the project deliverable 
13. Project Leader - needs to push the deliverables to the Atheneum 
14. Unregistered Members - should be able to review the deliverables 

### Commentary 
Security has been implemented in this prototype and it does demostrate some strong fundamentals. For example project leaders cannot assign non project members to deliverables, and unregistered Members of the DAO cannot join projects. Also the administrator cannot register non-DAO members. 

This model ensures that DAOs can accurately begin the process of designing how they will implement Evidence DAO into their existing organisational processes with the comfort that at scale rogue behaviour is very difficult to achieve. 

Evidence DAO moves DAOs into the space of we "Know Who" is doing, rather than the current bounty model whereby it's a free for all. The importance of this distinction increases when working with sensitive data.

#### Note on Proofs 
Proofs are issued by Evidence DAO. The rationale here is that since a DAO is permissionless users can leave and rejoin at any time therefore indisputable evidence of their contribution needs to be available. These may shift to a Soul Bound model in the upcoming commercial version of Evidence DAO.

For more on Evidence DAO see
https://www.evidencedaocrypto.com
