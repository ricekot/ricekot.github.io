---
title: "Adding a Review Checklist to GitHub PRs"
description: "I wrote a tampermonkey script which adds a review checklist to GitHub PRs."
date: "Feb 14 2023"
---

Doing good code reviews is difficult.  
Doing good code reviews *fast* even more so.

I feel overwhelmed when I think about reviewing large amounts of code written by other people.
They feel like a huge time drain and I would rather be spending that time doing something else.
However, when you work in a team, being able to provide good feedback on code written by others is an indispensable skill.

I think code is just a medium of expression for your ideas.
You need to be able to think clearly in order to write crisp, clean code.
In that sense, reading code written by other people is like peering into their mind.

In an attempt to make it slightly easier for me to do code reviews, I quickly hacked together a tampermonkey script which adds a review checklist to GitHub PRs. [tampermonkey](https://www.tampermonkey.net/) is a browser extension that lets you inject scripts into any webpage you want.

<figure class="mx-auto my-8 max-w-3xl text-center w-3/4">
	<img
		src="/assets/images/pr-review-checklist/demo.gif"
		alt="Review checklist on GitHub PRs"
		class="mx-auto rounded-lg shadow-md"
	/>
	<figcaption class="mt-3 text-sm text-gray-500 dark:text-gray-400">
		Review Checklist on GitHub PRs
	</figcaption>
</figure>

The script is available as a [GitHub gist](https://gist.github.com/ricekot/a1331d4fd28bd6709f981b36d91cdb2e#file-github-code-review-checklist-js):

```javascript
// ==UserScript==
// @name         GitHub Code Review Checklist
// @namespace    https://ricekot.com/
// @version      0.1
// @description  Adds a code review checklist to GitHub PRs.
// @author       ricekot
// @match        https://github.com/*/*/pull/*/files
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let checklist = `
<div class="diffbar-item dropdown js-review-checklist-container mr-3">
  <details class="details-reset details-overlay js-dropdown-details position-relative" id="review-checklist-modal">
    <summary data-view-component="true" class="js-review-checklist-toggle btn-sm btn"> Review Checklist
      <span class="dropdown-caret"></span>
    </summary>
    <div class="SelectMenu left-0">
      <div class="pull-request-suggested-changes-menu SelectMenu-modal top-0 p-0 mt-sm-2" style="max-width: 300px;"
        id="review-checklist">
        <header class="SelectMenu-header p-2">
          <span class="SelectMenu-title">Review Checklist</span>
          <button class="SelectMenu-closeButton" type="button" data-toggle-for="review-checklist-modal">
            <svg aria-label="Review Checklist dialog" role="img" height="16" viewBox="0 0 16 16" version="1.1"
              width="16" data-view-component="true" class="octicon octicon-x">
              <path fill-rule="evenodd"
                d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z">
              </path>
            </svg>
          </button>
        </header>

        <div class="comment-body markdown-body js-preview-body" data-skip-sizing="" style="max-height:50vh;">
          <ul class="contains-task-list">
            <li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox"> Requirement 1</li>
            <li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox"> Requirement 2</li>
          </ul>
        </div>
  </details>
</div>
`;
    document.querySelector('div.pr-review-tools').insertAdjacentHTML("afterbegin", checklist);
})();
```
