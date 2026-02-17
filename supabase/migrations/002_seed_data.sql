-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, max_events, max_sponsors, max_users, features) VALUES
('Starter', 'Perfect for single event teams', 29900, 299400, 1, 50, 3, '["Basic dashboard", "Email reminders", "CSV exports", "Standard support"]'),
('Growth', 'Ideal for multi-event operations', 49900, 499400, 5, 200, 10, '["Advanced dashboard", "Custom templates", "PDF reports", "Priority support", "Slack integration"]'),
('Enterprise', 'For large organizations and agencies', 99900, 999400, 999, 999, 999, '["White-label options", "API access", "Custom integrations", "Dedicated support", "Advanced analytics"]');

-- Insert default deliverable templates
INSERT INTO deliverable_templates (organization_id, package_tier, title, description, days_before_event, priority) VALUES
-- These will be copied to organizations during onboarding
(NULL, 'bronze', 'Logo Placement Confirmation', 'Confirm sponsor logo placement in event materials', 14, 'medium'),
(NULL, 'bronze', 'Social Media Mention', 'Post sponsor mention on social media channels', 7, 'low'),
(NULL, 'bronze', 'Program Listing', 'Include sponsor in event program/materials', 10, 'medium'),

(NULL, 'silver', 'Logo Placement Confirmation', 'Confirm sponsor logo placement in event materials', 14, 'medium'),
(NULL, 'silver', 'Social Media Campaign', 'Execute 3-post social media campaign for sponsor', 7, 'medium'),
(NULL, 'silver', 'Program Listing', 'Include sponsor in event program/materials', 10, 'medium'),
(NULL, 'silver', 'Booth Setup Coordination', 'Coordinate sponsor booth setup and requirements', 3, 'high'),
(NULL, 'silver', 'Speaking Slot Confirmation', 'Confirm sponsor speaking slot details', 21, 'high'),

(NULL, 'gold', 'VIP Reception Planning', 'Plan and execute VIP sponsor reception', 14, 'high'),
(NULL, 'gold', 'Premium Logo Placement', 'Ensure premium logo placement in all materials', 21, 'high'),
(NULL, 'gold', 'Media Kit Preparation', 'Prepare comprehensive media kit for sponsor', 14, 'medium'),
(NULL, 'gold', 'Dedicated Social Campaign', 'Execute dedicated 5-post social media campaign', 7, 'high'),
(NULL, 'gold', 'Lead Generation Report', 'Provide post-event lead generation summary', -3, 'medium'),
(NULL, 'gold', 'Premium Booth Location', 'Secure premium booth location for sponsor', 30, 'critical'),

(NULL, 'platinum', 'Exclusive Partnership Announcement', 'Coordinate exclusive partnership announcement', 30, 'critical'),
(NULL, 'platinum', 'Custom Branded Experience', 'Create custom branded experience at event', 45, 'critical'),
(NULL, 'platinum', 'Executive Meeting Coordination', 'Schedule executive-level meetings for sponsor', 14, 'high'),
(NULL, 'platinum', 'Post-Event ROI Report', 'Comprehensive post-event ROI and impact report', -7, 'high'),
(NULL, 'platinum', 'Year-Round Partnership Benefits', 'Activate ongoing partnership benefits', -1, 'medium'),

(NULL, 'custom', 'Custom Deliverable Template', 'Placeholder for custom sponsor requirements', 7, 'medium');

-- Sample organization (for demo purposes)
INSERT INTO organizations (id, name, slug, description, website) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Demo Event Agency', 'demo-event-agency', 'A sample event agency for demonstration purposes', 'https://demo-agency.com');

-- Sample user profile
-- Note: This references auth.users which would be created via Supabase Auth
-- For demo, we'll assume a user with this ID exists
INSERT INTO profiles (id, organization_id, email, full_name, role) VALUES
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'demo@example.com', 'Demo User', 'admin');

-- Copy default deliverable templates to demo organization
INSERT INTO deliverable_templates (organization_id, package_tier, title, description, days_before_event, priority, is_active)
SELECT '550e8400-e29b-41d4-a716-446655440001', package_tier, title, description, days_before_event, priority, is_active
FROM deliverable_templates WHERE organization_id IS NULL;

-- Sample sponsor package templates
INSERT INTO sponsor_package_templates (organization_id, name, tier, price, description, benefits, deliverables_template) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Bronze Partnership', 'bronze', 500000, 'Entry-level sponsorship with basic brand exposure', 
 '["Logo on event materials", "Social media mention", "Program listing"]',
 '["Logo Placement Confirmation", "Social Media Mention", "Program Listing"]'),

('550e8400-e29b-41d4-a716-446655440001', 'Silver Partnership', 'silver', 150000, 'Mid-tier sponsorship with enhanced visibility',
 '["Premium logo placement", "Booth space", "Social media campaign", "Speaking opportunity"]',
 '["Logo Placement Confirmation", "Social Media Campaign", "Program Listing", "Booth Setup Coordination", "Speaking Slot Confirmation"]'),

('550e8400-e29b-41d4-a716-446655440001', 'Gold Partnership', 'gold', 300000, 'Premium sponsorship with VIP benefits',
 '["VIP reception", "Premium booth location", "Dedicated marketing", "Lead generation", "Media coverage"]',
 '["VIP Reception Planning", "Premium Logo Placement", "Media Kit Preparation", "Dedicated Social Campaign", "Lead Generation Report", "Premium Booth Location"]'),

('550e8400-e29b-41d4-a716-446655440001', 'Platinum Partnership', 'platinum', 500000, 'Exclusive top-tier partnership',
 '["Exclusive partnership status", "Custom branded experience", "Executive access", "Year-round benefits", "ROI reporting"]',
 '["Exclusive Partnership Announcement", "Custom Branded Experience", "Executive Meeting Coordination", "Post-Event ROI Report", "Year-Round Partnership Benefits"]');

