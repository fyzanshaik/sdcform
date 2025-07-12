// Simple test to verify schema changes
// Run with: node test-schema.js

const { z } = require("zod");

// Import the schema (you'll need to adjust the path based on your setup)
const {
  applicationSchema,
  applicationFormSchema,
} = require("./schemas/schema.ts");

// Test cases
const testCases = [
  {
    name: "Valid application with GitHub",
    data: {
      name: "John Doe",
      rollNumber: "2023001",
      branch: "CSE (CSE)",
      yearOfStudy: 2,
      preferredPosition: "Club Member",
      githubProfile: "https://github.com/johndoe",
      linkedinProfile: "https://linkedin.com/in/johndoe",
      notes: "I love coding!",
      projects: ["https://project1.com", "https://project2.com"],
    },
    shouldPass: true,
  },
  {
    name: "Valid application without GitHub",
    data: {
      name: "Jane Smith",
      rollNumber: "2023002",
      branch: "Information Technology (IT)",
      yearOfStudy: 3,
      preferredPosition: "Secretary",
      linkedinProfile: "https://linkedin.com/in/janesmith",
      notes: "Passionate about technology",
      projects: [],
    },
    shouldPass: true,
  },
  {
    name: "Valid application with empty GitHub",
    data: {
      name: "Bob Wilson",
      rollNumber: "2023003",
      branch: "Electronics and Communication Engineering (ECE)",
      yearOfStudy: 1,
      preferredPosition: "Vice President",
      githubProfile: "",
      projects: ["https://cool-project.vercel.app"],
    },
    shouldPass: true,
  },
  {
    name: "Invalid application - missing required fields",
    data: {
      name: "",
      rollNumber: "2023004",
      branch: "CSE (CSE)",
      yearOfStudy: 2,
      preferredPosition: "Club Member",
    },
    shouldPass: false,
  },
];

console.log("Testing schema changes...\n");

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);

  try {
    const result = applicationFormSchema.parse(testCase.data);
    console.log("✅ PASSED");
    console.log("Transformed data:", result);
  } catch (error) {
    if (testCase.shouldPass) {
      console.log("❌ FAILED - Should have passed");
      console.log("Error:", error.message);
    } else {
      console.log("✅ PASSED - Correctly failed validation");
    }
  }
  console.log("---\n");
});

console.log("Schema test completed!");
