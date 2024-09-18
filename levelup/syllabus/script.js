
        function toggleSubtopics(element) {
            const subtopics = element.nextElementSibling;
            if (subtopics.style.display === "block") {
                subtopics.style.display = "none";
            } else {
                subtopics.style.display = "block";
            }
        }