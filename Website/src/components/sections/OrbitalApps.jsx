import React from 'react';
import './OrbitalApps.css';
import CopilotIcon from '../../assets/microsoft-365-copilot-logo-png_seeklogo-621257.png';

// Import App Icons
import CloudIcon from '../../assets/Cloud 2.png';
import ExcelIcon from '../../assets/Excel 9.png';
import FormIcon from '../../assets/Form 4.png';
import OutlookIcon from '../../assets/Outlook 12.png';
import PowerAppsIcon from '../../assets/Power Apps 5.png';
import PowerAutomateIcon from '../../assets/Power Automate 7.png';
import PowerBIIcon from '../../assets/Power BI 6.png';
import PowerPointIcon from '../../assets/Power Point 10.png';
import SharePointIcon from '../../assets/sharepoint 3.png';

import WordIcon from '../../assets/Word 11.png';

const OrbitalApps = () => {
    // Icons configuration
    const centerApp = { name: 'Copilot', icon: CopilotIcon };

    const innerCircle = [
        { name: 'Power Automate', icon: PowerAutomateIcon },
        { name: 'Power Apps', icon: PowerAppsIcon },
        { name: 'Power BI', icon: PowerBIIcon },
    ];

    const middleCircle = [

        { name: 'SharePoint', icon: SharePointIcon },
        { name: 'OneDrive', icon: CloudIcon },
        { name: 'Forms', icon: FormIcon },
    ];

    const outerCircle = [
        { name: 'Excel', icon: ExcelIcon },
        { name: 'PowerPoint', icon: PowerPointIcon },
        { name: 'Word', icon: WordIcon },
        { name: 'Outlook', icon: OutlookIcon },
    ];

    // Helper to render icons distributed on a circle
    const renderRingIcons = (items, radius) => {
        const step = 360 / items.length;
        return items.map((app, index) => {
            const angle = index * step;
            // Convert angle to radians for placement
            const rad = (angle * Math.PI) / 180;
            // Calculate percentage position (0-100%)
            // Center is 50%, Radius is 50% of width
            // x = 50 + 50 * cos
            // y = 50 + 50 * sin
            // Note: cos/sin starts from right (0deg). -90deg is top. 
            // We want to distribute starting from top for visuals, so subtract 90deg or just let it be.
            const left = 50 + 50 * Math.cos(rad);
            const top = 50 + 50 * Math.sin(rad);

            return (
                <div
                    key={index}
                    className="orbit-icon-wrapper"
                    style={{
                        top: `${top}%`,
                        left: `${left}%`,
                        transform: 'translate(-50%, -50%)', // Ensure the wrapper center is at the point
                        // We also need to add staggered animation to each icon if desired, 
                        // but the main requirement is rotation, which is handled by CSS on the wrapper and ring.
                    }}
                    title={app.name}
                >
                    <div className="d-flex align-items-center justify-content-center"
                        style={{
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img src={app.icon} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="orbit-container">

                {/* Center Core */}
                <div className="orbit-center">
                    <img src={centerApp.icon} alt={centerApp.name} style={{ width: '50px', height: '50px' }} />
                </div>

                {/* Inner Ring - Radius is implicitly controlled by CSS width/height, passed valid dummy radius for consistency if logic needed */}
                <div className="orbit-ring orbit-ring-inner">
                    {renderRingIcons(innerCircle, 100)}
                </div>

                {/* Middle Ring */}
                <div className="orbit-ring orbit-ring-middle">
                    {renderRingIcons(middleCircle, 160)}
                </div>

                {/* Outer Ring */}
                <div className="orbit-ring orbit-ring-outer">
                    {renderRingIcons(outerCircle, 220)}
                </div>

            </div>
        </div>
    );
};

export default OrbitalApps;
