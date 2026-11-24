import React from 'react'

export const TermsOfService = () => {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Terms of Service</h1>
        
        <div className="prose max-w-prose">
          <h2 className="text-xl font-medium text-primary mb-4">Acceptance of Terms</h2>
          <p>By accessing or using Project Nexus AI, you agree to comply with these Terms of Service. This agreement applies to all users of the service.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Use of the Service</h2>
          <p>Project Nexus AI is designed for digital forensic investigation and evidence analysis. Users must:</p>
          <ul>
            <li>Use the service for lawful purposes only</li>
            <li>Not use the service for any illegal activity</li>
            <li>Not reverse engineer or attempt to extract the AI model</li>
            <li>Respect evidence integrity and not tamper with uploaded files</li>
          </ul>
          
          <h2 className="text-xl font-medium text-primary mb-4">Intellectual Property</h2>
          <p>All content, features, and functionality of Project Nexus AI are owned by the company and are protected by international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">User Generated Content</h2>
          <p>Users are responsible for the evidence they upload. You are responsible for any damage resulting from the use of evidence uploaded.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Limitation of Liability</h2>
          <p>Project Nexus AI is provided "as is" without warranties of any kind. We disclaim all warranties, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title and non-infringement.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Modifications</h2>
          <p>We reserve the right to modify or discontinue the service at any time.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Governing Law</h2>
          <p>These terms and any separate agreements whereby we provide you Services shall be governed by the laws of the jurisdiction where the company is registered.</p>
          
          <p className="mt-6">Last updated: [Date]</p>
        </div>
      </div>
    </div>
  )
}