const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Replace with your contract's address
const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "enter",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFortyTwo",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getParticipants",
      "outputs": [
        {
          "internalType": "address payable[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "participants",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pickWinner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

let lottery;
let signer;

async function initializeEthers() {
	if (typeof window.ethereum !== 'undefined') {
		console.log('Ethereum successfully detected!');

		// Create a provider
		const provider = new ethers.providers.Web3Provider(window.ethereum);

		// Prompt user for account access
		await provider.send("eth_requestAccounts", []);
		signer = provider.getSigner();

		// Create a contract instance
		lottery = new ethers.Contract(contractAddress, contractABI, signer);
	} else {
		console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
	}
}

window.addEventListener('load', initializeEthers);

document.getElementById('enterLottery').addEventListener('click', async () => {
	try {
		const tx = await lottery.enter({
			value: ethers.utils.parseEther('0.011'),
			gasLimit: 1000000
		});
		await tx.wait();
		alert('Entered the lottery!');
	} catch (error) {
		console.error('Error entering the lottery:', error);
	}
});

document.getElementById('viewParticipantsBtn').addEventListener('click', async () => {
	try {
		const participants = await lottery.getParticipants();
		document.getElementById('participantsList').innerText = participants.join('\n');
	} catch (error) {
		console.error('Error retrieving participants:', error);
	}
});
