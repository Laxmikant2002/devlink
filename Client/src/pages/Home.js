import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { developerService } from '../services/api';

function Home() {
  const [developers, setDevelopers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Debounced search effect - handles both initial load and search
    const timeoutId = setTimeout(() => {
      fetchDevelopers(search);
    }, search === '' ? 0 : 300); // No delay for initial load, 300ms delay for search

    return () => clearTimeout(timeoutId);
  }, [search]);

  const fetchDevelopers = async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);
      const data = await developerService.getAll(searchTerm);
      setDevelopers(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching developers:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && developers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading developers</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => fetchDevelopers()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Discover Amazing Developers
        </h1>
        <p className="text-gray-600">
          Connect with talented developers from around the world
        </p>
      </div>

      {/* Search and Add Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, skill, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Developer
        </Link>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {developers.length} developer{developers.length !== 1 ? 's' : ''} found
        </p>
        {loading && (
          <div className="flex items-center text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            Searching...
          </div>
        )}
      </div>

      {/* Developers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {developers.map((developer) => (
          <Link
            key={developer.id}
            to={`/developer/${developer.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={developer.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&background=3b82f6&color=ffffff`}
                  alt={developer.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(developer.name)}&background=3b82f6&color=ffffff`;
                  }}
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {developer.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {developer.location}
                  </p>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {developer.primarySkill}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {developer.skills.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
                {developer.skills.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    +{developer.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {developers.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No developers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search terms or add a new developer.
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
