"use strict";


const tagsToReview = [
    {
        tag: "apple",
        count: "4/0",
        redirected: ""
    },
    {
        tag: "orange",
        count: "3/1",
        redirected: ""
    },
    {
        tag: "banana",
        count: "3/1",
        redirected: ""
    },
    {
        tag: "avocado",
        count: "3/7",
        redirected: ""
    },
    {
        tag: "1993 Jeep Cherokee Country",
        count: "100/0",
        redirected: ""
    },
    {
        tag: "wp-admin",
        count: "25/0",
        redirected: ""
    }
];
const tagsValidated = [
    {
        tag: "bread",
        count: "3/7",
        redirected: ""
    },
    {
        tag: "cheese",
        count: "1/6",
        redirected: ""
    },
    {
        tag: "Red Chile",
        count: "3/4",
        redirected: ""
    },
    {
        tag: "quesadilla",
        count: "3/10",
        redirected: ""
    }
];
const tagsUntagged = [
    {
        tag: "femur",
        count: "5/0",
        redirected: ""
    },
    {
        tag: "pizza computer",
        count: "1/0",
        redirected: ""
    },
    {
        tag: "2000 Jeep Cherokee Sport",
        count: "20/0",
        redirected: ""
    },
    {
        tag: "3D printer",
        count: "5/0",
        redirected: ""
    }
];
const tagsBad = [
    {
        tag: "root",
        count: "9/0",
        redirected: ""
    },
    {
        tag: "admin",
        count: "5/0",
        redirected: ""
    },
    {
        tag: "let me in!!!",
        count: "1/0",
        redirected: ""
    },
    {
        tag: "php",
        count: "26/0",
        redirected: ""
    },
    {
        tag: "adminDashboard",
        count: "14/0",
        redirected: ""
    }
];
const tagsRedirected = [
    {
        tag: "pan",
        count: "4/0",
        redirected: "L.whole-wheat-loaf"
    },
    {
        tag: "queso",
        count: "3/0",
        redirected: "C.Cheese-quesadilla"
    },
    {
        tag: "chile colorado",
        count: "2/0",
        redirected: "L.Red-Chile"
    },
    {
        tag: "frijoloes",
        count: "11/0",
        redirected: "L.Three-Bean-soup"
    }
];



function generateTable(tags, div, tableTitle) {
    const table = document.createElement("table");
    // const tableHeaderRow = document.createElement("tr");
    const tableHeader = document.createElement("caption");
    tableHeader.innerHTML = tableTitle;
    tableHeader.setAttribute("data-tableID", div)
    table.appendChild(tableHeader);

    let rows = [];
    for (let tag of tags) {
        const row = document.createElement("tr");
        const word = document.createElement("td");
        word.innerHTML = tag.tag;


        const count = document.createElement("td");
        count.innerHTML = tag.count;
        count.classList.add("count");

        const pageTD = document.createElement("td");
        const pageAnchor = document.createElement("a");
        pageAnchor.innerHTML = "page";
        pageAnchor.setAttribute("href", "https://studiox.com");
        pageAnchor.setAttribute("target", "_blank");

        pageTD.appendChild(pageAnchor);


        row.append(...[word, count, pageTD]);

        if (tableTitle == "Redirected Tags") {
            const inputFiledTD = document.createElement("td");
            const inputField = document.createElement("input");
            inputField.setAttribute("type", "text");
            inputField.setAttribute("name", "redirect-category-link");
            inputField.setAttribute("value", tag.redirected);
            inputField.setAttribute("placeholder", "C4 or L3");

            inputFiledTD.appendChild(inputField);

            row.insertBefore(inputFiledTD, count);
        }

        rows.push(row);
    }

    table.append(...rows);
    // console.log(rows);

    document.querySelector(`#${div}`).appendChild(table);
}


generateTable(tagsToReview, "pending", "Pending for Review");
generateTable(tagsUntagged, "not-tagged", "Not Tagged");
generateTable(tagsValidated, "tagged-tags", "Tagged Tags");
generateTable(tagsBad, "bad-tags", "Bad Tags");
generateTable(tagsRedirected, "redirected-tags", "Redirected Tags");



// Make row selectable
for (let row of document.querySelectorAll("tr")) {
    row.addEventListener("click", (evnt) => {
        // If we click input tags, don't select row
        if (evnt.target.closest('input')) {
            return;
        }
        evnt.currentTarget.classList.toggle("selected");
        enableDisableActions();
    });

}
// Make it so the title selects all in the table
for (let caption of document.querySelectorAll("caption")) {
    caption.addEventListener("click", (evnt) => {

        // If all the rows are selected, deselect them
        if (document.querySelectorAll(`#${caption.dataset.tableid} tr.selected`).length === evnt.currentTarget.parentElement.children.length - 1) {
            document.querySelectorAll(`#${caption.dataset.tableid} tr`).forEach(row => row.classList.remove("selected"));
            // If not all selected, select all in that table
        } else {
            document.querySelectorAll(`#${caption.dataset.tableid} tr`).forEach(row => !row.classList.contains("selected") ? row.classList.add("selected") : null);
        }
        enableDisableActions();
    });
}

