// Contact Form Hook with Cloudflare Workers Integration

import { useState } from 'react';
import { api, ContactFormData } from '../api';

interface UseContactFormReturn {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  submitForm: (data: ContactFormData) => Promise<void>;
  reset: () => void;
}

/**
 * Hook to handle contact form submissions
 * Integrates with Cloudflare Workers API
 */
export function useContactForm(): UseContactFormReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await api.submitContact(data);

      if (response.success) {
        setIsSuccess(true);
        // Track successful submission
        api.trackEvent({
          eventType: 'form_submit',
          pagePath: window.location.pathname,
          metadata: { formType: 'contact' },
        });
      } else {
        setError(response.error || 'Failed to submit form');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    isSubmitting,
    isSuccess,
    error,
    submitForm,
    reset,
  };
}
