# Localization Translation App

## Overview

The Localization Translation App is a web application designed to simplify the management of localization data for web applications. This application allows users to upload Excel files containing localization data and easily download translations in JSON format.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)


## Installation

To run the app locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/localization-translation-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd localization-translation-app
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the project's root directory and set your configuration:

    ```plaintext
    SESSION_SECRET='YourSessionSecret'
    FE_ORIGIN='http://localhost:3001'
    ```

    Replace `'YourSessionSecret'` with a secret key for session management.

5. Start the server from root of the project:

    ```bash
    npm start
    ```

6. Start the frontend from frontend dir:

    ```bash
    npm start
    ```

7. Open your web browser and access the app at http://localhost:3001.

## Usage

Follow these steps to use the Localization Translation App:

1. Choose an Excel file with localization data by clicking the "Choose a file" button.

2. If the selected file is a valid `.xlsx` file, it will be uploaded to the server.

3. Once the upload is complete, a link to download the translations in JSON format will appear.

4. Click the "Download" link to retrieve the JSON file.

## Configuration

You can configure the app by modifying the `.env` file with the following variables:

- `SESSION_SECRET`: A secret key for session management.
- `FE_ORIGIN`: The frontend origin URL (e.g., 'http://localhost:3001').

