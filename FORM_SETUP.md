# Contact Form Setup Guide

## Overview
The contact form uses Netlify Functions (serverless) with Nodemailer to send emails via SendGrid SMTP.

## Setup Steps

### 1. SendGrid Account Setup (Recommended)

1. **Create SendGrid Account**
   - Go to https://sendgrid.com/
   - Sign up for a free account (100 emails/day free)
   
2. **Create API Key**
   - Navigate to Settings > API Keys
   - Click "Create API Key"
   - Name it "Yzagere Website"
   - Select "Full Access" or "Restricted Access" with Mail Send permissions
   - Copy the API key (starts with `SG.`)
   - **SAVE THIS KEY - you won't see it again!**

3. **Verify Sender Email** (Important!)
   - Go to Settings > Sender Authentication
   - Add and verify `yzagere.enterprises@gmail.com`
   - Check email and click verification link

### 2. Netlify Environment Variables

In Netlify Dashboard:
1. Go to Site Settings > Environment Variables
2. Add these variables:

```bash
SMTP_HOST = smtp.sendgrid.net
SMTP_PORT = 587
SMTP_USER = apikey
SMTP_PASS = [Your SendGrid API Key starting with SG.]
MAIL_FROM = "Yzagere Enterprises" <noreply@yzagere.com>
MAIL_TO = yzagere.enterprises@gmail.com
```

### 3. Alternative: Gmail SMTP Setup

If you prefer Gmail instead of SendGrid:

1. **Enable 2-Factor Authentication** on Gmail account
2. **Create App Password**
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
   
3. **Netlify Variables for Gmail**:
```bash
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = yzagere.enterprises@gmail.com
SMTP_PASS = [Your 16-character app password]
MAIL_FROM = "Yzagere Enterprises" <yzagere.enterprises@gmail.com>
MAIL_TO = yzagere.enterprises@gmail.com
```

## Local Testing

### Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Create .env.local file
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

### Run locally with Netlify Dev
```bash
netlify dev
```

This will:
- Start Vite dev server on port 5173
- Start Netlify Functions on port 8888
- Proxy requests to `/.netlify/functions/*`

### Test the form
1. Open http://localhost:8888 (not 5173!)
2. Go to Contact page
3. Fill out and submit form
4. Check email inbox

## Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify all environment variables are set in Netlify
- Check Netlify Functions logs: Netlify Dashboard > Functions tab

### Emails not arriving?
- Check spam folder
- Verify sender email is authenticated (SendGrid)
- Check Netlify function logs for errors
- Try the test endpoint directly:

```bash
curl -X POST http://localhost:8888/.netlify/functions/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message",
    "_startTime": 0
  }'
```

### Common Errors

**"Missing required fields"**
- Ensure name, email, and message are provided
- Check that fields aren't just whitespace

**"Failed to send message"**
- Check SMTP credentials
- Verify SendGrid API key is valid
- Check SendGrid account isn't suspended

**Spam detected**
- Form submitted too quickly (< 4 seconds)
- Honeypot field was filled (bot detection)

## Production Checklist

- [ ] SendGrid account created and API key generated
- [ ] Sender email verified in SendGrid
- [ ] Environment variables set in Netlify
- [ ] Form tested locally with `netlify dev`
- [ ] Form tested on Netlify deploy preview
- [ ] Email arrives in inbox (not spam)
- [ ] Success/error messages display correctly
- [ ] Form validates required fields
- [ ] Anti-spam measures working (honeypot, time check)

## Email Features

The form includes:
- **Anti-spam protection**: Honeypot field and minimum time on page
- **Validation**: Client and server-side validation
- **Reply-to header**: Replies go directly to customer
- **Professional formatting**: HTML and plain text versions
- **Timezone**: Shows submission time in Arizona timezone
- **Service categorization**: Email subject includes selected service

## Support

For issues with:
- **SendGrid**: https://sendgrid.com/docs/
- **Netlify Functions**: https://docs.netlify.com/functions/overview/
- **Form code**: Check `/netlify/functions/contact.js` and `/src/components/ContactForm.jsx`