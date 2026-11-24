import React from 'react'

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-prose">
          <h2 className="text-xl font-medium text-primary mb-4">Introduction</h2>
          <p>This privacy policy explains how Project Nexus AI collects, uses, discloses, and safeguards your information when you use our service.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Information We Collect</h2>
          <ul>
            <li><strong>Personal Information:</strong> Email address, username, and password for account creation.</li>
            <li><strong>Usage Data:</strong> Information about how you access and use the service.</li>
            <li><strong>Cookie Data:</strong> Information stored via cookies as described in our Cookie Policy.</li>
          </ul>
          
          <h2 className="text-xl font-medium text-primary mb-4">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain the service</li>
            <li>Notify you about changes to our service</li>
            <li>Allow you to participate in interactive features</li>
            <li>Provide customer support</li>
            <li>Analyze usage to improve the service</li>
          </ul>
          
          <h2 className="text-xl font-medium text-primary mb-4">Data Protection</h2>
          <p>We take reasonable measures to protect your data. All evidence files are hashed with SHA-256, and authentication uses Argon2id password hashing.</li>
          
          <h2 className="text-xl font-medium text-primary mb-4">Third-Party Services</h2>
          <p>We use Google Gemini API for AI assistance. All API keys are managed server-side.</li>
          
          <h2 className="text-xl font-medium text-primary mb-4">Children's Privacy</h2>
          <p>Our service is not intended for children under 13. We do not knowingly collect personally identifiable information from children under 13.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
          
          <p className="mt-6">Last updated: [Date]</p>
        </div>
      </div>
    </div>
  )
}