import React, { useState } from 'react';

const InterviewTable: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const interviewStatuses = [
    'Applied',
    'HR Round',
    'Technical Round 1',
    'Technical Round 2',
    'Manager Round',
    'Selected',
    'Rejected',
    'Offer Received',
    'Joined'
  ];

  // Sample data - replace with actual data from API
  const sampleData = [
    {
      id: 1,
      candidateName: 'John Doe',
      position: 'Software Engineer',
      status: 'Technical Round 1',
      appliedDate: '2024-01-15',
      company: 'Tech Corp'
    },
    {
      id: 2,
      candidateName: 'Jane Smith',
      position: 'Frontend Developer',
      status: 'HR Round',
      appliedDate: '2024-01-10',
      company: 'Web Solutions'
    },
    {
      id: 3,
      candidateName: 'Mike Johnson',
      position: 'Full Stack Developer',
      status: 'Joined',
      appliedDate: '2023-12-01',
      company: 'Startup Inc'
    },
    {
      id: 4,
      candidateName: 'Sarah Williams',
      position: 'DevOps Engineer',
      status: 'Selected',
      appliedDate: '2024-01-20',
      company: 'Cloud Systems'
    },
    {
      id: 5,
      candidateName: 'Tom Brown',
      position: 'QA Engineer',
      status: 'Rejected',
      appliedDate: '2024-01-05',
      company: 'Quality First'
    }
  ];

  const filteredData = selectedFilter === 'all' 
    ? sampleData 
    : sampleData.filter(item => item.status === selectedFilter);

  const getStatusBadgeColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
      'Applied': 'bg-blue-100 text-blue-800',
      'HR Round': 'bg-yellow-100 text-yellow-800',
      'Technical Round 1': 'bg-purple-100 text-purple-800',
      'Technical Round 2': 'bg-indigo-100 text-indigo-800',
      'Manager Round': 'bg-orange-100 text-orange-800',
      'Selected': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Offer Received': 'bg-cyan-100 text-cyan-800',
      'Joined': 'bg-emerald-100 text-emerald-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Interview Tracker</h2>

      {/* Filter Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Filter by Status:</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedFilter === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All Results
          </button>
          {interviewStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedFilter === status
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Candidate Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.candidateName}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.company}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.appliedDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No interviews found for the selected filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-4 text-sm text-gray-600">
        Showing <span className="font-semibold">{filteredData.length}</span> of <span className="font-semibold">{sampleData.length}</span> results
      </div>
    </div>
  );
};

export default InterviewTable;