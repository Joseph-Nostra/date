import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DateProvider } from './context/DateContext';
import BottomNav from './components/BottomNav';
import MusicPlayer from './components/MusicPlayer';
import FloatingPetals from './components/FloatingPetals';
import Home from './pages/Home';
import PlanDate from './pages/PlanDate';
import ChoosePlace from './pages/ChoosePlace';
import DateDetails from './pages/DateDetails';
import MyDates from './pages/MyDates';
import DateMemory from './pages/DateMemory';

export default function App() {
  return (
    <BrowserRouter>
      <DateProvider>
        <div className="relative min-h-[100dvh] max-w-[430px] mx-auto overflow-hidden"
          style={{
            boxShadow: '0 0 80px rgba(168, 23, 68, 0.1)',
          }}>
          {/* Background petals */}
          <FloatingPetals />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<PlanDate />} />
            <Route path="/places" element={<ChoosePlace />} />
            <Route path="/details" element={<DateDetails />} />
            <Route path="/my-dates" element={<MyDates />} />
            <Route path="/memory" element={<DateMemory />} />
          </Routes>

          {/* Music player */}
          <MusicPlayer />

          {/* Bottom navigation */}
          <BottomNav />
        </div>
      </DateProvider>
    </BrowserRouter>
  );
}
