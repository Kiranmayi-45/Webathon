// Types
export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'freelancer' | 'client';
  avatar: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  timeline: string;
  status: 'open' | 'in-progress' | 'completed';
  clientId: string;
  createdAt: string;
  freelancerId?: string;
  freelancer?: {
    id: string;
    name: string;
    rating?: number;
  };
}

export interface Bid {
  id: string;
  projectId: string;
  freelancerId: string;
  amount: number;
  proposedTimeline: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Review {
  id: string;
  freelancerId: string;
  clientId: string;
  projectId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: {
    text: string;
    senderId: string;
    timestamp: string;
  };
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface Post {
  id: string;
  authorId: string;
  authorType: 'freelancer' | 'client';
  authorName: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

// Mock API functions
export const api = {
  auth: {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo, return a mock user based on email
      const isFreelancer = email.includes('freelancer');
      return {
        user: {
          id: isFreelancer ? 'f1' : 'c1',
          name: isFreelancer ? 'John Freelancer' : 'Alice Client',
          email,
          userType: isFreelancer ? 'freelancer' : 'client',
          avatar: `/avatar-${isFreelancer ? 'male' : 'female'}.png`
        },
        token: 'mock-jwt-token'
      };
    },
    
    register: async (userData: Partial<User>): Promise<{ user: User; token: string }> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        user: {
          id: Math.random().toString(36).substring(2, 9),
          name: userData.name || 'New User',
          email: userData.email || 'user@example.com',
          userType: userData.userType || 'freelancer',
          avatar: userData.userType === 'freelancer' ? '/avatar-male.png' : '/avatar-female.png'
        },
        token: 'mock-jwt-token'
      };
    }
  },
  
  projects: {
    getAll: async (): Promise<Project[]> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return [
        {
          id: 'p1',
          title: 'Website Redesign',
          description: 'Need a modern, responsive website redesign for a small business.',
          budget: 1500,
          timeline: '2 weeks',
          status: 'open',
          clientId: 'c1',
          createdAt: '2023-08-15T10:30:00Z'
        },
        {
          id: 'p2',
          title: 'Mobile App Development',
          description: 'Looking for a skilled developer to create an iOS/Android app.',
          budget: 5000,
          timeline: '1 month',
          status: 'in-progress',
          clientId: 'c2',
          createdAt: '2023-08-10T14:20:00Z'
        },
        {
          id: 'p3',
          title: 'Logo Design',
          description: 'Need a professional logo for a new startup.',
          budget: 500,
          timeline: '1 week',
          status: 'completed',
          clientId: 'c3',
          createdAt: '2023-08-05T09:15:00Z'
        },
        {
          id: 'p4',
          title: 'Content Writing',
          description: 'Seeking a content writer for blog posts and web copy.',
          budget: 800,
          timeline: '3 weeks',
          status: 'open',
          clientId: 'c1',
          createdAt: '2023-08-12T11:45:00Z'
        },
        {
          id: 'p5',
          title: 'SEO Optimization',
          description: 'Need help improving SEO rankings for an e-commerce site.',
          budget: 1200,
          timeline: '1 month',
          status: 'in-progress',
          clientId: 'c2',
          createdAt: '2023-08-08T13:00:00Z'
        }
      ];
    },
    
    getById: async (projectId: string): Promise<Project> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const projects = await api.projects.getAll();
      const project = projects.find(p => p.id === projectId);
      
      if (!project) {
        throw new Error('Project not found');
      }
      
