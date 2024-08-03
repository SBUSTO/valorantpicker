async function app() {

    const agentMetaData = {
        "Astra": { name: "Astra", type: "Controller", img: "/client/images/Astra_icon.webp" },
        "Breach": { name: "Breach", type: "Initiator", img: "/client/images/breach_icon.webp" },
        "Brimstone": { name: "Brimstone", type: "Controller", img: "/client/images/brimstone_icon.webp" },
        "Clove": { name: "Clove", type: "Controller", img: "/client/images/clove_icon.webp" },
        "Cypher": { name: "Cypher", type: "Sentinel", img: "/client/images/cypher_icon.webp" },
        "Jett": { name: "Jett", type: "Duelist", img: "/client/images/jett_icon.webp" },
        "KAY/O": { name: "KAY/O", type: "Initiator", img: "/client/images/kayo_icon.webp" },
        "Killjoy": { name: "Killjoy", type: "Sentinel", img: "/client/images/killjoy_icon.webp" },
        "Neon": { name: "Neon", type: "Duelist", img: "/client/images/neon_icon.webp" },
        "Omen": { name: "Omen", type: "Controller", img: "/client/images/omen_icon.webp" },
        "Phoenix": { name: "Phoenix", type: "Duelist", img: "/client/images/phoenix_icon.webp" },
        "Raze": { name: "Raze", type: "Duelist", img: "/client/images/raze_icon.webp" },
        "Reyna": { name: "Reyna", type: "Duelist", img: "/client/images/reyna_icon.webp" },
        "Sage": { name: "Sage", type: "Sentinel", img: "/client/images/sage_icon.webp" },
        "Skye": { name: "Skye", type: "Initiator", img: "/client/images/skye_icon.webp" },
        "Sova": { name: "Sova", type: "Initiator", img: "/client/images/sova_icon.webp" },
        "Viper": { name: "Viper", type: "Controller", img: "/client/images/viper_icon.webp" },
        "Yoru": { name: "Yoru", type: "Duelist", img: "/client/images/yoru_icon.webp" },
    }

  //function to fetch data from the API
  async function fetchData() {
    const response = await fetch("https://valorant-api.com/v1/agents");
    const { status, data } = await response.json()
    return data
  }

    //call function
  let agentData =  await fetchData();
  
  console.log(agentData)
  //function to display selected-agents portrait
  function displaySelectedAgent(agent) {
      const selectedAgentContainer = document.getElementById('portrait');
      selectedAgentContainer.innerHTML = `
          <img class="selected-agent-portrait" src="${agent.fullPortrait}" alt="${agent.displayName}">
          <p>${agent.displayName}</p>
          `;
          console.log('Displayed agent:', agent);
  }



  // list of agents
  const agents = agentData;

  const selected = [];

  const unselected = [];

  const roleContainers = {
    Controller: document.getElementById("controller"),
    Initiator: document.getElementById("initiator"),
    Sentinel: document.getElementById("sentinel"),
    Duelist: document.getElementById("duelist"),
  };

  //function to select all agents of a given role
  function selectAllAgents(role) {
    const agentsOfRole = agents.filter((agent) => agent.type === role);
    agentsOfRole.forEach((agent) => {
      if (!selected.includes(agent)) {
        selected.push(agent);
        document
          .getElementById(`agent-${agent.displayName}`)
          .classList.add("selected");
      }
    });
    console.log(`Selected agents for ${role}`, selected);
  }

  //add event listeners to "select all" buttons
  document
    .getElementById("select-all-controller")
    .addEventListener("click", () => selectAllAgents("Controller"));
  document
    .getElementById("select-all-initiator")
    .addEventListener("click", () => selectAllAgents("Initiator"));
  document
    .getElementById("select-all-sentinel")
    .addEventListener("click", () => selectAllAgents("Sentinel"));
  document
    .getElementById("select-all-duelist")
    .addEventListener("click", () => selectAllAgents("Duelist"));

  //function to deselect all agents of a given role
  function unselectAllAgents(role) {
    const agentsOfRole = agents.filter((agent) => agent.type === role);
    agentsOfRole.forEach((agent) => {
      const index = selected.indexOf(agent);
      if (index !== 1) {
        selected.splice(index, 1);
        document
          .getElementById(`agent-${agent.name}`)
          .classList.remove("selected");
      }
    });
    console.log(`Unselected agents for ${role}`, unselected);
  }

  //add event listeners to "deselect all" buttons
  document
    .getElementById("unselect-all-controller")
    .addEventListener("click", () => unselectAllAgents("Controller"));
  document
    .getElementById("unselect-all-initiator")
    .addEventListener("click", () => unselectAllAgents("Initiator"));
  document
    .getElementById("unselect-all-sentinel")
    .addEventListener("click", () => unselectAllAgents("Seintinel"));
  document
    .getElementById("unselect-all-duelist")
    .addEventListener("click", () => unselectAllAgents("Duelist"));

  const root = document.querySelector("#top");

  // get random agent button
  const randomButton = document.createElement("button");
  randomButton.innerText = "Get Random Agent";
  randomButton.classList.add("random-agent-button");
  randomButton.addEventListener("click", () => {
    let random;
    let agent;

    root.appendChild(randomButton);

    //ensure there is a container to display selected agent's portrait
    let portraitContainer = document.getElementById("portrait");
    if (!portraitContainer) {
      portraitContainer = document.createElement("div");
      portraitContainer.setAttribute("id", "portrait");
      root.appendChild(portraitContainer);
    }

    if (selected.length) {
      random = Math.floor(Math.random() * selected.length);
      agent = selected[random];
    } else {
      random = Math.floor(Math.random() * agents.length);
      agent = agents[random];
    }

    console.log(agent);

    let agentDisplayDiv = document.getElementById("agent-display");

    if (!agentDisplayDiv) {
      // if it doesnt exist, create and append it to DOM
      agentDisplayDiv = document.createElement("div");
      agentDisplayDiv.setAttribute("id", "agent-display");

      const agentDisplay = document.createElement("img");
      agentDisplay.setAttribute("id", "agent-img");

      const agentName = document.createElement("p");
      agentName.setAttribute("id", "agent-name");

      agentDisplayDiv.appendChild(agentDisplay);
      agentDisplayDiv.appendChild(agentName);

      const selectedAgent = document.getElementById("selected-agent");
      selectedAgent.after(agentDisplayDiv);
    }

    // update contents of existing element
    const agentImg = document.getElementById("agent-img");
    agentImg.setAttribute("src", agent.fullPortrait); // replace selectedAgent with correct image src

    const agentName = document.getElementById("agent-name");
    agentName.innerText = agent.displayName;
  });

  agents.forEach((agent) => {
        if (agentMetaData[agent.displayName]) {
            agent.type = agentMetaData[agent.displayName].type
        }
        const wrapper = document.createElement("button");
        wrapper.setAttribute("id", `agent-${agent.displayName}`);
        const agentImage = document.createElement("img");
        agentImage.setAttribute("src", agent.fullPortrait);
        agentImage.classList.add("agent-img");
        const agentName = document.createElement("p");
        agentName.innerText = agent.displayName;
        wrapper.appendChild(agentImage);
        console.log(wrapper)
        wrapper.appendChild(agentName);
        wrapper.addEventListener("click", () => {
          if (!selected.includes(agent)) {
            selected.push(agent);
            wrapper.classList.add("selected");
          } else {
            const index = selected.indexOf(agent);
            selected.splice(index, 1);
            wrapper.classList.remove("selected");
          }
          console.log("Selected Agents:", selected);
        });
        const roleContainer = roleContainers[agent.type];
        if (roleContainer) {
          roleContainer.appendChild(wrapper);
        } else {
          console.error("No container found for role:", agent.type);
        }

  });

  root.appendChild(randomButton);
}
app();
