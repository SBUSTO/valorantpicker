const agents = [
    { name: "Astra", img: "/images/Astra_icon.webp" },
    { name: "Breach", img: "/images/breach_icon.webp" },
    { name: "Brimstone", img: "/images/brimstone_icon.webp" },
    { name: "Chamber", img: "/images/chamber_icon.webp" },
    { name: "Clove", img: "/images/clove_icon.webp" },
    { name: "Cypher", img: "/images/cypher_icon.webp" },
    { name: "Jett", img: "/images/jett_icon.webp" },
    { name: "KAY/O", img: "/images/kayo_icon.webp" },
    { name: "Killjoy", img: "/images/killjoy_icon.webp" },
    { name: "Neon", img: "/images/neon_icon.webp" },
    { name: "Omen", img: "/images/omen_icon.webp" },
    { name: "Phoenix", img: "/images/phoenix_icon.webp" },
    { name: "Raze", img: "/images/raze_icon.webp" },
    { name: "Reyna", img: "/images/reyna_icon.webp" },
    { name: "Sage", img: "/images/sage_icon.webp" },
    { name: "Skye", img: "/images/skye_icon.webp" },
    { name: "Sova", img: "/images/sova_icon.webp" },
    { name: "Viper", img: "/images/viper_icon.webp" },
    { name: "Yoru", img: "/images/yoru_icon.webp" },
];

const selected = [];

const root = document.querySelector('#top');

const randomButton = document.createElement('button');
randomButton.innerText = 'Select Random Agent';
randomButton.addEventListener('click', () => {
    let random;
    let agent;

    if (selected.length) {
        random = Math.floor(Math.random() * selected.length);
        agents = selected[random]
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
    agentImg.setAttribute('src', "selectedAgent"); // replace selectedAgent with correct image src
    
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
