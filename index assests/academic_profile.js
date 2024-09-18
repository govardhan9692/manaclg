
document.addEventListener("DOMContentLoaded", function () {
    const universitySelect = document.getElementById("university");
    const regulationSelect = document.getElementById("regulation");
    const branchSelect = document.getElementById("branch");
    const subbranchSelect = document.getElementById("subbranch");
    const yearSelect = document.getElementById("year");
    const semesterSelect = document.getElementById("semester");
    const updateButton = document.getElementById("update-profile");
  
    updateButton.addEventListener("click", function () {
      const university = universitySelect.value;
      const regulation = regulationSelect.value;
      const branch = branchSelect.value;
      const subbranch = subbranchSelect.value;
      const year = yearSelect.value;
      const semester = semesterSelect.value;
  
      let url = "";
  
  
      if (university === "Jntuk" && regulation === "R20" && branch === "CSE" && subbranch === "AIML" && year && semester) {
        if (year === "1" && semester === "1") {
          url = "./academics/r20 jntuk/cse aiml/1st year/1-1 sem/cse_aiml_1-1.html";
        } else if (year === "1" && semester === "2") {
          url = "./academics/r20 jntuk/cse aiml/1st year/1-2 sem/subjects.html";
        } else if (year === "2" && semester === "1") {
          url = "./academics/r20 jntuk/cse aiml/2nd year/2-1 sem/subjects.html";
        } else if (year === "2" && semester === "2") {
          url = "./academics/r20 jntuk/cse aiml/2nd year/2-2 sem/subjects.html";
        } else if (year === "3" && semester === "1") {
          url = "./academics/r20 jntuk/cse aiml/3rd year/3-1 sem/subjects.html";
        } else if (year === "3" && semester === "2") {
          url = "./academics/r20 jntuk/cse aiml/3rd year/3-2 sem/subjects.html";
        } else if (year === "4" && semester === "1") {
          url = "./academics/r20 jntuk/cse aiml/4th year/4-1 sem/subjects.html";
        }
        // Redirect to the generated URL
        window.location.href = url;
      }
      
      // Repeat the same modification for other conditions...
      
  // Modify URLs for the second condition
  if (university === "Jntuk" && regulation === "R20" && branch === "CSE" && subbranch === "AI" && year && semester) {
    if (year === "1" && semester === "1") {
      url = "./academics/r20 jntuk/cse ai/1st year/1-1 sem/cse_ai_1-1.html";
    } else if (year === "1" && semester === "2") {
      url = "./academics/r20 jntuk/cse ai/1st year/1-2 sem/subjects.html";
    } else if (year === "2" && semester === "1") {
      url = "./academics/r20 jntuk/cse ai/2nd year/2-1 sem/subjects.html";
    } else if (year === "2" && semester === "2") {
      url = "./academics/r20 jntuk/cse ai/2nd year/2-2 sem/subjects.html";
    } else if (year === "3" && semester === "1") {
      url = "./academics/r20 jntuk/cse ai/3rd year/3-1 sem/subjects.html";
    } else if (year === "3" && semester === "2") {
      url = "./academics/r20 jntuk/cse ai/3rd year/3-2 sem/subjects.html";
    } else if (year === "4" && semester === "1") {
      url = "/academics/r20 jntuk/cse ai/4th year/4-1 sem/subjects.html";
    }
    window.location.href = url;
  }
  
  // Modify URLs for the third condition
  if (university === "Jntuk" && regulation === "R20" && branch === "CSE" && subbranch === "DS" && year && semester) {
    if (year === "1" && semester === "1") {
      url = "./academics/r20 jntuk/cse ds/1st year/1-1 sem/cse_ds_1-1.html";
    } else if (year === "1" && semester === "2") {
      url = "./academics/r20 jntuk/cse ds/1st year/1-2 sem/subjects.html";
    } else if (year === "2" && semester === "1") {
      url = "./academics/r20 jntuk/cse ds/2nd year/2-1 sem/subjects.html";
    } else if (year === "2" && semester === "2") {
      url = "./academics/r20 jntuk/cse ds/2nd year/2-2 sem/subjects.html";
    } else if (year === "3" && semester === "1") {
      url = "./academics/r20 jntuk/cse ds/3rd year/3-1 sem/subjects.html";
    } else if (year === "3" && semester === "2") {
      url = "./academics/r20 jntuk/cse ds/3rd year/3-2 sem/subjects.html";
    } else if (year === "4" && semester === "1") {
      url = "./academics/r20 jntuk/cse ds/4th year/4-1 sem/subjects.html";
    }
    window.location.href = url;
  }
  
  // Modify URLs for the fourth condition
  if (university === "Jntuk" && regulation === "R20" && branch === "CSE" && subbranch === "Cyber Security" && year && semester) {
    if (year === "1" && semester === "1") {
      url = "./academics/r20 jntuk/cse cyber/1st year/1-1 sem/cse_cyber_1-1.html";
    } else if (year === "1" && semester === "2") {
      url = "./academics/r20 jntuk/cse cyber/1st year/1-2 sem/subjects.html";
    } else if (year === "2" && semester === "1") {
      url = "./academics/r20 jntuk/cse cyber/2nd year/2-1 sem/subjects.html";
    } else if (year === "2" && semester === "2") {
      url = "./academics/r20 jntuk/cse cyber/2nd year/2-2 sem/subjects.html";
    } else if (year === "3" && semester === "1") {
      url = "./academics/r20 jntuk/cse cyber/3rd year/3-1 sem/subjects.html";
    } else if (year === "3" && semester === "2") {
      url = "./academics/r20 jntuk/cse cyber/3rd year/3-2 sem/subjects.html";
    } else if (year === "4" && semester === "1") {
      url = "./academics/r20 jntuk/cse cyber/4th year/4-1 sem/subjects.html";
    }
    window.location.href = url;
  }
  
  // Modify URLs for the fifth condition
  if (university === "Jntuk" && regulation === "R20" && branch === "CSE" && subbranch === "AID" && year && semester) {
    if (year === "1" && semester === "1") {
      url = "./academics/r20 jntuk/cse aids/1st year/1-1 sem/cse_aids_1-1.html";
    } else if (year === "1" && semester === "2") {
      url = "./academics/r20 jntuk/cse aids/1st year/1-2 sem/subjects.html";
    } else if (year === "2" && semester === "1") {
      url = "./academics/r20 jntuk/cse aids/2nd year/2-1 sem/subjects.html";
    } else if (year === "2" && semester === "2") {
      url = "./academics/r20 jntuk/cse aids/2nd year/2-2 sem/subjects.html";
    } else if (year === "3" && semester === "1") {
      url = "./academics/r20 jntuk/cse aids/3rd year/3-1 sem/subjects.html";
    } else if (year === "3" && semester === "2") {
      url = "./academics/r20 jntuk/cse aids/3rd year/3-2 sem/subjects.html";
    } else if (year === "4" && semester === "1") {
      url = "./academics/r20 jntuk/cse aids/4th year/4-1 sem/subjects.html";
    }
    window.location.href = url;
  }
  
  // Modify URLs for the sixth condition
  if (university === "Jntuk" && regulation === "R23" && branch === "CSE" && subbranch && year && semester) {
    if (subbranch === "AID" && year === "1" && semester === "1") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-1 sem/cse_ai_1-1.html";
    } else if (subbranch === "AIML" && year === "1" && semester === "1") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-1 sem/cse_ai_1-1.html";
    } else if (subbranch === "Cyber Security" && year === "1" && semester === "1") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-1 sem/cse_ai_1-1.html";
    } else if (subbranch === "DS" && year === "1" && semester === "1") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-1 sem/cse_ai_1-1.html";
    } else if (subbranch === "AI" && year === "1" && semester === "1") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-1 sem/cse_ai_1-1.html";
    }
    window.location.href = url;
  }

  if (university === "Jntuk" && regulation === "R23" && branch === "CSE" && subbranch && year && semester) {
    if (subbranch === "AID" && year === "1" && semester === "2") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-2 sem/subjects.html";
    } else if (subbranch === "AIML" && year === "1" && semester === "2") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-2 sem/subjects.html";
    } else if (subbranch === "Cyber Security" && year === "1" && semester === "2") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-2 sem/subjects.html";
    } else if (subbranch === "DS" && year === "1" && semester === "2") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-2 sem/subjects.html";
    } else if (subbranch === "AI" && year === "1" && semester === "2") {
      url = "./academics/r23 Jntuk/cse ai/1st year/1-2 sem/subjects.html";
    }
    window.location.href = url;
  }
  
  
  
  
    });
  });
  
  // JavaScript to handle the select elements and update button
  document.addEventListener("DOMContentLoaded", function () {
    const universitySelect = document.getElementById("university");
    const regulationSelect = document.getElementById("regulation");
    const branchSelect = document.getElementById("branch");
    const subbranchSelect = document.getElementById("subbranch");
    const yearSelect = document.getElementById("year");
    const semesterSelect = document.getElementById("semester");
    const updateButton = document.getElementById("update-profile");
  
    // Show/hide the select elements based on the university selection
    universitySelect.addEventListener("change", function () {
      regulationSelect.style.display = "block";
      branchSelect.style.display = "block";
      subbranchSelect.style.display = "block";
      yearSelect.style.display = "block";
      semesterSelect.style.display = "block";
      updateButton.style.display = "block";
    });
  
    regulationSelect.addEventListener("change", function () {
      branchSelect.style.display = "block";
      subbranchSelect.style.display = "block";
      yearSelect.style.display = "block";
      semesterSelect.style.display = "block";
      updateButton.style.display = "block";
    });
  
    branchSelect.addEventListener("change", function () {
      subbranchSelect.style.display = "block";
      yearSelect.style.display = "block";
      semesterSelect.style.display = "block";
      updateButton.style.display = "block";
    });
  
    subbranchSelect.addEventListener("change", function () {
      yearSelect.style.display = "block";
      semesterSelect.style.display = "block";
      updateButton.style.display = "block";
    });
  
    yearSelect.addEventListener("change", function () {
      semesterSelect.style.display = "block";
      updateButton.style.display = "block";
    });
  });
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const universitySelect = document.getElementById("university");
    const regulationSelect = document.getElementById("regulation");
    const branchSelect = document.getElementById("branch");
    const subbranchSelect = document.getElementById("subbranch");
    const yearSelect = document.getElementById("year");
    const semesterSelect = document.getElementById("semester");
    const updateButton = document.getElementById("update-profile");
  
    // Load previously selected values from storage
    universitySelect.value = localStorage.getItem("university") || "";
    regulationSelect.value = localStorage.getItem("regulation") || "";
    branchSelect.value = localStorage.getItem("branch") || "";
    subbranchSelect.value = localStorage.getItem("subbranch") || "";
    yearSelect.value = localStorage.getItem("year") || "";
    semesterSelect.value = localStorage.getItem("semester") || "";
  
    function updateOptions() {
      const university = universitySelect.value;
  
      // Save the selected university to storage
      localStorage.setItem("university", university);
  
      // Show/hide the select elements based on the university selection
      if (university === "Jntuk") {
        regulationSelect.style.display = "block";
        branchSelect.style.display = "block";
        subbranchSelect.style.display = "block";
        yearSelect.style.display = "block";
        semesterSelect.style.display = "block";
        updateButton.style.display = "block";
      } else {
        // Hide all other selects if university is not selected
        regulationSelect.style.display = "none";
        branchSelect.style.display = "none";
        subbranchSelect.style.display = "none";
        yearSelect.style.display = "none";
        semesterSelect.style.display = "none";
        updateButton.style.display = "none";
      }
    }
  
    function updateBranchOptions() {
      const regulation = regulationSelect.value;
  
      // Save the selected regulation to storage
      localStorage.setItem("regulation", regulation);
  
      // Show/hide the select elements based on the regulation selection
      if (regulation === "R20" || regulation === "R23" ) {
        branchSelect.style.display = "block";
        subbranchSelect.style.display = "block";
        yearSelect.style.display = "block";
        semesterSelect.style.display = "block";
        updateButton.style.display = "block";
      } else {
        // Hide all other selects if regulation is not selected
        branchSelect.style.display = "none";
        subbranchSelect.style.display = "none";
        yearSelect.style.display = "none";
        semesterSelect.style.display = "none";
        updateButton.style.display = "none";
      }
    }
  
    function updateSubBranchOptions() {
      const branch = branchSelect.value;
  
      // Save the selected branch to storage
      localStorage.setItem("branch", branch);
  
      // Show/hide the select elements based on the branch selection
      if (branch) {
        subbranchSelect.style.display = "block";
        yearSelect.style.display = "block";
        semesterSelect.style.display = "block";
        updateButton.style.display = "block";
      } else {
        // Hide all other selects if branch is not selected
        subbranchSelect.style.display = "none";
        yearSelect.style.display = "none";
        semesterSelect.style.display = "none";
        updateButton.style.display = "none";
      }
    }
  
    function updateYearOptions() {
      const subbranch = subbranchSelect.value;
  
      // Save the selected subbranch to storage
      localStorage.setItem("subbranch", subbranch);
  
      // Show/hide the select elements based on the subbranch selection
      if (subbranch) {
        yearSelect.style.display = "block";
        semesterSelect.style.display = "block";
        updateButton.style.display = "block";
      } else {
        // Hide all other selects if subbranch is not selected
        yearSelect.style.display = "none";
        semesterSelect.style.display = "none";
        updateButton.style.display = "none";
      }
    }
  
    function updateSemesterOptions() {
      const year = yearSelect.value;
  
      // Save the selected year to storage
      localStorage.setItem("year", year);
  
      // Show/hide the select elements based on the year selection
      if (year) {
        semesterSelect.style.display = "block";
        updateButton.style.display = "block";
      } else {
        // Hide all other selects if year is not selected
        semesterSelect.style.display = "none";
        updateButton.style.display = "none";
      }
    }
  
    function updateButtonVisibility() {
      const semester = semesterSelect.value;
  
      // Save the selected semester to storage
      localStorage.setItem("semester", semester);
  
      // Show/hide the update button based on the semester selection
      if (semester) {
        updateButton.style.display = "block";
      } else {
        updateButton.style.display = "none";
      }
    }
  
    // Event listeners
    universitySelect.addEventListener("change", updateOptions);
    regulationSelect.addEventListener("change", updateBranchOptions);
    branchSelect.addEventListener("change", updateSubBranchOptions);
    subbranchSelect.addEventListener("change", updateYearOptions);
    yearSelect.addEventListener("change", updateSemesterOptions);
    semesterSelect.addEventListener("change", updateButtonVisibility);
  
    // Load options on page load
    updateOptions();
    updateBranchOptions();
    updateSubBranchOptions();
    updateYearOptions();
    updateSemesterOptions();
    updateButtonVisibility();
  
    updateButton.addEventListener("click", function () {
      const university = universitySelect.value;
      const regulation = regulationSelect.value;
      const branch = branchSelect.value;
      const subbranch = subbranchSelect.value;
      const year = yearSelect.value;
      const semester = semesterSelect.value;
  
      // ... (rest of your existing code)
    });
  });
  
  
  // COUNTER CODE
  // visitorCounter.js
  
  
  