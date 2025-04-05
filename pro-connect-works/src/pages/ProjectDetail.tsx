
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { api, Project, Bid } from '../services/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, DollarSign, Clock, User, ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaceBidOpen, setIsPlaceBidOpen] = useState(false);
  const [newBid, setNewBid] = useState({
    amount: 0,
    proposedTimeline: '',
    coverLetter: '',
  });

  const isFreelancer = user?.userType === 'freelancer';

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!projectId) return;

      setLoading(true);
      try {
        const projectData = await api.projects.getById(projectId);
        setProject(projectData);

        const projectBids = await api.bids.getByProject(projectId);
        setBids(projectBids);
      } catch (error) {
        console.error('Error fetching project details:', error);
        toast.error('Error loading project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handlePlaceBid = async () => {
    if (!projectId || !user?.id) return;

    if (!newBid.amount || !newBid.proposedTimeline || !newBid.coverLetter) {
      toast.error('Please fill out all required fields');
      return;
    }

    setLoading(true);
    try {
      const bid = await api.bids.create({
        projectId,
        freelancerId: user.id,
        amount: newBid.amount,
        proposedTimeline: newBid.proposedTimeline,
      });

      setBids([...bids, bid]);
      setIsPlaceBidOpen(false);
      toast.success('Bid placed successfully!');
      
      // Reset the form
      setNewBid({
        amount: 0,
        proposedTimeline: '',
        coverLetter: '',
      });
    } catch (error) {
      console.error('Error placing bid:', error);
      toast.error('Failed to place bid. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBid({
      ...newBid,
      [name]: name === 'amount' ? Number(value) : value,
    });
  };

  const hasUserBid = bids.some(bid => bid.freelancerId === user?.id);

  const getStatusColor = () => {
    if (!project) return '';
    switch (project.status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-500">Loading project details...</div>
        </div>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Project Not Found</h2>
          <p className="text-gray-600 mt-2">The project you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/projects')}
          >
            Return to Projects
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center mb-4" 
          onClick={() => navigate('/projects')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
        </Button>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge className={getStatusColor()}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
              <span className="text-gray-600 text-sm">
                Posted on {formatDate(project.createdAt)}
              </span>
            </div>
          </div>
          
          {isFreelancer && project.status === 'open' && !hasUserBid && (
            <Dialog open={isPlaceBidOpen} onOpenChange={setIsPlaceBidOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-light-purple">
                  Place a Bid
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Place a Bid on "{project.title}"</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Your Bid ($)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="Enter amount"
                        min="0"
                        value={newBid.amount || ''}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposedTimeline">Delivery Time</Label>
                      <Input
                        id="proposedTimeline"
                        name="proposedTimeline"
                        placeholder="E.g., 2 weeks"
                        value={newBid.proposedTimeline}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      placeholder="Explain why you're the right person for this project..."
                      rows={5}
                      value={newBid.coverLetter}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    className="bg-brand-purple hover:bg-brand-light-purple" 
                    onClick={handlePlaceBid}
                  >
                    Submit Bid
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          
          {isFreelancer && project.status === 'open' && hasUserBid && (
            <Badge className="bg-blue-100 text-blue-800 py-2 px-4 text-sm mt-4 md:mt-0">
              You have placed a bid on this project
            </Badge>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Project details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-gray-700">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
                  <span className="text-gray-500 text-sm mb-1 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" /> Budget
                  </span>
                  <span className="font-semibold text-lg">${project.budget.toLocaleString()}</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
                  <span className="text-gray-500 text-sm mb-1 flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Timeline
                  </span>
                  <span className="font-semibold">{project.timeline}</span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col">
                  <span className="text-gray-500 text-sm mb-1 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> Posted
                  </span>
                  <span className="font-semibold">{formatDate(project.createdAt)}</span>
                </div>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" /> Requirements
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Experience with similar projects</li>
                  <li>Attention to detail and meeting deadlines</li>
                  <li>Excellent communication skills</li>
                  <li>Ability to work independently</li>
                  <li>Portfolio of relevant work</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Bids section (Visible to the project owner/client) */}
          {!isFreelancer && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Bids ({bids.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {bids.length > 0 ? (
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <div key={bid.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>F{bid.freelancerId.slice(-1)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">Freelancer #{bid.freelancerId.slice(-2)}</h3>
                              <p className="text-sm text-gray-500">Bid placed on {formatDate(bid.createdAt)}</p>
                            </div>
                          </div>
                          <Badge className="bg-purple-100 text-purple-800">
                            ${bid.amount}
                          </Badge>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-600">
                          <p>Proposed timeline: <span className="font-medium">{bid.proposedTimeline}</span></p>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline">Contact</Button>
                          <Button className="bg-brand-purple hover:bg-brand-light-purple">
                            Accept Bid
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No bids yet for this project.
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Right column: Client info and actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {isFreelancer ? 'About the Client' : 'Project Owner'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {isFreelancer ? 'Client' : 'You'} #{project.clientId.slice(-2)}
                  </h3>
                  <p className="text-sm text-gray-500">Member since Jan 2023</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Projects Posted:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Hire Rate:</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">United States</span>
                </div>
              </div>
              
              {isFreelancer && (
                <Button 
                  variant="outline" 
                  className="w-full mt-6"
                >
                  Contact Client
                </Button>
              )}
            </CardContent>
          </Card>
          
          {isFreelancer && project.status === 'open' && !hasUserBid && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ready to bid?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Submit a proposal with your bid amount and timeline to work on this project.
                </p>
                <Button 
                  className="w-full bg-brand-purple hover:bg-brand-light-purple"
                  onClick={() => setIsPlaceBidOpen(true)}
                >
                  Place a Bid
                </Button>
              </CardContent>
            </Card>
          )}
          
          {isFreelancer && hasUserBid && (
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Badge className="bg-blue-100 text-blue-800 mr-2">
                    Bid Placed
                  </Badge>
                  Your Proposal
                </h3>
                {bids.filter(bid => bid.freelancerId === user?.id).map(bid => (
                  <div key={bid.id} className="space-y-2 text-sm">
                    <div className="flex justify-between mt-3">
                      <span className="text-gray-600">Your bid:</span>
                      <span className="font-semibold">${bid.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline:</span>
                      <span className="font-semibold">{bid.proposedTimeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-semibold capitalize">{bid.status}</span>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline"
                  className="w-full mt-4"
                >
                  Edit Proposal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
