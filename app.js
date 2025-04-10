// Contract addresses - your deployed contract addresses
const NFT_CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"; // AutomatedNFT
const AUTOMATOR_CONTRACT_ADDRESS = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"; // TransactionAutomator

// Contract ABIs - simplified versions based on your contract functionality
const NFT_CONTRACT_ABI = [
    // Core ERC721 functions
    {"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},
    // Custom functions from your AutomatedNFT contract
    {"inputs":[{"internalType":"uint256","name":"cooldownSeconds","type":"uint256"}],"name":"setCooldownPeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"mintCooldownPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"string","name":"tokenURI","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"string","name":"tokenURI","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"interval","type":"uint256"}],"name":"mintWithAutomation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"}
];

const AUTOMATOR_CONTRACT_ABI = [
    // Functions from your TransactionAutomator contract
    {"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"interval","type":"uint256"}],"name":"scheduleTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"executeTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"transactionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"interval","type":"uint256"},{"internalType":"uint256","name":"lastExecuted","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"}
];

// Global variables
let web3;
let accounts;
let nftContract;
let automatorContract;
let activeTransactions = [];
let isMonadNetwork = false;

// Connect to MetaMask wallet
async function connectWallet() {
    try {
        if (window.ethereum) {
            // Modern dapp browsers
            web3 = new Web3(window.ethereum);
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Check network
            const networkId = await web3.eth.net.getId();
            
            // Check if it's Monad Testnet (network ID 10143)
            isMonadNetwork = (networkId === 10143);
            
            if (!isMonadNetwork) {
                // Ask user to switch to Monad Testnet
                await switchToMonadNetwork();
            }
            
            displayWalletInfo(accounts[0], networkId);
            
            // Initialize contracts
            initializeContracts();
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', function (newAccounts) {
                accounts = newAccounts;
                displayWalletInfo(accounts[0], networkId);
                loadActiveTransactions();
            });
            
            // Listen for network changes
            window.ethereum.on('chainChanged', function(chainId) {
                window.location.reload();
            });
            
            showStatus('transactionStatus', 'Wallet connected successfully!', 'success');
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

// Add Monad Testnet to MetaMask
async function addMonadNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x279F', // 10143 in hexadecimal
                chainName: 'Monad Testnet',
                nativeCurrency: {
                    name: 'Monad',
                    symbol: 'MONAD',
                    decimals: 18
                },
                rpcUrls: ['https://rpc.testnet.monad.xyz'],
                blockExplorerUrls: ['https://explorer.testnet.monad.xyz/']
            }]
        });
        return true;
    } catch (error) {
        console.error("Error adding Monad network:", error);
        showStatus('transactionStatus', 'Error adding Monad network. See console for details.', 'error');
        return false;
    }
}

// Switch to Monad Testnet
async function switchToMonadNetwork() {
    try {
        // Try to switch to Monad network
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x279F' }], // 10143 in hexadecimal
        });
        return true;
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
            return await addMonadNetwork();
        }
        console.error("Error switching to Monad network:", switchError);
        showStatus('transactionStatus', 'Error switching to Monad network. See console for details.', 'error');
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
        case 10143:
            networkName = "Monad Testnet";
            isMonadNetwork = true;
            break;
        default:
            networkName = `Network ID: ${networkId}`;
    }
    
    document.getElementById('networkInfo').innerText = networkName;
    
    // Change the wallet connection button text
    document.getElementById('connectWallet').innerText = "Wallet Connected";
    
    // Update UI to show the user is connected
    document.getElementById('walletAddress').style.display = "block";
    document.getElementById('networkInfo').style.display = "block";
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
    
    if (!isMonadNetwork) {
        showStatus('mintingStatus', 'Please switch to Monad Testnet', 'error');
        await switchToMonadNetwork();
        return;
    }
    
    try {
        showStatus('mintingStatus', 'Preparing metadata...', 'info');
        
        // Generate and upload metadata
        const metadata = generateMetadata();
        const tokenURI = await uploadToIPFS(metadata);
        
        showStatus('mintingStatus', 'Minting NFT...', 'info');
        
        // Call the standard mint function
        const result = await nftContract.methods.mint(tokenURI).send({ 
            from: accounts[0]
        });
        
        const tokenId = result.events.Transfer.returnValues.tokenId;
        showStatus('mintingStatus', `NFT minted successfully! Token ID: ${tokenId}`, 'success');
        
    } catch (error) {
        console.error("Error minting NFT:", error);
        showStatus('mintingStatus', 'Error minting NFT. See console for details.', 'error');
    }
}

