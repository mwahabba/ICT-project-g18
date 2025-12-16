# TEAM 18 Residential Regulation Navigator

The Residential Regulation Navigator is a web-based system designed to help users understand and work with UK residential building regulations in a clear, practical and accessible way.

Rather than relying on static documents, the platform combines a structured frontend interface with a backend service that supports regulation data management and update monitoring.

This project was developed as part of an ICT Law & Technology group coursework and follows an Agile/Scrum-based development approach.

---

## Key Features

### Regulation Navigator
- Browse UK Building Regulations by Part (B, F, L, O)
- Simplified explanations of clauses and requirements
- Structured navigation to support compliance decisions

### Dispute Prevention
- Focus on duty holder roles and responsibilities
- Emphasis on handover obligations and accountability
- Designed to reduce misunderstandings during project delivery

### Projects Area
- Manage project-related regulatory considerations
- Supports future checklist tracking and exports

### Useful Links
- Horizontally scrollable links to official GOV.UK and legislation sources
- Enables users to cross-reference authoritative, up-to-date guidance
- Prevents reliance on outdated static documents

---

## Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript

### Backend
- Node.js
- Express-style server architecture
- File-based JSON data storage
- Automated regulation update monitoring

### Tooling
- VS Code
- Git & GitHub
- JIRA (Scrum boards, sprints, backlog management)

---

## Project Structure

```text
ICT-PROJECT-G18/
│
├── backend/
│   ├── data/
│   │   ├── regulations.json        # Local regulation data
│   │   ├── remote-regulations.json # Simulated external regulation source
│   │   └── status.json             # Update status tracking
│   │
│   ├── server.js                   # Backend server
│   ├── updater.js                  # Regulation update logic
│   └── watch-updates.js            # File watcher for regulation changes
│
├── frontend/
│   ├── images/
│   ├── index.html                  # Dashboard / authentication view
│   ├── part-b.html                 # Regulation Part B
│   ├── part-f.html                 # Regulation Part F
│   ├── part-l.html                 # Regulation Part L
│   ├── part-o.html                 # Regulation Part O
│   ├── style.css                   # Global styles
│   └── script.js                   # Frontend interactivity
│
├── package.json
├── package-lock.json
└── README.md
