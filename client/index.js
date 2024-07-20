const agents = require('./data');

/**
 * 1. Loop over each agent and render them on the page.
 * 2. Each agent should be selectable when clicked.
 * 3. There should be a button to select all agents when clicked.
 * 4. There should be a button to click "select random agent" that picks an agent from the
 *  agents selected. If no agent is selected, then pick from all agents.
 */

//// try this??
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

// console.log(agents);

for (let index = 0; index < agents.length; index++ ) {
    const agent = agents[index];
    // create a div
    const div = document.createElement("div");
// create a unique id for the div
    // create a img with src attribute
    const agentImage = document.createElement("img");
    agentImage.setAttribute('src', agent.img)
    // create a p tag with the agent name inside of it
    const agentName = document.createElement("p");
    // add the img and p tag as parents of the div
    
// add the div to the page
};
