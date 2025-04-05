// Contract addresses - replace these with your deployed contract addresses
const NFT_CONTRACT_ADDRESS = "0x..."; // Replace after deployment
const AUTOMATOR_CONTRACT_ADDRESS = "0x..."; // Replace after deployment

// Contract ABIs - simplified for this example
const NFT_CONTRACT_ABI = [
    // Will be generated when you compile in Remix
    // Add the ABI after compiling your contract
];

const AUTOMATOR_CONTRACT_ABI = [
    // Will be generated when you compile in Remix
    // Add the ABI after compiling your contract
];

// Global variables
let web3;
let accounts;
let nftContract;
let automatorContract;
let activeTransactions = [];

// Connect to MetaMask wallet
async function connectWallet() {
    try {
        if (window.ethereum) {
            // Modern dapp browsers
            web3 = new Web3(window.ethereum);
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Check network
            const networkId = await web3.eth.net.getId();
            displayWalletInfo(accounts[0], networkId);
            
            // Initialize contracts
            initializeContracts();
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', function (newAccounts) {
                accounts = newAccounts;
                displayWalletInfo(accounts[0], networkId);
            });
            
            // Listen for network changes
            window.ethereum.on('chainChanged', function(chainId) {
                window.location.reload();
            });
            
            return true;
        } else {
            showStatus('transactionStatus', 'Please install MetaMask!', 'error');
            return false;
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showStatus('transactionStatus', 'Error connecting wallet. See console for details.', 'error');
        return false;
    }
}

function displayWalletInfo(address, networkId) {
    document.getElementById('walletAddress').innerText = `${address.substring(0, 6)}...${address.substring(38)}`;
    
    // Map network ID to name
    let networkName;
    switch(networkId) {
        case 1:
            networkName = "Ethereum Mainnet";
            break;
        case 3:
            networkName = "Ropsten Testnet";
            break;
        case 4:
            networkName = "Rinkeby Testnet";
            break;
        case 5:
            networkName = "Goerli Testnet";
            break;
        case 42:
            networkName = "Kovan Testnet";
            break;
        case 3944:
            networkName = "Monad Testnet";
            break;
        default:
            networkName = `Network ID: ${networkId}`;
    }
    
    document.getElementById('networkInfo').innerText = networkName;
}

function initializeContracts() {
    nftContract = new web3.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS);
    automatorContract = new web3.eth.Contract(AUTOMATOR_CONTRACT_ABI, AUTOMATOR_CONTRACT_ADDRESS);
    
    // Load active transactions
    loadActiveTransactions();
}

// Generate metadata for NFT
function generateMetadata() {
    const name = document.getElementById('nftName').value || "Automated NFT";
    const description = document.getElementById('nftDescription').value || "An NFT created with the automation app";
    const image = document.getElementById('nftImage').value || "https://placekitten.com/400/400";
    
    return {
        name: name,
        description: description,
        image: image,
        attributes: [
            {
                trait_type: "Creation",
                value: "Automatic"
            },
            {
                trait_type: "Date",
                value: new Date().toISOString()
            }
        ]
    };
}

