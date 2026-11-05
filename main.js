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
    },
    {
        tag: "pear",
        count: "3/0",
        redirected: ""
    },
    {
        tag: "peach",
        count: "2/1",
        redirected: ""
    },
    {
        tag: "grape",
        count: "4/0",
        redirected: ""
    },
    {
        tag: "mango",
        count: "2/0",
        redirected: ""
    },
    {
        tag: "pineapple",
        count: "3/1",
        redirected: ""
    },
    {
        tag: "1993 Jeep Cherokee Sport",
        count: "12/0",
        redirected: ""
    },
    {
        tag: "Jeep Cherokee",
        count: "8/0",
        redirected: ""
    },
    {
        tag: "wp-login",
        count: "10/0",
        redirected: ""
    },
    {
        tag: "WordPress",
        count: "6/0",
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



function generateTags(tags, tagSection, name) {
    tags.forEach(tag => {
        const containerDiv = document.createElement('div');

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const tagPElement = document.createElement("p");
        tagPElement.classList.add("tag");
        tagPElement.innerHTML = tag.tag;

        const requestResultsElement = document.createElement("p");
        requestResultsElement.classList.add("request-results");
        requestResultsElement.setAttribute("title", "# of Request / # of Results");
        requestResultsElement.innerHTML = `<span>${tag.count}</span>`;

        let requestsResultsString = String(tag.count);
        requestsResultsString = requestsResultsString.split("/");
        // console.log(requestsResultsString[0]);
        containerDiv.dataset.resultsCount = requestsResultsString[1];
        containerDiv.dataset.requestCount = requestsResultsString[0];

        const actionsElement = document.createElement("p");
        actionsElement.classList.add("actions");
        // Based on where the tag goes, it gets certain actions to it
        switch (name) {
            case "redirected":
            case "pending":
                actionsElement.innerHTML = "<span class=\"main-action tag-action\" data-destination=\"tagged\">Tagged</span> <span class=\"action-separator\">|</span> <span class=\"main-action not-tagged-action\" data-destination=\"not-tagged\">Not Tagged</span> <span class=\"action-separator\">|</span> <span class=\"main-action not-allowed-action\" data-destination=\"not-allowed\">Not Allowed</span> <span class=\"action-separator\">|</span> <span class=\"redirect-action\" data-destination=\"redirected\">Redirect</span> <span class=\"action-separator\">|</span> <span class=\"delete-action\">Delete</span>";
                break;
            case "tagged":
                actionsElement.innerHTML = "<span class=\"main-action tag-action\" data-destination=\"tagged\" style=\"display:none;\">Tagged</span> <span class=\"action-separator\" style=\"display:none;\">|</span> <span class=\"main-action not-tagged-action\" data-destination=\"not-tagged\">Not Tagged</span> <span class=\"action-separator\">|</span> <span class=\"main-action not-allowed-action\" data-destination=\"not-allowed\">Not Allowed</span> <span class=\"action-separator\">|</span> <span class=\"redirect-action\" data-destination=\"redirected\">Redirect</span> <span class=\"action-separator\">|</span> <span class=\"delete-action\">Delete</span>";
                break;
            case "not-tagged":
                actionsElement.innerHTML = "<span class=\"main-action tag-action\" data-destination=\"tagged\">Tagged</span> <span class=\"action-separator\">|</span> <span class=\"main-action not-tagged-action\" data-destination=\"not-tagged\" style=\"display:none;\">Not Tagged</span> <span style=\"display:none;\" class=\"action-separator\">|</span> <span class=\"main-action not-allowed-action\" data-destination=\"not-allowed\">Not Allowed</span> <span class=\"action-separator\">|</span> <span class=\"redirect-action\" data-destination=\"redirected\">Redirect</span> <span class=\"action-separator\">|</span> <span class=\"delete-action\">Delete</span>";
                break;
            case "not-allowed":
                actionsElement.innerHTML = "<span class=\"main-action tag-action\" data-destination=\"tagged\">Tagged</span> <span class=\"action-separator\">|</span> <span class=\"main-action not-tagged-action\" data-destination=\"not-tagged\">Not Tagged</span> <span class=\"action-separator\">|</span> <span class=\"main-action not-allowed-action\" data-destination=\"not-allowed\" style=\"display:none;\">Not Allowed</span> <span class=\"action-separator\" style=\"display:none;\">|</span> <span class=\"redirect-action\" data-destination=\"redirected\">Redirect</span> <span class=\"action-separator\">|</span> <span class=\"delete-action\">Delete</span>";
                break;
        }
        // actionsElement.innerHTML = "<span>Tagged</span> | <span>Not Tagged</span> | <span>Not Allowed</span> | <span>Redirect</span> | <span>Delete</span>";

        if (tag.redirected) {
            const inputElement = document.createElement("input");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("placeholder", "Category or Link ID");
            inputElement.setAttribute("disabled", "disabled");
            inputElement.classList.add("redirected-input");
            inputElement.value = tag.redirected;
            containerDiv.classList.add("tag-in-focus-redirected");

            containerDiv.append(...[checkbox, tagPElement, inputElement, requestResultsElement, actionsElement]);

        } else {
            containerDiv.append(...[checkbox, tagPElement, requestResultsElement, actionsElement]);
            containerDiv.classList.add("tag-in-focus");
        }


        tagSection.querySelector(`#${name}-tags`).append(containerDiv);


        // console.log(table.querySelector("h2"));
        // table.querySelector("h2 span").innerHTML = table.children.length;
    });

    console.log(tagSection);
    // Set the count elment to the amount of children in the x-tags element
    tagSection.querySelector(`#${name}-count`).innerHTML = tagSection.querySelector(`#${name}-tags`).children.length;
}

generateTags(tagsToReview, document.querySelector("#pending-section"), "pending");
generateTags(tagsValidated, document.querySelector("#tagged-section"), "tagged");
generateTags(tagsUntagged, document.querySelector("#not-tagged-section"), "not-tagged");
generateTags(tagsRedirected, document.querySelector("#redirected-section"), "redirected");
generateTags(tagsBad, document.querySelector("#not-allowed-section"), "not-allowed");
makeTagsSelectable();

// Event listener for tags, makes them be selectable
function makeTagsSelectable() {
    const tags = document.querySelectorAll(".tag-in-focus, .tag-in-focus-redirected");

    tags.forEach(tag => tag.addEventListener("click", (evnt) => {
        // console.log(evnt.target);
        if (evnt.target.closest("input") || evnt.target.closest("span")) {
            console.log("check");
            return;
        }

        if (evnt.currentTarget.children[0].checked) {
            evnt.currentTarget.children[0].checked = false;
            evnt.currentTarget.classList.remove("selected");
        } else {
            evnt.currentTarget.children[0].checked = true;
            evnt.currentTarget.classList.add("selected");
        }

        // document.querySelector("#pending-selectedCount").innerHTML = document.querySelectorAll(".selected").length;
        updatedSelectedCount(tag.parentElement.parentElement.parentElement);
    }));
}
selectAllEvent(document.querySelectorAll(".table-top-bar input[type=\"checkbox\""));

// Function used to make select all button select all
function selectAllEvent(checkboxes) {
    checkboxes.forEach(checkbox => {
        // Add event listener to each checkbox
        checkbox.addEventListener("click", (evnt) => {
            // Get the container of the checkbox
            const parentElement = evnt.target.parentElement.parentElement;
            // Get the tags within the container
            const tags = parentElement.querySelectorAll(".tag-in-focus");

            // Get a count of how many tags have been selected already
            let selectedTagsCount = 0
            tags.forEach(tag => {
                if (tag.classList.contains("selected"))
                    selectedTagsCount++;
            });

            // Select all tags, if not all have been selected
            if (selectedTagsCount < tags.length) {
                tags.forEach(tag => {
                    tag.querySelector("input").checked = true;
                    tag.classList.add("selected");
                    updatedSelectedCount(tag.parentElement.parentElement.parentElement);
                });
                // IF all tags are selected, deselect them
            } else {
                tags.forEach(tag => {
                    tag.querySelector("input").checked = false;
                    tag.classList.remove("selected");
                    updatedSelectedCount(tag.parentElement.parentElement.parentElement);
                })
            }

        });
    });
}


// Function used to update the elment that shows how many elements have been selected
function updatedSelectedCount(container) {
    container.querySelector("h3 span").innerHTML = container.querySelectorAll(".selected").length;

}

function updateCountInSection(table) {
    console.log(table);
    const count = document.querySelector(`#${table}-tags`).children.length;
    console.log(count);
    console.log(document.querySelector(`#${table}-count`));
    document.querySelector(`#${table}-count`).innerHTML = count;
    // .innerHTML = count;
}

// Function used to sort tags by results
sortTagsByResultsEvent();
function sortTagsByResultsEvent() {
    // Get all tags used to sort by results
    const sortByCountActionElements = document.querySelectorAll(".table-top-bar span:nth-child(3)");

    sortByCountActionElements.forEach(element => {
        element.addEventListener("click", (evnt) => {
            console.log("Sort by Results");
            // Get associated tags and convert HTML object to Array to be sortable
            const tags = Array.from(element.parentElement.parentElement.parentElement.querySelectorAll(".tag-in-focus"));
            // Remove ^ or V from other options
            removeArrowFromOtherSortingAction();


            // SOrt descending
            if (evnt.target.dataset.sortedResAscending == "true") {
                tags.sort((a, b) => {
                    const valueA = parseFloat(a.dataset.resultsCount);
                    const valueB = parseFloat(b.dataset.resultsCount);
                    // console.log(valueA, valueB);
                    return valueB - valueA;
                })

                evnt.target.dataset.sortedResAscending = false;
                evnt.target.innerHTML = "V Sort by Results";
                // Sort ascending 
            } else {
                tags.sort((a, b) => {
                    const valueA = parseFloat(a.dataset.resultsCount);
                    const valueB = parseFloat(b.dataset.resultsCount);
                    // console.log(valueA, valueB);
                    return valueA - valueB;
                })

                evnt.target.innerHTML = "^ Sort by Results";;
                evnt.target.dataset.sortedResAscending = true;
            }


            // Append tags back to their parent to sort them
            tags.forEach(tag => tag.parentElement.appendChild(tag));


        })
    });

}


sortTagsByRequestEvent();
// Function used to sort tags by requested option
function sortTagsByRequestEvent() {
    // Select all button associated with sort by requested
    const sortByCountActionElements = document.querySelectorAll(".table-top-bar span:nth-child(2)");

    sortByCountActionElements.forEach(element => {
        element.addEventListener("click", (evnt) => {
            console.log("Sort by Request");

            // Get all the tags in the same div as the action button and convert into an array to be sortable
            const tags = Array.from(element.parentElement.parentElement.parentElement.querySelectorAll(".tag-in-focus"));
            // Remove ^ or V from other options
            removeArrowFromOtherSortingAction();


            // SOrt descending
            if (evnt.target.dataset.sortedReqAscending == "true") {
                tags.sort((a, b) => {
                    const valueA = parseFloat(a.dataset.requestCount);
                    const valueB = parseFloat(b.dataset.requestCount);
                    // console.log(valueA, valueB);
                    return valueB - valueA;
                })

                evnt.target.dataset.sortedReqAscending = false;
                evnt.target.innerHTML = "V Sort by Requested";
                // Sort ascending 
            } else {
                tags.sort((a, b) => {
                    const valueA = parseFloat(a.dataset.requestCount);
                    const valueB = parseFloat(b.dataset.requestCount);
                    // console.log(valueA, valueB);
                    return valueA - valueB;
                })

                evnt.target.innerHTML = "^ Sort by Requested";;
                evnt.target.dataset.sortedReqAscending = true;
            }

            // Append back each element to the parent
            tags.forEach(tag => tag.parentElement.appendChild(tag));


        })
    });

}
//F unction used to sort tags by alphabetically option
sortTagsByAlphabeticallyEvent();
function sortTagsByAlphabeticallyEvent() {
    // Get all buttons that do the alphabetical sort
    const sortByCountActionElements = document.querySelectorAll(".table-top-bar span:nth-child(1)");

    sortByCountActionElements.forEach(element => {
        element.addEventListener("click", (evnt) => {
            console.log("Sort by Alphabetical");

            // Get associated tags and convert to array
            const tags = Array.from(element.parentElement.parentElement.parentElement.querySelectorAll(".tag-in-focus"));
            // Remove ^ or V from other options
            removeArrowFromOtherSortingAction();
            // SOrt descending
            if (evnt.target.dataset.sortedAlphaAscending == "true") {
                tags.sort((a, b) => {
                    const valueA = a.querySelector(".tag").innerHTML;
                    const valueB = b.querySelector(".tag").innerHTML;
                    return valueA.localeCompare(valueB);;
                })

                evnt.target.dataset.sortedAlphaAscending = false;
                evnt.target.innerHTML = "V Sort Alphabetically";
                // Sort ascending 
            } else {
                tags.sort((a, b) => {
                    const valueA = a.querySelector(".tag").innerHTML;
                    const valueB = b.querySelector(".tag").innerHTML;
                    return valueB.localeCompare(valueA);;
                })

                evnt.target.innerHTML = "^ Sort Alphabetically";;
                evnt.target.dataset.sortedAlphaAscending = true;
            }
            // Append back each tag to their parent to reorganize
            tags.forEach(tag => tag.parentElement.appendChild(tag));


        })
    });

}


// Functino used to remove little arrow on other sorting actions when other actino selected
function removeArrowFromOtherSortingAction() {
    document.querySelectorAll(".table-top-bar span").forEach(element => {
        if (element.innerHTML[0] == "V" || element.innerHTML[0] == "^") {
            if (!element.checkVisibility()) {
                return;
            }
            // console.log(String(element.innerHTML));
            element.innerHTML = String(element.innerHTML).slice(1);
        }
    });
}


// NEXT
/* 
Start doing the actions
Figure out how the to show where redirected tags go - maybe just add a textbox?
*/

individualActionListener();
// Function used to add actions to each button below 
function individualActionListener() {
    const individualActionButtons = document.querySelectorAll(".actions span:nth-child(odd)");

    // Get each of the little button below each tag
    individualActionButtons.forEach(button => {
        button.addEventListener("click", (evnt) => {
            // get the buttons class to determine what action to take
            const buttonClass = evnt.target.classList[evnt.target.classList.length - 1];
            // console.log(evnt.target.classList);

            // If button is to tag, not tag or not allowed the tag, simply move the tag and change some styles and counts
            if (buttonClass == "tag-action" || buttonClass == "not-tagged-action" || buttonClass == "not-allowed-action") {
                // Element the button is part of
                const tag = evnt.target.parentElement.parentElement;
                // Parent of the tag
                const currentParent = tag.parentElement.parentElement.parentElement;


                // Each tag has actions, some are set to display none, ensure all are displayed
                tag.querySelectorAll(".actions > *").forEach(element => element.style.display = "inline");
                // Now set the action that we don't need to none
                //  This is the tag associated with the destination section
                //  ie: Tagged button goes away if we move tag to Tagged
                tag.querySelector(`.${buttonClass}`).style.display = "none";
                // Hide separator
                tag.querySelector(`.${buttonClass} + span`).style.display = "none";
                // If tag is selected, remove its class and uncheck its checkbox
                tag.classList.remove("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = false;

                // If the tag has a text box for redirection, we need to remove the textbox
                if (tag.querySelector(".redirected-input")) {
                    tag.querySelector(".redirected-input").remove();
                    tag.classList.remove("tag-in-focus-redirected");
                    tag.classList.add("tag-in-focus");
                }
                // Now append the tag to the destination
                document.querySelector(`#${evnt.target.dataset.destination}-tags`).appendChild(tag);
                // Update count of the destination element
                updateCountInSection(evnt.target.dataset.destination);
                // Update count of source element
                updateCountInSection((currentParent.id).slice(0, currentParent.id.indexOf("-section")));
                // ALso update the selected count, if the tag was selected
                updatedSelectedCount(currentParent);
                // Block fo when user wishes to redirect
            } else if (buttonClass == "redirect-action") {
                const tag = evnt.target.parentElement.parentElement;
                tag.classList.add("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = true;
                const tagText = tag.querySelector(".tag").innerHTML;
                const dialogBox = document.querySelector("#dialog-redirection");
                dialogBox.querySelector("h2 span").innerHTML = tagText;
                dialogBox.showModal();
            } else if (buttonClass == "delete-action") {
                const tag = evnt.target.parentElement.parentElement;
                tag.classList.add("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = true;
                const tagText = tag.querySelector(".tag").innerHTML;
                const dialogBox = document.querySelector("#dialog-remove");
                dialogBox.querySelector("p").innerHTML = tagText;
                dialogBox.showModal();

            }
        });
    });
}

// Function used to add event listeners for the redirect dialog box
addRedirectDialogBoxActions();
function addRedirectDialogBoxActions() {
    // Submit button
    const dialogBox = document.querySelector("#dialog-redirection");
    dialogBox.querySelector("button:first-of-type").addEventListener("click", (evnt) => {
        // let userInput = dialogBox.querySelector("input[type=\"text\"]").value;

        const tags = document.querySelectorAll(".selected");
        tags.forEach(tag => {

            // Ignore tags that are not present on the screen
            if (!tag.checkVisibility()) {
                return
            }

            if (tag.querySelector("input[type=\"text\"]")) {
                console.log("has redirect");
                const inputElement = tag.querySelector("input[type=\"text\"]");
                inputElement.value = dialogBox.querySelector("input[type=\"text\"]").value;
                tag.classList.remove("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = false;
            } else {
                const inputElement = document.createElement("input");
                inputElement.setAttribute("type", "text");
                inputElement.setAttribute("placeholder", "Category or Link ID");
                inputElement.setAttribute("disabled", "disabled");
                inputElement.classList.add("redirected-input");
                console.log(tag);
                inputElement.value = dialogBox.querySelector("input[type=\"text\"]").value;
                tag.insertBefore(inputElement, tag.querySelector(".request-results"));

                tag.classList.add("tag-in-focus-redirected");
                tag.classList.remove("tag-in-focus");
                tag.classList.remove("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = false;

                document.querySelector("#redirected-tags").appendChild(tag);
            }

        });
        dialogBox.close();
    });

    dialogBox.querySelector("button:last-of-type").addEventListener("click", (evnt) => {
        dialogBox.close();

        let tags = Array.from(document.querySelectorAll(".selected"));
        console.log(tags);
        // tags.forEach(tag => {
        //     console.log(tag[0].style.display);
        // });
        tags = tags.filter(tag => tag.checkVisibility());
        tags.forEach(tag => {
            tag.classList.remove("selected");
            tag.querySelector("input[type=\"checkbox\"]").checked = false;

        })
    })
}

// Function used to add event listeners for the redirect dialog box
addDeleteDialogBoxActions();
function addDeleteDialogBoxActions() {
    // Submit button
    const dialogBox = document.querySelector("#dialog-remove");
    dialogBox.querySelector("button:first-of-type").addEventListener("click", (evnt) => {
        // let userInput = dialogBox.querySelector("input[type=\"text\"]").value;

        const tags = document.querySelectorAll(".selected");
        tags.forEach(tag => {

            // Ignore tags that are not present on the screen
            if (!tag.checkVisibility()) {
                return
            }
            // const textbox = document.createElement("input");
            // textbox.setAttribute("type", "text");
            // let userInput = dialogBox.querySelector("input[type=\"text\"]").value;
            const parent = tag.parentElement.parentElement.parentElement;
            console.log(parent);
            tag.remove()
            updateCountInSection(parent.id.slice(0, parent.id.indexOf("-section")));
        });
        dialogBox.close();
    });

    dialogBox.querySelector("button:last-of-type").addEventListener("click", (evnt) => {
        dialogBox.close();

        let tags = Array.from(document.querySelectorAll(".selected"));
        console.log(tags);
        // tags.forEach(tag => {
        //     console.log(tag[0].style.display);
        // });
        tags = tags.filter(tag => tag.checkVisibility());
        tags.forEach(tag => {
            tag.classList.remove("selected");
            tag.querySelector("input[type=\"checkbox\"]").checked = false;
        });
    })
}