const queryString 						= window.location.search;
const urlParams 						= new URLSearchParams(queryString);
const deliverableAddress 				= urlParams.get("deliverable");
const iEvidenceDaoProjectDeliverable 	= getContract(iEvidenceDaoProjectDeliverableAbi, projectAddress);
const iEvidenceRewardedProduct	 		= getContract(iEvidenceDaoRewardedProducteAbi, projectAddress);

const deliverableNameSpan				= ge("deliverable_name_span");
const deliverableDetailsSpan			= ge("deliverable_details_span");
const leaveOrCancelSpan					= ge("leave_or_cancel_span");

const addAssigneeSpan					= ge("add_assignee_span");
const claimDeliverableSpan				= ge("claim_deliverable_span");
const bookAssessmentSpan				= ge("book_assessment_span");
const approveDeliverableSpan			= ge("approve_deliverable_span");

const listAssigneesTable				= ge("list_assignees_table");

const deliverablesMessageSpan			= ge("deliverables_message_span");

const listDeliverableFilesTable			= ge("list_deliverable_files_table");


function configureCoreContracts() { 
	getViewerRole();
}

function loadPageData() { 
	
}

function loadProfiles() {
	if(isAdmin) {
	
	}	
	
	if(isLeader){			
	
	}
	else {
		if(isProjectMember) {
	
		}
		
		if(isRegisteredMember) {
		
		}
		
		if(isDaoMember) {
			// nothing special 
		}
		if(isAssessor) {
			// do something 
		}
		if(isUnknown) {
			// nothing special 
		}
	}
}
