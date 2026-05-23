import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { from, Observable } from 'rxjs';

// ─── EmailJS Configuration ────────────────────────────────────────────────────
// Replace these placeholders with your actual EmailJS credentials.
// Service ID:          EmailJS Dashboard → Email Services
// Template IDs:        EmailJS Dashboard → Email Templates
// Public Key:          EmailJS Dashboard → Account → General → Public Key
const EMAILJS_SERVICE_ID = 'service_q6xlj2i';
const EMAILJS_PUBLIC_KEY = 'MIA6E8iuZjTOBjgNF';

const TEMPLATE_NETWORK_APPLICATION = 'template_tr4mhxd';
const TEMPLATE_JOINT_ACTIVITY = 'template_eh1kfng';

// ─── Payload Interfaces ───────────────────────────────────────────────────────

/**
 * Network Application Form payload.
 * Maps to EmailJS template variables:
 *   {{name}}, {{organisation}}, {{role}}, {{email}}, {{interests}}
 */
export interface NetworkApplicationPayload extends Record<string, unknown> {
  name: string;
  organisation: string;
  role: string;
  email: string;
  /** Comma-separated list of selected interest areas */
  interests: string;
}

/**
 * Joint Activity Proposal Form payload.
 * Maps to EmailJS template variables:
 *   {{project_name}}, {{contact_person}}, {{email}}, {{activity_idea}}, {{timeline}}
 */
export interface JointActivityPayload extends Record<string, unknown> {
  project_name: string;
  contact_person: string;
  email: string;
  activity_idea: string;
  timeline: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class EmailService {

  /**
   * Sends a Network Application email via EmailJS.
   * Template: TEMPLATE_NETWORK_APPLICATION
   */
  sendNetworkApplication(payload: NetworkApplicationPayload): Observable<EmailJSResponseStatus> {
    return from(
      emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_NETWORK_APPLICATION, payload, EMAILJS_PUBLIC_KEY)
    );
  }

  /**
   * Sends a Joint Activity Proposal email via EmailJS.
   * Template: TEMPLATE_JOINT_ACTIVITY
   */
  sendJointActivityProposal(payload: JointActivityPayload): Observable<EmailJSResponseStatus> {
    return from(
      emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_JOINT_ACTIVITY, payload, EMAILJS_PUBLIC_KEY)
    );
  }
}

