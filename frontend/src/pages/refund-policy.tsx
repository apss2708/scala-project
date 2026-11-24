import React from 'react'

export const RefundPolicy = () => {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Refund Policy</h1>
        
        <div className="prose max-w-prose">
          <h2 className="text-xl font-medium text-primary mb-4">No Refunds for Digital Services</h2>
          <p>Project Nexus AI is an academic software project and digital forensic investigation platform. The following policy applies:</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Subscription-Based Services</h2>
          <p>If Project Nexus AI offers any subscription-based features in the future, refunds may be available according to the following terms:</p>
          <ul>
            <li>Refunds requested within 24 hours of purchase may be considered</li>
            <li>Refunds after 24 hours are at the discretion of the development team</li>
            <li>No refunds are provided for monthly or annual subscriptions after the first billing cycle</li>
          </ul>
          
          <h2 className="text-xl font-medium text-primary mb-4">One-Time Purchases</h2>
          <p>Project Nexus AI is currently free for academic use as a minor project. No refund policy applies as there are no commercial purchases at this time.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Academic License</h2>
          <p>This project is distributed under the MIT License for academic purposes. No refunds are applicable for educational use.</p>
          
          <h2 className="text-xl font-medium text-primary mb-4">Contact Us</h2>
          <p>If you have questions about our refund policy, please contact the project maintainers.</p>
          
          <p className="mt-6">Last updated: [Date]</p>
        </div>
      </div>
    </div>
  )
}