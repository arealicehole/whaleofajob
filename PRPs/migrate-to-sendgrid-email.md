# PRP: Migrate Contact Form to SendGrid API

## Goal
Replace the current Nodemailer SMTP implementation with SendGrid's API-based email sending for better reliability, deliverability, and simpler configuration.

## Why
- **Better deliverability**: SendGrid's API has superior inbox placement vs SMTP
- **Simpler setup**: No SMTP configuration needed, just API key
- **Better tracking**: SendGrid provides email analytics and delivery status
- **Production ready**: Domain authentication for professional sending
- **Current system uses SMTP**: More complex and prone to configuration issues

## What (User-visible behavior)
- Contact form continues to work exactly the same from user perspective
- Emails arrive more reliably in inbox (not spam)
- Form validation and anti-spam measures remain in place
- Success/error messages unchanged

## Context

### Current Implementation
- Uses Nodemailer with SMTP (SendGrid or Gmail)
- Located in `/netlify/functions/contact.js`
- Environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO

### New Implementation
- Uses @sendgrid/mail SDK directly
- Simpler environment variables: SENDGRID_API_KEY, TO_EMAIL, FROM_EMAIL
- Same anti-spam measures (honeypot, time check)
- Enhanced email formatting

### SendGrid Limits (2025)
- **Free Trial**: 60 days, 100 emails/day
- After trial: Must upgrade to paid plan
- Alternative: Consider other providers with free tiers if needed long-term

### Files to Modify
```
netlify/functions/contact.js    # Replace Nodemailer with SendGrid SDK
package.json                     # Add @sendgrid/mail, remove nodemailer
.env.example                     # Update environment variables
FORM_SETUP.md                   # Update documentation
```

## Implementation Blueprint

### Step 1: Install SendGrid SDK
```bash
npm uninstall nodemailer
npm install @sendgrid/mail
```

### Step 2: Update Netlify Function
```javascript
// netlify/functions/contact.js
import sgMail from "@sendgrid/mail";

export async function handler(event) {
  // CORS handling
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""
    };
  }

  // Only accept POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ ok: false, error: "Method Not Allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    // Anti-spam: honeypot check
    if (body._hp) {
      console.log("Spam detected: honeypot field filled");
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ ok: true })
      };
    }

    // Anti-spam: time check (minimum 4 seconds on page)
    const startTime = Number(body._startTime || 0);
    if (startTime > Date.now() - 4000) {
      console.log("Spam detected: form submitted too quickly");
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ ok: true })
      };
    }

    // Extract and validate fields
    const { name, email, message, phone, service } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ 
          ok: false, 
          error: "Missing required fields (name, email, message)" 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ 
          ok: false, 
          error: "Invalid email format" 
        })
      };
    }

    // Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Prepare email
    const msg = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL, // Must be verified in SendGrid
      replyTo: email, // Customer's email for easy reply
      subject: `New Lead: ${service || 'General'} — ${name}`,
      text: `New Website Lead - Yzagere Enterprises

Service Requested: ${service || 'Not specified'}
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} MST
Source: Website Contact Form`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF2D7D;">New Website Lead - Yzagere Enterprises</h2>
          <hr style="border: 1px solid #16E0BD;">
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${service || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            ` : ''}
          </table>
          
          <hr style="border: 1px solid #16E0BD;">
          
          <h3 style="color: #FF2D7D;">Message:</h3>
          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
${message}
          </p>
          
          <hr style="border: 1px solid #16E0BD;">
          
          <p style="font-size: 12px; color: #666;">
            Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} MST<br>
            Source: Website Contact Form
          </p>
        </div>
      `
    };

    // Send email
    await sgMail.send(msg);

    console.log(`Email sent successfully for ${name} (${service || 'General'})`);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        ok: true,
        message: "Thank you! We'll get back to you within 24 hours."
      })
    };

  } catch (error) {
    console.error("SendGrid error:", error);
    
    // Don't expose internal errors to users
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        ok: false, 
        error: "Failed to send message. Please try again or call (623) 931-0846." 
      })
    };
  }
}
```

### Step 3: Update Environment Variables
```bash
# .env.example
# SendGrid API Configuration
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
TO_EMAIL=yzagere.enterprises@gmail.com
FROM_EMAIL=noreply@yzagere.com

# Legacy SMTP variables (remove these)
# SMTP_HOST=smtp.sendgrid.net
# SMTP_PORT=587
# SMTP_USER=apikey
# SMTP_PASS=your_sendgrid_api_key_here
# MAIL_FROM="Yzagere Enterprises" <noreply@yzagere.com>
# MAIL_TO=yzagere.enterprises@gmail.com
```

### Step 4: Update Documentation
Update FORM_SETUP.md with SendGrid-specific instructions:
- Creating SendGrid account and free trial
- Generating API key with Mail Send permission
- Single Sender Verification vs Domain Authentication
- Setting environment variables in Netlify
- Testing with netlify dev

## Validation Loop

### Level 1: Local Testing
```bash
# Install dependencies
npm install

# Test function locally (create .env.local first)
netlify dev

# Test endpoint directly
curl -X POST http://localhost:8888/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing SendGrid integration",
    "service": "Sprinkler Repair",
    "_hp": "",
    "_startTime": 0
  }'
```

### Level 2: Build Verification
```bash
npm run build
# Should complete without errors
```

### Level 3: Deploy Preview Testing
```bash
git add -A
git commit -m "feat: migrate to SendGrid API for email"
git push

# Test on Netlify deploy preview
# Submit test form and verify email arrives
```

### Level 4: Production Checklist
- [ ] SendGrid account created with free trial active
- [ ] API key generated with Mail Send permission
- [ ] Sender email verified (Single Sender or Domain)
- [ ] Environment variables set in Netlify dashboard
- [ ] Test email sent and received successfully
- [ ] No SMTP errors in Netlify function logs
- [ ] Form validation working (empty fields rejected)
- [ ] Anti-spam measures working (honeypot, time check)

## Task Checklist
- [ ] Uninstall nodemailer package
- [ ] Install @sendgrid/mail package
- [ ] Replace contact.js function with SendGrid implementation
- [ ] Update .env.example with new variables
- [ ] Update FORM_SETUP.md documentation
- [ ] Test locally with netlify dev
- [ ] Create SendGrid account and API key
- [ ] Verify sender email in SendGrid
- [ ] Add environment variables to Netlify
- [ ] Deploy and test on production
- [ ] Monitor function logs for any issues
- [ ] Consider domain authentication for better deliverability

## Gotchas
- SendGrid free trial is only 60 days, then requires paid plan
- FROM_EMAIL must be verified in SendGrid before sending
- API key must have Mail Send permission
- Keep API key secret, never commit to repo
- Domain authentication improves deliverability significantly
- Monitor 100 emails/day limit during free trial
- Function invocations count toward Netlify's 125k/month free limit

## Success Criteria
- Contact form sends emails via SendGrid API
- Emails arrive in inbox (not spam)
- All form features work (validation, anti-spam, success messages)
- Documentation updated for SendGrid setup
- Environment variables migrated to new format
- No breaking changes to user experience