---
layout: post
title: "How I Manage My Finances with hledger and Python"
description: An overview of my plain-text accounting workflow.
date: 2023-09-03 08:00 +0530
---

Today I'm going to talk about how I manage my finances with a plain-text accounting tool called [hledger](https://hledger.org/) and some Python scripts.

## Why Plain-text accounting?
My requirements were simple:
- Ownership of my data: I don't want sensitive information about my finances on the cloud servers of some random organization.
- Reasonably automatable: I don't want to manually keep track of every single transaction I make.
- Reliable: I want something that *just works*. Please, no janky dashboards with unnecessary fluff.

## The Setup
I have a version-controlled folder in my home directory which contains my annual hledger journal, some Python scripts, and exported files from my banks' websites.

```
hledger/
├── 2023.journal
├── 2023.prices
├── bank-credit-card.csv
├── bank-credit-card.py
├── bank-statement.py
├── bank-statement.xls
├── current.journal -> 2023.journal
├── current.prices -> 2023.prices
├── get-latest-prices.py
├── past
│   ├── 2022.journal
│   └── 2022.prices
├── tradebook.csv
├── tradebook.py
└── update-ledger.sh
```

I can definitely make this look nicer by using more subfolders, but so far, with a limited number of files, this single-folder-with-everything-in-it approach seems to be working well for me.

Here's an overview of the files in the list above:
- The `.journal` files are the core of this system. They contain all the transactions that I make.
- The `.prices` files are used to track the prices of my investments over time.
- The `.csv` and `.xls` files contain exported transactions from my banks and my broker.
- The `.py` files are Python scripts that are used for parsing the exported data files and converting them to hledger transactions.
- The `update-ledger.sh` script is for my convenience. It runs all the other scripts and appends their output to the journal or the prices files.

## Understanding hledger
I love hledger. It is free, open-source, and based on the widely used [double-entry](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) method of bookkeeping.

### The `.journal`
This is what a transaction in the journal looks like:

```
2023-08-20 Coffee
    expenses:food                  INR 250.00
    debt:credit card
```

It's called "double-entry" because there are two entries for each transaction: an account which was debited and another which was credited. For example, in the above transaction, the "expenses:food" account was credited while the "debt:credit card" account was debited.

Once you have a couple dozen of these entries in your ledger, you can use one of the various interfaces that hledger offers to visualise that data. Like with most other tools, I prefer using their CLI interface. For example, using a command like `hledger balancesheet -V`, I'm able to get a nice summary of my assets, liabilities, and net worth.

### The `.prices`
Entries in the prices file are pretty straightforward too.
For example,

```
P 2023-08-31 NIFTYBEES INR 212.77
```

is used to tell hledger that the price of a single share of the NIFTYBEES ETF on August 31, 2023 was INR 212.77.

If you want to learn more about hledger, I recommend going through their [documentation](https://hledger.org/start.html).

## My Workflow
It takes me about 15-30 minutes every weekend to update my ledger with the transactions of the week before.

1. I start by downloading the transactions of the past week from the websites of my banks and my broker.
   I have some thoughts on the file formats that banks allow exporting in, but I'll save those for another day.
2. I run the `update-ledger.sh` script which:
   1. runs the Python scripts to convert the entries in the exported files to hledger journal entries
   2. runs the Python scripts to fetch the latest prices of my investments
3. I make any manual changes I want to the entries (e.g. categorizing expenses), and ensure that everything lines up (e.g. by checking that the final values in my ledger match the values on my banks' websites).
4. I stage and commit all changes.

That's it! Really, the process of logging in, navigating, and exporting transactions from bank websites is what takes the most time.

## The Scripts
Each banking institution has quirks about the formats that they let you export your data in.
Most of them allow exporting spreadsheets (`XLS` or `XLSX`) and comma separated value (`CSV`) files.
The great thing about using Python is that there are libraries available to parse most of these formats.

## What's next?
I've been using this system for over a year now and I'm pretty happy with it. It is simple and robust.

However, I understand that it may be too technical for most people. I've been talking with friends and family and most of them have said that they'd be interested in an app that would allow them to keep a track of their finances "casually". That seems like an interesting problem statement to me, and I'm pretty confident that with the widespread adoption of systems like [NPCI's UPI](https://en.wikipedia.org/wiki/Unified_Payments_Interface), it should be possible to surface the majority of day-to-day spendings for most people with minimal manual inputs from them.

Thanks for reading! If you have any comments, I would love to hear from you at `hello@ricekot.com`.
