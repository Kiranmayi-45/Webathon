
import React from 'react';
import { Calendar, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
  onView?: (id: string) => void;
  onBid?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  budget,
  timeline,
  status,
  createdAt,
  onView,
  onBid
}) => {
  const getStatusColor = () => {
    switch (status) {
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
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
          <Badge className={`ml-2 ${getStatusColor()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">{description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
            <span>${budget.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            <span>{timeline}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
            <span>Posted {formatDate(createdAt)}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => onView && onView(id)}
          >
            View Details
          </Button>
          
          {status === 'open' && onBid && (
            <Button 
              className="flex-1 bg-brand-purple hover:bg-brand-light-purple" 
              onClick={() => onBid(id)}
            >
              Place Bid
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
