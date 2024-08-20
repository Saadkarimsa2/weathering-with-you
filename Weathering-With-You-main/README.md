# Wathering With You

# Weathering With You
 is a web app for long-distance partners to check the time remaining before they reunite - in heartbeats. Additionally, weather and time information that help create a sense of connection. and also Sents Cute Whatsapp Messages and Audio Through Ultra Msg Whatsapp Api and Amazon AWS

Uses [Open Weather Map](https://openweathermap.org/) for weather data, and [Geonames](https://www.geonames.org/) for timezone data.

https://drive.google.com/file/d/1c-E0vPo2GYU_mroBEBZG9Mpb6vZRrvjd/view?usp=sharing

https://drive.google.com/uc?export=download&id=1c-E0vPo2GYU_mroBEBZG9Mpb6vZRrvjd

C:\Users\mdsaa\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.12_qbz5n2kfra8p0\LocalCache\local-packages\Python312\site-packages

uc?export=download&id=

Amazon S3, Google Drive, etc

/* Google Fonts */
body, h1, h2, h3, h4, h5, h6, p, span, div {
    font-family: 'Roboto', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
}

/* Root Variables */
:root {
    --white: #eaeaea;
    --bright: #f0a500;
    --dark: #1a1a1a;
    --primary: #1e3d59;
    --secondary: #f5f0e1;
    --highlight: #ff6f61;
    --background-dark: rgba(0, 0, 0, 0.6);
}

/* General Styles */
body {
    background: #1a1a1a;
    color: var(--white);
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    font-size: 16px;
    line-height: 1.6;
}

/* Top Section Styles */
#top {
    position: relative;
    width: 100%;
    height: auto;
    padding: 40px;
    background-color: var(--background-dark); /* Dark overlay with opacity */
    color: var(--white);
    border-bottom: solid 1px var(--bright);
    z-index: 1;
}

#heartbeats-left, #page-title {
    color: var(--white);
    font-size: 24px;
    text-shadow: 2px 2px 4px var(--dark);
    z-index: 2;
    position: relative;
}

/* Button Styles */
button {
    background: var(--highlight);
    color: var(--white);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: background 0.3s ease;
}

button:hover {
    background: var(--bright);
}

/* Link Styles */
a {
    color: var(--highlight);
    text-decoration: none;
    transition: color 0.3s ease;
}

a:hover {
    color: var(--bright);
}

/* Adding some space between elements */
p {
    margin-bottom: 1em;
}

/* Background Video Styles */
#bg-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    opacity: 0.7;
}

/* Text Highlighting */
.highlight {
    background: var(--highlight);
    padding: 2px 6px;
    border-radius: 3px;
    color: var(--white);
}

/* Input and Form Styles */
input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    border: 1px solid var(--bright);
    border-radius: 5px;
    background: var(--secondary);
    color: var(--dark);
    font-size: 16px;
}

input:focus, textarea:focus {
    border-color: var(--highlight);
    outline: none;
}

/* Additional Animations */
@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

#heart {
    animation: heartbeat 1s infinite, fadeIn 2s ease-in-out;
}

/* Adjust font sizes for different headings */
h1 {
    font-size: 2.5em;
    color: var(--bright);
}

h2 {
    font-size: 2em;
    color: var(--highlight);
}

h3 {
    font-size: 1.75em;
    color: var(--white);
}

/* Adding some spacing to the container */
.container {
    padding: 20px;
}



<head>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
</head>



<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
