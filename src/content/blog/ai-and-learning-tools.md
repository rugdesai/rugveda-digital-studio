---
title: "How AI is changing learning tools"
description: "Notes from building PrepPal — where LLMs help learning, where they hurt, and the design patterns that seem to hold up."
date: "Mar 18, 2026"
category: "AI Notes"
readTime: "8 min read"
tags: ["LLMs", "EdTech", "RAG"]
coverImage: ""
cover: "from-yellow/60 via-lettuce/30 to-transparent"
---

## The good, the bad, the hallucinated

LLMs are a genuinely new primitive for learning tools. They can explain, quiz, and rephrase on demand. They also confidently invent things — which is fatal when the user is trying to _learn_.

## Three patterns that seem to hold up

### Retrieval-grounded everything

No answer without a citation. Every response links to the chunk of source material it came from. Users trust the system more, and I catch bugs faster.

### Small, verifiable outputs

Generate one flashcard at a time, not a deck of fifty. Small outputs are easier for the model to get right and easier for the user to correct.

### Let the user edit the graph

PrepPal builds a learning graph from your syllabus. Letting students prune and rename nodes turns the AI from a black box into a collaborator.

## What I'm still figuring out

- How to measure 'did this actually help you learn?' beyond quiz scores
- How to price a product where costs scale with engagement