-- Sample event
INSERT INTO events (id, organization_id, name, description, event_date, location, status, created_by) VALUES
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 
 'Annual Tech Conference 2024', 'Premier technology conference bringing together industry leaders', 
 '2024-12-15', 'San Francisco Convention Center', 'planning', '550e8400-e29b-41d4-a716-446655440002');

-- Sample sponsors
INSERT INTO sponsors (id, organization_id, event_id, company_name, contact_name, contact_email, contact_phone, website, package_template_id, contract_value, payment_status) VALUES
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003',
 'TechCorp Industries', 'Sarah Johnson', 'sarah.johnson@techcorp.com', '+1-555-0123', 'https://techcorp.com',
 (SELECT id FROM sponsor_package_templates WHERE name = 'Gold Partnership' AND organization_id = '550e8400-e29b-41d4-a716-446655440001'),
 300000, 'confirmed'),

('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003',
 'Innovation Labs', 'Michael Chen', 'm.chen@innovationlabs.io', '+1-555-0124', 'https://innovationlabs.io',
 (SELECT id FROM sponsor_package_templates WHERE name = 'Silver Partnership' AND organization_id = '550e8400-e29b-41d4-a716-446655440001'),
 150000, 'confirmed'),

('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003',
 'StartupHub', 'Lisa Rodriguez', 'lisa@startuphub.com', '+1-555-0125', 'https://startuphub.com',
 (SELECT id FROM sponsor_package_templates WHERE name = 'Bronze Partnership' AND organization_id = '550e8400-e29b-41d4-a716-446655440001'),
 50000, 'pending');

-- Sample deliverables based on sponsor packages
-- TechCorp (Gold) deliverables
INSERT INTO deliverables (sponsor_id, title, description, due_date, status, priority, assigned_to) VALUES
((SELECT id FROM sponsors WHERE company_name = 'TechCorp Industries'), 'VIP Reception Planning', 'Plan and execute VIP sponsor reception for TechCorp', '2024-12-01', 'pending', 'high', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'TechCorp Industries'), 'Premium Logo Placement', 'Ensure premium logo placement in all conference materials', '2024-11-24', 'in_progress', 'high', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'TechCorp Industries'), 'Media Kit Preparation', 'Prepare comprehensive media kit for TechCorp', '2024-12-01', 'pending', 'medium', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'TechCorp Industries'), 'Lead Generation Report', 'Provide post-event lead generation summary', '2024-12-18', 'pending', 'medium', '550e8400-e29b-41d4-a716-446655440002');

-- Innovation Labs (Silver) deliverables
INSERT INTO deliverables (sponsor_id, title, description, due_date, status, priority, assigned_to) VALUES
((SELECT id FROM sponsors WHERE company_name = 'Innovation Labs'), 'Logo Placement Confirmation', 'Confirm Innovation Labs logo placement in event materials', '2024-12-01', 'completed', 'medium', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'Innovation Labs'), 'Booth Setup Coordination', 'Coordinate Innovation Labs booth setup and requirements', '2024-12-12', 'pending', 'high', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'Innovation Labs'), 'Speaking Slot Confirmation', 'Confirm Innovation Labs speaking slot details', '2024-11-24', 'overdue', 'high', '550e8400-e29b-41d4-a716-446655440002');

-- StartupHub (Bronze) deliverables
INSERT INTO deliverables (sponsor_id, title, description, due_date, status, priority, assigned_to) VALUES
((SELECT id FROM sponsors WHERE company_name = 'StartupHub'), 'Logo Placement Confirmation', 'Confirm StartupHub logo placement in event materials', '2024-12-01', 'pending', 'medium', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'StartupHub'), 'Social Media Mention', 'Post StartupHub mention on social media channels', '2024-12-08', 'pending', 'low', '550e8400-e29b-41d4-a716-446655440002'),
((SELECT id FROM sponsors WHERE company_name = 'StartupHub'), 'Program Listing', 'Include StartupHub in event program/materials', '2024-12-05', 'pending', 'medium', '550e8400-e29b-41d4-a716-446655440002');

-- Sample activity logs
INSERT INTO activity_logs (organization_id, user_id, action, resource_type, resource_id, details) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'created', 'event', '550e8400-e29b-41d4-a716-446655440003', '{"event_name": "Annual Tech Conference 2024"}'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'created', 'sponsor', '550e8400-e29b-41d4-a716-446655440004', '{"company_name": "TechCorp Industries", "package": "Gold Partnership"}'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'updated', 'deliverable', (SELECT id FROM deliverables WHERE title = 'Logo Placement Confirmation' AND sponsor_id = (SELECT id FROM sponsors WHERE company_name = 'Innovation Labs')), '{"status": "completed"}');

-- Sample reminder settings
INSERT INTO reminder_settings (organization_id, days_before_due, email_template, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', '{7,3,1}', 'Default reminder template for deliverables', true);

-- Create a function to calculate deliverable risk status
CREATE OR REPLACE FUNCTION get_deliverable_risk_status(due_date DATE, status deliverable_status)
RETURNS TEXT AS $$
BEGIN
    IF status IN ('completed', 'cancelled') THEN
        RETURN 'none';
    ELSIF due_date < CURRENT_DATE THEN
        RETURN 'overdue';
    ELSIF due_date <= CURRENT_DATE + INTERVAL '3 days' THEN
        RETURN 'due_soon';
    ELSIF status = 'blocked' THEN
        RETURN 'blocked';
    ELSE
        RETURN 'on_track';
    END IF;
END;
$$ LANGUAGE plpgsql;