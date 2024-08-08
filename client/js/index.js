async function initializeApp() {
  const agentMetaData = {
    Astra: { type: "Controller", img: "/client/images/Astra_icon.webp" },
    Breach: { type: "Initiator" },
    Brimstone: { type: "Controller" },
    Chamber: { type: "Sentinel" },
    Clove: { type: "Controller" },
    Cypher: { type: "Sentinel" },
    Deadlock: { type: "Sentinel" },
    Fade: { type: "Initiator" },
    Gekko: { type: "Initiator" },
    Harbor: { type: "Controller" },
    Iso: { type: "Duelist" },
    Jett: { type: "Duelist" },
    "KAY/O": { type: "Initiator" },
    Killjoy: { type: "Sentinel" },
    Neon: { type: "Duelist" },
    Omen: { type: "Controller" },
    Phoenix: { type: "Duelist" },
    Raze: { type: "Duelist" },
    Reyna: { type: "Duelist" },
    Sage: { type: "Sentinel" },
    Skye: { type: "Initiator" },
    Sova: { type: "Initiator" },
    Viper: { type: "Controller" },
    Yoru: { type: "Duelist" },
  };

  // Fetch agents data from the API
  async function fetchAgents() {
    try {
      const response = await fetch("https://valorant-api.com/v1/agents");
      const { status, data } = await response.json();

      if (status < 200 || status >= 300 || !data) {
        console.error('API response error');
        return [];
      }

      return data.filter(agent => agent.isPlayableCharacter);
    } catch (error) {
      console.error('Error fetching agents:', error);
      return [];
    }
  }

  const agents = await fetchAgents();
  const selected = [];

  // Initialize role containers
  const roleContainers = {
    Controller: document.getElementById("controller"),
    Initiator: document.getElementById("initiator"),
    Sentinel: document.getElementById("sentinel"),
    Duelist: document.getElementById("duelist"),
  };

  // Event listeners for role buttons
  function setupRoleButtons() {
    const roles = ["Controller", "Initiator", "Sentinel", "Duelist"];
    
    roles.forEach(role => {
      document
        .getElementById(`select-all-${role.toLowerCase()}`)
        .addEventListener("click", () => selectAllAgents(role));
      
      document
        .getElementById(`unselect-all-${role.toLowerCase()}`)
        .addEventListener("click", () => unselectAllAgents(role));
    });
  }

  function selectAllAgents(role) {
    agents.filter(agent => agent.type === role).forEach(agent => {
      if (!selected.includes(agent)) {
        selected.push(agent);
        document.getElementById(`agent-${agent.displayName}`).classList.add("selected");
      }
    });
  }

  function unselectAllAgents(role) {
    agents.filter(agent => agent.type === role).forEach(agent => {
      const index = selected.indexOf(agent);
      if (index !== -1) {
        selected.splice(index, 1);
        document.getElementById(`agent-${agent.displayName}`).classList.remove("selected");
      }
    });
  }

  function displayAgent(agent) {
    let agentDisplayDiv = document.getElementById("agent-display");

    if (!agentDisplayDiv) {
      agentDisplayDiv = document.createElement("div");
      agentDisplayDiv.id = "agent-display";

      const agentDisplay = document.createElement("img");
      agentDisplay.id = "agent-img";

      const agentName = document.createElement("p");
      agentName.id = "agent-name";

      agentDisplayDiv.appendChild(agentDisplay);
      agentDisplayDiv.appendChild(agentName);

      document.getElementById("selected-agent").after(agentDisplayDiv);
    }

    document.getElementById("agent-img").src = agent.fullPortrait;
    document.getElementById("agent-name").innerText = agent.displayName;
  }

  function getRandomAgent() {
    const randomIndex = Math.floor(Math.random() * (selected.length || agents.length));
    const agent = selected.length ? selected[randomIndex] : agents[randomIndex];
    saveSelectedAgent(agent);
    displayAgent(agent);
  }

  function saveSelectedAgent(agent) {
    localStorage.setItem('selectedAgent', JSON.stringify(agent));
  }

  function loadSelectedAgent() {
    const savedAgent = localStorage.getItem('selectedAgent');
    return savedAgent ? JSON.parse(savedAgent) : null;
  }

  function setupAgentButtons() {
    agents.forEach(agent => {
      if (agentMetaData[agent.displayName]) {
        agent.type = agentMetaData[agent.displayName].type;
      }

      const wrapper = document.createElement("button");
      wrapper.id = `agent-${agent.displayName}`;

      const agentImage = document.createElement("img");
      agentImage.src = agent.fullPortrait;
      agentImage.classList.add("agent-img");

      const agentName = document.createElement("p");
      agentName.innerText = agent.displayName;

      wrapper.appendChild(agentImage);
      wrapper.appendChild(agentName);

      wrapper.addEventListener("click", () => {
        const index = selected.indexOf(agent);
        if (index === -1) {
          selected.push(agent);
          wrapper.classList.add("selected");
        } else {
          selected.splice(index, 1);
          wrapper.classList.remove("selected");
        }
      });

      const roleContainer = roleContainers[agent.type];
      if (roleContainer) {
        roleContainer.appendChild(wrapper);
      } else {
        console.error("No container found for role:", agent.type);
      }
    });
  }

  function setupRandomButton() {
    const root = document.querySelector("#top");
    const randomButton = document.createElement("button");
    randomButton.innerText = "Get Random Agent";
    randomButton.classList.add("random-agent-button");
    randomButton.addEventListener("click", getRandomAgent);
    root.appendChild(randomButton);
  }

  function setupPortraitContainer() {
    let portraitContainer = document.getElementById("portrait");

    if (!portraitContainer) {
      portraitContainer = document.createElement("div");
      portraitContainer.id = "portrait";
      document.getElementById("top").appendChild(portraitContainer);
    }
  }

  // Main initialization
  setupRoleButtons();
  setupAgentButtons();
  setupRandomButton();
  setupPortraitContainer();

  // Display a saved agent or a random agent on page load
  getRandomAgent();
}


initializeApp();