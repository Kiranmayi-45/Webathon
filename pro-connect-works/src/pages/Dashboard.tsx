
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/cards/StatCard';
import ProjectCard from '../components/cards/ProjectCard';
import { api, Project } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Briefcase, CheckCircle, Clock, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [freelancerStats, setFreelancerStats] = useState<any>(null);
  const [clientStats, setClientStats] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const isFreelancer = user?.userType === 'freelancer';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats based on user type
        if (isFreelancer) {
          const stats = await api.stats.getFreelancerStats(user?.id || '');
          setFreelancerStats(stats);
        } else {
          const stats = await api.stats.getClientStats(user?.id || '');
          setClientStats(stats);
        }

        // Fetch recent projects for both user types
        const allProjects = await api.projects.getAll();
        setRecentProjects(allProjects.slice(0, 3));

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isFreelancer, user?.id]);

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleBidOnProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-500">Loading dashboard...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name}. Here's an overview of your {isFreelancer ? 'freelancing' : 'project'} activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isFreelancer ? (
          // Freelancer Stats
          <>
            <StatCard
              title="Total Earnings"
              value={`$${freelancerStats?.totalEarnings.toLocaleString()}`}
              subtitle="USD"
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Ongoing Projects"
              value={freelancerStats?.ongoingProjects}
              icon={<Briefcase className="h-5 w-5" />}
            />
            <StatCard
              title="Completed Projects"
              value={freelancerStats?.completedProjects}
              icon={<CheckCircle className="h-5 w-5" />}
            />
            <StatCard
              title="Average Rating"
              value={freelancerStats?.averageRating}
              subtitle="out of 5"
              icon={<Award className="h-5 w-5" />}
              change={{ value: "+0.2", positive: true }}
            />
          </>
        ) : (
          // Client Stats
          <>
            <StatCard
              title="My Spending"
              value={`$${clientStats?.totalSpending.toLocaleString()}`}
              subtitle="USD"
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatCard
              title="Ongoing Projects"
              value={clientStats?.ongoingProjects}
              icon={<Briefcase className="h-5 w-5" />}
            />
            <StatCard
              title="Completed Projects"
              value={clientStats?.completedProjects}
              icon={<CheckCircle className="h-5 w-5" />}
            />
            <StatCard
              title="Open Projects"
              value={clientStats?.openProjects}
              icon={<Clock className="h-5 w-5" />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {isFreelancer ? 'Monthly Earnings' : 'Monthly Spending'}
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={isFreelancer ? freelancerStats?.monthlyEarnings : clientStats?.monthlySpending}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value) => [`$${value}`, isFreelancer ? 'Earnings' : 'Spending']} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={isFreelancer ? "#7C5DFA" : "#1976D2"}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right column: Project status or Pending bids */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          {isFreelancer ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">Pending Bids</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-brand-purple">
                  {freelancerStats?.pendingBids}
                </span>
                <span className="text-sm text-gray-500">Active proposals</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                You have {freelancerStats?.pendingBids} pending bids waiting for client response.
              </p>
              
              <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
              <div className="space-y-2">
                <button 
                  className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 text-left transition"
                  onClick={() => navigate('/projects')}
                >
                  Browse available projects
                </button>
                <button 
                  className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 text-left transition"
                  onClick={() => navigate('/profile')}
                >
                  Update your profile
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Project Status</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold">
                  {clientStats?.projectProgress.completed}/{clientStats?.projectProgress.total}
                </span>
                <span className="text-sm text-gray-500">Tasks Complete</span>
              </div>
              <div className="mb-2">
                <Progress 
                  value={(clientStats?.projectProgress.completed / clientStats?.projectProgress.total) * 100} 
                  className="h-2"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">{Math.round((clientStats?.projectProgress.completed / clientStats?.projectProgress.total) * 100)}%</span> of your project tasks are completed.
              </p>
              
              <h2 className="text-lg font-semibold mb-2 mt-6">Projects Count</h2>
              <div className="flex items-center mb-4">
                <div className="text-3xl font-bold">
                  140<span className="text-xl text-brand-blue">+</span>
                </div>
                <div className="ml-3">
                  <span className="text-sm font-medium text-green-600">+1 project</span>
                  <p className="text-xs text-gray-500">Compared to last month</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <button 
            className="text-sm font-medium text-brand-purple hover:underline"
            onClick={() => navigate('/projects')}
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              budget={project.budget}
              timeline={project.timeline}
              status={project.status}
              createdAt={project.createdAt}
              onView={handleViewProject}
              onBid={isFreelancer && project.status === 'open' ? handleBidOnProject : undefined}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
