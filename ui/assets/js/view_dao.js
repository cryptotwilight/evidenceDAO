      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      daoAddress = urlParams.get("dao");
      
      const daoNameSpan         = ge("dao_name_span");
      const daoDetailsSpan      = ge("dao_details_span");
      const createProjectSpan   = ge("create_project_span");
      const adminButtonSpan     = ge("admin_button_span");
      const registerMemberSpan  = ge("register_member_span");
      const listMembersTable    = ge("list_members_table");
      const projectsMessageSpan = ge("projects_message_span");
      const listProjectsTable   = ge("list_projects_table");
      
      
      async function bootPageContracts() { 
        iEvidenceDao = getContract(iEvidenceDaoAbi,daoAddress );
        iEvidenceDaoMemberRegister = getContract(iEvidenceDaoMemberRegisterAbi, daoAddress);
        iEvidenceDao.methods.getSeed().call({from : account}) 
        .then(function(resp){
          console.log(resp);
          daoSeed = resp; 
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function loadPageData() { 
        checkIsAdmin();
        populateDaoDetails();        
        getListMembersModule();
        getListProjectsModule();
        
      }

      var newMemberRegisterList = []; 

      function getRegisterMemberModule() {
        registerMemberSpan.innerHTML = ""; 
        newMemberRegisterList = [];


        registerMemberSpan.innerHTML = ""; 
        var wrapper = ce("div");
        wrapper.setAttribute("class", "col-lg-12 col-md-6 col-6 mb-2");
        registerMemberSpan.append(wrapper);
        var card = ce("card");
        wrapper.append(card);
        card.setAttribute("class","card");
        var cardBody = ce("div");
        cardBody.setAttribute("class", "card-body");              
        card.append(cardBody);
        var cardTitle = ce("div");
        cardTitle.setAttribute("class","card-title d-flex align-items-start justify-content-between");
        var h5 = ce("h5"); 
        h5.setAttribute("class", "card-title text-primary");
        h5.append("Register New Members");
        cardTitle.append(h5);
        cardBody.append(cardTitle);

        var table = ce("table");
        var row = table.insertRow(); 
        var labelCell = row.insertCell(); 
        labelCell.append(text("Member Address:"));
        var inputCell = row.insertCell(); 
        var memberAddressField = ce("input");
        memberAddressField.setAttribute("type","text");
        memberAddressField.setAttribute("id", "new_member_address_field");
        inputCell.append(memberAddressField);

        var addButtonCell = row.insertCell(); 
        var a = ce("a");
        a.setAttribute("href", "javascript:addToRegisterList()");
        a.setAttribute("class","btn btn-outline-primary");
        a.append(text("add"));
        addButtonCell.append(a);

        var newMembersRow = table.insertRow();
        var newMembersCell = newMembersRow.insertCell(); 
        newMembersCell.setAttribute("colspan","3");
        var span = ce("span");
        span.setAttribute("id", "new_members_to_register");
        var cc = ce("center");
        cc.append(span);
        newMembersCell.append(cc);

        var registerRow = table.insertRow(); 
        var registerCell = registerRow.insertCell(); 
        registerCell.setAttribute("colspan","3");
        var registerButton = ce("a");
        registerButton.setAttribute("href", "javascript:registerMembers()");
        registerButton.setAttribute("class", "btn btn-outline-danger");
        registerButton.append("Register DAO Members");
        var c = ce("center");
        c.append(registerButton);
        registerCell.append(c); 
        cardBody.append(table)
        
      }

      function addToRegisterList() { 
        console.log("registering");
        var member = document.getElementById("new_member_address_field").value;
        newMemberRegisterList.push(member);
        console.log(newMemberRegisterList);
        var newMemberToRegisterSpan = document.getElementById("new_members_to_register");
        newMemberToRegisterSpan.innerHTML = ""; 
        var table = ce("table");
        for(var x = 0; x < newMemberRegisterList.length; x++) {
          var row = table.insertRow(); 
          var cell = row.insertCell();
          cell.append(text(newMemberRegisterList[x]));
        }
        newMemberToRegisterSpan.append(table);
      }


      function setValue(detailsTable, label, value) {
          var row = detailsTable.insertRow(); 
          var labelCell = row.insertCell();            
          labelCell.append(text(label));
          var valueCell = row.insertCell();
          valueCell.append(text(value));
      }

      function setValueElement(detailsTable, label, value) {
          var row = detailsTable.insertRow(); 
          var labelCell = row.insertCell();            
          labelCell.append(text(label));
          var valueCell = row.insertCell();
          valueCell.append(value);
      }

      function getMembershipTokenType(memberTokenType) {
        if(memberTokenType === "0") {
          return "NFT"; 
        }
        if(memberTokenType === "1") {
          return "ERC20 Cryptocurrency"; 
        }
      }

      function populateSeedData(daoDetailsTable) {
        iEvidenceDao.methods.getSeed().call({from : account})
        .then(function(resp){
          console.log(resp);
          var seed = resp; 
          
          daoNameSpan.innerHTML = ""; 
          daoNameSpan.append(text(seed.name));

          setValue(daoDetailsTable,"DAO Name", seed.name);
          var img = ce("img");
          img.setAttribute("src", ipfsRoot + seed.logoIpfsHash);
          setValueElement(daoDetailsTable,"DAO Logo", img);
          setValue(daoDetailsTable,"Proofs NFT Symbol", seed.nftSymbol);
          setValueElement(daoDetailsTable,"DAO Membership Token", shortenLinkCopyAddress(seed.membershipToken));
          setValue(daoDetailsTable,"DAO Membership Token Limit", seed.membershipTokenLimit);
          setValueElement(daoDetailsTable,"Administrator", shortenLinkCopyAddress(seed.administrator));
          setValue(daoDetailsTable,"MembershipTokenType",getMembershipTokenType(seed.memberTokenType));
          populateProofsData(daoDetailsTable);
        
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function populateProofsData(daoDetailsTable) {
        iEvidenceDao.methods.getProofsNFT().call({from : account})
        .then(function(resp){
          console.log(resp);
          setValueElement(daoDetailsTable,"Submission Proofs NFT",shortenLinkCopyAddress(resp) );
          populateStatusData(daoDetailsTable)
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function populateStatusData(daoDetailsTable) {
        iEvidenceDao.methods.getStatus().call({from : account})
        .then(function(resp){
          console.log(resp);          
          setValue(daoDetailsTable,"Status",resp );
          populateAtheneumData(daoDetailsTable); 
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function populateAtheneumData(daoDetailsTable) {
        iEvidenceDao.methods.getAtheneum().call({from : account})
        .then(function(resp){
          console.log(resp);
          setValueElement(daoDetailsTable,"Atheneum",shortenLinkCopyAddress(resp));
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function populateDaoDetails() {
        var daoDetailsTable = ce("table");
        daoDetailsSpan.innerHTML = ""; 
        daoDetailsSpan.append(daoDetailsTable);
        populateSeedData(daoDetailsTable);
       
      }
    
      function getMemberLeaderSelect(leaderSelect) { 
        iEvidenceDaoMemberRegister.methods.getRegisteredMembers().call({from : account})
        .then(function(resp){
          console.log(resp);
          var members = resp; 
          var select = ce("select");
          select.setAttribute("id","project_leader");
          for(var x = 0; x < members.length; x++) {
            var option = ce("option");
            var member = members[x];
            option.value = member;
            option.append(text(member));
            select.append(option);
          }     
          leaderSelect.append(select);
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function checkIsAdmin() {
        console.log("checking admin");
        iEvidenceDaoMemberRegister.methods.isAdministrator(account).call({from : account})
        .then(function(resp){
          console.log(resp);
          if(resp+"" === "true"){
            getCreateProjectModule();
            getRegisterMemberModule(); 
          }          
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function registerMembers() { 
    
        console.log(newMemberRegisterList);
        iEvidenceDaoMemberRegister.methods.registerMembers(newMemberRegisterList).send({from : account})
        .then(function(resp){
          console.log(resp);
          loadPageData(); 

        })
        .catch(function(err){
          console.log(err);
        })
      }

      function deregisterMembers() { 

        var members = [];
        $("input:checkbox[name=dereg]:checked").each(function(){
          members.push($(this).val());
        });
        
        console.log(members);

        iEvidenceDaoMemberRegister.methods.deregisterMembers(members).send({from : account})
        .then(function(resp){
          console.log(resp);

        })
        .catch(function(err){
          console.log(err);
        })
      }

      function setAdministrator() { 

          iEvidenceDaoMemberRegister.methods.setAdministrator(member).send({from : account})
          .then(function(resp){
            console.log(resp);
  
          })
          .catch(function(err){
            console.log(err);
          })

      }

      function createProject()  { 
        console.log(document.getElementById("start_date").value);
        
        var projectSeed = {}; 
        projectSeed.name      = document.getElementById("project_name").value; 
        projectSeed.leader    = document.getElementById("project_leader").value+"";  
        projectSeed.startDate = new Date(document.getElementById("start_date").value).getTime() / 1000; 
        projectSeed.endDate   = new Date(document.getElementById("end_date").value).getTime() / 1000; 
        projectSeed.dao       = daoAddress; 
        console.log(projectSeed);

        iEvidenceDao.methods.createProject(projectSeed).send({from : account})
        .then(function(resp){
          console.log(resp);
          loadPageData(); 
        })
        .catch(function(err){
          console.log(err);
        })

      }

      function getListMembersModule() {
        clearInterval(listMembersTable);        
        iEvidenceDaoMemberRegister.methods.isAdministrator(account).call({from : account})
        .then(function(resp){
          console.log(resp);
          var viewerIsAdmin = resp; 
          processMemberListBuild(viewerIsAdmin);
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function processMemberListBuild(viewerIsAdmin) {
        var tbody = listMembersTable.tBodies[0];
        console.log("is Admin " + viewerIsAdmin);
        iEvidenceDaoMemberRegister.methods.getRegisteredMembers().call({from : account})
        .then(function(resp){
          console.log(resp);
          var members = resp; 
          for(var x = 0; x < members.length; x++) {
            var member = members[x];
            var row = tbody.insertRow(); 
            addMemberRow(member, row, viewerIsAdmin);
          }
          if(viewerIsAdmin){
            var dRow = tbody.insertRow(); 
            var filler = dRow.insertCell();
            filler.setAttribute("colspan","2");
            var deregCell = dRow.insertCell(); 
           
            deregCell.setAttribute("colspan",3);
            var a = ce("a");
            a.setAttribute("href", "javascript:deregister();");
            a.setAttribute("class","btn btn-outline-danger");
            a.append("De-Register Members");            
            deregCell.append(a);
          }
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function addMemberRow(member, row, viewerIsAdmin) { 
        console.log("adding member " + member);
        var memberCell = row.insertCell(); 
        var adminCell = row.insertCell();
        var deregisterCell = row.insertCell(); 
        memberCell.append(text(member));
    
        var selfAdmin = member.toString().toLowerCase() === account.toString().toLowerCase();

        if(!selfAdmin && viewerIsAdmin){
          var deregisterCheckBox = ce("input");
          deregisterCheckBox.setAttribute("type", "checkbox");
          deregisterCheckBox.setAttribute("name", "dereg");
          deregisterCheckBox.setAttribute("value", member);
          deregisterCell.append(deregisterCheckBox);
        }

        iEvidenceDaoMemberRegister.methods.isAdministrator(member).call({from : account})
        .then(function(resp){
          console.log(resp);
           if(resp === true) {
            if(viewerIsAdmin) {              
              if(selfAdmin){ 
                adminCell.append(text("Administrator"));
              }
              else {
                var a = ce("a");
                a.setAttribute("href","javascript:disableAdmin(\""+member+"\")");
                a.setAttribute("class", "btn btn-outline-danger");
                a.append(text("Disable Admin"));
                adminCell.append(a);
              }
            }
            else { 
              adminCell.append(text("Administrator"));
            }
           }
           else { 
              if(viewerIsAdmin) {
                var a = ce("a");
                a.setAttribute("href","javascript:enableAdmin(\""+member+"\")");
                a.setAttribute("class", "btn btn-outline-warning");
                a.append(text("Enable Admin"));
                adminCell.append(a);
              }
           }
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function disableAdmin(member) {
        iEvidenceDaoMemberRegister.methods.setAdministrator(member, false).send({from : account})
        .then(function(resp){
          console.log(resp);
          getListMembersModule(); 
        })
        .catch(function(err){
          console.log(err);
        })

      }

      function enableAdmin(member) {
          iEvidenceDaoMemberRegister.methods.setAdministrator(member, true).send({from : account})
          .then(function(resp){
            console.log(resp);
            getListMembersModule(); 
          })
          .catch(function(err){
            console.log(err);
          })
      }

      function getListProjectsModule() {
        var tbody = listProjectsTable.tBodies[0]; 
        tbody.innerHTML = ""; 
        /*     
          <tr>
            <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>Angular Project</strong></td>
            <td>5</td>
            <td>3</td>
            <td>
              <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                <li
                  data-bs-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-bs-placement="top"
                  class="avatar avatar-xs pull-up"
                  title="Lilian Fuller"
                >
                  <img src="assets/img/avatars/5.png" alt="Avatar" class="rounded-circle" />
                </li>
                <li
                  data-bs-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-bs-placement="top"
                  class="avatar avatar-xs pull-up"
                  title="Sophia Wilkerson"
                >
                  <img src="assets/img/avatars/6.png" alt="Avatar" class="rounded-circle" />
                </li>
                <li
                  data-bs-toggle="tooltip"
                  data-popup="tooltip-custom"
                  data-bs-placement="top"
                  class="avatar avatar-xs pull-up"
                  title="Christina Parker"
                >
                  <img src="assets/img/avatars/7.png" alt="Avatar" class="rounded-circle" />
                </li>
              </ul>
            </td>
            <td><span class="badge bg-label-primary me-1">Active</span></td>
            <td>
              <div class="dropdown">
                <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="bx bx-dots-vertical-rounded"></i>
                </button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Close</a>
                </div>
              </div>
            </td>
          </tr>          
        */
        iEvidenceDao.methods.getProjects().call({from : account})
        .then(function(resp){
          console.log(resp);
          var projects = resp; 
          for(var x = 0; x < projects.length; x++){
            var projectAddress = projects[x];
            buildProjectRow(projectAddress, tbody);
          }
        })
        .catch(function(err){
          console.log(err);
        })

      }

      function buildProjectRow(projectAddress, tbody) {
        var projectContract = getContract(iEvidenceDaoProjectAbi, projectAddress);
        var row = tbody.insertRow();         

        setProjectNameAndEndDate(projectContract, row, projectAddress);
      }

      function setProjectNameAndEndDate(projectContract, row, projectAddress){
        projectContract.methods.getSeed().call({from : account})
        .then(function(resp){
          console.log(resp);
          var seed = resp; 
          var nameCell = row.insertCell(); 
          nameCell.append(text(seed.name));

          var endDateCell = row.insertCell(); 
          endDateCell.append(text(getDateTime(seed.endDate)));
          // deliverables 
          setDeliverables(projectContract, row, projectAddress)
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function getDateTime(tme) {
        return new Date(tme*1000).toISOString();
      }

      function setDeliverables(projectContract, row, projectAddress){
        projectContract.methods.getDeliverables().call({from : account})
        .then(function(resp){
          console.log(resp);
          var deliverables = resp; 
          var deliverablesCell = row.insertCell();
          deliverablesCell.append(text(deliverables.length));

          setLeader(projectContract, row, projectAddress);
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function setLeader(projectContract, row, projectAddress){
        projectContract.methods.getLeader().call({from : account})
        .then(function(resp){
          console.log(resp);
          var leader = resp; 
          var viewerType = ""; 
          if(isAddressMatch(account, leader)){
            viewerType = "PROJECT_LEADER"; 
            console.log("LEADER");            
          }
          var leaderCell = row.insertCell(); 
          leaderCell.append(shortenLinkCopyAddress(leader));
          setMembers(projectContract, row, viewerType, projectAddress);
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function setMembers(projectContract, row, viewerType, projectAddress) {
        projectContract.methods.getMembers().call({from : account})
        .then(function(resp){
          console.log(resp);
          var members = resp; 
          var table = ce("table");
          for(var x = 0; x < members.length; x++){
            var member = members[x]
            if(viewerType === "" && isAddressMatch(account, member)) {
              viewerType = "PROJECT_MEMBER";                             
            }
            var mRow = table.insertRow(); 
            var mCell = mRow.insertCell();
            mCell.append(shortenLinkCopyAddress(member));                                   
          }
          var membersCell = row.insertCell(); 
          membersCell.append(table);
          setStatus(projectContract, row, viewerType, projectAddress);
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function setStatus(projectContract, row, viewerType, projectAddress){
        projectContract.methods.getStatus().call({from : account})
        .then(function(resp){
          console.log(resp);
          var status = resp; 
          var statusCell = row.insertCell();
          statusCell.append(status);
          
          setActions(projectContract, row, viewerType, projectAddress);    
        })
        .catch(function(err){
          console.log(err);
        });
      }

      function setActions(projectContract, row, viewerType, projectAddress){
        projectContract.methods.isMember(account).call({from : account})
        .then(function(resp){
          console.log(resp);        
          console.log(viewerType);
          if(viewerType === "PROJECT_LEADER") {
            // VIEW  
            getFunctions(["VIEW"], row, viewerType, projectAddress);
          }
          if(viewerType === "PROJECT_MEMBER") {
            // VIEW / LEAVE
            getFunctions(["VIEW","LEAVE"], row, viewerType, projectAddress);
          }
          if(viewerType === "") { // not project member, not leader, maybe dao member, dao admin, no role 
            getViewerType( row, projectAddress);
          }
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function join(projectAddress) { 
        var project = getContract(iEvidenceDaoProjectAbi, projectAddress);
        project.methods.joinProject().send({from : account})
        .then(function(resp){
          console.log(resp);
          projectsMessageSpan.innerHTML = ""; 
          projectsMessageSpan.append(text(resp.blockHash));
          getCreateProjectModule();

        })
        .catch(function(err){
          console.log(err);
        })
      }

      function leave(projectAddress) {
        var project = getContract(iEvidenceDaoProjectAbi, projectAddress);
        project.methods.leaveProject().send({from : account})
        .then(function(resp){
          console.log(resp);
          projectsMessageSpan.innerHTML = ""; 
          projectsMessageSpan.append(text(resp.blockHash));
          getCreateProjectModule();
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function shutdownProject(projectAddress) {
        var project = getContract(iEvidenceDaoProjectAbi, projectAddress);
        project.methods.shutdownProject().send({from : account})
        .then(function(resp){
          console.log(resp);
          projectsMessageSpan.innerHTML = ""; 
          projectsMessageSpan.append(text(resp.blockHash));
          getCreateProjectModule();
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function getFunctions(functionNames, row, viewerType, projectAddress) {
        console.log(row);
        var actionsCell = row.insertCell(); 
        console.log(" project address " + projectAddress);
        var div = ce("div"); 
        div.append(text(viewerType));

        var table = ce("table");

        for(var x = 0; x < functionNames.length; x++) {
          var row1 = table.insertRow(); 
          var cell = row1.insertCell(); 
          var functionName = functionNames[x];
          var item = ce("a");

          var icon = ce("i");
          item.append(icon);
          cell.append(item);
          
          if(functionName === "VIEW") {
            item.setAttribute("href", "02_view_project.html?project="+projectAddress);
            icon.setAttribute("class","bx bx-glasses");
            item.append(text("View"));
          }

          if(functionName === "LEAVE") {
            item.setAttribute("href", "javascript:leaveProject(\""+projectAddress+"\");");
            icon.setAttribute("class","bx bx-exit");
            item.append(text("Leave"));
          }

          if(functionName === "JOIN") {
            item.setAttribute("href", "javascript:joinProject(\""+projectAddress+"\");");
            icon.setAttribute("class","bx bx-door-open");
            item.append(text("Join"));
          }

          if(functionName === "SHUTDOWN") {
            item.setAttribute("href", "javascript:shutdownProject(\""+projectAddress+"\");");
            icon.setAttribute("class","bx bx-power-off");
            item.append(text("Shutdown"));
          }
        }
        div.append(table);
        actionsCell.append(div);
      }

      function checkAdmin(row, projectAddress) {
        iEvidenceDaoMemberRegister.methods.isAdministrator(account).call({from : account})
        .then(function(resp){          
          // VIEW / SHUTDOWN 
          console.log(resp);
          if(resp === true){
            var viewerType = "DAO_ADMINISTRATOR"; 
            getFunctions(["VIEW","SHUTDOWN"], row, viewerType, projectAddress);
          }
          else {
            // IS REGISTERED MEMBER 
            checkRegisteredMember(row, projectAddress);
          }
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function checkRegisteredMember(row, projectAddress) {
        // IS REGISTERED MEMBER 
        iEvidenceDaoMemberRegister.methods.isRegisteredMember(account).call({from : account})
        .then(function(resp){
          // VIEW / JOIN
          console.log(resp);
          if(resp === true){
            var viewerType  = "DAO_REGISTERED_MEMBER"; 
            getFunctions(["VIEW", "JOIN"], row, viewerType, projectAddress);            
          }
          else {
            // IS DAO MEMBER 
            checkDaoMember(row, projectAddress);
          }
        })
        .catch(function(err){
          console.log(err);
        })
      }

      function checkDaoMember(row, projectAddress) {
        // IS DAO MEMBER 
        iEvidenceDao.methods.isMember(account).call({from : account})
        .then(function(resp){
          // VIEW 
          console.log(resp);
          if(resp === true){
            var viewerType = "DAO_MEMBER"; 
            getFunctions(["VIEW"], row, viewerType, projectAddress);
          }
          else { 
            var viewerType = "UNKNOWN_INDIVIDUAL"; 
            getFunctions([], row, viewerType, projectAddress);
          }
        })
        .catch(function(err){
          console.log(err);
        })        
      }

      function getViewerType(row, projectAddress) {
        // IS ADMIN 
        checkAdmin(row, projectAddress);
      }

      function getCreateProjectModule() {
            /*<div class="col-lg-12 col-md-12 col-6 mb-4">
                <div class="card">
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <h5 class="card-title text-primary">Create Project</h5> 
                    </div>
                    <table>
                          <tr> 
                            <td>Project Name</td><td><input type="text" id="project_name" class="form-control"></td>
                            <td>Project Leader</td><td><span id="leader_select_span"></span></td>
                          </tr>
                          <tr> 
                            <td>Start Date</td><td><input type="text" id="project_start_date" class="form-control"></td>
                            <td>End Date</td><td><input type="text" id="project_end_date" class="form-control"></td>
                          </tr>
                          <tr> 
                            <td colspan="4"><center><a href="javascript:createProject()" class="btn btn-outline-primary">Create Project</a></center></td>
                          </tr>
                    </table>
                  </div>
                </div>
              </div>
          */
        createProjectSpan.innerHTML = ""; 
        var wrapper = ce("div");
        wrapper.setAttribute("class", "col-lg-12 col-md-12 col-6 mb-4");
        createProjectSpan.append(wrapper);
        var card = ce("card");
        wrapper.append(card);
        card.setAttribute("class","card");
        var cardBody = ce("div");
        cardBody.setAttribute("class", "card-body");              
        card.append(cardBody);
        var cardTitle = ce("div");
        cardTitle.setAttribute("class","card-title d-flex align-items-start justify-content-between");
        var h5 = ce("h5"); 
        h5.setAttribute("class", "card-title text-primary");
        h5.append("Create Project");
        cardTitle.append(h5);
        cardBody.append(cardTitle);

        var table = ce("table");
        cardBody.append(table);

        var row = table.insertRow();
        var projectNameLabelCell = row.insertCell(); 
        projectNameLabelCell.append(text("Project Name: "));

        var projectNameValueCell = row.insertCell();
        var projectName = ce("input");
        projectName.setAttribute("id", "project_name");
        // projectName.setAttribute("class","form-control");
        projectNameValueCell.append(projectName);
        
        row = table.insertRow();
        var projectLeaderLabelCell = row.insertCell(); 
        projectLeaderLabelCell.append(text("Project Leader: "));

        var projectLeaderValueCell = row.insertCell();             
        getMemberLeaderSelect(projectLeaderValueCell);

        var row = table.insertRow();
        var projectStartDateLabelCell   = row.insertCell(); 
        projectStartDateLabelCell.append(text("Project Start Date: "));

        var projectStartDateCell        = row.insertCell(); 
        var startDate = ce("input");
        startDate.setAttribute("type", "datetime-local");
        //startDate.setAttribute("class","form-control");
        startDate.setAttribute("id", "start_date");
        projectStartDateCell.append(startDate);

        row = table.insertRow();
        var projectEndDateLabelCell     = row.insertCell(); 
        projectEndDateLabelCell.append(text("Project End Date"));

        var projectEndDateCell          = row.insertCell(); 
        var endDate = ce("input");
        endDate.setAttribute("type", "datetime-local");
        //endDate.setAttribute("class","form-control");
        endDate.setAttribute("id", "end_date");
        projectEndDateCell.append(endDate);

        var row = table.insertRow();
        var createProjectButtonCell = row.insertCell(); 
        createProjectButtonCell.setAttribute("colspan","2");
        var createProjectButton = ce("a");
        createProjectButton.setAttribute("class", "btn btn-outline-primary");
        createProjectButton.setAttribute("href", "javascript:createProject()");
        createProjectButton.append(text("Create Project"));
        createProjectButtonCell.append(createProjectButton);

      }   


