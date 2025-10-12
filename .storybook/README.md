# Storybook Setup Guide

This directory contains the configuration files for **Storybook**, a UI development environment that allows developers to preview and test individual components in isolation.

---

## Getting Started

Follow the steps below to run Storybook locally:

### 1️⃣ Install Dependencies
If you haven’t already installed project dependencies, run:
```bash
npm install

### 2️⃣ Run Storybook in Development Mode

To start Storybook locally:
npm run storybook
This will start Storybook on your default browser, typically at 
- http://localhost:6006

### 3️⃣ Build Storybook for Deployment

To build a static version of Storybook:
npm run build-storybook

### Notes

Some components may still be loading placeholders — future contributors can enhance their stories with interactivity, actions, and controls.

Configurations are located in:
.storybook/main.ts
.storybook/preview.ts