// Sample data for users
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', balance: '$1500' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', balance: '$2000' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', balance: '$1200' }
];

// Populate the user table
window.onload = function () {
    const userTableBody = document.getElementById('user-table-body');
    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.balance}</td>
            <td><button class="update-btn">Update</button></td>
        `;

        userTableBody.appendChild(row);
    });
};

// Update button click event (place your update logic here)
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('update-btn')) {
        alert('Update functionality goes here.');
    }
});

// Sample data for wallet management
const wallets = [
    { id: 1, name: 'John Doe', balance: '$1500', pendingWithdrawals: '$200' },
    { id: 2, name: 'Jane Smith', balance: '$2000', pendingWithdrawals: '$300' },
    { id: 3, name: 'Bob Johnson', balance: '$1200', pendingWithdrawals: '$100' }
];

// Populate the wallet table when the wallet.html page loads
window.onload = function () {
    if (document.getElementById('wallet-table-body')) {
        const walletTableBody = document.getElementById('wallet-table-body');
        wallets.forEach(wallet => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${wallet.id}</td>
                <td>${wallet.name}</td>
                <td>${wallet.balance}</td>
                <td>${wallet.pendingWithdrawals}</td>
                <td><button class="approve-btn">Approve Withdrawal</button></td>
            `;

            walletTableBody.appendChild(row);
        });
    }
};

// Approve button click event for wallet management
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('approve-btn')) {
        alert('Approve withdrawal functionality goes here.');
    }
});

// Fetch and display deposit data
function loadDeposits() {
    const depositTableBody = document.getElementById('depositTableBody');
    const deposits = [
        // Example deposits, fetch this from backend in production
        { user: 'User1', amount: '1000', date: '2024-10-01', status: 'pending' },
        { user: 'User2', amount: '500', date: '2024-10-15', status: 'approved' },
    ];

    deposits.forEach(deposit => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${deposit.user}</td>
            <td>${deposit.amount}</td>
            <td>${deposit.date}</td>
            <td>
                <span class="status-${deposit.status}">${deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1)}</span>
            </td>
            <td><button class="action-button" onclick="approveDeposit('${deposit.user}')">Approve</button></td>
        `;

        depositTableBody.appendChild(row);
    });
}

// Function to approve deposit
function approveDeposit(user) {
    // Logic to approve deposit
    alert(`Deposit for ${user} approved!`);
}

// Call the function on DOM load
document.addEventListener('DOMContentLoaded', loadDeposits);


// Profile Management - Update Profile
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const adminName = document.getElementById('adminNameInput').value;
    const adminEmail = document.getElementById('adminEmailInput').value;
    const adminPassword = document.getElementById('adminPasswordInput').value;
    const adminImageFile = document.getElementById('adminImageUpload').files[0];

    // Simulating profile update (replace with API call to backend)
    console.log('Admin Profile Updated:', { adminName, adminEmail, adminPassword });

    // If there's a new image, update the image source
    if (adminImageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('adminImage').src = e.target.result;
        };
        reader.readAsDataURL(adminImageFile);
    }

    alert('Profile updated successfully!');
});

// Sample audit log data (replace with actual data from your backend)
const auditLogs = [
    { date: '2024-10-20', action: 'User Created', user: 'admin', details: 'Created user account for John Doe' },
    { date: '2024-10-19', action: 'Withdrawal Approved', user: 'admin', details: 'Approved withdrawal of $100 for user ID 12345' },
    { date: '2024-10-18', action: 'Profile Updated', user: 'jane.doe@example.com', details: 'Updated profile image' },
    { date: '2024-10-17', action: 'Login Attempt', user: 'user@example.com', details: 'Failed login attempt' },
];

// Function to populate the audit log table
function populateAuditLog() {
    const tbody = document.querySelector('#auditLogTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    auditLogs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.date}</td>
            <td>${log.action}</td>
            <td>${log.user}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
}

// Call the function to populate the log on page load
document.addEventListener('DOMContentLoaded', populateAuditLog);

// Sample support tickets data (replace with actual data from your backend)
const supportTickets = [
    { id: 1, user: 'john.doe@example.com', subject: 'Unable to access account', status: 'Pending' },
    { id: 2, user: 'jane.doe@example.com', subject: 'Withdrawal issue', status: 'Resolved' },
    { id: 3, user: 'user@example.com', subject: 'Feedback on the platform', status: 'Pending' },
];

// Function to populate the support tickets table
function populateSupportTickets() {
    const tbody = document.querySelector('#supportTicketsTable tbody');
    tbody.innerHTML = ''; // Clear existing rows

    supportTickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.id}</td>
            <td>${ticket.user}</td>
            <td>${ticket.subject}</td>
            <td>${ticket.status}</td>
            <td>
                <button class="btn-approve">Approve</button>
                <button class="btn-reject">Reject</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Event listeners for approve and reject buttons
    document.querySelectorAll('.btn-approve').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.cells[3].textContent = 'Approved'; // Update status to Approved
        });
    });

    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.cells[3].textContent = 'Rejected'; // Update status to Rejected
        });
    });
}

// Call the function to populate the tickets on page load
document.addEventListener('DOMContentLoaded', populateSupportTickets);

// Function to generate a report
document.getElementById('generateReportButton').addEventListener('click', function() {
    Swal.fire({
        title: 'Report Generated!',
        text: 'Your report has been generated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

// Chat functionality
const chatInput = document.getElementById('chatInput');
const chatBox = document.getElementById('chatBox');

document.getElementById('sendChatButton').addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message) {
        const chatMessage = document.createElement('div');
        chatMessage.textContent = message;
        chatMessage.className = 'chat-message';
        chatBox.appendChild(chatMessage);
        chatInput.value = ''; // Clear input
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }
});






