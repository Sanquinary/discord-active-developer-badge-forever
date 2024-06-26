# Discord Active Developer Badge Forever

![Node.js](https://img.shields.io/badge/node.js-339933?style=flat&logo=node.js&logoColor=white)
![License](https://img.shields.io/github/license/Sanquinary/discord-active-developer-badge-forever)

A simple Discord bot built with `discord.js` that automatically sends the `/ping` command monthly to keep the Discord Active Developer Badge forever.

## Features

- **/ping Command**: Responds with "Pong!" when the `/ping` command is used.
- **Automated Monthly Ping**: Sends the `/ping` command in a specified channel every month.
- **Easy Setup**: Interactive setup script for configuration.
- **Persistent Scheduling**: Maintains the monthly schedule even after stops or restarts.

## Getting Started

Follow these steps to set up and run your own Discord Active Developer Badge bot in less than 5 minutes.

### Prerequisites

- A [Discord Developer Application](https://discord.com/developers/applications)
    - Click `New Application` found in the top-right
- A Bot for the [Discord Developer Application](https://discord.com/developers/applications)
    - Click the `Bot` tab inside your Application
- A Discord server and account with permissions to create and manage bots
    - Your Discord Server needs to be a [Community Server](https://support.discord.com/hc/en-us/articles/360047132851-Enabling-Your-Community-Server)

For local hosting (optional):
- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v16.6.0 or higher)
- [npm](https://www.npmjs.com/)

### Remote Hosting on Replit (Option 1)

1. **Go to Replit**
   - Import this repo by clicking this button: [![Run on Repl.it](https://replit.com/badge/github/Sanquinary/discord-active-developer-badge-forever)](https://replit.com/new/github/Sanquinary/discord-active-developer-badge-forever)
   - You will need a Replit account. Sign up with Google/GitHub for quick registration.
2. **Click the Run button**
3. **Answer the 4 prompts**
   - Answer the 4 prompts in the console in the bottom-right.
   - Don't know the answers? No worries! Check the [Interactive Configuration](#interactive-configuration) section.
4. **You're done!**
   - Test your bot in your server by sending `/ping` or wait for the automatic monthly schedule.
   - The schedule to maintain active status is logged in the `schedule.json` file.
5. **[Retrieving the Badge](#retrieving-the-badge)**

### Local Hosting (Option 2)

<details>
  <summary>Local Hosting Steps</summary>

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Sanquinary/discord-active-developer-badge-forever.git
    cd discord-active-developer-badge-forever
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the bot:**
    ```sh
    node index.js
    ```

4. **(Optional) Start the bot with PM2:**
    ```sh
    npm install pm2 -g
    pm2 start index.js --name "discord-bot"
    pm2 save
    pm2 startup
    ```

</details>

### Interactive Configuration

When you run the project for the first time, you will be prompted to provide the following:

1. **Bot Secret Token**:
   - Go to: [Applications](https://discord.com/developers/applications) -> YOUR_APPLICATION -> Bot Tab -> Reset Token -> `Copy this token`

2. **Bot Client ID**:
   - Go to: [Applications](https://discord.com/developers/applications) -> YOUR_APPLICATION -> Application ID -> `Copy this ID`

3. **Discord Server (Guild) ID**:
   - Open Discord -> Navigate to your server -> Right-click the server name -> `Copy Server ID`
   - If `Copy Server ID` doesn't show, enable Developer Mode in Settings -> Appearance -> Developer Mode

4. **Discord Channel ID**:
   - Open Discord -> Navigate to your server -> Right-click the desired text channel -> `Copy Channel ID`

### Retrieving the Badge

To retrieve the badge:
- Manually run the `/ping` command in your Discord Server after starting your bot in Replit with `Run` or with `node index.js` locally.
- Ensure you meet [Discord's requirements](https://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge) for the Active Developer Badge

Wait at least 24 hours and check this page: [Active Developer Badge](https://discord.com/developers/active-developer) to claim your badge.

![Claim your badge](https://i.imgur.com/DM4Hvie.png)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
