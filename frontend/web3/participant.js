let lottery;
let accounts;

async function initializeWeb3() {
  console.log("initializeWeb3");
    if (typeof window.ethereum !== 'undefined') {
        console.log('Ethereum successfully detected!');

        // Create a Web3 instance
        window.web3 = new Web3(window.ethereum);

        // Prompt user for account access
        accounts = await web3.eth.requestAccounts();

        // Create a contract instance
        lottery = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
    }
}

window.addEventListener('load', initializeWeb3);

document.getElementById('enterLottery').addEventListener('click', async () => {
    try {
        const tx = await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.011', 'ether'),
            gas: 1000000
        });
        console.log('Transaction Hash:', tx.transactionHash);
        alert('Entered the lottery!');
    } catch (error) {
        console.error('Error entering the lottery:', error);
    }
});

document.getElementById('viewParticipantsBtn').addEventListener('click', async () => {
    try {
        const participants = await lottery.methods.getParticipants().call();
        document.getElementById('participantsList').innerText = participants.join('\n');
    } catch (error) {
        console.error('Error retrieving participants:', error);
    }
});
