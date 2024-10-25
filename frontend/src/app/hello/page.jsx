'use client'
import React from 'react'
import { useState } from 'react';

const hello = () => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [projects, setProjects] = useState([]);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { projectName: "", projectPicture: null }]);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      profession,
      resume,
      profilePicture,
      projects,
    };
    console.log(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">User Profile Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Profession</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
              <div className="mb-2">
                <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={project.projectName}
                  onChange={(e) => handleProjectChange(index, "projectName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Project Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProjectChange(index, "projectPicture", e.target.files[0])}
                />
              </div>
              <button
                type="button"
                className="mt-2 text-red-500"
                onClick={() => handleRemoveProject(index)}
              >
                Remove Project
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 font-semibold mt-2"
            onClick={addProject}
          >
            Add Project
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default hello