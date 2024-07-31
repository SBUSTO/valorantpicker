
// list of agents
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

const unselected = [];

const roleContainers = {
    Controller: document.getElementById('controller'),
    Initiator: document.getElementById('initiator'),
    Sentinel: document.getElementById('sentinel'),
    Duelist: document.getElementById('duelist'),
}

//function to select all agents of a given role
function selectAllAgents(role) {
    const agentsOfRole = agents.filter(agent => agent.type === role);
    agentsOfRole.forEach(agent => {
        if (!selected.includes(agent)) {
            selected.push(agent);
            document.getElementById(`agent-${agent.name.toLowerCase()}`).classList.add('selected');
        }
    });
    console.log(`Selected agents for ${role}`, selected);
}

//add event listeners to "select all" buttons
document.getElementById('select-all-controller').addEventListener('click', () => selectAllAgents('Controller'));
document.getElementById('select-all-initiator').addEventListener('click', () => selectAllAgents('Initiator'));
document.getElementById('select-all-sentinel').addEventListener('click', () => selectAllAgents('Sentinel'));
document.getElementById('select-all-duelist').addEventListener('click', () => selectAllAgents('Duelist'));

//function to deselect all agents of a given role
function unselectAllAgents(role) { 
    const agentsOfRole = agents.filter(agent => agent.type === role);
    agentsOfRole.forEach(agent => {
        const index = selected.indexOf(agent);
        if (index !== 1) {
            selected.splice(index, 1);
            document.getElementById(`agent-${agent.name.toLowerCase()}`).classList.remove('selected');
        }
    });
    console.log(`Unselected agents for ${role}`, unselected);
}

//add event listeners to "deselect all" buttons
document.getElementById('unselect-all-controller').addEventListener('click', () => unselectAllAgents('Controller'));
document.getElementById('unselect-all-initiator').addEventListener('click', () => unselectAllAgents('Initiator'));
document.getElementById('unselect-all-sentinel').addEventListener('click', () => unselectAllAgents('Seintinel'));
document.getElementById('unselect-all-duelist').addEventListener('click', () => unselectAllAgents('Duelist'));

const root = document.querySelector('#top');

// get random agent button
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
    };

    let agentDisplayDiv = document.getElementById('agent-display');

    if (!agentDisplayDiv) {
        // if it doesnt exist, create and append it to DOM
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

    // update contents of existing element

    const agentImg = document.getElementById('agent-img');
    agentImg.setAttribute('src', agent.img); // replace selectedAgent with correct image src
    
    const agentName = document.getElementById('agent-name');
    agentName.innerText = agent.name;

});

agents.forEach(agent => {
    const wrapper = document.createElement('button');
    wrapper.setAttribute('id', `agent-${agent.name.toLowerCase()}`);
    const agentImage = document.createElement('img');
    agentImage.setAttribute('src', agent.img);
    agentImage.classList.add('agent-img');
    const agentName = document.createElement('p');
    agentName.innerText = agent.name;
    wrapper.appendChild(agentImage);
    wrapper.appendChild(agentName);
    wrapper.addEventListener('click', () => {
        if (!selected.includes(agent)) {
            selected.push(agent);
            wrapper.classList.add('selected');
        } else {
            const index = selected.indexOf(agent);
            selected.splice(index, 1);
            wrapper.classList.remove('selected');
        }
        console.log('Selected Agents:', selected);
    });
    const roleContainer = roleContainers[agent.type];
    if (roleContainer) {
        roleContainer.appendChild(wrapper);
    } else {
        console.error('No container found for role:', agent.type);
    }
});

root.appendChild(randomButton);


for (let index = 0; index < agents.length; index++ ) {
    const agent = agents[index];
    // create a wrapper
    const wrapper = document.createElement("button");
    // create a unique id for the wrapper
    const id = `agent-${index}`;
    // create a img with src attribute
    const agentImage = document.createElement("img");
    agentImage.setAttribute('src', agent.img);
    // create a p tag with the agent name inside of it
    const agentName = document.createElement("p");
    agentName.innerText = agent.name;
    // add the img and p tag as parents of the wrapper
    wrapper.appendChild(agentImage);
    wrapper.appendChild(agentName);
    // add event listener to handle logic we want to execute on click
    wrapper.addEventListener('click', () => {
        selected.push(agent);
    })
    // add the wrapper to the page
    const agentWrapper = document.querySelector('#agents');
    agentWrapper.appendChild(wrapper);
};

