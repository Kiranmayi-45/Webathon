
import React from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface PostCardProps {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorType: 'freelancer' | 'client';
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  authorName,
  authorAvatar,
  authorType,
  content,
  image,
  likes,
  comments,
  createdAt,
  onLike,
  onComment,
  onShare
}) => {
  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} min ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium text-gray-900">{authorName}</h3>
                <Badge color={authorType === 'freelancer' ? 'brand-purple' : 'brand-blue'} className="ml-2">
                  {authorType === 'freelancer' ? 'Freelancer' : 'Client'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-800 whitespace-pre-line">{content}</p>
        </div>
        
        {image && (
          <div className="rounded-md overflow-hidden mb-4">
            <img 
              src={image} 
              alt="Post attachment" 
              className="w-full h-auto object-cover"
              style={{ maxHeight: '400px' }} 
            />
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t">
          <div className="flex space-x-1">
            <span>{likes}</span>
            <span>likes</span>
            <span>•</span>
            <span>{comments}</span>
            <span>comments</span>
          </div>
        </div>
        
        <div className="flex mt-3 pt-3 border-t">
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center"
            onClick={() => onLike && onLike(id)}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center"
            onClick={() => onComment && onComment(id)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center"
            onClick={() => onShare && onShare(id)}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

// Custom Badge component
const Badge = ({ children, className, color = 'gray' }) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    'brand-purple': 'bg-purple-100 text-purple-800',
    'brand-blue': 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  );
};

export default PostCard;
