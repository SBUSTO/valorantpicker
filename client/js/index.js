// List of agents
const agents = [
  { name: "Astra", type: "Controller", img: "/client/images/Astra_icon.webp" },
  { name: "Breach", type: "Initiator", img: "/client/images/breach_icon.webp" },
  { name: "Brimstone", type: "Controller", img: "/client/images/brimstone_icon.webp" },
  { name: "Chamber", type: "Sentinel", img: "/client/images/chamber_icon.webp" },
  { name: "Clove", type: "Controller", img: "/client/images/clove_icon.webp" },
  { name: "Cypher", type: "Sentinel", img: "/client/images/cypher_icon.webp" },
  { name: "Jett", type: "Duelist", img: "/client/images/jett_icon.webp" },
  { name: "KAY/O", type: "Initiator", img: "/client/images/kayo_icon.webp" },
  { name: "Killjoy", type: "Sentinel", img: "/client/images/killjoy_icon.webp" },
  { name: "Neon", type: "Duelist", img: "/client/images/neon_icon.webp" },
  { name: "Omen", type: "Controller", img: "/client/images/omen_icon.webp" },
  { name: "Phoenix", type: "Duelist", img: "/client/images/phoenix_icon.webp" },
  { name: "Raze", type: "Duelist", img: "/client/images/raze_icon.webp" },
  { name: "Reyna", type: "Duelist", img: "/client/images/reyna_icon.webp" },
  { name: "Sage", type: "Sentinel", img: "/client/images/sage_icon.webp" },
  { name: "Skye", type: "Initiator", img: "/client/images/skye_icon.webp" },
  { name: "Sova", type: "Initiator", img: "/client/images/sova_icon.webp" },
  { name: "Viper", type: "Controller", img: "/client/images/viper_icon.webp" },
  { name: "Yoru", type: "Duelist", img: "/client/images/yoru_icon.webp" },
];

const selected = [];

const root = document.querySelector('#top');

// Get random agent button
const randomButton = document.createElement('button');
randomButton.innerText = 'Get Random Agent';
randomButton.addEventListener('click', () => {
  let random;
  let agent;

  if (selected.length) {
      random = Math.floor(Math.random() * selected.length);
      agent = selected[random]
  } else {
      random = Math.floor(Math.random() * agents.length);
      agent = agents[random]
  }

  let agentDisplayDiv = document.getElementById('agent-display');

  if (!agentDisplayDiv) {
      // If it doesn't exist, create and append it to DOM
      agentDisplayDiv = document.createElement('div');
      agentDisplayDiv.setAttribute('id', 'agent-display');

      const agentDisplay = document.createElement('img');
      agentDisplay.setAttribute('id', 'agent-img');

      const agentName = document.createElement('p');
      agentName.setAttribute('id', 'agent-name');

      agentDisplayDiv.appendChild(agentDisplay);
      agentDisplayDiv.appendChild(agentName);

      const selectedAgent = document.getElementById("selected-agent");
      selectedAgent.after(agentDisplayDiv);
  }

  // Update contents of existing element
  const agentImg = document.getElementById('agent-img');
  agentImg.setAttribute('src', agent.img); // Replace selectedAgent with correct image src
  
  const agentName = document.getElementById('agent-name');
  agentName.innerText = agent.name;
});

root.appendChild(randomButton);

const roleContainers = {
  Controller: document.getElementById('controller'),
  Initiator: document.getElementById('initiator'),
  Sentinel: document.getElementById('sentinel'),
  Duelist: document.getElementById('duelist'),
};

console.log('Role containers:', roleContainers);

agents.forEach(agent => {
  // Create a wrapper
  const wrapper = document.createElement("button");
  // Create a unique id for the wrapper
  const id = `agent-${agent.name.toLowerCase()}`;
  // Create an img with src attribute
  const agentImage = document.createElement("img");
  agentImage.setAttribute('src', agent.img);
  agentImage.classList.add('agent-img');
  // Create a p tag with the agent name inside of it
  const agentName = document.createElement("p");
  agentName.innerText = agent.name;
  // Add the img and p tag as parents of the wrapper
  wrapper.appendChild(agentImage);
  wrapper.appendChild(agentName);
  // Add event listener to handle logic we want to execute on click
  wrapper.addEventListener('click', () => {
      selected.push(agent);
      console.log('Selected agents:', selected);
  });
  // Add the wrapper to the corresponding role container
  const roleContainer = roleContainers[agent.type];
  if (roleContainer) {
      roleContainer.appendChild(wrapper);
  } else {
      console.error('No container found for role:', agent.type);
  }
});

console.log('Agents have been added to their respective roles.');