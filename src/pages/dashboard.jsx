import React, { useEffect, useState } from "react";
import Navbar from "../components/nav.jsx";
import WidgetCard from "../components/WidgetCard";
import '../index.css'


const text = [
  "One app. Endless breakthroughs. Learning just found its smartest form.",
  "Level up with content from top creators, tutors, and tools — no stress, just progress.",
  "From first question to final exam, Athena is your AI-powered study partner."];

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState(null); 

  

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      performSearch(query);
    }, 500); 

    setDebounceTimeout(timeout);
  };


  const performSearch = async (query) => {
   if (!query) {
      setSearchResults(null); // clear results if query is empty
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        credentials: 'include',  // if using cookies for auth
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const results = await response.json();
      setSearchResults(results);  // save results to state     
      console.log('Search results:', results);

    } catch (error) {
      console.error('Error during search:', error);
      setSearchResults(null);
    }finally {
    setIsLoading(false);
    }
  };


  useEffect(() => {
    const fetchDashboardData = async () => {
        try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:5000/api/dashboard/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setActivities(data.recentActivities || []);
        setSchedule(data.schedule || []);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      }
    };

    fetchDashboardData();
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % text.length);
      }, 5000); 
      return () => clearInterval(interval);
    }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      
      {/* Hero Slider Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
            <div className="twinkle-bg"></div> 
          <h2 className="text-4xl font-bold mb-4">
            Unlock a Smarter Way to Learn
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl transition-opacity duration-1000 ease-in-out">
            {text[currentIndex]}
          </p>
        {/* Search bar */}
        <div className="bg-white rounded-1-md flex w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search courses, videos, notes..."
                  className="flex-grow px-4 py-3 rounded-1-md text-black"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="bg-blue-600 px-6 py-3 rounded-1-md hover:bg-blue-700 transition" onClick={() => performSearch(searchQuery)}> 
                  Search
                </button>
        <div/>
        {isLoading && (
          <div className="text-center text-gray-300 mt-2">Loading...</div>
        )}
        {/* Search results */}
      {searchResults && !isLoading && (
        <div className="search-results bg-gray-800 text-white p-4 rounded mt-4 max-w-lg mx-auto">
          <h4 className="text-lg font-semibold mb-2">Search Results</h4>

          {searchResults.courses?.length > 0 && (
            <>
              <h5 className="font-semibold">Courses:</h5>
              <ul className="mb-4 list-disc list-inside">
                {searchResults.courses.map((course) => (
                  <li key={course._id}>{course.title}</li>
                ))}
              </ul>
            </>
          )}

          {searchResults.videos?.length > 0 && (
            <>
              <h5 className="font-semibold">Videos:</h5>
              <ul className="mb-4 list-disc list-inside">
                {searchResults.videos.map((video) => (
                  <li key={video._id}>{video.title}</li>
                ))}
              </ul>
            </>
          )}

          {searchResults.notes?.length > 0 && (
            <>
              <h5 className="font-semibold">Notes:</h5>
              <ul className="mb-4 list-disc list-inside">
                {searchResults.notes.map((note) => (
                  <li key={note._id}>{note.content.slice(0, 50)}...</li>
                ))}
              </ul>
            </>
          )}

          {searchResults.courses.length === 0 &&
           searchResults.videos.length === 0 &&
           searchResults.notes.length === 0 && (
             <p>No results found for your search.</p>
          )}
        </div>       
      )}
          </div>
        </div>
      </div>

      {/* Horizontal Widgets */}
   
        <div className="bg-gray-900 w-full o h-[40vh]  px-6 py-8">
          <div className="flex gap-6  min-w-full ">
            <WidgetCard className="flex-1 min-w-[200px]" icon="Clock" title="Study Time" value="24hrs" note="+2.5 hours from last week" color="blue" />
            <WidgetCard className="flex-1 min-w-[200px]" icon="ClipboardCheck" title="Completed Quizzes" value="18" note="+5 from last week" color="green" />
            <WidgetCard className="flex-1 min-w-[200px]" icon="PlayCircle" title="Video Analyzed" value="8" note="+2 from last week" color="yellow" />
            <WidgetCard className="flex-1 min-w-[200px]" icon="Notebook" title="Notes Generated" value="76" note="+3 from last weekl" color="red" />
          </div>
        </div>
      {/* Recent Activities*/}
        <div className="w-full px-6 py-8 grid grid-cols-3 gap-6">
            {/* Recent Activity (takes 2/3 width) */}
            <section className="bg-gray-900 rounded-lg p-6 text-white shadow-md col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <h6>Your learning activities from the past week</h6>
                <br />
              <ul className="space-y-2 text-gray-300 mb-6">
                {activities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              </div>
              <button className="self-start bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition">
                View More
              </button>
            </section>

          {/* Today's Schedule */}
            <section className="bg-gray-900 rounded-lg p-6 text-white shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Today's Schedule</h3>
              <ul className="space-y-2 text-gray-300 mb-6">
                {schedule.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              </div>
              <button className="self-start bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition">
                View More
              </button>
            </section>
        </div>


    </div>
  );
};

export default Dashboard;
