// The different pages the user can navigate to
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const registerPage = document.getElementById('register-page');
// Login form
const loginForm = document.getElementById('loginForm');
// Login error message
const errorMsg = document.getElementById('errorMsg');
// the welcome user -- displays the first name right after welcome
const welcomeUser = document.getElementById('welcome-user');
// the different buttons
const logoutBtn = document.getElementById('logout-btn');
const goToRegisterBtn = document.getElementById('go-to-register-btn');
const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
// the dropdown menus
const examDropdown = document.getElementById("examDropdown");
const locationDropdown = document.getElementById("locationDropdown");
const dateDropdown = document.getElementById("dateDropdown");
const timeDropdown = document.getElementById("timeDropdown");
const registerButton = document.getElementById("register-for-exam-btn");
// the registered exam list
const registeredExamsList = document.getElementById('registered-exams');

/*-------------------------------------------------------- FUNCTIONS--------------------------------------------------------*/
// reset dropdowns to placeholder state
function resetDropdowns() {
    // Get all the dropdowns
    const examDropdown = document.getElementById('examDropdown');
    const locationDropdown = document.getElementById('locationDropdown');
    const dateDropdown = document.getElementById('dateDropdown');
    const timeDropdown = document.getElementById('timeDropdown');

    // Reset the selected values to empty (placeholder state)
    examDropdown.selectedIndex = 0;
    locationDropdown.selectedIndex = 0;
    dateDropdown.selectedIndex = 0;
    timeDropdown.selectedIndex = 0;

    // Re-enable or disable dropdowns as needed (optional)
    locationDropdown.disabled = true;
    dateDropdown.disabled = true;
    timeDropdown.disabled = true;
}

// formats the username by removing any numbers and capitalizes the first letter in the username
function formatName(username) {
    // Remove non-alphabetic characters
    const nameOnly = username.replace(/[^a-zA-Z]/g, '');

    // Capitalize the first letter and make the rest lowercase
    const formattedName = nameOnly.charAt(0).toUpperCase() + nameOnly.slice(1).toLowerCase();

    return formattedName;
}

// populates the registered exams and adds a cancel exam button
function populateRegisteredExams() {
    // Clear the current list of registered exams
    registeredExamsList.innerHTML = '';

    // If there are no registered exams, display a message
    if (registeredExams.length === 0) {
        const noExamsMessage = document.createElement('li');
        noExamsMessage.textContent = "No exams registered yet.";
        registeredExamsList.appendChild(noExamsMessage);
        return;
    }

    // Add each registered exam to the list
    registeredExams.forEach((exam, index) => {
        const examItem = document.createElement('li');
        examItem.textContent = `${exam} `;

        // Create a Cancel button for each exam
        const cancelButton = document.createElement('button');
        cancelButton.textContent = "Cancel";
        cancelButton.classList.add('cancel-button');
        cancelButton.addEventListener('click', () => cancelExam(index)); // Cancel function on click

        // Append the Cancel button to the list item
        examItem.appendChild(cancelButton);
        
        // Append the exam item to the registered exams list
        registeredExamsList.appendChild(examItem);
    });
}

// Cancels a specific exam
function cancelExam(index) {
    // Remove the exam from the array
    registeredExams.splice(index, 1);

    // Update the displayed list of registered exams
    populateRegisteredExams();
}

// populates the exam selection dropdowns
function populateDropdown(dropdown, options, placeholder) {
    // Clear existing options
    dropdown.innerHTML = '';

    // Add the placeholder option
    const placeholderOption = document.createElement("option");
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    dropdown.appendChild(placeholderOption);

    // Add new options
    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        dropdown.appendChild(opt);
    });
}

/*-------------------------------------------------------- MOCK DATA -------------------------------------------------------*/
// Data for the dropdowns
const exams = ["Math 127 Final", "CS 202 Final", "History 101 Final", "CIT 260 Final"];
const locations = ["NLV", "WCH", "HD"];
const dates = ["11/20/2024", "11/21/2024", "11/22/2024", "11/23/2024", "11/24/2024"];
const times = ["10:00 AM", "10:30 AM", "11:00 AM","11:30 AM", "1:00 PM", "1:30 PM"];
// user logins
const users = [
    { username: "admin", password: "password"},
    { username: "wilman2174", password: "5008312174"},
    { username: "angel8648", password: "5007928648"}
];
/*--------------------------------------------------------------------------------------------------------------------------*/

// array to hold the registered exams
let registeredExams = [];

// Enables the other dropdowns based on selection
examDropdown.addEventListener("change", function () {
    locationDropdown.disabled = false;
    populateDropdown(locationDropdown, locations, "Location"); // Ensures no duplicates
});

locationDropdown.addEventListener("change", function () {
    dateDropdown.disabled = false;
    populateDropdown(dateDropdown, dates, "Date"); // Ensures no duplicates
});

dateDropdown.addEventListener("change", function () {
    timeDropdown.disabled = false;
    populateDropdown(timeDropdown, times, "Time"); // Ensures no duplicates
});

timeDropdown.addEventListener("change", function () {
    registerButton.disabled = false;
});

/*-------------------------------------------------------- BTN LOGIC  -------------------------------------------------------*/
// Login logic - validates user (admin/student)
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        loginPage.style.display = 'none';
        dashboardPage.style.display = 'block';
        welcomeUser.textContent = formatName(username) + "!";
        populateExamDropdown();
        populateRegisteredExams();
        errorMsg.textContent ='';
    }
    else {
        errorMsg.textContent = 'Invalid username or password';
    }

});

// Logout button
logoutBtn.addEventListener('click', function() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    errorMsg.textContent = '';
    loginPage.style.display = 'block';
    dashboardPage.style.display = 'none';
});

// Go to registration page button
goToRegisterBtn.addEventListener('click', function () {
    // Populate the exam dropdown initially
    populateDropdown(examDropdown, exams, "Exam");

    dashboardPage.style.display = 'none';
    registerPage.style.display = 'block';
});

// Back to Dashboard button
backToDashboardBtn.addEventListener('click', function() {
    resetDropdowns();
    registerPage.style.display = 'none';
    dashboardPage.style.display = 'block';
});

// Register for exam button logic
registerButton.addEventListener('click', function() {
    const selectedExam = examDropdown.value;
    const selectedLocation = locationDropdown.value;
    const selectedDate = dateDropdown.value;
    const selectedTime = timeDropdown.value;

    // Check if all dropdowns have selections
    if (selectedExam && selectedLocation && selectedDate && selectedTime) {
        // Combine the selected values into a single string
        const examDetails = `${selectedExam} - ${selectedLocation} - ${selectedDate} - ${selectedTime}`;

        // checks that the user isnt registered for more than 3 exams and display a message if they are
        if (registeredExams.length < 3) {
            // Check if this examDetails string is already in the registeredExams array
            if (!registeredExams.includes(examDetails)) {
                // Add the registered exam to the array
                registeredExams.push(examDetails);

                // Update the UI with the newly registered exam
                populateRegisteredExams();

                alert(`You have successfully registered for ${selectedExam}!`);
            } else {
                alert(`You are already registered for the ${selectedExam}`);
            }
        }
        else {
            alert("You cannot register for more than 3 exams");
        }
        // Clear dropdowns
        resetDropdowns();
    }

});
