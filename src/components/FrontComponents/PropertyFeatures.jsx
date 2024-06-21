import React from "react";

const PropertyFeatures = () => {
    const features = [
        { id: "AC", label: "Air Conditioning" },
        { id: "Alarm", label: "Alarm System" },
        { id: "Balcony", label: "Balcony" },
        { id: "Broadband", label: "Broadband" },
        { id: "BuiltInRobes", label: "Built in Robes" },
        { id: "Dishwasher", label: "Dishwasher" },
        { id: "Ensuite", label: "Ensuite" },
        { id: "FullyFenced", label: "Fully Fenced" },
        { id: "Garage", label: "Garage" },
        { id: "Gym", label: "Gym" },
        { id: "HeatingSystem", label: "Heating System" },
        { id: "OutdoorArea", label: "Outdoor Area" },
        { id: "OutdoorSpa", label: "Outdoor Spa" },
        { id: "Study", label: "Study" },
        { id: "SwimmingPool", label: "Swimming Pool" },
        { id: "TennisCourt", label: "Tennis Court" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4">
            {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                    <input id={feature.id} type="checkbox" />
                    <label htmlFor={feature.id} className={'text-sm font-light'}>{feature.label}</label>
                </div>
            ))}
        </div>
    )
};

export default PropertyFeatures;
