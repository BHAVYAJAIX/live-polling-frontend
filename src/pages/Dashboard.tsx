import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trash2, AlertTriangle } from 'lucide-react';
// import { pollService } from '../utils/pollService';
import Layout from './Layout'
export const Dashboard: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'active' | 'completed'>('all');
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  interface Poll {
  id: string;
  questionText: string;
  options: string[];
  startTime: string;
  duration: number;
  status: 'upcoming' | 'active' | 'past';
}

  useEffect(() => {
    loadPolls();
  }, []);

  const loadPolls = () => {
    fetch('http://localhost:3000/admin/myQuestions', {
        method: 'GET',
        headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if(response.status === 401 || response.status === 403) {
            alert('Session expired. Please login again.');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/admin/login';
        }
        if(response.status === 404) {
            return [];
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setPolls(data);
    })
    .catch(error => {
        console.error('Error fetching polls:', error);
    })
  };

  const handleDeletePoll = (id: string) => {
    try{
        fetch(`http://localhost:3000/admin/deleteQuestion/${id}`, {
            method: 'POST',
            headers: {
                contentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            loadPolls();
            setShowDeleteModal(null);
        })
        .catch(error => {
            console.error('Error deleting poll:', error);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    setShowDeleteModal(null);
  };

  const filteredPolls = polls.filter(poll => {
    if (filter === 'all') return true;
    return poll.status === filter;
  });

  const getStatusBadge = (status: Poll['status']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'upcoming':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'past':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return baseClasses;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeUntilStart = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diffMs = start.getTime() - now.getTime();
    
    if (diffMs <= 0) return null;
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `Starts in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    if (diffHours > 0) return `Starts in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    if (diffMins > 0) return `Starts in ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    
    return 'Starting soon';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Poll Dashboard</h1>
            <p className="text-gray-600">Manage and monitor your polling campaigns</p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Polls</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredPolls.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No polls found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't created any polls yet. Start by creating your first poll!"
                : `No ${filter} polls found. Try changing the filter or create a new poll.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredPolls.map((poll) => (
              <div key={poll.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={getStatusBadge(poll.status)}>
                        {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
                      </span>
                      {poll.status === 'upcoming' && getTimeUntilStart(poll.startTime) && (
                        <span className="text-sm text-amber-600 font-medium">
                          {getTimeUntilStart(poll.startTime)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{poll.questionText}</h3>
                  </div>
                  
                  <button
                    onClick={() => setShowDeleteModal(poll.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(poll.startTime)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{poll.duration} minutes</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{poll.options.length} options</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="grid gap-2">
                    {poll.options.map((option, index) => (
                      <div key={index} className="flex itemfs-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{option}</span>
                        <span className="text-xs text-gray-500">Option {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this poll? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePoll(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;