// Analytics Hook for Cloudflare D1 Integration

import { useEffect, useCallback } from 'react';
import { api } from '../api';

// Generate a simple session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

/**
 * Hook for privacy-focused analytics
 * Tracks page views and events to Cloudflare D1
 */
export function useAnalytics() {
  // Track page view on mount
  useEffect(() => {
    trackPageView();
  }, []);

  const trackPageView = useCallback(() => {
    api.trackEvent({
      eventType: 'page_view',
      pagePath: window.location.pathname,
      referrer: document.referrer,
      sessionId: getSessionId(),
    });
  }, []);

  const trackEvent = useCallback((
    eventType: string,
    metadata?: Record<string, any>
  ) => {
    api.trackEvent({
      eventType,
      pagePath: window.location.pathname,
      metadata,
      sessionId: getSessionId(),
    });
  }, []);

  const trackButtonClick = useCallback((buttonName: string) => {
    trackEvent('button_click', { buttonName });
  }, [trackEvent]);

  const trackLinkClick = useCallback((linkUrl: string, linkText: string) => {
    trackEvent('link_click', { linkUrl, linkText });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackLinkClick,
  };
}
