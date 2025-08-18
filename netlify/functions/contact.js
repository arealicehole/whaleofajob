import nodemailer from "nodemailer";

const required = (o, k) => (o[k] ?? "").toString().trim();

export async function handler(event) {
  // Handle CORS preflight
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

  // Only accept POST requests
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

    // Anti-spam: Check honeypot field
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

    // Anti-spam: Check minimum time on page (4 seconds)
    const startTime = Number(body._startTime || 0);
    const minTimeOnPage = 4000; // 4 seconds
    
    if (startTime > Date.now() - minTimeOnPage) {
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

    // Extract and validate required fields
    const name = required(body, "name");
    const email = required(body, "email");
    const message = required(body, "message");
    
    // Optional fields
    const phone = (body.phone || "").trim();
    const service = (body.service || "General Inquiry").trim();

    // Validate required fields
    if (!name || !email || !message) {
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

    // Validate email format
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

    // Create transporter with SendGrid SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || "smtp.sendgrid.net",
      port: Number(process.env.SMTP_PORT || 587),
      secure: false, // Use TLS
      auth: {
        user: process.env.SMTP_USER || "apikey",
        pass: process.env.SMTP_PASS
      }
    });

    // Prepare email content
    const emailHtml = `
      <h3>New Website Lead - Yzagere Enterprises</h3>
      <hr>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
      <hr>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} MST<br>
        Source: Website Contact Form
      </p>
    `;

    const emailText = `
New Website Lead - Yzagere Enterprises

Service Requested: ${service}
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

Message:
${message}

---
Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} MST
Source: Website Contact Form
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.MAIL_FROM || '"Yzagere Enterprises" <yzagere.enterprises@gmail.com>',
      to: process.env.MAIL_TO || "yzagere.enterprises@gmail.com",
      replyTo: email, // Allow direct replies to customer
      subject: `New Lead: ${service} — ${name}`,
      text: emailText,
      html: emailHtml
    });

    console.log(`Email sent successfully for ${name} (${service})`);

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        ok: true,
        message: "Thank you for contacting us! We'll get back to you within 24 hours."
      })
    };

  } catch (error) {
    console.error("Error in contact function:", error);
    
    // Don't expose internal errors to users
    return {
      statusCode: 500,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ 
        ok: false, 
        error: "Failed to send message. Please try again or call us directly at (623) 931-0846." 
      })
    };
  }
}