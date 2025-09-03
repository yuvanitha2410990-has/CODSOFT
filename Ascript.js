document.getElementById("search").addEventListener("keyup", function() {
  let filter = this.value.toLowerCase();
  let jobs = document.querySelectorAll(".job");

  jobs.forEach(job => {
    let text = job.innerText.toLowerCase();
    job.style.display = text.includes(filter) ? "" : "none";
  });
});
