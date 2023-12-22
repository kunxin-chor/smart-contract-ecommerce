window.addEventListener('load', async () => {
    console.log(window.ethereum);
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            // Request account access
            await provider.send("eth_requestAccounts", []);
        } catch (error) {
            console.error("Access denied for account.");
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

document.getElementById('pickWinnerBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const lottery = new ethers.Contract(contractAddress, contractABI, signer);

        try {
            const tx = await lottery.pickWinner();
            await tx.wait();
            alert('Winner picked!');
        } catch (error) {
            console.error('Error picking winner:', error);
        }
    }
});

document.getElementById('viewParticipantsBtn').addEventListener('click', async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const lottery = new ethers.Contract(contractAddress, contractABI, provider);

        try {
            const participants = await lottery.getParticipants();
            document.getElementById('participantsList').innerText = participants.join('\n');
        } catch (error) {
            console.error('Error retrieving participants:', error);
        }
    }
});

async function getOwner() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const lotteryContract = new ethers.Contract(contractAddress, contractABI, provider);

        try {
            const ownerAddress = await lotteryContract.manager();
            console.log("Owner of the contract:", ownerAddress);
            return ownerAddress;
        } catch (error) {
            console.error("Error fetching owner:", error);
        }
    } else {
        console.log('Ethereum wallet is not detected.');
    }
}
