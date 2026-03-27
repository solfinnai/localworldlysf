import { LoopsClient } from 'loops';

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

export interface EmailContact {
  email: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  variables?: Record<string, string>;
}

export interface SendEmailOptions {
  to: EmailContact;
  transactionalId: string;
  dataVariables?: Record<string, string>;
}

class LoopsEmailService {
  private client: LoopsClient | null = null;
  private isConfigured: boolean = false;

  constructor() {
    if (LOOPS_API_KEY) {
      this.client = new LoopsClient(LOOPS_API_KEY);
      this.isConfigured = true;
    }
  }

  get configured() {
    return this.isConfigured;
  }

  async sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured || !this.client) {
      return { success: false, error: 'Email service not configured. Add LOOPS_API_KEY to environment variables.' };
    }

    try {
      await this.client.sendTransactionalEmail({
        transactionalId: options.transactionalId,
        email: options.to.email,
        addToAudience: true,
        dataVariables: {
          firstName: options.to.firstName || '',
          lastName: options.to.lastName || '',
          businessName: options.to.businessName || '',
          ...options.dataVariables,
        },
      });

      return { success: true };
    } catch (error: any) {
      console.error('Loops send error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }
  }

  async sendBulkEmails(
    contacts: EmailContact[],
    transactionalId: string,
    onProgress?: (sent: number, total: number) => void
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      
      const result = await this.sendEmail({
        to: contact,
        transactionalId,
      });

      if (result.success) {
        success++;
      } else {
        failed++;
        errors.push(`${contact.email}: ${result.error}`);
      }

      onProgress?.(i + 1, contacts.length);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { success, failed, errors };
  }
}

export const emailService = new LoopsEmailService();
