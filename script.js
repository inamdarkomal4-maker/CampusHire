function openApplication() {
    document.getElementById("applicationModal").style.display = "flex";
}

function closeApplication() {
    document.getElementById("applicationModal").style.display = "none";
}

function submitApplication(event) {
    event.preventDefault();

    document.getElementById("applicationModal").style.display = "none";

    document.getElementById("successModal").style.display = "flex";
}

function closeSuccess() {
    document.getElementById("successModal").style.display = "none";
}

function openJobModal() {
    document.getElementById("jobModal").style.display = "flex";
}

function closeJobModal() {
    document.getElementById("jobModal").style.display = "none";
}

function postJob(event) {
    event.preventDefault();

    alert("Job posted successfully!");

    closeJobModal();
}