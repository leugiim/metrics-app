# Metric-APP

---

## Project Overview

**Metrics-APP** is a frontend application built with Vite and TypeScript. Additionally, I have used tools like Tailwind and Flowbite-Svelte to achieve greater customization and efficiency in the design of the user interface.

In the application, you can find different sections that will allow you to view the metrics of your companies in a clear and organized way. From the main page, you can access a dashboard where you can view your companies and create new ones. You will also find a section where you can filter and view the data of the different metrics, having a graph of all the metrics in which you can filter by day and hour, and a table with all the metrics, with their date and description.

The Github url for the API is: [https://github.com/leugiim/metrics-api](https://github.com/leugiim/metrics-api)

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Project Configuration

In this case, because this is a project for an interview, I will remove from **.gitignore** the file **.env** but the right way is create it in local project.

It is necessary to create a file called **.env** that contains the necessary configuration for the correct operation of the project. Below are the environment variables used:

- **VITE_API_BASE_URL**

## Running the Project in Development Mode

Once the dependencies are installed, you can run the project in development mode with the following command:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
