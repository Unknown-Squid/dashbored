import React, { useState } from 'react';
import { CgGenderFemale } from "react-icons/cg";
import { CgGenderMale } from "react-icons/cg";

function Userprofile({ username, age, gender, developer }) {

  const extractHexColor = (className) => {
    const match = className.match(/bg-\[#([0-9a-fA-F]{6})\]/);
    return match ? `#${match[1]}` : null; // Returns hex color or null if not found
  };
  
  const getLuminance = (hex) => {
    if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return 0.5;
  
    if (hex.length === 4) {
      hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
  
    const rgb = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)?.slice(1).map((x) => parseInt(x, 16) / 255);
    
    if (!rgb) return 0.5;
  
    const [r, g, b] = rgb;
    const a = [r, g, b].map((x) => (x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)));
    const luminance = a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    return luminance;
  };
  
  const getTextColor = (bgClass) => {
    const bgColor = extractHexColor(bgClass);
    if (bgColor) {
      const luminance = getLuminance(bgColor);
      return luminance > 0.5 ? 'text-black' : 'text-white'; // Light background = dark text, dark background = white text
    }
    return 'text-black'; // Default text color if hex is not found
  };

  // Classification based on age
  const ageClassification = [
    { classification: 'toddler', color: 'bg-[#FFC0CB]'},
    { classification: 'children', color: 'bg-[#FFD700]'},
    { classification: 'teenager', color: 'bg-[#87CEFA]'},
    { classification: 'young adult', color: 'bg-[#32CD32]'},
    { classification: 'adult', color: 'bg-[#FFA500]'},
    { classification: 'middle-aged adult', color: 'bg-[#8A2BE2]'},
    { classification: 'senior', color: 'bg-[#808080]'},
  ];

  // Function to get background color based on age
  const getAgeColor = (age) => {
    if (age <= 3) return ageClassification[0].color;
    if (age <= 12) return ageClassification[1].color;
    if (age <= 13) return ageClassification[2].color;
    if (age <= 18) return ageClassification[3].color;
    if (age <= 40) return ageClassification[4].color;
    if (age <= 60) return ageClassification[5].color;
    return ageClassification[6].color;
  };

  const bgColor = getAgeColor(age); 
  const textColor = getTextColor(bgColor);

  return (
    <div className="flex flex-col h-fit w-full items-center mt-16 gap-4">
      <div className="rounded-full w-[100px] h-[100px] bg-white"></div>
      
      <h3 className="text-black font-bold w-[150px] text-center">{username}</h3>

      <div className='flex flex-col items-start gap-4 w-full pl-5 mt-8'>
        {developer && (
          <p className={`text-white rounded-lg px-5 p-2 text-center shadow-xl ${developer == "Developer" ? "bg-black" : "bg-red-500"}`}>{developer ? "Developer" : "Non - Developer" }</p>
        )}
        
        {gender && (
          <p className={`px-5 ${gender === 'Male' ? 'bg-blue-500' : 'bg-pink-500'} ${textColor} 
                      rounded-lg p-2 text-center flex flex-row items-center gap-1 text-white shadow-xl`}>
            {gender === 'Male' ?
              <CgGenderMale 
                  size={20} /> : 
              <CgGenderFemale 
                  size={20} />
            }
            {gender}
          </p>
        )}

        {age && (
          <p className={`px-5 ${bgColor} ${textColor} rounded-lg p-2 text-center text-black shadow-xl`}>
            {age} years old
          </p>
        )}

      </div>

    </div>
  );
}

export default Userprofile;
