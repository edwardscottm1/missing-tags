"use strict";
/*
TODO ------------------------
    Make so rediection only happens when user populate text box nad have box clear after submit
    Fix naming conventions
    Possibly do pages for tags? Not sure (do if i need more time)
    REdo sorting functions, they should be one or more stand alone in a way like the actions
*/
// Function used to generate tags on page load
// Tags array of objects, which section the tags belong to (DOM object), and section name (class/str)
function generateTags(tags, tagSection, name) {
    tags.forEach(tag => {
        // Create div holding the tag
        const containerDiv = document.createElement('div');
        // Create check box for selection
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Create p tag for 
        const tagPElement = document.createElement("p");
        tagPElement.classList.add("tag");
        tagPElement.innerHTML = tag.tag;
        // Create element to hold tag request and results info
        const requestResultsElement = document.createElement("p");
        requestResultsElement.classList.add("request-results");
        requestResultsElement.setAttribute("title", "# of Request / # of Results");
        requestResultsElement.innerHTML = `<span>${tag.count}</span>`;
        // Split tag data into to so they can be placed into separate data-attributes
        let requestsResultsString = String(tag.count);
        requestsResultsString = requestsResultsString.split("/");
        containerDiv.dataset.resultsCount = requestsResultsString[1];
        containerDiv.dataset.requestCount = requestsResultsString[0];

        // Element to hold actions user can perform on tag (organize them or delete)
        const actionsElement = document.createElement("p");
        actionsElement.classList.add("actions");
        // Based on where the tag goes, it gets certain actions to it
        switch (name) {
            case "redirected":
            case "pending":
                actionsElement.innerHTML = `<span class="link"><a href="${tag.link}" target="_blank">Link</a></span> <span class="action-separator">|</span> <span class="main-action tagged-tags-action" data-destination="tagged-tags">Tagged</span> <span class="action-separator">|</span> <span class="main-action not-tagged-tags-action" data-destination="not-tagged-tags">Not Tagged</span> <span class="action-separator">|</span> <span class="main-action not-allowed-tags-action" data-destination="not-allowed-tags">Not Allowed</span> <span class="action-separator">|</span> <span class="redirected-tags-action" data-destination="redirected-tags">Redirect</span> <span class="action-separator">|</span> <span class="delete-action" data-destination="delete">Delete</span>`;
                break;
            case "tagged":
                actionsElement.innerHTML = `<span class="link"><a href="${tag.link}" target="_blank">Link</a></span> <span class="action-separator">|</span> <span class="main-action tagged-tags-action" data-destination="tagged-tags" style="display:none;">Tagged</span> <span class="action-separator" style="display:none;">|</span> <span class="main-action not-tagged-tags-action" data-destination="not-tagged-tags">Not Tagged</span> <span class="action-separator">|</span> <span class="main-action not-allowed-tags-action" data-destination="not-allowed-tags">Not Allowed</span> <span class="action-separator">|</span> <span class="redirected-tags-action" data-destination="redirected-tags">Redirect</span> <span class="action-separator">|</span> <span class="delete-action" data-destination="delete">Delete</span>`;
                break;
            case "not-tagged":
                actionsElement.innerHTML = `<span class="link"><a href="${tag.link}" target="_blank">Link</a></span> <span class="action-separator">|</span> <span class="main-action tagged-tags-action" data-destination="tagged-tags">Tagged</span> <span class="action-separator">|</span> <span class="main-action not-tagged-tags-action" data-destination="not-tagged-tags" style="display:none;">Not Tagged</span> <span style="display:none;" class="action-separator">|</span> <span class="main-action not-allowed-tags-action" data-destination="not-allowed-tags">Not Allowed</span> <span class="action-separator">|</span> <span class="redirected-tags-action" data-destination="redirected-tags">Redirect</span> <span class="action-separator">|</span> <span class="delete-action" data-destination="delete">Delete</span>`;
                break;
            case "not-allowed":
                actionsElement.innerHTML = `<span class="link"><a href="${tag.link}" target="_blank">Link</a></span> <span class="action-separator">|</span> <span class="main-action tagged-tags-action" data-destination="tagged-tags">Tagged</span> <span class="action-separator">|</span> <span class="main-action not-tagged-tags-action" data-destination="not-tagged-tags">Not Tagged</span> <span class="action-separator">|</span> <span class="main-action not-allowed-tags-action" data-destination="not-allowed-tags" style="display:none;">Not Allowed</span> <span class="action-separator" style="display:none;">|</span> <span class="redirected-tags-action" data-destination="redirected-tags">Redirect</span> <span class="action-separator">|</span> <span class="delete-action" data-destination="delete">Delete</span>`;
                break;
        }
        // If the tag is redirected, we need to add a textbox to it to show its redirection
        if (tag.redirected) {
            const inputElement = document.createElement("input");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("placeholder", "Category or Link ID");
            inputElement.setAttribute("disabled", "disabled");
            inputElement.classList.add("redirected-input");
            inputElement.value = tag.redirected;
            // Append all the elements to the container
            containerDiv.append(...[checkbox, tagPElement, inputElement, requestResultsElement, actionsElement]);
            containerDiv.classList.add("tag-in-focus-redirected");
        } else {
            // Append all the elements to the container
            containerDiv.append(...[checkbox, tagPElement, requestResultsElement, actionsElement]);
            containerDiv.classList.add("tag-in-focus");
        }
        // Then append each tag to the section
        tagSection.querySelector(`#${name}-tags`).append(containerDiv);
    });


    // Set the count element to the amount of children in the x-tags element
    tagSection.querySelector(`#${name}-tags-count`).innerHTML = tagSection.querySelector(`#${name}-tags`).children.length;
}
// Generate the tags
generateTags(tagsToReview, document.querySelector("#pending-section"), "pending");
generateTags(tagsValidated, document.querySelector("#tagged-section"), "tagged");
generateTags(tagsUntagged, document.querySelector("#not-tagged-section"), "not-tagged");
generateTags(tagsRedirected, document.querySelector("#redirected-section"), "redirected");
generateTags(tagsBad, document.querySelector("#not-allowed-section"), "not-allowed");
makeTagsSelectable();

