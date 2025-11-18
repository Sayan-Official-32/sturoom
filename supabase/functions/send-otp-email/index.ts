import { Webhook } from 'https://esm.sh/standardwebhooks@1.0.0'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)
const hookSecret = Deno.env.get('SEND_EMAIL_HOOK_SECRET') as string

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('not allowed', { status: 400 })
  }

  const payload = await req.text()
  const headers = Object.fromEntries(req.headers)
  const wh = new Webhook(hookSecret)
  
  try {
    const {
      user,
      email_data: { token, token_hash, redirect_to, email_action_type },
    } = wh.verify(payload, headers) as {
      user: {
        email: string
      }
      email_data: {
        token: string
        token_hash: string
        redirect_to: string
        email_action_type: string
      }
    }

    const { error } = await resend.emails.send({
      from: 'Room Finder <onboarding@resend.dev>',
      to: [user.email],
      subject: 'Your Login OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
              }
              .otp-code {
                display: inline-block;
                padding: 16px 32px;
                background-color: #f0f0f0;
                border-radius: 6px;
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #333;
                margin: 20px 0;
              }
              .message {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
              }
              .footer {
                color: #999;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Your Verification Code</h1>
              <p class="message">
                Hello! You've requested to sign in to your Room Finder account.
                Use the verification code below to complete your login:
              </p>
              <div style="text-align: center;">
                <div class="otp-code">${token}</div>
              </div>
              <p class="message">
                This code will expire in 60 minutes. If you didn't request this code,
                you can safely ignore this email.
              </p>
              <div class="footer">
                <p>Room Finder - Find Your Perfect Student Accommodation</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      throw error
    }

    console.log('OTP email sent successfully to:', user.email)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error sending OTP email:', error)
    return new Response(
      JSON.stringify({
        error: {
          http_code: error.code,
          message: error.message,
        },
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
})
