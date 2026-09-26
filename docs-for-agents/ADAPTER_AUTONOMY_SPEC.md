# KeyMatrix OS Adapter Autonomy Specification

This document defines the online/offline operational specification for KeyMatrix OS adapters.

---

## Adapter Modes

1. `ONLINE_LIVE`: Real-time network request with live API endpoints.
2. `OFFLINE_CACHE`: Serving cached data from IndexedDB or local storage when network is offline.
3. `OFFLINE_CALC`: Real-time offline mathematical calculation (e.g., spherical trigonometry) when no network is available.

---

## Autonomy Matrix

| Adapter ID | Primary Function | Online Implementation | Offline Fallback Mechanism |
| :--- | :--- | :--- | :--- |
| **`qibla`** | Qibla Direction Angle | AlAdhan Geo API | Spherical Trigonometry Formula (`calculateQiblaOffline`) |
| **`prayer`** | Daily Prayer Timings | AlAdhan Prayer API | MWL / Umm Al-Qura Astronomical Zenith (`calculatePrayerOffline`) |
| **`quran`** | Quranic Text & Audio | Tanzil Quran Cloud API | IndexedDB Offline Text & Phonetics Cache |
| **`nur`** | NUR Contribution Ledger | KeyMatrix Node RPC | Local Sandbox Double-Entry Ledger Engine (`doubleEntryLedger.ts`) |
| **`webSearch`** | Web Knowledge Signals | Google AI / Search API | Local Archivarius Knowledge Mesh Index Query |

---

## Automatic Failover & Retry Policy

- **Attempts**: 3 initial online attempts.
- **Backoff Strategy**: Exponential backoff (`100ms * 2^attempt`).
- **Detection**: Instant auto-detection via `navigator.onLine` and HTTP timeout guards.
