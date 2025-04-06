
// import React from 'react';
// import { Calendar, DollarSign, Clock } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

// interface ProjectCardProps {
//   id: string;
//   title: string;
//   description: string;
//   budget: number;
//   timeline: string;
//   status: 'open' | 'in-progress' | 'completed';
//   createdAt: string;
//   onView?: (id: string) => void;
//   onBid?: (id: string) => void;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({
//   id,
//   title,
//   description,
//   budget,
//   timeline,
//   status,
//   createdAt,
//   onView,
//   onBid
// }) => {
//   const getStatusColor = () => {
//     switch (status) {
//       case 'open':
//         return 'bg-green-100 text-green-800';
//       case 'in-progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'completed':
//         return 'bg-gray-100 text-gray-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric' 
//     }).format(date);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
//       <div className="p-5">
//         <div className="flex items-start justify-between">
//           <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
//           <Badge className={`ml-2 ${getStatusColor()}`}>
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </Badge>
//         </div>
        
//         <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">{description}</p>
        
//         <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
//           <div className="flex items-center">
//             <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
//             <span>${budget.toLocaleString()}</span>
//           </div>
          
//           <div className="flex items-center">
//             <Clock className="h-4 w-4 text-gray-400 mr-1" />
//             <span>{timeline}</span>
//           </div>
          
//           <div className="flex items-center">
//             <Calendar className="h-4 w-4 text-gray-400 mr-1" />
//             <span>Posted {formatDate(createdAt)}</span>
//           </div>
//         </div>
        
//         <div className="flex space-x-2">
//           <Button 
//             variant="outline" 
//             className="flex-1" 
//             onClick={() => onView && onView(id)}
//           >
//             View Details
//           </Button>
          
//           {status === 'open' && onBid && (
//             <Button 
//               className="flex-1 bg-brand-purple hover:bg-brand-light-purple" 
//               onClick={() => onBid(id)}
//             >
//               Place Bid
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;






import React, { useState } from 'react';
import { Calendar, DollarSign, Clock, Star, CreditCard, Check, X, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'freelancer' | 'client';
  avatar: string;
  rating?: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  status: 'open' | 'in-progress' | 'completed';
  clientId: string;
  createdAt: string;
}

