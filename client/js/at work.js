// list of agents
const agents = [
    { name: "Astra", img: "/client/images/Astra_icon.webp" },
    { name: "Breach", img: "/client/images/breach_icon.webp" },
    { name: "Brimstone", img: "/client/images/brimstone_icon.webp" },
    { name: "Chamber", img: "/client/images/chamber_icon.webp" },
    { name: "Clove", img: "/client/images/clove_icon.webp" },
    { name: "Cypher", img: "/client/images/cypher_icon.webp" },
    { name: "Jett", img: "/client/images/jett_icon.webp" },
    { name: "KAY/O", img: "/client/images/kayo_icon.webp" },
    { name: "Killjoy", img: "/client/images/killjoy_icon.webp" },
    { name: "Neon", img: "/client/images/neon_icon.webp" },
    { name: "Omen", img: "/client/images/omen_icon.webp" },
    { name: "Phoenix", img: "/client/images/phoenix_icon.webp" },
    { name: "Raze", img: "/client/images/raze_icon.webp" },
    { name: "Reyna", img: "/client/images/reyna_icon.webp" },
    { name: "Sage", img: "/client/images/sage_icon.webp" },
    { name: "Skye", img: "/client/images/skye_icon.webp" },
    { name: "Sova", img: "/client/images/sova_icon.webp" },
    { name: "Viper", img: "/client/images/viper_icon.webp" },
    { name: "Yoru", img: "/client/images/yoru_icon.webp" },
];

const selected = [];


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

