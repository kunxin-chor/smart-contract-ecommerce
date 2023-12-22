// note: contractAddress and contractABI are defined in frontend/ethers/contract.js

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