// Event listener for tags, makes them be selectable
function makeTagsSelectable() {
    // select all tags, maybe move to where we make the tags?
    const tags = document.querySelectorAll(".tag-in-focus, .tag-in-focus-redirected");
    // For each tag add an event listener
    tags.forEach(tag => tag.addEventListener("click", (evnt) => {
        // Ignore clicks on the checkbox or the actions element (span)
        if (evnt.target.closest("input") || evnt.target.closest("span")) {
            return;
        }
        // If the tag is selected, deselect
        if (evnt.currentTarget.children[0].checked) {
            evnt.currentTarget.children[0].checked = false;
            evnt.currentTarget.classList.remove("selected");
            // If tag not selected, select
        } else {
            evnt.currentTarget.children[0].checked = true;
            evnt.currentTarget.classList.add("selected");
        }
        // Update the selected count at the top of the section
        updatedSelectedCount(tag.parentElement.id);
    }));
}

selectAllEvent(document.querySelectorAll(".table-top-bar input[type=\"checkbox\"]"));

// Function used to make select all button select all
function selectAllEvent(checkboxes) {
    checkboxes.forEach(checkbox => {
        // Add event listener to each checkbox
        checkbox.addEventListener("click", (evnt) => {
            // Get the section of the checkbox
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
                    // updatedSelectedCount(tag.parentElement.parentElement.parentElement);
                });
                // IF all tags are selected, deselect them
            } else {
                tags.forEach(tag => {
                    tag.querySelector("input").checked = false;
                    tag.classList.remove("selected");
                })
            }
            // Update the selection count
            updatedSelectedCount(tag.parentElement.parentElement.parentElement);

        });
    });
}


