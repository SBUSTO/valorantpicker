const apiUrl = 'https://valorant-api.com/v1/agents';

//function to fetch data from the API
function fetchData() {
    fetch('https://valorant-api.com/v1/agents')
    .then (response => response.json())
    .then (data => {
        displayAgents(data.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

//function to fetch display the selected agents portrait

//call function

fetchData();

//displays selected agent

const agentImg = document.getElementById('agent-img');
agentImg.setAttribute('src', agent.img); // replace selectedAgent with correct image src

const agentName = document.getElementById('agent-name');
agentName.innerText = agent.name;

});