import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import Portfolio from './Portfolio';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login';

// Import actual admin pages
import HeroAdmin from './admin/HeroAdmin';
import SkillsAdmin from './admin/SkillsAdmin';
import ServicesAdmin from './admin/ServicesAdmin';
import MapAdmin from './admin/MapAdmin';
import ContactAdmin from './admin/ContactAdmin';
import EventsAdmin from './admin/EventsAdmin';
import EventRegistrations from './admin/EventRegistrations';

// Placeholder admin pages components for now
const Dashboard = () => <div className="p-6">Select a section from the sidebar to edit.</div>;
const ProjectsAdmin = () => <div className="p-6">Projects Admin Content (Coming Soon)</div>;

const App = () => {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <ContentProvider>
            <Routes>
              {/* Public Portfolio */}
              <Route path="/" element={<Portfolio />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<Login />} />

              {/* Admin Protected Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="hero" element={<HeroAdmin />} />
                <Route path="skills" element={<SkillsAdmin />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="projects" element={<ProjectsAdmin />} />
                <Route path="events" element={<EventsAdmin />} />
                <Route path="events/:id/registrations" element={<EventRegistrations />} />
                <Route path="map" element={<MapAdmin />} />
                <Route path="contact" element={<ContactAdmin />} />
              </Route>
            </Routes>
          </ContentProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
};

export default App;
