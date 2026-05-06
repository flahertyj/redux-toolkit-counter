import { useEffect, useState } from "react";

const LIGHTS = [
    { name: 'red', duration: 5000, next: 'green' },
    { name: 'green', duration: 3500, next: 'yellow' },
    { name: 'yellow', duration: 1000, next: 'red' }
];

export default function Light() {
    const [lightColor, setLightColor] = useState('red');
    useEffect(() => {
        const interval = setInterval(() => {
            // Using setState function
            // setLightColor((currentLightColor) => {
            //     const currentLight = LIGHTS.find(light => light.name === currentLightColor);
            //     return currentLight?.next ?? 'red';
            // });

            // Simpler way without function, probably fine for this.
            const currentLight = LIGHTS.find(light => light.name === lightColor);
            setLightColor(currentLight?.next ?? 'red');
        }, LIGHTS.find((c) => c.name === lightColor)?.duration || 1000);
        return () => clearInterval(interval);
    }, [lightColor]);

    return (
        <div>
            Light color: <span style={{ color: lightColor }}>{lightColor}</span>
        </div>
    );
}