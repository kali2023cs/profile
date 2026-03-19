import React, { useState, useEffect } from 'react';
import adminData from '../data/admin.json';

// Import initial data
import heroDataInit from '../data/hero.json';
import projectsDataInit from '../data/projects.json';
import experienceDataInit from '../data/experience.json';
import educationDataInit from '../data/education.json';
import skillsDataInit from '../data/skills.json';
import navbarDataInit from '../data/navbar.json';
import footerDataInit from '../data/footer.json';

const ALL_DATA = {
  hero: heroDataInit,
  projects: projectsDataInit,
  experience: experienceDataInit,
  education: educationDataInit,
  skills: skillsDataInit,
  navbar: navbarDataInit,
  footer: footerDataInit
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('projects');
  const [jsonText, setJsonText] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Check existing session
  useEffect(() => {
    if (localStorage.getItem('admin_session') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load active tab data
  useEffect(() => {
    if (isAuthenticated) {
      const saved = localStorage.getItem(activeTab);
      if (saved) {
        setJsonText(saved);
      } else {
        setJsonText(JSON.stringify(ALL_DATA[activeTab], null, 2));
      }
      setSaveStatus('');
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Decode base64 stored password (encryptedPass)
    const decodedPass = atob(adminData.encryptedPass);
    if (username === adminData.username && password === decodedPass) {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('admin_session', 'true');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    try {
      const parsedData = JSON.parse(jsonText); // Validate JSON
      
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: activeTab, data: parsedData })
      });

      if (response.ok) {
        setSaveStatus('Saved successfully to json file!');
      } else {
        setSaveStatus('Error saving file. Server might report an issue.');
      }
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (e) {
      setSaveStatus('Invalid JSON format!');
    }
  };

  const handleReset = () => {
    localStorage.removeItem(activeTab);
    setJsonText(JSON.stringify(ALL_DATA[activeTab], null, 2));
    setSaveStatus('Reset to original file data!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6 relative z-50">
        <div className="glass-panel p-8 rounded-2xl w-full max-w-md border border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500" />
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-colors mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-slate-300 p-6 relative z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto glass-panel rounded-2xl p-6 border border-slate-700/50">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-white">Content Management System</h1>
          <div className="flex gap-4">
            <a href="#" onClick={() => window.location.hash = ''} className="text-indigo-400 hover:text-indigo-300 font-medium px-4 py-2">View Live Site</a>
            <button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition-colors">Logout</button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Sections</h3>
            {Object.keys(ALL_DATA).map(key => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium ${activeTab === key ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'}`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} Data
              </button>
            ))}
          </div>
          
          <div className="md:col-span-3 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white capitalize">{activeTab} JSON Editor</h2>
              <div className="flex gap-3">
                <button onClick={handleReset} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Reset to File</button>
                <button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-lg transition-colors">Save Changes</button>
              </div>
            </div>
            
            {saveStatus && (
              <div className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium ${saveStatus.includes('successfully') ? 'bg-emerald-500/20 text-emerald-400' : saveStatus.includes('Reset') ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                {saveStatus}
              </div>
            )}

            <textarea
              className="w-full flex-grow min-h-[500px] bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:outline-none focus:border-indigo-500 shadow-inner resize-y"
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              spellCheck="false"
            />
            <p className="text-xs text-slate-500 mt-2">* Changes are written directly to your /src/data JSON files by Vite plugin and hot-reloaded automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
