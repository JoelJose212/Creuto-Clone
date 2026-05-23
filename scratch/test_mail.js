const fs = require("fs")
const path = require("path")
const nodemailer = require("nodemailer")

console.log("====================================================")
console.log("   Creuto Recruitment Mailer - Phase 2 Tester")
console.log("====================================================\n")

// 1. Manually parse .env and .env.local
const envPaths = [
  path.join(__dirname, "../.env"),
  path.join(__dirname, "../.env.local")
]

envPaths.forEach(envPath => {
  if (fs.existsSync(envPath)) {
    try {
      const envContent = fs.readFileSync(envPath, "utf8")
      envContent.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
        if (match) {
          const key = match[1]
          let value = match[2] || ""
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1)
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1)
          }
          process.env[key] = value
        }
      })
    } catch (e) {
      console.error(`Failed to read env from ${envPath}:`, e.message)
    }
  }
})

function generateApplicantHtml({
  fullName,
  email,
  mobile,
  position,
  experience,
  linkedinProfile,
  whyCreuto,
  resumeUrl,
  coverLetterUrl,
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f4f7ff;
          color: #334155;
          margin: 0;
          padding: 24px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.05), 0 4px 6px -4px rgba(37, 99, 235, 0.05);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          padding: 32px 24px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .header p {
          margin: 8px 0 0 0;
          font-size: 14px;
          color: #bfdbfe;
          font-weight: 600;
        }
        .content {
          padding: 32px 24px;
        }
        .section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #2563eb;
          margin-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 480px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .card {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
        }
        .card-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
        }
        .card-value {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          margin-top: 4px;
          word-break: break-all;
        }
        .card-value a {
          color: #2563eb;
          text-decoration: none;
        }
        .card-value a:hover {
          text-decoration: underline;
        }
        .pitch {
          background-color: #eff6ff;
          border-left: 4px solid #2563eb;
          border-radius: 0 8px 8px 0;
          padding: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: #1e3a8a;
          font-style: italic;
          margin-bottom: 24px;
        }
        .actions {
          text-align: center;
          margin-top: 32px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background-color: #2563eb;
          color: #ffffff !important;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .btn-primary:hover {
          background-color: #1d4ed8;
        }
        .btn-secondary {
          background-color: #f1f5f9;
          color: #475569 !important;
          border: 1px solid #cbd5e1;
        }
        .btn-secondary:hover {
          background-color: #e2e8f0;
        }
        .footer {
          background-color: #f8fafc;
          border-top: 1px solid #cbd5e1;
          padding: 16px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Applicant Alert</h1>
          <p>Creuto Recruitment Engine</p>
        </div>
        
        <div class="content">
          <div class="section-title">Candidate Coordinates</div>
          
          <div class="grid">
            <div class="card">
              <div class="card-label">Full Name</div>
              <div class="card-value">${fullName}</div>
            </div>
            <div class="card">
              <div class="card-label">Target Position</div>
              <div class="card-value" style="color: #2563eb; font-weight: 800;">${position}</div>
            </div>
            <div class="card">
              <div class="card-label">Email Address</div>
              <div class="card-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="card">
              <div class="card-label">Mobile Contact</div>
              <div class="card-value"><a href="tel:${mobile}">${mobile}</a></div>
            </div>
            <div class="card">
              <div class="card-label">Experience Level</div>
              <div class="card-value">${experience}</div>
            </div>
            <div class="card">
              <div class="card-label">LinkedIn Profile</div>
              <div class="card-value">
                ${linkedinProfile ? `<a href="${linkedinProfile}" target="_blank" rel="noopener noreferrer">View LinkedIn</a>` : "Not Provided"}
              </div>
            </div>
          </div>
          
          <div class="section-title">Candidate Pitch ("Why Creuto?")</div>
          <div class="pitch">
            "${whyCreuto.replace(/\n/g, "<br>")}"
          </div>
          
          <div class="actions">
            <a href="${resumeUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">📂 View Resume PDF</a>
            ${coverLetterUrl ? `<a href="${coverLetterUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">✉️ Cover Letter</a>` : ""}
          </div>
        </div>
        
        <div class="footer">
          This is an automated recruitment system alert. Manage all active candidates at <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/careers" style="color: #2563eb; text-decoration: none; font-weight: 600;">Creuto Control Deck</a>.
        </div>
      </div>
    </body>
    </html>
  `
}

async function run() {
  const hasEnvCredentials = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  let smtpConfig = {}

  if (hasEnvCredentials) {
    console.log("🔌 Detected active SMTP credentials in environmental variables.")
    smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }
  } else {
    console.log("ℹ️ No active SMTP credentials found in .env files.")
    console.log("⚙️ Automatically generating a mock Ethereal SMTP test account for validation...\n")
    try {
      const testAccount = await nodemailer.createTestAccount()
      console.log("✅ Mock Ethereal Account Generated successfully:")
      console.log(`   - User: ${testAccount.user}`)
      console.log(`   - Pass: [REDACTED]`)
      console.log(`   - Host: ${testAccount.smtp.host}`)
      console.log(`   - Port: ${testAccount.smtp.port}\n`)

      smtpConfig = {
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      }
    } catch (err) {
      console.error("❌ Failed to create mock SMTP test credentials:", err.message)
      process.exit(1)
    }
  }

  const transporter = nodemailer.createTransport(smtpConfig)
  const recipientEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "joel@creuto.com"
  const senderEmail = process.env.SMTP_FROM || `"Creuto Recruitment" <${smtpConfig.auth.user}>`

  console.log(`✉️ Constructing premium high-fidelity HTML email alert...`)
  console.log(`   - Sender:   ${senderEmail}`)
  console.log(`   - Recipient: ${recipientEmail}\n`)

  const testHtml = generateApplicantHtml({
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    mobile: "+1 (555) 987-6543",
    position: "Senior AI-ML Research Engineer",
    experience: "5+ Years (Senior Lead)",
    linkedinProfile: "https://linkedin.com/in/alex-rivera-ai-demo",
    whyCreuto: "Creuto's AI-first vision perfectly matches my architectural research goals. I want to build robust software systems that scale smartly using advanced transformer pipelines.",
    resumeUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/uploads/demo-resume.pdf`,
    coverLetterUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/uploads/demo-cover.pdf`,
  })

  console.log("🚀 Dispatching email transport packet...")
  try {
    const info = await transporter.sendMail({
      from: senderEmail,
      to: recipientEmail,
      subject: `[New Applicant] Alex Rivera - Senior AI-ML Research Engineer`,
      html: testHtml,
    })

    console.log("🎉 SUCCESS! Email packet delivered successfully.")
    console.log(`   - Message ID: ${info.messageId}`)

    // If using Ethereal, log message visualizer URL
    const previewUrl = nodemailer.getTestMessageUrl(info)
    if (previewUrl) {
      console.log("\n====================================================")
      console.log("👁️  VISUAL HTML EMAIL PREVIEW AVAILABLE")
      console.log("====================================================")
      console.log("Click the link below to inspect your premium design:")
      console.log(`👉 ${previewUrl}`)
      console.log("====================================================\n")
    }
  } catch (err) {
    console.error("❌ Transporter dispatch failure:", err.message)
  }
}

run()
