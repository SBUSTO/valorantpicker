
/**
 * This function is responsible for initializing the JavaScript required
 * to run the application by:
 * 
 * - Fetching required data to show agents.
 * - Generate dynamic HTML nodes and their attributes.
 * - Initialize event listeners and their callbacks once events are invoked.
 */
async function App() {

  const agentMetaData = {
    Astra: { type: "Controller", img: "/client/images/Astra_icon.webp" },
    Breach: { type: "Initiator" },
    Brimstone: { type: "Controller" },
    Chamber: { type: "Sentinel" },
    Clove: { type: "Controller" },
    Cypher: { type: "Sentinel" },
    Deadlock: { type: "Sentinel" },
    Fade: {type : "Initiator" },
    Gekko: { type: "Initiator" },
    Harbor: { type: "Controller" },
    Iso: { type: "Duelist" },
    Jett: { type: "Duelist" },
    "KAY/O": {type: "Initiator" },
    Killjoy: { type: "Sentinel" },
    Neon: { type: "Duelist" },
    Omen: { type: "Controller" },
    Phoenix: { type: "Duelist" },
    Raze: {type: "Duelist" },
    Reyna: { type: "Duelist" },
    Sage: { type: "Sentinel" },
    Skye: { type: "Initiator" },
    Sova: { type: "Initiator" },
    Viper: { type: "Controller" },
    Yoru: { type: "Duelist" },
  };

  /**
   * Retrieves agent data from valorant-api.com for populating
   * UI with agents.
   * 
   * @returns {Promise<Array>} Agents
   */

  const getAgents = async () => {
  
    const response = await fetch("https://valorant-api.com/v1/agents");
    const { status, data } = await response.json();

    if ( !data || !status ) {
        console.error('Received unexpected response from API.');
        return [];
    };

    if ( status < 200 || status >= 300 ) {
      console.log('Wrong status')
      return [];
    };

    return data.filter(agent => agent.isPlayableCharacter);

    return data
  };


  const agents = await getAgents();
  const selected = [];
  const unselected = [];

  const roleContainers = {
    Controller: document.getElementById("controller"),
    Initiator: document.getElementById("initiator"),
    Sentinel: document.getElementById("sentinel"),
    Duelist: document.getElementById("duelist"),
  };

  function selectAllAgents(role) {

    const agentsOfRole = agents.filter((agent) => {

      return agent?.type === role 
    });

    agentsOfRole.forEach((agent) => {

      if (!selected.includes(agent)) {
        selected.push(agent);
        document
          .getElementById(`agent-${agent.displayName}`)
          .classList.add("selected");
      };
    });
  };

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
  const randomButton = document.createElement("button");

  randomButton.innerText = "Get Random Agent";
  randomButton.classList.add("random-agent-button");
  randomButton.addEventListener("click", () => {
    let random;
    let agent;

    root.appendChild(randomButton);

    // ensure there is a container to display selected agent's portrait
    let portraitContainer = document.getElementById("portrait");

    if (!portraitContainer) {
      portraitContainer = document.createElement("div");
      portraitContainer.setAttribute("id", "portrait");
      root.appendChild(portraitContainer);
    };

    if (selected.length) {
      random = Math.floor(Math.random() * selected.length);
      agent = selected[random];
    } else {
      random = Math.floor(Math.random() * agents.length);
      agent = agents[random];
    };

    let agentDisplayDiv = document.getElementById("agent-display");

    if (!agentDisplayDiv) {
      // if it doesn't exist, create and append it to DOM
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
    };

    const agentImg = document.getElementById("agent-img");
    agentImg.setAttribute("src", agent.fullPortrait);

    const agentName = document.getElementById("agent-name");
    agentName.innerText = agent.displayName;

  });

  agents.forEach((agent) => {

    if (agentMetaData[agent.displayName]) {
        agent.type = agentMetaData[agent.displayName].type
    };

    const wrapper = document.createElement("button");
    wrapper.setAttribute("id", `agent-${agent.displayName}`);
    const agentImage = document.createElement("img");
    agentImage.setAttribute("src", agent.fullPortrait);
    agentImage.classList.add("agent-img");
    const agentName = document.createElement("p");
    agentName.innerText = agent.displayName;
    wrapper.appendChild(agentImage);
    wrapper.appendChild(agentName);

    wrapper.addEventListener("click", () => {

      if (!selected.includes(agent)) {
        selected.push(agent);
        wrapper.classList.add("selected");
      } else {
        const index = selected.indexOf(agent);
        selected.splice(index, 1);
        wrapper.classList.remove("selected");
      };
    });


    
    const roleContainer = roleContainers[agent?.type];

    if (roleContainer) {
      roleContainer.appendChild(wrapper);
    } else {
      console.error("No container found for role:", agent?.type);
    };

  });

  root.appendChild(randomButton);
};

App();