interface Bid {
  id: string;
  projectId: string;
  freelancerId: string;
  amount: number;
  proposedTimeline: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface Review {
  id: string;
  freelancerId: string;
  clientId: string;
  projectId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Extend the interface to include freelancer details that will be shown in the UI
interface ExtendedBid extends Bid {
  freelancerName?: string;
  freelancerAvatar?: string;
  coverLetter?: string;
}

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
  userType?: 'freelancer' | 'client';
  assignedFreelancer?: User;
  bids?: ExtendedBid[];
  freelancerReview?: Review | null;
  initialReview?: Review | null | undefined;
}

// Sample freelancer data for in-progress and completed projects
const sampleFreelancers: Record<string, User> = {
  'f1': {
    id: 'f1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    userType: 'freelancer',
    avatar: '',
    rating: 4.8
  },
  'f2': {
    id: 'f2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    userType: 'freelancer',
    avatar: '',
    rating: 4.5
  },
  'f3': {
    id: 'f3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    userType: 'freelancer',
    avatar: '',
    rating: 4.9
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  budget,
  timeline,
  status,
  createdAt,
  onView,
  onBid,
  userType = 'client',
  assignedFreelancer = status === 'in-progress' || status === 'completed' 
    ? (status === 'completed' ? sampleFreelancers.f2 : sampleFreelancers.f1)
    : undefined,
  bids = [
    {
      id: 'bid1',
      projectId: id,
      freelancerId: 'f1',
      freelancerName: 'John Smith',
      freelancerAvatar: '',
      amount: Math.round(budget * 0.9),
      proposedTimeline: '14 days',
      status: 'pending',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      coverLetter: 'I have extensive experience with similar projects and can deliver quality work within the timeline.'
    },
    {
      id: 'bid2',
      projectId: id,
      freelancerId: 'f2',
      freelancerName: 'Alice Johnson',
      freelancerAvatar: '',
      amount: Math.round(budget * 0.85),
      proposedTimeline: '10 days',
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      coverLetter: "I'm an expert in this field with over 5 years of experience and can complete this project efficiently."
    },
    {
      id: 'bid3',
      projectId: id,
      freelancerId: 'f3',
      freelancerName: 'Michael Chen',
      freelancerAvatar: '',
      amount: Math.round(budget * 1.1),
      proposedTimeline: '7 days',
      status: 'pending',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      coverLetter: 'I can deliver high-quality work in a shorter timeframe. My expertise allows me to work faster without compromising quality.'
    }
  ],
  freelancerReview,
  initialReview
}) => {
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isBidsDialogOpen, setIsBidsDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(budget);
  const [paymentNote, setPaymentNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [localBids, setLocalBids] = useState<ExtendedBid[]>(bids);
  const [localFreelancerReview, setFreelancerReview] = useState<Review | null | undefined>(initialReview);

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

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    // Create a new review object
    const newReview: Review = {
      id: `review-${Date.now()}`,
      freelancerId: assignedFreelancer?.id || 'unknown',
      clientId: 'c1', // Assuming current client id
      projectId: id,
      rating: rating,
      comment: reviewComment,
      createdAt: new Date().toISOString()
    };

    // Update the freelancer review state
    setFreelancerReview(newReview);

    // Here you would make an API call to submit the rating
    toast.success(`Thank you for rating ${assignedFreelancer?.name || 'the freelancer'} with ${rating} stars!`);
    setIsRatingDialogOpen(false);
    setRating(0);
    setReviewComment('');
  };

  const handleSubmitPayment = () => {
    if (paymentAmount <= 0) {
      toast.error('Please enter a valid payment amount');
      return;
    }

    if (paymentMethod === 'credit-card') {
      if (!creditCardInfo.cardNumber || !creditCardInfo.cardName || !creditCardInfo.expiryDate || !creditCardInfo.cvv) {
        toast.error('Please fill in all credit card details');
        return;
      }
    }

    // Here you would make an API call to process the payment
    toast.success(`Payment of $${paymentAmount} has been processed successfully!`);
    setIsPaymentDialogOpen(false);
    setPaymentAmount(budget);
    setPaymentNote('');
    setCreditCardInfo({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    });
  };

  const handleAcceptBid = (bidId: string) => {
    setLocalBids(localBids.map(bid => {
      if (bid.id === bidId) {
        return { ...bid, status: 'accepted' };
      } else {
        return { ...bid, status: 'rejected' };
      }
    }));
    
    toast.success('Bid accepted successfully!');
  };

  const handleRejectBid = (bidId: string) => {
    setLocalBids(localBids.map(bid => {
      if (bid.id === bidId) {
        return { ...bid, status: 'rejected' };
      }
      return bid;
    }));
    
    toast.success('Bid rejected');
  };

  const renderStars = (count: number, interactive = true) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`${interactive ? 'cursor-pointer' : ''} h-${interactive ? '8' : '4'} w-${interactive ? '8' : '4'} ${
          i < (interactive ? (hoveredStar || rating) : count) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
        onMouseEnter={() => interactive && setHoveredStar(i + 1)}
        onMouseLeave={() => interactive && setHoveredStar(0)}
        onClick={() => interactive && setRating(i + 1)}
      />
    ));
  };

  const renderFreelancerInfo = () => {
    if ((status === 'in-progress' || status === 'completed') && assignedFreelancer) {
      return (
        <div className="flex items-center mt-2 mb-4 bg-gray-50 p-2 rounded">
          <Avatar className="h-8 w-8 mr-2">
            {assignedFreelancer.avatar ? (
              <AvatarImage src={assignedFreelancer.avatar} alt={assignedFreelancer.name} />
            ) : (
              <AvatarFallback>{assignedFreelancer.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{assignedFreelancer.name}</p>
              {assignedFreelancer.rating && (
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{assignedFreelancer.rating}</span>
                  <div className="flex">
                    {renderStars(assignedFreelancer.rating, false)}
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              {status === 'in-progress' ? 'Working on this project' : 'Completed this project'}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderReviewInfo = () => {
    if (status === 'completed' && localFreelancerReview) {
      return (
        <div className="mt-2 mb-4 bg-yellow-50 p-3 rounded border border-yellow-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Your Rating</span>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">{localFreelancerReview.rating}</span>
              <div className="flex">
                {renderStars(localFreelancerReview.rating, false)}
              </div>
            </div>
          </div>
          {localFreelancerReview.comment && (
            <p className="text-xs text-gray-600 mt-2 italic">"{localFreelancerReview.comment}"</p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderActionButtons = () => {
    // For completed projects - client can rate and pay
    if (status === 'completed' && userType === 'client') {
      return (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => onView && onView(id)}
          >
            View Details
          </Button>
          {!localFreelancerReview && (
            <Button 
              className="flex-1 bg-yellow-500 hover:bg-yellow-600" 
              onClick={() => setIsRatingDialogOpen(true)}
            >
              <Star className="h-4 w-4 mr-2" /> Rate
            </Button>
          )}
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700" 
            onClick={() => setIsPaymentDialogOpen(true)}
          >
            <CreditCard className="h-4 w-4 mr-2" /> Pay
          </Button>
        </div>
      );
    }
    
    // For open projects - client can view bids, freelancer can place bid
    if (status === 'open') {
      if (userType === 'client') {
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => onView && onView(id)}
            >
              View Details
            </Button>
            <Button 
              className="flex-1 bg-brand-purple hover:bg-brand-light-purple" 
              onClick={() => setIsBidsDialogOpen(true)}
            >
              View Bids ({localBids.filter(bid => bid.status === 'pending').length})
            </Button>
          </div>
        );
      } else if (userType === 'freelancer') {
        const hasBid = localBids.some(bid => bid.freelancerId === 'f1'); // Assuming current user is f1
        return (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => onView && onView(id)}
            >
              View Details
            </Button>
            {!hasBid && onBid && (
              <Button 
                className="flex-1 bg-brand-purple hover:bg-brand-light-purple" 
                onClick={() => onBid && onBid(id)}
              >
                Place Bid
              </Button>
            )}
            {hasBid && (
              <Button 
                className="flex-1 bg-blue-100 text-blue-800" 
                variant="outline"
                disabled
              >
                Bid Placed
              </Button>
            )}
          </div>
        );
      }
    }

    // For in-progress projects
    if (status === 'in-progress') {
      return (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => onView && onView(id)}
          >
            View Details
          </Button>
          {userType === 'client' && (
            <Button 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Message Freelancer
            </Button>
          )}
        </div>
      );
    }

    // Default buttons
    return (
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={() => onView && onView(id)}
        >
          View Details
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
        <div className="p-5">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
            <Badge className={`ml-2 ${getStatusColor()}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
          
          {renderFreelancerInfo()}
          {renderReviewInfo()}
          
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
          
          {renderActionButtons()}
        </div>
      </div>

      {/* Rating Dialog */}
      <Dialog open={isRatingDialogOpen} onOpenChange={setIsRatingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate Freelancer</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {assignedFreelancer && (
              <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-3">
                  {assignedFreelancer.avatar ? (
                    <AvatarImage src={assignedFreelancer.avatar} alt={assignedFreelancer.name} />
                  ) : (
                    <AvatarFallback>{assignedFreelancer.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-semibold">{assignedFreelancer.name}</h3>
                  <p className="text-sm text-gray-500">Completed {title}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label>Your Rating</Label>
                <div className="flex space-x-1 mt-2">
                  {renderStars(0, true)}
                </div>
              </div>

              <div>
                <Label htmlFor="reviewComment">Review Comment (Optional)</Label>
                <Textarea
                  id="reviewComment"
                  placeholder="Share your experience working with this freelancer..."
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRatingDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-brand-purple hover:bg-brand-light-purple" 
              onClick={handleSubmitRating}
            >
              Submit Rating
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Process Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {assignedFreelancer && (
              <div className="flex items-center mb-6">
                <Avatar className="h-12 w-12 mr-3">
                  {assignedFreelancer.avatar ? (
                    <AvatarImage src={assignedFreelancer.avatar} alt={assignedFreelancer.name} />
                  ) : (
                    <AvatarFallback>{assignedFreelancer.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-semibold">{assignedFreelancer.name}</h3>
                  <p className="text-sm text-gray-500">Payment for: {title}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="paymentAmount">Payment Amount ($)</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Payment Method</Label>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2 bg-white border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      Credit/Debit Card
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === 'credit-card' && (
                <div className="space-y-3 p-3 border rounded-md bg-gray-50">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={creditCardInfo.cardNumber}
                      onChange={(e) => setCreditCardInfo({...creditCardInfo, cardNumber: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Smith"
                      value={creditCardInfo.cardName}
                      onChange={(e) => setCreditCardInfo({...creditCardInfo, cardName: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={creditCardInfo.expiryDate}
                        onChange={(e) => setCreditCardInfo({...creditCardInfo, expiryDate: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={creditCardInfo.cvv}
                        onChange={(e) => setCreditCardInfo({...creditCardInfo, cvv: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="paymentNote">Payment Note (Optional)</Label>
                <Textarea
                  id="paymentNote"
                  placeholder="Add a note for this payment..."
                  rows={2}
                  value={paymentNote}
                  onChange={(e) => setPaymentNote(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Payment Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Project budget:</span>
                  <span>${budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Processing fee (2%):</span>
                  <span>${(paymentAmount * 0.02).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t border-blue-200">
                  <span>Total:</span>
                  <span>${(paymentAmount * 1.02).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleSubmitPayment}
            >
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bids Dialog */}
      <Dialog open={isBidsDialogOpen} onOpenChange={setIsBidsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Bids for {title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {localBids.length > 0 ? (
              <div className="space-y-4">
                {localBids.filter(bid => bid.status !== 'rejected').map((bid) => (
                  <div 
                    key={bid.id} 
                    className={`border rounded-lg p-4 transition-colors ${
                      bid.status === 'accepted' ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>{bid.freelancerName?.[0] || 'UF'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{bid.freelancerName || `Freelancer #${bid.freelancerId.slice(-2)}`}</h3>
                          <p className="text-sm text-gray-500">Bid placed on {formatDate(bid.createdAt)}</p>
                        </div>
                      </div>
                      <Badge className={` ${bid.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                        {bid.status === 'accepted' ? 'Accepted' : `$${bid.amount}`}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <p>Proposed timeline: <span className="font-medium">{bid.proposedTimeline}</span></p>
                    </div>
                    
                    {bid.coverLetter && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">{bid.coverLetter}</p>
                      </div>
                    )}
                    
                    {bid.status === 'pending' && (
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          className="text-gray-600"
                          onClick={() => handleRejectBid(bid.id)}
                        >
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                        <Button 
                          className="bg-brand-purple hover:bg-brand-light-purple"
                          onClick={() => handleAcceptBid(bid.id)}
                        >
                          <Check className="h-4 w-4 mr-1" /> Accept Bid
                        </Button>
                      </div>
                    )}
                    
                    {bid.status === 'accepted' && (
                      <div className="mt-4 flex justify-end gap-2">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Message Freelancer
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">No bids yet</p>
                <p className="mt-1">No freelancers have bid on this project yet.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsBidsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;