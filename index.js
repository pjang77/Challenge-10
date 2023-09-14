import inquirer from "inquirer";
import fs from "fs";

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Please enter up to three characters:",
      validate: (input) => input.length <= 3,
    },
    {
      type: "input",
      name: "textColor",
      message: "Please enter text color (keyword or hex number):",
    },
    {
      type: "list",
      name: "shape",
      message: "Please choose a shape:",
      choices: ["circle", "triangle", "square"],
    },
    {
      type: "input",
      name: "shapeColor",
      message: "Please enter shape color (keyword or hex number):",
    },
  ]);
  return userInput;
}

function generateSVG(text, textColor, shape, shapeColor) {
  let shapeSVG = "";

  switch (shape) {
    case "circle":
      shapeSVG = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
      break;
    case "triangle":
      shapeSVG = `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`;
      break;
    case "square":
      shapeSVG = `<rect width="100" height="100" x="100" y="50" fill="${shapeColor}" />`;
      break;
    default:
      break;
  }

  return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="${shapeColor}" />
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" fill="${textColor}">${text}</text>
      </svg>
    `;
}

async function createLogo(userInput) {
  const svgContent = generateSVG(
    userInput.text,
    userInput.textColor,
    userInput.shape,
    userInput.shapeColor
  );

  // Write the SVG content to a file named "logo.svg"
  fs.writeFileSync("logo.svg", svgContent);

  console.log("Generated logo in SVG");
}

(async () => {
  try {
    const userInput = await getUserInput();
    await createLogo(userInput);
  } catch (error) {
    console.error("Error", error);
  }
})();
