# Discord Active Developer Badge Forever

![Node.js](https://img.shields.io/badge/node.js-339933?style=flat&logo=node.js&logoColor=white)
![License](https://img.shields.io/github/license/Sanquinary/discord-active-developer-badge-forever)

A simple Discord bot built with `discord.js` that automatically sends the `/ping` command monthly in order to never lose the Discord Active Developer Badge and keep it forever.

## Features

- **/ping Command**: Responds with "Pong!" when the `/ping` command is used.
- **Automated Monthly Ping**: Automatically sends the `/ping` command in a specified channel every month.
- **Easy Setup**: Interactive setup script for configuration.
- **Persistent Scheduling**: Maintains the schedule even after restarts. (no server/VPS required!)

## Getting Started

Follow the easy steps below to set up and run your own Discord Active Developer Badge bot.

### Prerequisites

- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (v16.6.0 or higher)
- [npm](https://www.npmjs.com/)
- A Discord account with permissions to create and manage bots

### Install, configure & run the bot

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Sanquinary/discord-active-developer-badge-forever.git
    cd discord-active-developer-badge-forever
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Start (or configure) the bot:**

    ```sh
    node index.js
    ```

4. (optional) **Install and start bot with PM2 process manager**

    ```sh
    npm install pm2 -g
    pm2 start index.js --name "discord-bot"
    pm2 save
    pm2 startup
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
