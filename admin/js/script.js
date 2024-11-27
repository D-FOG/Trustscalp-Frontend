document.addEventListener("DOMContentLoaded", function() { 
    // Profile Management - Update Profile
    

    // Sample audit log data and function to populate the audit log table
    const auditLogs = [
        { date: '2024-10-20', action: 'User Created', user: 'admin', details: 'Created user account for John Doe' },
        { date: '2024-10-19', action: 'Withdrawal Approved', user: 'admin', details: 'Approved withdrawal of $100 for user ID 12345' },
        { date: '2024-10-18', action: 'Profile Updated', user: 'jane.doe@example.com', details: 'Updated profile image' },
        { date: '2024-10-17', action: 'Login Attempt', user: 'user@example.com', details: 'Failed login attempt' },
    ];

    function populateAuditLog() {
        const tbody = document.querySelector('#auditLogTable tbody');
        if (tbody) {
            tbody.innerHTML = ''; 
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
    }

    populateAuditLog();

    const supportTickets = [
        { id: 1, user: 'john.doe@example.com', subject: 'Unable to access account', status: 'Pending' },
        { id: 2, user: 'jane.doe@example.com', subject: 'Withdrawal issue', status: 'Resolved' },
        { id: 3, user: 'user@example.com', subject: 'Feedback on the platform', status: 'Pending' },
    ];

    // Populate Support Tickets
    function populateSupportTickets() {
        const tbody = document.querySelector('#supportTicketsTable tbody');
        if (tbody) { // Check if the table exists
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
    }

    // Call function to populate support tickets on load
    populateSupportTickets();

    // Generate Report
    const generateReportButton = document.getElementById('generateReportButton');
    if (generateReportButton) {
        generateReportButton.addEventListener('click', function() {
            Swal.fire({
                title: 'Report Generated!',
                text: 'Your report has been generated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    }

    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatBox');
    const sendChatButton = document.getElementById('sendChatButton');
    if (chatInput && chatBox && sendChatButton) {
        sendChatButton.addEventListener('click', function() {
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
    }

    // Get the current page URL
    const currentPage = window.location.pathname.split('/').pop();

    // Select all sidebar items
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    // Load the sidebar content
    fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;

        // Apply active class to the current page's sidebar link
        const sidebarLinks = document.querySelectorAll(".sidebar-menu a");
        const currentPath = window.location.pathname;

        sidebarLinks.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
            }
        });
    });

    // Sample data for withdrawal requests
    const withdrawals = [
        { userId: "U12345", amount: 150, date: "2024-10-30", status: "Pending" },
        { userId: "U67890", amount: 250, date: "2024-10-29", status: "Approved" },
        { userId: "U11121", amount: 300, date: "2024-10-28", status: "Rejected" },
    ];

    // Function to create table rows dynamically
    function populateWithdrawalTable(data) {
        const tableBody = document.getElementById("withdrawalTableBody");
        tableBody.innerHTML = ""; // Clear any existing rows

        data.forEach(withdrawal => {
            const row = document.createElement("tr");

            // User ID cell
            const userIdCell = document.createElement("td");
            userIdCell.textContent = withdrawal.userId;
            row.appendChild(userIdCell);

            // Amount cell
            const amountCell = document.createElement("td");
            amountCell.textContent = `$${withdrawal.amount.toFixed(2)}`;
            row.appendChild(amountCell);

            // Requested Date cell
            const dateCell = document.createElement("td");
            dateCell.textContent = withdrawal.date;
            row.appendChild(dateCell);

            // Status cell
            const statusCell = document.createElement("td");
            statusCell.textContent = withdrawal.status;
            statusCell.classList.add("status-" + withdrawal.status.toLowerCase()); // Optional: add class based on status for custom styling
            row.appendChild(statusCell);

            // Action cell with buttons
            const actionCell = document.createElement("td");

            if (withdrawal.status === "Pending") {
                // Approve button
                const approveButton = document.createElement("button");
                approveButton.textContent = "Approve";
                approveButton.classList.add("btn", "btn-success", "btn-sm");
                approveButton.onclick = () => updateWithdrawalStatus(withdrawal.userId, "Approved");
                actionCell.appendChild(approveButton);

                // Reject button
                const rejectButton = document.createElement("button");
                rejectButton.textContent = "Reject";
                rejectButton.classList.add("btn", "btn-danger", "btn-sm", "ml-2");
                rejectButton.onclick = () => updateWithdrawalStatus(withdrawal.userId, "Rejected");
                actionCell.appendChild(rejectButton);
            } else {
                actionCell.textContent = "No actions available";
            }

            row.appendChild(actionCell);
            tableBody.appendChild(row);
        });
    }

    // Function to handle status updates
    function updateWithdrawalStatus(userId, newStatus) {
        const withdrawal = withdrawals.find(w => w.userId === userId);
        if (withdrawal) {
            withdrawal.status = newStatus;
            populateWithdrawalTable(withdrawals); // Refresh the table with updated data
        }
    }

    // Populate the table on page load
    populateWithdrawalTable(withdrawals);
    
})