      return project;
    },
    
    create: async (projectData: Partial<Project>): Promise<Project> => {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        title: projectData.title || 'Untitled Project',
        description: projectData.description || '',
        budget: projectData.budget || 0,
        timeline: projectData.timeline || '',
        status: 'open',
        clientId: projectData.clientId || 'c1',
        createdAt: new Date().toISOString()
      };
    }
  },
  
  bids: {
    getByProject: async (projectId: string): Promise<Bid[]> => {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return [
        {
          id: 'b1',
          projectId,
          freelancerId: 'f1',
          amount: 1200,
          proposedTimeline: '10 days',
          status: 'pending',
          createdAt: '2023-08-16T09:00:00Z'
        },
        {
          id: 'b2',
          projectId,
          freelancerId: 'f2',
          amount: 1500,
          proposedTimeline: '14 days',
          status: 'pending',
          createdAt: '2023-08-16T10:30:00Z'
        },
        {
          id: 'b3',
          projectId,
          freelancerId: 'f3',
          amount: 1350,
          proposedTimeline: '12 days',
          status: 'pending',
          createdAt: '2023-08-16T11:45:00Z'
        }
      ];
    },
    
    create: async (bidData: Partial<Bid>): Promise<Bid> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        projectId: bidData.projectId || 'p1',
        freelancerId: bidData.freelancerId || 'f1',
        amount: bidData.amount || 0,
        proposedTimeline: bidData.proposedTimeline || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    }
  },
  
  reviews: {
    getByFreelancer: async (freelancerId: string): Promise<Review[]> => {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      return [
        {
          id: 'r1',
          freelancerId,
          clientId: 'c1',
          projectId: 'p1',
          rating: 5,
          comment: 'Excellent work! Delivered on time and exceeded expectations.',
          createdAt: '2023-07-20T14:30:00Z'
        },
        {
          id: 'r2',
          freelancerId,
          clientId: 'c2',
          projectId: 'p2',
          rating: 4,
          comment: 'Great work overall. Very responsive and professional.',
          createdAt: '2023-07-15T10:45:00Z'
        },
        {
          id: 'r3',
          freelancerId,
          clientId: 'c3',
          projectId: 'p3',
          rating: 5,
          comment: 'Absolutely amazing! Will definitely hire again.',
          createdAt: '2023-07-10T16:20:00Z'
        }
      ];
    },
    
    create: async (reviewData: Partial<Review>): Promise<Review> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        freelancerId: reviewData.freelancerId || 'f1',
        clientId: reviewData.clientId || 'c1',
        projectId: reviewData.projectId || 'p1',
        rating: reviewData.rating || 5,
        comment: reviewData.comment || '',
        createdAt: new Date().toISOString()
      };
    }
  },
  
  conversations: {
    getAll: async (): Promise<Conversation[]> => {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      return [
        {
          id: 'conv1',
          participants: ['c1', 'f1'],
          lastMessage: {
            text: "That sounds good to me. Let's proceed with the project.",
            senderId: 'c1',
            timestamp: '2023-08-17T13:45:00Z'
          }
        },
        {
          id: 'conv2',
          participants: ['c1', 'f2'],
          lastMessage: {
            text: "I've reviewed your portfolio and I'm interested in working with you.",
            senderId: 'f2',
            timestamp: '2023-08-16T15:20:00Z'
          }
        },
        {
          id: 'conv3',
          participants: ['c2', 'f1'],
          lastMessage: {
            text: "Could you provide more details about your rates?",
            senderId: 'c2',
            timestamp: '2023-08-15T10:30:00Z'
          }
        }
      ];
    },
    
    getMessages: async (conversationId: string): Promise<Message[]> => {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return [
        {
          id: 'm1',
          conversationId,
          senderId: 'c1',
          text: "Hi, I'm interested in your services for my project.",
          timestamp: '2023-08-17T13:30:00Z'
        },
        {
          id: 'm2',
          conversationId,
          senderId: 'f1',
          text: "Hello! Thanks for reaching out. I'd be happy to help with your project.",
          timestamp: '2023-08-17T13:35:00Z'
        },
        {
          id: 'm3',
          conversationId,
          senderId: 'c1',
          text: "Great! Here are some details about what I need...",
          timestamp: '2023-08-17T13:40:00Z'
        },
        {
          id: 'm4',
          conversationId,
          senderId: 'f1',
          text: "I understand your requirements. I can definitely help with this.",
          timestamp: '2023-08-17T13:42:00Z'
        },
        {
          id: 'm5',
          conversationId,
          senderId: 'c1',
          text: "That sounds good to me. Let's proceed with the project.",
          timestamp: '2023-08-17T13:45:00Z'
        }
      ];
    },
    
    sendMessage: async (conversationId: string, senderId: string, text: string): Promise<Message> => {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        conversationId,
        senderId,
        text,
        timestamp: new Date().toISOString()
      };
    }
  },
  
  posts: {
    getFeed: async (): Promise<Post[]> => {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      return [
        {
          id: 'post1',
          authorId: 'f1',
          authorType: 'freelancer',
          authorName: 'John Smith',
          authorAvatar: '/avatar-male.png',
          content: 'Just completed a website redesign project for a client in the fitness industry. Check out my portfolio for the latest work!',
          likes: 24,
          comments: 5,
          createdAt: '2023-08-17T11:30:00Z'
        },
        {
          id: 'post2',
          authorId: 'c1',
          authorType: 'client',
          authorName: 'Tech Innovations Inc.',
          authorAvatar: '/avatar-female.png',
          content: 'Looking for skilled mobile developers for an exciting new project. Must have experience with React Native and Firebase.',
          likes: 15,
          comments: 8,
          createdAt: '2023-08-16T14:20:00Z'
        },
        {
          id: 'post3',
          authorId: 'f2',
          authorType: 'freelancer',
          authorName: 'Sarah Johnson',
          authorAvatar: '/avatar-female.png',
          content: "Just updated my portfolio with my latest UX/UI designs. I'm currently available for new projects!",
          image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2070&auto=format&fit=crop',
          likes: 32,
          comments: 7,
          createdAt: '2023-08-16T09:45:00Z'
        },
        {
          id: 'post4',
          authorId: 'c2',
          authorType: 'client',
          authorName: 'Green Earth Foundation',
          authorAvatar: '/avatar-male.png',
          content: "We're seeking a content writer with experience in environmental topics for our blog. Long-term collaboration possible.",
          likes: 19,
          comments: 4,
          createdAt: '2023-08-15T16:10:00Z'
        },
        {
          id: 'post5',
          authorId: 'f3',
          authorType: 'freelancer',
          authorName: 'Mike Chen',
          authorAvatar: '/avatar-male.png',
          content: 'Just finished an intensive course on AI and machine learning. Ready to apply my new skills to innovative projects!',
          likes: 27,
          comments: 6,
          createdAt: '2023-08-15T13:25:00Z'
        }
      ];
    },
    
    create: async (postData: Partial<Post>): Promise<Post> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id: Math.random().toString(36).substring(2, 9),
        authorId: postData.authorId || 'f1',
        authorType: postData.authorType || 'freelancer',
        authorName: postData.authorName || 'User',
        authorAvatar: postData.authorAvatar || '/avatar-male.png',
        content: postData.content || '',
        image: postData.image,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString()
      };
    }
  },
  
  stats: {
    getFreelancerStats: async (freelancerId: string): Promise<{
      ongoingProjects: number;
      totalEarnings: number;
      completedProjects: number;
      pendingBids: number;
      averageRating: number;
      monthlyEarnings: { month: string; amount: number; }[];
    }> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        ongoingProjects: 3,
        totalEarnings: 7412.85,
        completedProjects: 27,
        pendingBids: 5,
        averageRating: 4.8,
        monthlyEarnings: [
          { month: 'Jan', amount: 1200 },
          { month: 'Feb', amount: 950 },
          { month: 'Mar', amount: 1450 },
          { month: 'Apr', amount: 1120 },
          { month: 'May', amount: 1640 },
          { month: 'Jun', amount: 1350 },
          { month: 'Jul', amount: 890 },
          { month: 'Aug', amount: 780 }
        ]
      };
    },
    
    getClientStats: async (clientId: string): Promise<{
      totalSpending: number;
      ongoingProjects: number;
      completedProjects: number;
      openProjects: number;
      projectProgress: { completed: number; total: number; };
      monthlySpending: { month: string; amount: number; }[];
    }> => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        totalSpending: 5648.59,
        ongoingProjects: 2,
        completedProjects: 5,
        openProjects: 1,
        projectProgress: { completed: 20, total: 40 },
        monthlySpending: [
          { month: 'Mar', amount: 650 },
          { month: 'Apr', amount: 820 },
          { month: 'May', amount: 1640 },
          { month: 'Jun', amount: 920 },
          { month: 'Jul', amount: 1250 },
          { month: 'Aug', amount: 950 },
          { month: 'Sep', amount: 1100 }
        ]
      };
    }
  }
};

