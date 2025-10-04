import { useEffect, useState } from 'react';

   interface AnalyticsEvent {
     component: string;
     event: string;
     theme: string;
     timestamp: string;
   }

   const useAnalytics = (componentName: string) => {
     const [isClient, setIsClient] = useState(false);

     useEffect(() => {
       setIsClient(true); // Confirm we're in the browser
     }, []);

     const logEvent = (event: string) => {
       if (!isClient) return; // Skip if not in browser
       try {
         const eventData: AnalyticsEvent = {
           component: componentName,
           event,
           theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
           timestamp: new Date().toISOString(),
         };

         // Retrieve existing analytics from localStorage
         const existingData = localStorage.getItem('componentAnalytics');
         const analytics = existingData ? JSON.parse(existingData) : [];
         analytics.push(eventData);
         localStorage.setItem('componentAnalytics', JSON.stringify(analytics));
         console.log('Logged event:', eventData); // Debug log
       } catch (error) {
         console.error('Error logging analytics event:', error);
       }
     };

     return { logEvent };
   };

   export default useAnalytics;