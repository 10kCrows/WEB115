// Weekdays Array
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Meal Categories
const mealCategories = ['Breakfast', 'Snack 1', 'Lunch', 'Snack 2', 'Dinner'];

// Food Options
const foodOptions = {
    breakfast: ['Steak and Eggs', 'Bagel with Cream Cheese', 'Avocado Toast', 'Cinnamon Apple Oatmeal'],
    snack1: ['Celery with Peanut Butter', 'Granola Bar', 'Carrots and Hummus', 'Fruit Cup'],
    lunch: ['Veggie Pizza', 'Hamburger', 'Rice and Chicken', 'Sushi'],
    snack2: ['Banana', 'Chocolate Chip Cookie', 'Apple', 'Orange'],
    dinner: ['Vegetarian Lasagna', 'Steak and Baked Potato', 'Spicy Chicken Sandwich', 'Spaghetti and Meatballs'],
}

// Function to dynamically generate weekdays
function generateWeekdays() {
    const daysContainer = document.getElementById('days-container');
    weekDays.forEach((day) => {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('weekday');
        dayDiv.innerHTML =
            `
        <h1>${day}</h1>
        ${mealCategories
                .map(
                    (meal) => `
                <label for="${day.toLowerCase()}-${meal.toLowerCase().replace(' ', '')}">
                    Choose your ${meal.toLowerCase()}:
                    <select id="${day.toLowerCase()}-${meal.toLowerCase().replace(' ', '')}">
                        ${foodOptions[meal.toLowerCase().replace(' ', '')]
                            .map((option) => `<option value="${option.toLowerCase().replace(' ', '')}">${option}</option>`)
                            .join('')}
                    </select>
                </label>
                <br><br>
            `
                )
                .join('')}
        `;
        daysContainer.appendChild(dayDiv);
    });
}

// Call the generateWeekdays function
generateWeekdays();

// Get user inputs
document.querySelector("button[type='submit']").addEventListener("click", function (event) {
    event.preventDefault();

    // Personal info inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const goals = document.getElementById("goals").value;

    // Validate email
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Retrieve user meal selections
    const mealPlan = {};
    weekDays.forEach((day) => {
        mealPlan[day] = {};
        mealCategories.forEach((meal) => {
            const mealId = `${day.toLowerCase()}-${meal.toLowerCase().replace(' ', '')}`;
            const mealElement = document.getElementById(mealId);
            if (mealElement) {
                mealPlan[day][meal] = mealElement.options[mealElement.selectedIndex].text;
            }
        });
    });

    // Generate new page in a separate tab with the user's meal plans
    const newWindow = window.open("", "blank");

    // Prepare meal plan information for download
    const mealPlanData = Object.entries(mealPlan).map(([day, meals]) => `
        ${day}:
        ${Object.entries(meals)
            .map(([meal, selection]) => `- ${meal}: ${selection}`)
            .join("\n")}`
    )
        .join("\n\n");

    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Meal Plan</title>
            <link rel="stylesheet" href="style.css"> 
        </head>
        <body>
            <header>
                <div class="banner">
                    <img src="banner.png" alt="Build Your Meal Plan Logo">
                </div>
            </header>
            <h1 style="text-align: center;">${name}'s Meal Plan</h1>
            <div class="meal-plan">
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Goals: ${goals}</p>
                ${Object.entries(mealPlan)
            .map(
                ([day, meals]) => `
                    <h2>${day}</h2>
                    <ul>
                        ${Object.entries(meals)
                        .map(([meal, selection]) => `<li>${meal}: ${selection}</li>`)
                        .join('')}
                    </ul>
                    `
            )
            .join('')}
            </div>
            <button onclick="window.print()">Print My Meal Plan</button>
            <button id="download-btn">Download My Meal Plan</button>
            <script>
                // Add event listener to download button
                document.getElementById("download-btn").addEventListener("click", function () {
                const blob = new Blob([\`
            Name: ${name}
            Email: ${email}
            Goals: ${goals}

                ${mealPlanData}
                \`], {type: "text/plain"});

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "meal-plan.txt";
                link.click();
                });
            </script>
        </body>
        </html>`
    )
})

// Function to validate user's email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Clear form
document.getElementById("clear-btn").addEventListener("click", function () {
    const form = document.querySelector("form");
    form.reset();
})