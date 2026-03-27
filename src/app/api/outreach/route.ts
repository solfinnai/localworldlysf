import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email/loops';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contacts, subject, body: emailBody, channel = 'email' } = body;

    if (channel !== 'email') {
      return NextResponse.json(
        { error: 'Only email outreach is currently supported' },
        { status: 400 }
      );
    }

    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      return NextResponse.json(
        { error: 'No contacts provided' },
        { status: 400 }
      );
    }

    if (!emailService.configured) {
      return NextResponse.json({
        success: true,
        mode: 'preview',
        message: 'Email service not configured. In production, set LOOPS_API_KEY environment variable.',
        contacts: contacts.map((c: any) => c.email),
      });
    }

    const result = await emailService.sendBulkEmails(
      contacts,
      subject,
      emailBody
    );

    return NextResponse.json({
      success: result.failed === 0,
      mode: 'live',
      sent: result.success,
      failed: result.failed,
      errors: result.errors,
    });
  } catch (error: any) {
    console.error('Outreach API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send outreach' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    configured: emailService.configured,
    message: emailService.configured 
      ? 'Email service is configured' 
      : 'Set LOOPS_API_KEY in environment variables to enable email sending',
  });
}
