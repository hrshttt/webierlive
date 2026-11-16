import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, service, budget, message } = await req.json()
  
  // Initialize Resend inside the handler so it doesn't run at build time
  const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_to_prevent_build_error')

  try {
    await resend.emails.send({
      from: 'Webier Contact <onboarding@resend.dev>',
      to: 'contact@webierstudio.com',
      subject: `New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