// Mock function to simulate IPFS upload
async function uploadToIPFS(metadata) {
    // In a real app, you would actually upload to IPFS
    // For now, we'll simulate with a timeout
    showStatus('mintingStatus', 'Uploading metadata to IPFS...', 'info');
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate random CID-like string
            const randomCID = `ipfs://Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
            resolve(randomCID);
        }, 1500);
    });
}

// Mint a new NFT
async function mintNFT() {
    if (!accounts || accounts.length === 0) {
        showStatus('mintingStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    try {
        showStatus('mintingStatus', 'Preparing metadata...', 'info');
        
        // Generate and upload metadata
        const metadata = generateMetadata();
        const tokenURI = await uploadToIPFS(metadata);
        
        showStatus('mintingStatus', 'Minting NFT...', 'info');
        
        // Call the contract
        const result = await nftContract.methods.mintNFT(accounts[0], tokenURI).send({ from: accounts[0] });
        
        showStatus('mintingStatus', `NFT minted successfully! Transaction: ${result.transactionHash}`, 'success');
    } catch (error) {
        console.error("Error minting NFT:", error);
        showStatus('mintingStatus', 'Error minting NFT. See console for details.', 'error');
    }
}

// Setup automated minting
function setupAutomatedMinting() {
    alert("This feature would typically use external automation services like Chainlink Automation or a custom backend. For demonstration purposes, this is not fully implemented.");
    showStatus('mintingStatus', 'Automated minting would be set up through a backend service or Chainlink Automation', 'info');
}

// Schedule a new automated transaction
async function scheduleTransaction() {
    if (!accounts || accounts.length === 0) {
        showStatus('transactionStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    try {
        const recipient = document.getElementById('recipientAddress').value;
        const amount = document.getElementById('transactionAmount').value;
        const interval = document.getElementById('transactionInterval').value;
        
        if (!recipient || !web3.utils.isAddress(recipient)) {
            showStatus('transactionStatus', 'Please enter a valid recipient address', 'error');
            return;
        }
        
        if (!amount || parseFloat(amount) <= 0) {
            showStatus('transactionStatus', 'Please enter a valid amount', 'error');
            return;
        }
        
        if (!interval || parseInt(interval) <= 0) {
            showStatus('transactionStatus', 'Please enter a valid interval', 'error');
            return;
        }
        
        showStatus('transactionStatus', 'Scheduling transaction...', 'info');
        
        // Convert ETH to wei
        const amountWei = web3.utils.toWei(amount.toString(), 'ether');
        
        // Call the contract
        const result = await automatorContract.methods.scheduleTransaction(
            recipient,
            amountWei,
            interval
        ).send({ 
            from: accounts[0],
            value: amountWei // Send the amount with the transaction
        });
        
        showStatus('transactionStatus', `Transaction scheduled successfully! ID: ${result.events.TransactionScheduled.returnValues.id}`, 'success');
        
        // Reload active transactions
        loadActiveTransactions();
    } catch (error) {
        console.error("Error scheduling transaction:", error);
        showStatus('transactionStatus', 'Error scheduling transaction. See console for details.', 'error');
    }
}

// Execute ready transactions
async function executeReadyTransactions() {
    if (!accounts || accounts.length === 0) {
        showStatus('transactionStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    try {
        showStatus('transactionStatus', 'Checking for ready transactions...', 'info');
        
        let executedCount = 0;
        
        // Loop through active transactions and check if ready
        for (let i = 0; i < activeTransactions.length; i++) {
            const txId = activeTransactions[i].id;
            const isReady = await automatorContract.methods.isReadyToExecute(txId).call();
            
            if (isReady) {
                showStatus('transactionStatus', `Executing transaction ${txId}...`, 'info');
                await automatorContract.methods.executeTransaction(txId).send({ from: accounts[0] });
                executedCount++;
            }
        }
        
        if (executedCount > 0) {
            showStatus('transactionStatus', `Successfully executed ${executedCount} transactions!`, 'success');
        } else {
            showStatus('transactionStatus', 'No transactions ready for execution', 'info');
        }
        
        // Reload active transactions
        loadActiveTransactions();
    } catch (error) {
        console.error("Error executing transactions:", error);
        showStatus('transactionStatus', 'Error executing transactions. See console for details.', 'error');
    }
}

// Load active transactions
async function loadActiveTransactions() {
    if (!automatorContract || !accounts || accounts.length === 0) {
        return;
    }
    
    try {
        // Get transaction count
        const count = await automatorContract.methods.transactionCount().call();
        activeTransactions = [];
        
        // Load each transaction
        for (let i = 0; i < count; i++) {
            const tx = await automatorContract.methods.getTransaction(i).call();
            
            if (tx.active) {
                activeTransactions.push({
                    id: i,
                    recipient: tx.recipient,
                    amount: web3.utils.fromWei(tx.amount, 'ether'),
                    interval: tx.interval,
                    lastExecuted: new Date(tx.lastExecuted * 1000).toLocaleString(),
                    active: tx.active
                });
            }
        }
        
        displayActiveTransactions();
    } catch (error) {
        console.error("Error loading transactions:", error);
    }
}

// Display active transactions in the UI
function displayActiveTransactions() {
    const container = document.getElementById('activeTransactionsList');
    
    if (activeTransactions.length === 0) {
        container.innerHTML = '<p>No active automations</p>';
        return;
    }
    
    let html = '';
    
    activeTransactions.forEach(tx => {
        html += `
            <div class="automation-item">
                <h3>Transaction #${tx.id}</h3>
                <p><strong>Recipient:</strong> ${tx.recipient}</p>
                <p><strong>Amount:</strong> ${tx.amount} ETH</p>
                <p><strong>Interval:</strong> ${tx.interval} seconds</p>
                <p><strong>Last Executed:</strong> ${tx.lastExecuted}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Utility function to display status messages
function showStatus(elementId, message, type) {
    const statusElement = document.getElementById(elementId);
    statusElement.textContent = message;
    statusElement.className = `status ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('mintNFT').addEventListener('click', mintNFT);
    document.getElementById('automatedMint').addEventListener('click', setupAutomatedMinting);
    document.getElementById('scheduleTransaction').addEventListener('click', scheduleTransaction);
    document.getElementById('executeTransaction').addEventListener('click', executeReadyTransactions);
});