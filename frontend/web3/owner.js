window.addEventListener('load', async () => {
	console.log(window.ethereum);
    if (window.ethereum) {
      await window.ethereum.enable(); // Request access to account
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access. User will be prompted to select an account in their Ethereum wallet
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("Access denied for account.");
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

document.getElementById('pickWinnerBtn').addEventListener('click', async () => {
    const accounts = await web3.eth.getAccounts();

    const lottery = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        alert('Winner picked!');
    } catch (error) {
        console.error('Error picking winner:', error);
    }
});

document.getElementById('viewParticipantsBtn').addEventListener('click', async () => {
    const lottery = new web3.eth.Contract(contractABI, contractAddress);
	console.log(lottery);
	console.log(contractABI);
    try {
        
		const participants = await lottery.methods.getParticipants().call();
        document.getElementById('participantsList').innerText = participants.join('\n');
		console.log(participants);
    } catch (error) {
        console.error('Error retrieving participants:', error);
    }
});

document.getElementById('enterLottery').addEventListener('click', async () => {
  try {
      // Assuming web3 has been initialized and injected (e.g., by MetaMask)
      if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.enable(); // Request access to account

          // Get the first account
          const accounts = await web3.eth.getAccounts();
          const account = accounts[0];

          // Assuming lottery is a web3 contract instance
          const lotteryContract = new web3.eth.Contract(contractABI, contractAddress);

          // Enter the lottery
          lotteryContract.methods.enter().send({
              from: account,
              value: web3.utils.toWei('0.011', 'ether'),
              gas: 1000000
          })
          .on('transactionHash', function(hash){
              console.log('Transaction Hash:', hash);
          })
          .on('receipt', function(receipt){
              alert('Entered the lottery!');
          })
          .on('error', function(error, receipt) {
              console.error('Error entering the lottery:', error);
          });
      } else {
          console.error('Ethereum object not found');
      }
  } catch (error) {
      console.error('Error entering the lottery:', error);
  }
});


async function getOwner() {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const lotteryContract = new web3.eth.Contract(contractABI, contractAddress);

        try {
            const ownerAddress = await lotteryContract.methods.manager().call();
            console.log("Owner of the contract:", ownerAddress);
            return ownerAddress;
        } catch (error) {
            console.error("Error fetching owner:", error);
        }
    } else {
        console.log('Ethereum wallet is not detected.');
    }
}

