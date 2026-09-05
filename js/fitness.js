// ===============================
// NutriCare Fitness Module (CLEAN FIXED)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // WORKOUT DATABASE
    // ===============================

    const workouts = {
        "Weight Loss": {
            "Beginner": [
                "20 Jumping Jacks",
                "15 Bodyweight Squats",
                "10 Push-ups",
                "20 Mountain Climbers",
                "30 sec Plank"
            ],
            "Intermediate": [
                "30 Jumping Jacks",
                "20 Burpees",
                "20 Squats",
                "25 Mountain Climbers",
                "45 sec Plank"
            ],
            "Advanced": [
                "50 Jumping Jacks",
                "40 Burpees",
                "30 Squats",
                "40 Mountain Climbers",
                "60 sec Plank"
            ]
        },

        "Muscle Gain": {
            "Beginner": [
                "10 Push-ups",
                "15 Squats",
                "10 Lunges",
                "20 sec Plank",
                "15 Glute Bridges"
            ],
            "Intermediate": [
                "20 Push-ups",
                "25 Squats",
                "20 Lunges",
                "20 Bench Dips",
                "45 sec Plank"
            ],
            "Advanced": [
                "40 Push-ups",
                "40 Squats",
                "30 Lunges",
                "30 Bench Dips",
                "60 sec Plank"
            ]
        },

        "Stay Healthy": {
            "Beginner": [
                "15 min Walking",
                "10 Squats",
                "10 Push-ups",
                "Stretching",
                "20 sec Plank"
            ],
            "Intermediate": [
                "20 min Jogging",
                "20 Squats",
                "15 Push-ups",
                "Stretching",
                "45 sec Plank"
            ],
            "Advanced": [
                "30 min Running",
                "30 Squats",
                "25 Push-ups",
                "Yoga",
                "60 sec Plank"
            ]
        },

        "Flexibility": {
            "Beginner": [
                "Neck Stretch",
                "Shoulder Stretch",
                "Hamstring Stretch",
                "Child Pose",
                "Cat-Cow Stretch"
            ],
            "Intermediate": [
                "Butterfly Stretch",
                "Hip Flexor Stretch",
                "Bridge Pose",
                "Forward Fold",
                "Cobra Stretch"
            ],
            "Advanced": [
                "Full Body Yoga",
                "Pigeon Pose",
                "Wheel Pose",
                "Splits Practice",
                "Deep Stretch Routine"
            ]
        }
    };

    // ===============================
    // VIDEO DATABASE
    // ===============================

    const videos = {
        "Weight Loss": [
            { title: "HIIT Cardio", link: "https://www.youtube.com/embed/ml6cT4AZdqI" },
            { title: "Jumping Jacks", link: "https://www.youtube.com/embed/c4DAnQ6DtF8" },
            { title: "Burpees", link: "https://www.youtube.com/embed/dZgVxmf6jkA" }
        ],

        "Muscle Gain": [
            { title: "Push-ups", link: "https://www.youtube.com/embed/IODxDxX7oi4" },
            { title: "Squats", link: "https://www.youtube.com/embed/YaXPRqUwItQ" },
            { title: "Strength Workout", link: "https://www.youtube.com/embed/U0bhE67HuDY" }
        ],

        "Stay Healthy": [
            { title: "Walking Workout", link: "https://www.youtube.com/embed/enYITYwvPAQ" },
            { title: "Full Body Exercise", link: "https://www.youtube.com/embed/gC_L9qAHVJ8" },
            { title: "Stretch Routine", link: "https://www.youtube.com/embed/L_xrDAtykMI" }
        ],

        "Flexibility": [
            { title: "Beginner Yoga", link: "https://www.youtube.com/embed/v7AYKMP6rOE" },
            { title: "Stretching", link: "https://www.youtube.com/embed/L_xrDAtykMI" },
            { title: "Mobility Flow", link: "https://www.youtube.com/embed/TSIbzfcnv_8" }
        ]
    };

    // ===============================
    // DAILY TIP
    // ===============================

    const tips = [
        "Warm up before every workout.",
        "Drink enough water daily.",
        "Focus on proper form.",
        "Consistency beats intensity.",
        "Rest is part of training.",
        "Sleep 7–8 hours daily.",
        "Stretch after workouts.",
        "Stay hydrated all day."
    ];

    // ===============================
    // ELEMENTS
    // ===============================

    const goalSelect = document.getElementById("goal");
    const levelSelect = document.getElementById("level");
    const workoutList = document.getElementById("workoutList");
    const videoContainer = document.getElementById("videoContainer");
    const dailyTip = document.getElementById("dailyTip");

    // ===============================
    // HELPERS
    // ===============================

    function getVideoID(url) {
        return url.split("/embed/")[1];
    }

    // ===============================
    // MAIN FUNCTION
    // ===============================

    function updateRecommendation() {

        const goal = goalSelect.value;
        const level = levelSelect.value;

        // WORKOUT LIST
        workoutList.innerHTML = "";

        workouts[goal][level].forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `✔ ${item}`;
            workoutList.appendChild(li);
        });

        // VIDEO LIST (FIXED CLEAN VERSION)
        if (videoContainer) {
            videoContainer.innerHTML = "";

            videos[goal].forEach(video => {

                videoContainer.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card shadow-sm h-100">

                            <img 
                                src="https://img.youtube.com/vi/${getVideoID(video.link)}/hqdefault.jpg"
                                class="card-img-top"
                            >

                            <div class="card-body text-center">
                                <h6>${video.title}</h6>

                                <a href="${video.link.replace("embed/", "watch?v=")}"
                                   target="_blank"
                                   class="btn btn-success btn-sm">
                                   ▶ Watch Video
                                </a>
                            </div>

                        </div>
                    </div>
                `;
            });
        }
    }

    // ===============================
    // EVENTS
    // ===============================

    goalSelect.addEventListener("change", updateRecommendation);
    levelSelect.addEventListener("change", updateRecommendation);

    // ===============================
    // INIT
    // ===============================

    updateRecommendation();

    // ===============================
    // DAILY TIP
    // ===============================

    if (dailyTip) {
        const random = Math.floor(Math.random() * tips.length);
        dailyTip.textContent = tips[random];
    }

});