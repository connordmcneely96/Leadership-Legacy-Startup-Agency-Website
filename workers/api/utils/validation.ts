// Input validation utilities

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export function isValidPassword(password: string): boolean {
  if (password.length < 8) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
}

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate required fields in object
 */
export function validateRequired(
  data: Record<string, any>,
  fields: string[]
): { valid: boolean; missing: string[] } {
  const missing = fields.filter((field) => {
    const value = data[field];
    return value === undefined || value === null || value === '';
  });

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Validate user role
 */
export function isValidRole(role: string): boolean {
  const validRoles = ['admin', 'team', 'client'];
  return validRoles.includes(role);
}

/**
 * Validate project status
 */
export function isValidProjectStatus(status: string): boolean {
  const validStatuses = ['inquiry', 'in_progress', 'review', 'completed', 'archived'];
  return validStatuses.includes(status);
}

/**
 * Validate invoice status
 */
export function isValidInvoiceStatus(status: string): boolean {
  const validStatuses = ['draft', 'sent', 'paid', 'overdue', 'cancelled'];
  return validStatuses.includes(status);
}

/**
 * Validate tier
 */
export function isValidTier(tier: string): boolean {
  const validTiers = ['basic', 'standard', 'premium'];
  return validTiers.includes(tier);
}