// Setup Automated Minting
async function setupAutomatedMinting() {
    if (!accounts || accounts.length === 0) {
        showStatus('mintingStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    if (!isMonadNetwork) {
        showStatus('mintingStatus', 'Please switch to Monad Testnet', 'error');
        await switchToMonadNetwork();
        return;
    }
    
    // Create or show the modal for automated minting setup
    showAutomatedMintingModal();
}

// Show modal for automated minting setup
function showAutomatedMintingModal() {
    // Check if the modal already exists
    let modal = document.getElementById('automatedMintingModal');
    
    if (!modal) {
        // Create the modal
        modal = document.createElement('div');
        modal.id = 'automatedMintingModal';
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Setup Automated Minting</h2>
                
                <div class="form-group">
                    <label for="autoMintAmount">Amount per mint (in ETH):</label>
                    <input type="number" id="autoMintAmount" step="0.001" value="0.01">
                </div>
                
                <div class="form-group">
                    <label for="autoMintInterval">Interval (in seconds):</label>
                    <input type="number" id="autoMintInterval" value="3600">
                </div>
                
                <div class="button-group">
                    <button id="confirmAutomatedMint">Confirm Setup</button>
                </div>
                
                <div id="automatedMintStatus" class="status"></div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners
        document.querySelector('#automatedMintingModal .close').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        document.getElementById('confirmAutomatedMint').addEventListener('click', confirmAutomatedMinting);
    }
    
    // Show the modal
    modal.style.display = 'block';
}

// Confirm automated minting setup
async function confirmAutomatedMinting() {
    try {
        showStatus('automatedMintStatus', 'Preparing metadata...', 'info');
        
        // Generate and upload metadata
        const metadata = generateMetadata();
        const tokenURI = await uploadToIPFS(metadata);
        
        // Get the mint amount and interval from the modal
        const mintAmount = document.getElementById('autoMintAmount').value || "0.01";
        const mintAmountWei = web3.utils.toWei(mintAmount.toString(), 'ether');
        const interval = parseInt(document.getElementById('autoMintInterval').value || "3600");
        
        showStatus('automatedMintStatus', 'Setting up automated minting...', 'info');
        
        // Call the mintWithAutomation function
        const result = await nftContract.methods.mintWithAutomation(
            tokenURI,
            mintAmountWei,
            interval
        ).send({ 
            from: accounts[0],
            value: mintAmountWei
        });
        
        showStatus('automatedMintStatus', `Automated minting setup successful!`, 'success');
        
        // Close the modal after 3 seconds
        setTimeout(() => {
            document.getElementById('automatedMintingModal').style.display = 'none';
            
            // Reload active transactions
            loadActiveTransactions();
        }, 3000);
    } catch (error) {
        console.error("Error setting up automated minting:", error);
        showStatus('automatedMintStatus', 'Error setting up automated minting. See console for details.', 'error');
    }
}

// Schedule a new automated transaction
async function scheduleTransaction() {
    if (!accounts || accounts.length === 0) {
        showStatus('transactionStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    if (!isMonadNetwork) {
        showStatus('transactionStatus', 'Please switch to Monad Testnet', 'error');
        await switchToMonadNetwork();
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
        
        showStatus('transactionStatus', `Transaction scheduled successfully!`, 'success');
        
        // Reload active transactions
        loadActiveTransactions();
    } catch (error) {
        console.error("Error scheduling transaction:", error);
        showStatus('transactionStatus', 'Error scheduling transaction. See console for details.', 'error');
    }
}

// Execute a specific transaction
async function executeTransaction(txId) {
    if (!accounts || accounts.length === 0) {
        showStatus('transactionStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    if (!isMonadNetwork) {
        showStatus('transactionStatus', 'Please switch to Monad Testnet', 'error');
        await switchToMonadNetwork();
        return;
    }
    
    try {
        showStatus('transactionStatus', `Executing transaction ${txId}...`, 'info');
        
        // Call the contract
        await automatorContract.methods.executeTransaction(txId).send({ from: accounts[0] });
        
        showStatus('transactionStatus', `Successfully executed transaction ${txId}!`, 'success');
        
        // Reload active transactions
        loadActiveTransactions();
    } catch (error) {
        console.error(`Error executing transaction ${txId}:`, error);
        showStatus('transactionStatus', 'Error executing transaction. See console for details.', 'error');
    }
}

// Execute ready transactions
async function executeReadyTransactions() {
    if (!accounts || accounts.length === 0) {
        showStatus('transactionStatus', 'Please connect your wallet first', 'error');
        return;
    }
    
    if (!isMonadNetwork) {
        showStatus('transactionStatus', 'Please switch to Monad Testnet', 'error');
        await switchToMonadNetwork();
        return;
    }
    
    try {
        showStatus('transactionStatus', 'Checking for ready transactions...', 'info');
        
        let executedCount = 0;
        
        // Loop through active transactions
        for (let i = 0; i < activeTransactions.length; i++) {
            const txId = activeTransactions[i].id;
            
            // Check if the transaction is ready to execute
            const tx = await automatorContract.methods.transactions(txId).call();
            const currentTime = Math.floor(Date.now() / 1000);
            const isReady = tx.active && (currentTime - tx.lastExecuted >= tx.interval);
            
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
            const tx = await automatorContract.methods.transactions(i).call();
            
            if (tx.active) {
                activeTransactions.push({
                    id: i,
                    recipient: tx.recipient,
                    amount: web3.utils.fromWei(tx.amount, 'ether'),
                    interval: tx.interval,
                    lastExecuted: new Date(tx.lastExecuted * 1000).toLocaleString(),
                    active: tx.active,
                    nextExecution: new Date((parseInt(tx.lastExecuted) + parseInt(tx.interval)) * 1000).toLocaleString(),
                    readyToExecute: (Math.floor(Date.now() / 1000) - tx.lastExecuted) >= tx.interval
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
        const readyClass = tx.readyToExecute ? 'ready-to-execute' : '';
        
        html += `
            <div class="automation-item ${readyClass}">
                <h3>Transaction #${tx.id}</h3>
                <p><strong>Recipient:</strong> ${tx.recipient}</p>
                <p><strong>Amount:</strong> ${tx.amount} ETH</p>
                <p><strong>Interval:</strong> ${tx.interval} seconds</p>
                <p><strong>Last Executed:</strong> ${tx.lastExecuted}</p>
                <p><strong>Next Execution:</strong> ${tx.nextExecution}</p>
                <p><strong>Status:</strong> ${tx.readyToExecute ? 'Ready to Execute' : 'Waiting'}</p>
                <button onclick="executeTransaction(${tx.id})" ${!tx.readyToExecute ? 'disabled' : ''}>
                    Execute Now
                </button>
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
    statusElement.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Connect wallet
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    
    // NFT functionality
    document.getElementById('mintNFT').addEventListener('click', mintNFT);
    document.getElementById('automatedMint').addEventListener('click', setupAutomatedMinting);
    
    // Transaction functionality
    document.getElementById('scheduleTransaction').addEventListener('click', scheduleTransaction);
    document.getElementById('executeTransaction').addEventListener('click', executeReadyTransactions);
    
    // Check if MetaMask is already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        connectWallet();
    }
});