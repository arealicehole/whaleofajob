#!/usr/bin/env node

/**
 * Test script for contact form
 * This simulates what happens when the form is submitted
 */

// Test data that would come from the form
const testFormData = {
  name: "Test Customer",
  email: "test@example.com", 
  phone: "(623) 555-0123",
  service: "Sprinkler Repair",
  message: "My sprinkler system is leaking and needs repair. Can you come take a look?",
  _hp: "", // honeypot should be empty
  _startTime: Date.now() - 10000 // 10 seconds ago
};

console.log("🧪 Contact Form Test Script");
console.log("=" .repeat(50));
console.log("\n📧 Test Form Data:");
console.log(JSON.stringify(testFormData, null, 2));

// Validate required fields
console.log("\n✅ Validation Checks:");
const required = ['name', 'email', 'message'];
let hasErrors = false;

required.forEach(field => {
  if (!testFormData[field] || testFormData[field].trim() === '') {
    console.log(`  ❌ ${field}: MISSING`);
    hasErrors = true;
  } else {
    console.log(`  ✅ ${field}: Present`);
  }
});

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(testFormData.email)) {
  console.log("  ❌ Email format: INVALID");
  hasErrors = true;
} else {
  console.log("  ✅ Email format: Valid");
}

// Anti-spam checks
console.log("\n🛡️ Anti-Spam Checks:");
if (testFormData._hp !== "") {
  console.log("  ❌ Honeypot: FILLED (spam detected)");
  hasErrors = true;
} else {
  console.log("  ✅ Honeypot: Empty (good)");
}

const timeOnPage = Date.now() - testFormData._startTime;
if (timeOnPage < 4000) {
  console.log(`  ❌ Time on page: ${timeOnPage}ms (too fast, spam likely)`);
  hasErrors = true;
} else {
  console.log(`  ✅ Time on page: ${timeOnPage}ms (good)`);
}

// Show what email would be sent
if (!hasErrors) {
  console.log("\n📬 Email that would be sent:");
  console.log("-".repeat(50));
  console.log(`To: yzagere.enterprises@gmail.com`);
  console.log(`Subject: New Lead: ${testFormData.service} — ${testFormData.name}`);
  console.log(`Reply-To: ${testFormData.email}`);
  console.log("\nBody:");
  console.log(`Service Requested: ${testFormData.service}`);
  console.log(`Name: ${testFormData.name}`);
  console.log(`Email: ${testFormData.email}`);
  console.log(`Phone: ${testFormData.phone}`);
  console.log(`\nMessage:\n${testFormData.message}`);
  console.log("-".repeat(50));
}

// Summary
console.log("\n📊 Test Summary:");
if (hasErrors) {
  console.log("❌ Form would be REJECTED due to validation errors");
} else {
  console.log("✅ Form would be ACCEPTED and email sent");
}

console.log("\n💡 Next Steps:");
console.log("1. Set up SendGrid account and get API key");
console.log("2. Add environment variables to Netlify");
console.log("3. Deploy and test on live site");
console.log("4. Monitor Netlify Functions logs for any issues");

// Test the endpoint exists
console.log("\n🔍 Checking if Netlify function file exists...");
const fs = require('fs');
const path = require('path');
const functionPath = path.join(__dirname, '..', 'netlify', 'functions', 'contact.js');

if (fs.existsSync(functionPath)) {
  console.log("✅ Function file found at:", functionPath);
  
  // Check if it exports handler
  try {
    const functionContent = fs.readFileSync(functionPath, 'utf8');
    if (functionContent.includes('export async function handler')) {
      console.log("✅ Handler function exported correctly");
    } else {
      console.log("⚠️ Handler function might not be exported correctly");
    }
  } catch (err) {
    console.log("⚠️ Could not read function file:", err.message);
  }
} else {
  console.log("❌ Function file NOT found at:", functionPath);
}

console.log("\n✨ Test complete!");