// Function used to ensure actions are clickable when you select a row/tag
function enableDisableActions() {
    const selectedRows = document.querySelectorAll(".selected");
    // console.log(selectedRows);
    const buttons = document.querySelectorAll("#buttons button:not(:nth-child(9))");

    // If rows are selected, enable buttons, if not disable
    !(selectedRows.length > 0) ? buttons.forEach(button => button.setAttribute("disabled", "disabled")) : buttons.forEach(button => button.removeAttribute("disabled"));

    // The redirect action button should only be enabled with a tag is selected and the input tag has a value
    const redirectActionButton = document.querySelector(`#buttons button:nth-child(9)`);
    const redirectActionInput = document.querySelector("#buttons input");
    if (redirectActionInput.value == "" || selectedRows.length < 1) {
        redirectActionButton.setAttribute("disabled", "disabled");
    } else if (selectedRows.length) {
        redirectActionButton.removeAttribute("disabled");
    }
    // console.log(redirectActionButton);
}


// We add an event listener to the input tag above the redirect button 
// This is done so the button is enabled on typing, IF a tag is selected
document.querySelector("#buttons input").addEventListener("keyup", (evnt) => {
    // I don't like the magic number 9, might change so it selects from ID
    const redirectActionButton = document.querySelector(`#buttons button:nth-child(9)`);
    const selectedRows = document.querySelectorAll(".selected");
    // console.log(evnt.target.value);
    if (evnt.target.value == "") {
        redirectActionButton.setAttribute("disabled", "disabled")
    } else if (selectedRows.length) {
        redirectActionButton.removeAttribute("disabled");
    }
});

// For the buttons, we add event listeners so they can perform an action
const buttons = document.querySelectorAll("#buttons button");
buttons.forEach(button => button.addEventListener("click", performAction));

// Function to give functionality to the buttons
function performAction(evnt) {

    // Get all selected tags
    const selectedTags = document.querySelectorAll(".selected");
    console.log(selectedTags);
    // Get the action the button does
    const buttonAction = evnt.target.dataset.action;
    // Get the destination table
    const destinationTable = document.querySelector(`#${buttonAction} > table`) ?? null;
    switch (buttonAction) {
        case "not-tagged":
        case "tagged-tags":
        case "bad-tags":
            // Remove input if it has it (tags in redirected)
            selectedTags.forEach(tagRow => {
                if (tagRow.querySelector("td input")) {
                    console.log(tagRow);
                    tagRow.removeChild(tagRow.querySelector("td:nth-child(2)"));
                }
            });
            // Append selected tags to destination table and remove selected class
            selectedTags.forEach(tagRow => destinationTable.appendChild(tagRow));
            selectedTags.forEach(tagRow => tagRow.classList.remove("selected"));


            // document.querySelectorAll("#buttons button").forEach(button => button.setAttribute("disabled", "disabled"));
            enableDisableActions();
            break;
        // For when user puts tags in redirected
        case "redirected-tags":
            // Get value from input element
            const redirectActionInput = document.querySelector("#buttons input");
            // console.log(redirectActionInput.value);

            // For each selected tag, we have to add an input field
            selectedTags.forEach(tagRow => {
                const inputFiledTD = document.createElement("td");
                const inputField = document.createElement("input");
                inputField.setAttribute("type", "text");
                inputField.setAttribute("name", "redirect-category-link");
                inputField.setAttribute("value", redirectActionInput.value);
                inputField.setAttribute("placeholder", "C4 or L3");

                inputFiledTD.appendChild(inputField);

                tagRow.insertBefore(inputFiledTD, tagRow.querySelector("td.count"));
            });
            // Add each row to the table
            selectedTags.forEach(tagRow => destinationTable.appendChild(tagRow));

            // Clear input tag and remove selected class from each tag
            redirectActionInput.value = "";
            selectedTags.forEach(tagRow => tagRow.classList.remove("selected"));

            // document.querySelectorAll("#buttons button").forEach(button => button.setAttribute("disabled", "disabled"));
            enableDisableActions();
            break;
        case "remove-tags":
            // For all the selected tags, add a class to indicate pending removal
            selectedTags.forEach(tagRow => tagRow.classList.add("pendingRemoval"));
            // Show dialog box
            document.querySelector("#dialogRemoval").showModal();
            // Select span tag to show timer to user, set to 5
            const timerValue = document.querySelector("#dialogRemoval span");
            timerValue.innerHTML = "5";
            // Interval to show countdown
            // Set an interval to change the timer value
            let removalInterval = setInterval(() => {
                // const timerValue = document.querySelector("#dialogRemoval span");
                timerValue.innerHTML = Number(timerValue.innerHTML) - 1;
            }, 1000)

            // Timer to remove tags in 5 seconds
            // Disable buttons and hide dialog box
            let removalTimer = setTimeout(() => {
                clearInterval(removalInterval);
                selectedTags.forEach(tagRow => tagRow.remove());
                enableDisableActions();
                document.querySelector("#dialogRemoval").close();
            }, 5000);
            // Add event listener to cancel removal
            document.querySelector("#cancelRemoval").addEventListener("click", (evnt) => {
                // Stop timers
                clearTimeout(removalTimer);
                clearInterval(removalInterval);
                // Remove class from tags and close dialog box
                selectedTags.forEach(tagRow => tagRow.classList.remove("pendingRemoval"));
                document.querySelector("#dialogRemoval").close();
            });

            // Add event listener to dismiss dialog box and remove tags instantly 
            document.querySelector("#dismissRemoval").addEventListener("click", (evnt) => {
                // Stop timers
                clearTimeout(removalTimer);
                clearInterval(removalInterval);
                document.querySelector("#dialogRemoval").close();
                selectedTags.forEach(tagRow => tagRow.remove());
                enableDisableActions();
            });
            break;
    }
}