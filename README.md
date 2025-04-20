<p align="center">
  <img src="https://github.com/user-attachments/assets/3f1cee9a-ee9d-47e0-9d05-577dd0c7a63e" width="150" alt="TrueTrace Logo" />
</p>

<h2 align="center">Decentralized Field Compliance, Secured by Polkadot.</h2>

<p align="center">
  <a href="https://www.easya.io/">
    <img src="https://github.com/user-attachments/assets/09cfc307-f04f-4225-8c3b-bc96c47583a6" alt="EasyA" height="21" />
  </a>
</p>

---

## What is TrueTrace?

**TrueTrace** is a compliance automation tool for the site infrastructure sector (starting with Telecoms), designed to streamline the back-office chaos behind fieldwork and eliminate reworking costs caused by mismanagement and human error.

Field engineers submit compliance reports on-site via a mobile app. The data is hashed and stored immutably on-chain using a smart contract deployed on Polkadot Asset Hub.

Compliance officers and commercial teams can:
- ✅ Verify reports instantly  
- 📊 View a timeline of submissions and productivity analytics  
- 🔒 Prevent backdating or tampering  

---

## Features

- **Mobile Submission:** Field engineers upload geo-tagged, timestamped inspection data directly from site.  
- **Smart Contract Logging:** Each report is hashed and written immutably using ink! on Polkadot Asset Hub.  
- **Immutable Compliance Trail:** Say goodbye to lost emails or fraudulent backdated submissions.  
- **Admin Dashboard:** Compliance teams can verify, filter, and download reports in real time.  
- **Frontend:** Built using Lovable.dev (Typescript) with Polkadot.js integration.


---

## Images
### Mobile App for Engineers
![Screenshot 2025-04-20 at 10 35 22](https://github.com/user-attachments/assets/2246def3-fa19-4b28-bf13-e8831892ef2d)
![Screenshot 2025-04-20 at 11 03 44](https://github.com/user-attachments/assets/fdccc52a-d6e4-4d06-ab21-1340664ba34b)

### Desktop for Admins
![Screenshot 2025-04-20 at 10 57 24](https://github.com/user-attachments/assets/04abe933-5793-42df-ad07-b987df0cfb52)
![Screenshot 2025-04-20 at 11 02 00](https://github.com/user-attachments/assets/31ef2a92-c576-4860-9aef-ddcad34ada25)
![Screenshot 2025-04-20 at 11 04 14](https://github.com/user-attachments/assets/69e87dff-6a63-43bb-9d98-f1a1ac8ecd53)




---

## Stack

- **Frontend:** Typescript (Lovable), customized with JavaScript blocks  
- **Smart Contract:** Written in ink! on Polkadot Asset Hub  
- **Blockchain Interaction:** @polkadot/api for contract communication  

### Submission Flow:
1. User submits a report  
2. System validates image  
3. A hash is generated  
4. Hash + metadata are sent to the smart contract  
5. Admins verify immutable, trustworthy logs and view analytics via dashboard  


---

## Target Market

- Subcontractors in telecom & infrastructure (e.g. Avonline, MGroup)  
- Organisations managing remote or field assets:
  - Technology data centres  
  - Electricity distribution  
  - Fiber rollout  
  - Construction  
  - Offshore energy & renewables  
  - Utilities  
  - Supply chain  
  - Space exploration  

---

## Market Opportunity

- **TAM:** $3.93 trillion (Global telecom industry)  
- **SAM:** $273.5 billion (Back Office Outsourcing)  
- **SOM:** $72.46 billion (Inspection & Maintenance)  

**Initial Focus:** UK-based contractors, expanding globally across compliance-heavy industries.

---

## Why It Stands Out

- 🚫 Not just another DeFi clone or generic AI project  
- 🛠️ Built from real-world experience in field ops  
- 🧩 Solves mission-critical workflow problems that are often overlooked  
- 🛡️ Uses blockchain for what it’s best at — trust, transparency, and immutability  

> “This isn’t just a cool idea — it’s a real solution for an industry that rarely gets attention.”

---

## Demo

- 📺 [Demo (Video)](https://youtu.be/your-demo-link)  
- 📄 [PDF Report Sample](/src/components/truetrace.pdf)

---

## System Components

### 1. 💡 Smart Contract (ink!)
- Function: `submitReport(string hash, string metadata)`  
- Function: `getReport(uint id)`  
- Struct: `Report { hash, metadata, timestamp }`  
- Records are written immutably and queryable by admins.

### 2. 🧠 AI Image Validation
- Mock ML logic flags invalid images (e.g. blurry, wrong object)  
- Only compliant images are hashed and submitted  
- Future: connect to real models or integrate classification tools

### 3. 🔠 Frontend
- Built with Lovable.dev for rapid prototyping. Built on tsx and css files  
- Auto-fill location + time  
- Button triggers `submitReport` via @polkadot/api  
- Submissions viewable, with PDF export option

---

## Roadmap

- [x] Build basic ink! contract for submission  
- [x] Create frontend with auto geo/time and Polkadot.js integration  
- [x] Implement dummy image validation logic
- [x] Add admin dashboard with filters + analytics  
- [x] Generate downloadable PDF reports  
- [ ] Add QR login for field engineers  
- [ ] Add image-to-IPFS + hash-to-chain feature
- [ ] Improve AI/ML validation (blur detection, cable presence, etc.)  
- [ ] Expand to other compliance-heavy sectors (energy, utilities)  
- [ ] Deploy full version with parachain or rollup support
- [ ] MVP launch with a UK contractor

---

## Attribution & Research

- [Using Blockchain for Compliance in Construction](https://www.sciencedirect.com/science/article/pii/S0926580521000631)  
- [ink! Smart Contracts on Polkadot](https://use.ink/)  
- [Lovable.dev](https://www.lovable.dev)

---

## Contributing & License

Want to contribute to making compliance better for infrastructure teams?  
PRs welcome. Licensed under the [MIT License](./LICENSE)
