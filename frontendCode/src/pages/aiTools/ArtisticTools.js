import React from "react";
import runway from "../../images/runwayml.png";
import deepdream from "../../images/deepdreamgenerator.png";
import artBreeder from "../../images/artbreeder.png";
import deepAi from "../../images/deepai.png";
import deepArt from "../../images/deeparteffect.png";
import godot from "../../images/godot.png";
import pygame from "../../images/pygame.png";
import Navbar from "../../components/Navbar";
import "./artistic.css";
const ArtisticTools = () => {
  const tools = [
    {
      name: "RunwayML",
      description:
        "Offers a range of AI-powered artistic tools, including style transfer, image generation, and more.",
      url: "https://runwayml.com/",
      Image: `${runway}`,
    },
    {
      name: "Deep Dream Generator",
      description:
        "Create unique, dreamlike images using deep neural networks.",
      url: "https://deepdreamgenerator.com/",
      Image: `${deepdream}`,
    },
    {
      name: "ArtBreeder",
      description:
        "Combine and explore artistic traits to create new and interesting images.",
      url: "https://www.artbreeder.com/",
      Image: `${artBreeder}`,
    },

    {
      name: "DeepAI",
      description:
        "Offers a collection of AI-powered tools, including image colorization, style transfer, and more.",
      Image: `${deepAi}`,
    },

    {
      name: "Deeparteffects",
      description: "Apply artistic filters and styles to your photos.",
      url: "https://www.deeparteffects.com/",
      Image: `${deepArt}`,
    },
    {
      name: "Godot Engine AI",
      description:
        "Godot Engine is an open-source game engine that provides built-in AI functionalities such as pathfinding, behavior trees, and navigation meshes, allowing developers to create AI-driven game characters and systems.",
      url: "https://godotengine.org/",
      Image: `${godot}`,
    },
    {
      name: "Godot Engine AI",
      description:
        "Godot Engine is an open-source game engine that provides built-in AI functionalities such as pathfinding, behavior trees, and navigation meshes, allowing developers to create AI-driven game characters and systems.",
      url: "https://godotengine.org/",
      Image: `${godot}`,
    },
    {
      name: "Pygame AI",
      description:
        "Pygame is a Python library that provides a set of tools for game development. While not specifically an AI-focused tool, Pygame can be used to implement and experiment with various AI techniques in game development.",
      url: "https://www.pygame.org/",
      Image: `${pygame}`,
    },
  ];
  return (
    <>
      <Navbar />
      <ul className="circles">
        <h1 className="toolsHeading">AI Artistic Tools</h1>
        <p className="text-center para">
          Unlock your creativity with free AI tools for digital arts and game
          development, offering limitless possibilities and empowering creators.
        </p>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className="postercard-container">
        {tools.map((tool, index) => (
          <div className="postercard" key={index}>
            <img src={tool.Image} alt={tool.name} />
            <h2>{tool.name}</h2>
            <p className="toolDesc">{tool.description}</p>
            <a href={tool.url} target="_blank" rel="noopener noreferrer">
              Go to tool
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArtisticTools;
