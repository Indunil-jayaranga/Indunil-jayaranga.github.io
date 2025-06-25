---
slug: 'Windows-Event-Logs'
title: 'Windows Event Logs'
category: 'Cybersecurity, Threat Hunting'
image: '/images/one.jpg'
description: 'A deep dive into the proactive strategies and mindset required for effective threat hunting in modern enterprises.'
---

## Essential Windows Event IDs Every Security Professional Should Monitor

Monitoring Windows event logs is a cornerstone of effective cybersecurity and system administration. By keeping a close eye on specific Event IDs, organizations can quickly detect unusual activity, investigate incidents, and respond to threats before they escalate. Below is a practical guide to some of the most critical Windows System and Security Event IDs, and why they matter.

---

### Windows System Logs: Key Event IDs

- **1074 (System Shutdown/Restart):**  
  Tracks when and why the system was shut down or restarted. Unexpected shutdowns or restarts may signal malware activity or unauthorized access.

- **6005 (Event Log Service Started):**  
  Marks the start of the Event Log Service, often indicating a system boot. This is a crucial starting point for incident investigations and can help detect unauthorized reboots.

- **6006 (Event Log Service Stopped):**  
  Indicates when the Event Log Service stops, typically during shutdown. Unexpected occurrences may point to attempts to cover illicit activities.

- **6013 (Windows Uptime):**  
  Logged daily, showing system uptime in seconds. Short uptimes can hint at unauthorized reboots or intrusions.

- **7040 (Service Status Change):**  
  Flags changes in service startup types. Alterations to critical services could indicate tampering.

---

### Windows Security Logs: Key Event IDs

- **1102 (Audit Log Cleared):**  
  Clearing audit logs often signals attempts to erase evidence of malicious activity.

- **1116 (Antivirus Malware Detection):**  
  Logs when Defender detects malware. Spikes may indicate targeted attacks.

- **1118/1119/1120 (Antivirus Remediation):**  
  Track the start, success, or failure of malware remediation. Failures (1120) demand immediate attention.

- **4624 (Successful Logon):**  
  Records successful logins. Unusual times or locations can signal compromised accounts.

- **4625 (Failed Logon):**  
  Multiple failures may indicate brute-force attacks.

- **4648 (Logon with Explicit Credentials):**  
  Detects attempts to run programs with explicit credentials, a common lateral movement tactic.

- **4656 (Handle Requested to Object):**  
  Useful for spotting access attempts to sensitive files or registry keys.

- **4672 (Special Privileges Assigned):**  
  Tracks logons with superuser privileges to prevent privilege abuse.

- **4698/4700/4701/4702 (Scheduled Task Activity):**  
  Creation, enabling/disabling, or updating of scheduled tasks can reveal persistence mechanisms used by attackers.

- **4719 (Audit Policy Changed):**  
  Changes here may indicate attempts to disable auditing and cover tracks.

- **4738 (User Account Changed):**  
  Monitors for privilege escalations or insider threats.

- **4771 (Kerberos Pre-authentication Failed):**  
  Excessive failures may signal brute-force attempts against Kerberos.

- **4776 (Credential Validation):**  
  Tracks both successful and failed validation attempts, helping to detect brute-force activity.

- **5001 (Antivirus Real-time Protection Changed):**  
  Unauthorized changes may indicate attempts to weaken security defenses.

- **5140/5142/5145 (Network Share Access):**  
  Logs access, creation, and permission checks on network shares—critical for detecting lateral movement and data exfiltration.

- **5157 (Connection Blocked by Filtering Platform):**  
  Helps identify blocked malicious network traffic.

- **7045 (Service Installed):**  
  The sudden appearance of unknown services often points to malware installation.

---

### Why This Matters

Proactive monitoring of these Event IDs enables security teams to:

- Detect and respond to intrusions early
- Identify and investigate suspicious activity
- Maintain compliance and audit readiness
- Strengthen overall security posture

**Takeaway:**  
Integrate these Event IDs into your SIEM or monitoring tools, set up alerts for anomalies, and regularly review logs to stay ahead of threats. Vigilance in event log monitoring is a critical line of defense in today's evolving threat landscape.

---

*Stay secure. Stay vigilant. Monitor your Windows event logs.*