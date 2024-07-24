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

/**
 * 1. Loop over each agent and render them on the page.
 * 2. Each agent should be selectable when clicked.
 * 3. There should be a button to select all agents when clicked.
 * 4. There should be a button to click "select random agent" that picks an agent from the
 *  agents selected. If no agent is selected, then pick from all agents.
 */


/**
 * Loop over each agent.
 * 
 * Each agent should be rendered on the page and should include:
 *  - Image of agent
 *  - Name of agent
 *  - And be clickable
 *  - Once clicked, it should be stored in memory for future reference.
 * 
 */

const selected = [];

const root = document.querySelector('#top');

const randomButton = document.createElement('button');
randomButton.innerText = 'Select Random Agent';
randomButton.addEventListener('click', () => {
    let random;
    
    if (selected.length) {
        random = Math.floor(Math.random() * selected.length);
        console.log(selected[random])
    } else {
        random = Math.floor(Math.random() * agents.length);
        console.log(agents[random])
    };
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