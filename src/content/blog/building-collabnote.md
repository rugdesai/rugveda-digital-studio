---
title: "Building CollabNote: lessons from recreating real-time collaboration"
description: "What I learned rebuilding a Notion-style workspace from scratch — CRDTs, presence, and the quiet cost of 'just add real-time'."
date: "May 12, 2026"
category: "Build Logs"
readTime: "9 min read"
tags: ["CRDTs", "WebSockets", "Postgres"]
coverImage: ""
cover: "from-blue/60 via-orange/30 to-transparent"
---

## Why rebuild something that already exists

I wanted to understand real-time collaboration the way you only can by building it — the trade-offs, the sharp edges, the moment your optimistic UI lies to a user.

CollabNote is a small Notion-style workspace. Multi-cursor editing, presence, offline-first sync. Under the hood it's a CRDT document model on top of [Yjs](https://github.com/yjs/yjs), a WebSocket layer backed by Redis, and a Postgres store that keeps materialised snapshots so cold loads are one query.

## Three things I underestimated

### 1. Presence is a product, not a feature

The first time I added cursors, the app suddenly felt _alive_. But presence has a tail of subtle decisions: how long to keep a stale cursor, what colour to assign, what happens on tab-focus, how to reconcile identity across tabs. Every one of these is a UX call.

> The best real-time apps make you forget it's real-time. The worst ones make you watch the network tab.

### 2. Offline-first is a mindset shift

Once your local state is the source of truth and the server is 'eventually', everything downstream changes — routing, error handling, even how you write `useEffect`. It's freeing, and it forces cleaner boundaries.

### 3. Snapshots > event replay for cold loads

Replaying every op on load is elegant and slow. Materialised snapshots per document, updated on a debounce, cut our cold-load time from ~1.4s to ~180ms.

## The stack

- **Frontend:** React + TypeScript, Yjs for CRDTs, TipTap for the editor
- **Realtime:** WebSockets, Redis pub/sub for room fan-out
- **Storage:** Postgres via Prisma, snapshot + op log
- **Infra:** Dockerised, one command to spin up locally

## What I'd do differently

Start with the sync protocol, not the UI. I spent two weeks polishing the editor before I really understood how ops would flow — and had to rewrite half of it.

If you're building something similar, ping me. I collect war stories.
