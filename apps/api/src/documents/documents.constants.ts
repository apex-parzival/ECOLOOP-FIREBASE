/**
 * Centralised document catalogue + required-document checklists.
 *
 * This keeps document "types" consistent across the API, the admin/client/vendor
 * UIs and Firestore.  Previously document types were duplicated as loose strings
 * in several places (web `DOC_KEY_TO_TYPE`, Firestore `DocumentType` enum, ad-hoc
 * strings on requirements) which made the UI and the database drift apart.
 */

export type DocumentRole = 'CLIENT' | 'VENDOR';

export interface DocumentTypeMeta {
  /** Stable machine key – stored in Firestore and used by the UI. */
  type: string;
  /** Human readable label shown in the UI. */
  label: string;
  /** Short helper text describing what the document is. */
  description: string;
  /** Accepted file extensions (used to drive the upload input `accept` attr). */
  accept: string;
  /** Whether the document is mandatory for onboarding / submission. */
  required: boolean;
}

/**
 * Required document checklist for each company role.  The web onboarding flow
 * and the admin verification screen both read from this so the lists never drift.
 */
export const REQUIRED_DOCUMENTS: Record<DocumentRole, DocumentTypeMeta[]> = {
  CLIENT: [
    {
      type: 'CERTIFICATE_OF_INCORPORATION',
      label: 'Certificate of Incorporation',
      description: 'Company registration / incorporation certificate.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'GST_CERTIFICATE',
      label: 'GST Certificate',
      description: 'Valid GST registration certificate.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'COMPANY_PAN',
      label: 'Company PAN',
      description: 'Company PAN card.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'AUTHORIZED_SIGNATORY_ID',
      label: 'Authorised Signatory ID',
      description: 'ID proof of the authorised signatory.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'CANCELLED_CHEQUE',
      label: 'Cancelled Cheque',
      description: 'Cancelled cheque for bank verification.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: false,
    },
  ],
  VENDOR: [
    {
      type: 'CERTIFICATE_OF_INCORPORATION',
      label: 'Certificate of Incorporation',
      description: 'Company registration / incorporation certificate.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'GST_CERTIFICATE',
      label: 'GST Certificate',
      description: 'Valid GST registration certificate.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'COMPANY_PAN',
      label: 'Company PAN',
      description: 'Company PAN card.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'PCB_AUTHORIZATION',
      label: 'PCB Authorisation',
      description: 'Pollution Control Board authorisation.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'EPR_AUTHORIZATION',
      label: 'EPR Authorisation',
      description: 'Extended Producer Responsibility authorisation.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'RECYCLER_LICENSE',
      label: 'Recycler / Factory License',
      description: 'Valid recycler or factory operating license.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true,
    },
    {
      type: 'CANCELLED_CHEQUE',
      label: 'Cancelled Cheque',
      description: 'Cancelled cheque for bank verification.',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: false,
    },
  ],
};

/**
 * Column definition for the standardised vendor price-sheet template.
 * Admins can re-upload a customised sheet per requirement, but this provides a
 * sensible default so a template is always available to download.
 */
export const PRICE_SHEET_COLUMNS: string[] = [
  'S.No',
  'Material / Item',
  'Category',
  'Estimated Quantity (KG)',
  'Unit',
  'Condition / Grade',
  'Your Rate (INR per KG)',
  'Total Amount (INR)',
  'Remarks',
];
