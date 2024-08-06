
/**
 * This function is responsible for initializing the JavaScript required
 * to run the application by:
 * 
 * - Fetching required data to show agents.
 * - Generate dynamic HTML nodes and their attributes.
 * - Initialize event listeners and their callbacks once events are invoked.
 */
async function App() {

  /**
   * We are missing some data from the API required for categorizing our agents by type.
   * For now, we have a Key/Value store that will keep any metadata and we will match
   * the data by using the agents name to associate the data from the API with our metadata.
   * 
   * In the future, we should just create our own API endpoint that returns all the data needed.
   * We can do it better ourselves!
   */
  const agentMetaData = {
    Astra: { type: "Controller" },
    Breach: { type: "Initiator" },
    Brimstone: { type: "Controller" },
    Clove: { type: "Controller" },
    Cypher: { type: "Sentinel" },
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

  // this comment above ^^  probably looks weird. It's JSDocs, it's a standard way to document your JavaScript https://jsdoc.app/about-getting-started
  const getAgents = async () => {
  
    const response = await fetch("https://valorant-api.com/v1/agents");
    const { status, data } = await response.json(); // destructing the status and data from response (https://www.w3schools.com/js/js_destructuring.asp)

    /**
     * If no data returned or no status code then wtf? That is poor etiquette. Let's just return an empty array.
     * The API is probably down or something weird.
     */
    if ( !data || !status ) {
        console.error('Received unexpected response from API.');
        return [];
    };

    /**
     * If the status code is not "OK" (https://umbraco.com/knowledge-base/http-status-codes/#200-ok)
     * lets return an empty array here too.
     * 
     * Reasoning behind returning an empty array here is because then we guarantee that no matter what we
     * are returning the same type of data no matter what.
     * 
     * This means that in other places in our code where we might want to use this function, we know that
     * no matter what, we can iterate over the returned data and use Array methods on it (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#instance_methods).
     * 
     * If we were sometimes getting a String back and then other times getting a Object back and then other times getting an Array back, now it's more unpredictable and not safe for other people to use.
     * 
     * If they were expecting an Array that they wanted to use Array.forEach on and then got back a Number,
     * when they do Number.forEach, it would fail because the .forEach method does not exist on the data type of Number.
     * 
     * If we did not do this then anyone who consumes the data returned from the function would have to check for the data type first
     * before using the data to be safe and do "data gymnastics" and start to have trust issues with your code.
     * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#browser_compatibility)
     * 
     */

    if ( status < 200 || status >= 300 ) {
      console.log('Wrong status')
      return [];
    };

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
      /**
       * Remember, we are doing some "tricks" to add types to our agents. This data is not guaranteed
       * because it not returned by the API we are using. If we try to access the agent.type property
       * and it does not exist, our code will fail.
       * 
       * We are using optional chaining here to safely access the agent.type property.
       * 
       * (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
       */
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

    /**
     * Instead of using the Array of agents and filtering, looping and sorting through the available
     * agents and hoping for a match, we are using an Object AKA Map for our data.
     * 
     * The data type you use matters when designing your code. For example, if I want to track a list
     * of events and replay them in exact the order the happened, an Array would be perfect for that.
     * 
     * An array is not the best data type for this logic. Think about if we had 100 million agents and
     * we wanted to find the agent that has the same name as the agent we are focusing on, like below.
     * We would need to search in 100 million indexes.
     * 
     * The reason we prefer a Map for our data here instead of an Array is because we can get the data we
     * need easily and quickly without having to loop or do any "data gymnastics".
     * 
     * With Objects we store data in key value pairs and anytime we want to access that data, all we need
     * is the key. So if we want to get any data for an agent, we can use the agent name as the key. This way,
     * we do not need to loop or search for data and match it up.
     */
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
