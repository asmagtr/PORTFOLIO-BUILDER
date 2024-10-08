"use client";
import { useState } from "react";

const page = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [resume, setResume] = useState(null);
    const [skills, setSkills] = useState([]);
  
    const handlePhotoChange = (event) => {
      setPhoto(event.target.files[0]);
    };
  
    const handleResumeChange = (event) => {
      setResume(event.target.files[0]);
    };
  
    const handleSkillChange = (event) => {
      const selectedSkill = event.target.value;
      if (skills.includes(selectedSkill)) {
        setSkills(skills.filter((skill) => skill !== selectedSkill));
      } else {
        setSkills([...skills, selectedSkill]);   
  
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission here, e.g., send data to server
      console.log('Form submitted:', { name, lastName, description, photo, resume, skills });
    };
  
    return (
        <div className="bg-blue-300 min-h-screen">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}   
   required className="w-full border rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name:</label>
          <input type="text" id="lastName"   
   value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full   
   border rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
          <textarea id="description"   
   rows="4" value={description} onChange={(e) => setDescription(e.target.value)}   
   required className="w-full border rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Photo:</label>
          <input type="file" id="photo"   
   accept="image/*" onChange={handlePhotoChange} required className="w-full border rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700 font-bold mb-2">Resume:</label>
          <input type="file" id="resume" accept="application/pdf" onChange={handleResumeChange} required className="w-full border rounded-md px-4 py-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Skills:</label>
          <div className="flex flex-wrap gap-2">
            <input type="checkbox" value="HTML" checked={skills.includes('HTML')} onChange={handleSkillChange} className="mr-2" /> HTML
            <input type="checkbox" value="CSS" checked={skills.includes('CSS')} onChange={handleSkillChange} className="mr-2" /> CSS
            <input type="checkbox" value="JavaScript" checked={skills.includes('JavaScript')} onChange={handleSkillChange} className="mr-2" /> JavaScript
            {/* Add more skill options as needed */}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
      </form>
                  
      </div>
    );
}

export default page