const agents = [
    { name: "Astra", img: "https://placehold.co/100" },
    { name: "Breach", img: "https://placehold.co/100" },
    { name: "Brimstone", img: "https://placehold.co/100" },
    { name: "Chamber", img: "https://placehold.co/100" },
    { name: "Clove", img: "https://placehold.co/100" },
    { name: "Cypher", img: "https://placehold.co/100" },
    { name: "Jett", img: "https://placehold.co/100" },
    { name: "KAY/O", img: "https://placehold.co/100" },
    { name: "Killjoy", img: "https://placehold.co/100" },
    { name: "Neon", img: "https://placehold.co/100" },
    { name: "Omen", img: "https://placehold.co/100" },
    { name: "Phoenix", img: "https://placehold.co/100" },
    { name: "Raze", img: "https://placehold.co/100" },
    { name: "Reyna", img: "https://placehold.co/100" },
    { name: "Sage", img: "https://placehold.co/100" },
    { name: "Skye", img: "https://placehold.co/100" },
    { name: "Sova", img: "https://placehold.co/100" },
    { name: "Viper", img: "https://placehold.co/100" },
    { name: "Yoru", img: "https://placehold.co/100" },
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
