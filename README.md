# Voice-to-Text Summarizer Web App

This project is a web application for a voice-to-text summarizer that converts audio to text using Whisper and summarizes the text using Gemini LLM. The backend is built with Django and provides a REST API, while the frontend is built using Next.js.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Overview

The Voice-to-Text Summarizer Web App allows users to upload audio files, which are then processed to convert speech to text and summarized. The application provides an easy-to-use interface for interacting with the backend services.

## Features

- **Audio to Text Conversion**: Utilizes Whisper to accurately transcribe audio files into text.
- **Text Summarization**: Leverages Gemini LLM to generate concise and informative summaries of the transcribed text.
- **User-Friendly Interface**: Built with Next.js to provide a responsive and intuitive user experience.
- **REST API Integration**: Connects with a Django backend to handle audio processing and text summarization.

## Technologies Used

- **Next.js**: Frontend framework for building the web application.
- **Whisper**: For converting audio to text.
- **Gemini LLM**: For summarizing the transcribed text.
- **Django**: As the backend framework.
- **Django REST framework**: For building the REST API.

## Installation

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js
- npm or yarn

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/voice-to-text-nextjs.git
   cd voice-to-text-nextjs