// Function used to update the element that shows how many elements have been selected
// Table should be the id of the container holding the tags
function updatedSelectedCount(table) {
    const tableElement = document.querySelector(`#${table.replace("tags", "section")}`);
    // console.log(tableElement.querySelector("h3"));
    tableElement.querySelector("h3 span").innerHTML = tableElement.querySelectorAll(".selected").length;
}
// Function used to update the count in a table after an event
// Table should be the id of the container holding the tags
function updateCountInSection(table) {
    document.querySelector(`#${table}-count`).innerHTML = document.querySelector(`#${table}`).children.length;
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
// Function used to sort tags by alphabetically option
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

// Function used to remove little arrow on other sorting actions when other action selected
function removeArrowFromOtherSortingAction() {
    // Select all sort action span tags
    document.querySelectorAll(".table-top-bar span").forEach(element => {
        // See if the span has an arrow
        if (element.innerHTML[0] == "V" || element.innerHTML[0] == "^") {
            // If its not visible, ignore
            if (!element.checkVisibility()) {
                return;
            }
            // Remove the arrow, its the first character
            element.innerHTML = String(element.innerHTML).slice(1);
        }
    });
}



// Function that adds functionality to individual action buttons
// It creates an object of data used by the performAction function in order to organize the tags
individualActionFunctionality();
function individualActionFunctionality() {
    const actionSpanTags = document.querySelectorAll(".actions span:nth-child(odd");
    // console.log(actionSpanTags);
    actionSpanTags.forEach(action => {
        action.addEventListener("click", (evnt) => {
            let data = {
                "destination": evnt.currentTarget.dataset.destination,
                "tags": [evnt.currentTarget.parentElement.parentElement],
                "currentParent": evnt.currentTarget.parentElement.parentElement.parentElement.id
            }
            performAction(data);

        });
    });
}

bulkActionFunctionality();
// Function to do add bulk action functionality
function bulkActionFunctionality() {
    const buttons = document.querySelectorAll(".bulk-actions-button");
    buttons.forEach(button => {
        button.addEventListener("click", (evnt) => {
            const section = button.parentElement.parentElement;
            const tags = section.querySelectorAll(".selected")
            let data = {
                "destination": evnt.currentTarget.previousElementSibling.value,
                "tags": tags,
                "currentParent": tags[0].parentElement.id
            }
            performAction(data);
        });
    });
}


// Function that organizes the tag after user selects an action
function performAction(data) {
    // If action  is to tag, not tag or not allowed the tag, simply move the tag and change some styles and counts
    if (data.destination == "tagged-tags" || data.destination == "not-tagged-tags" || data.destination == "not-allowed-tags") {
        // Iterate through each tag 
        data.tags.forEach(tag => {
            // Each tag has actions, some are set to display none, ensure all are displayed
            tag.querySelectorAll(".actions > *").forEach(element => element.style.display = "inline");
            // Now set the action that we don't need to none
            //  This is the tag associated with the destination section
            //  ie: Tagged button goes away if we move tag to Tagged
            tag.querySelector(`.${data.destination}-action`).style.display = "none";
            // Hide separator
            tag.querySelector(`.${data.destination}-action + span`).style.display = "none";
            // If tag is selected, remove its class and uncheck its checkbox
            if (tag.querySelector("input[type=\"checkbox\"]").checked = true) {
                tag.classList.remove("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = false;
            }

            // If the tag has a text box for redirection, we need to remove the textbox
            if (tag.querySelector(".redirected-input")) {
                tag.querySelector(".redirected-input").remove();
                tag.classList.remove("tag-in-focus-redirected");
                tag.classList.add("tag-in-focus");
            }
            // Now append the tag to the destination
            document.querySelector(`#${data.destination}`).appendChild(tag);
            // Update count of the destination element
            updateCountInSection(data.destination);
            // Update count of source element
            updateCountInSection(data.currentParent);
            // ALso update the selected count, if the tag was selected
            updatedSelectedCount(data.currentParent);
        });
        // console.log(data.destination.replace("-tags", "").replaceAll("-", " ").toUpperCase())
        showStatusThenHide(data.tags.length, data.destination.replace("-tags", "").replaceAll("-", " ").toUpperCase());
    } else if (data.destination == "redirected-tags") {
        const dialogBox = document.querySelector("#dialog-redirection");
        let message = "";
        data.tags.forEach((tag, index, array) => {
            tag.classList.add("redirect-pending");
            if (index == array.length - 1) {
                message += `${tag.querySelector("p.tag").innerHTML}`;
            } else {
                message += `${tag.querySelector("p.tag").innerHTML}, `;
            }
        });
        dialogBox.querySelector("#redirect-dialog-tags").innerHTML = message;
        dialogBox.showModal();
        // console.log(message);
    } else if (data.destination == "delete") {
        const dialogBox = document.querySelector("#dialog-remove");
        let message = "";
        data.tags.forEach((tag, index, array) => {
            tag.classList.add("delete-pending");
            if (index == array.length - 1) {
                message += `${tag.querySelector("p.tag").innerHTML}`;
            } else {
                message += `${tag.querySelector("p.tag").innerHTML}, `;
            }
        });
        dialogBox.querySelector("#delete-dialog-tags").innerHTML = message;
        dialogBox.showModal();
    }
}

addRedirectDialogBoxActions();
function addRedirectDialogBoxActions() {
    // Submit button
    const dialogBox = document.querySelector("#dialog-redirection");
    dialogBox.querySelector("button:first-of-type").addEventListener("click", (evnt) => {
        const tags = document.querySelectorAll(".redirect-pending");
        tags.forEach(tag => {
            // Ignore tags that are not present on the screen
            if (!tag.checkVisibility()) {
                return
            }
            // If tag contains text box (we are editing a redirected tag), modify value in text box
            if (tag.querySelector("input[type=\"text\"]")) {
                // console.log("has redirect");
                const inputElement = tag.querySelector("input[type=\"text\"]");
                inputElement.value = dialogBox.querySelector("input[type=\"text\"]").value;
                // Deselect if selected
                tag.querySelector("input[type=\"checkbox\"]").checked = false;
                tag.classList.remove("selected");
            } else {
                // If there is no text box, add it and put value
                const inputElement = document.createElement("input");
                inputElement.setAttribute("type", "text");
                inputElement.setAttribute("placeholder", "Category or Link ID");
                inputElement.setAttribute("disabled", "disabled");
                inputElement.classList.add("redirected-input");
                inputElement.value = dialogBox.querySelector("input[type=\"text\"]").value;
                tag.insertBefore(inputElement, tag.querySelector(".request-results"));

                // add and remove classes
                tag.classList.add("tag-in-focus-redirected");
                tag.classList.remove("tag-in-focus");
                // Make sure tag is not checked
                tag.classList.remove("selected");
                tag.querySelector("input[type=\"checkbox\"]").checked = false;

                // Save source parent to update count later
                const sourceParent = tag.parentElement.id;

                // Append tag to the redirected section
                document.querySelector("#redirected-tags").appendChild(tag);

                // Update count of source element
                updateCountInSection(sourceParent);
                // ALso update the selected count, if the tag was selected
                updatedSelectedCount(sourceParent);
                // Update count of the destination element
                updateCountInSection("redirected-tags");

            }
            // Remove the pending class
            tag.classList.remove("redirect-pending");
            showStatusThenHide(tags.length, "Redirected");
        });

        dialogBox.close();
    });
    // Add close functionality and deselect tags (remove the pending class)
    dialogBox.querySelector("button:last-of-type").addEventListener("click", (evnt) => {
        dialogBox.close();

        // Remove the class from the tag
        let tags = document.querySelectorAll(".redirect-pending");
        tags.forEach(tag => {
            if (tag.checkVisibility()) {
                tag.classList.remove("redirect-pending");
                // tag.classList.remove("selected");
                // tag.querySelector("input[type=\"checkbox\"]").checked = false;
            }

        })
    })
}
// Function used to add event listeners for the delete dialog box
//  Used when user wants to delete tags
addDeleteDialogBoxActions();
function addDeleteDialogBoxActions() {
    const dialogBox = document.querySelector("#dialog-remove");
    // Delete button
    dialogBox.querySelector("button:first-of-type").addEventListener("click", (evnt) => {
        const tags = document.querySelectorAll(".delete-pending");
        tags.forEach(tag => {
            // Ignore tags that are not present on the screen
            if (!tag.checkVisibility()) {
                return
            }
            // Save parent to update count
            const parent = tag.parentElement.id;
            // Remove tag then update the counts of its parent
            tag.remove()
            updateCountInSection(parent);
            updatedSelectedCount(parent);
        });
        dialogBox.close();
        showStatusThenHide(tags.length, "Delete");

    });
    // Event listener for button to cancel removal
    dialogBox.querySelector("button:last-of-type").addEventListener("click", (evnt) => {
        dialogBox.close();
        let tags = document.querySelectorAll(".delete-pending");
        tags.forEach(tag => {
            tag.classList.remove("delete-pending");
            // tag.querySelector("input[type=\"checkbox\"]").checked = false;
        });
    });
}


// Function used to show a snackbar to inform user of tags being moved
function showStatusThenHide(count, destination) {
    // const snackbar = document.querySelector("#status");
    const snackbar = document.createElement("div");
    snackbar.classList.add("status");
    if (destination == "Delete") {
        snackbar.innerHTML = `<p><b>${count}</b> keyword${count > 1 ? 's' : ''} <b>DELETED</b></p>`;

    } else {
        snackbar.innerHTML = `<p><b>${count}</b> keyword${count > 1 ? 's' : ''} moved to <b>${destination}</b></p>`;
    }
    document.body.appendChild(snackbar);
    snackbar.offsetHeight;
    // snackbar.querySelector("#status-count").innerHTML = count;
    // snackbar.querySelector("#status-destination").innerHTML = destination;

    snackbar.classList.add("moved");

    setTimeout(() => {
        snackbar.classList.remove("moved")
    }, 3000)
}