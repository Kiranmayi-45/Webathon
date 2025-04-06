
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import MainLayout from '../components/layout/MainLayout';
// import { useAuth } from '../contexts/AuthContext';
// import { api, Project } from '../services/api';
// import ProjectCard from '../components/cards/ProjectCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { toast } from 'sonner';
// import { Search, Filter, Plus } from 'lucide-react';

// const Projects: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
//   const [newProject, setNewProject] = useState({
//     title: '',
//     description: '',
//     budget: 0,
//     timeline: '',
//   });

//   const isFreelancer = user?.userType === 'freelancer';

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const allProjects = await api.projects.getAll();
//         setProjects(allProjects);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleViewProject = (projectId: string) => {
//     navigate(`/projects/${projectId}`);
//   };

//   const handleBidOnProject = (projectId: string) => {
//     navigate(`/projects/${projectId}`);
//   };

//   const handleCreateProject = async () => {
//     if (!newProject.title || !newProject.description || !newProject.budget || !newProject.timeline) {
//       toast.error('Please fill out all required fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       const createdProject = await api.projects.create({
//         ...newProject,
//         clientId: user?.id || '',
//       });

//       setProjects([createdProject, ...projects]);
//       setNewProject({
//         title: '',
//         description: '',
//         budget: 0,
//         timeline: '',
//       });
//       setIsCreateDialogOpen(false);
//       toast.success('Project created successfully!');
//     } catch (error) {
//       console.error('Error creating project:', error);
//       toast.error('Failed to create project. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewProject({
//       ...newProject,
//       [name]: name === 'budget' ? Number(value) : value,
//     });
//   };

//   const filteredProjects = projects.filter(project => {
//     const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   return (
//     <MainLayout>
//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isFreelancer ? 'Find Work' : 'Manage Projects'}
//           </h1>
//           <p className="text-gray-600">
//             {isFreelancer 
//               ? 'Discover projects that match your skills and interests' 
//               : 'Create and manage your projects'}
//           </p>
//         </div>
        
//         {!isFreelancer && (
//           <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
//             <DialogTrigger asChild>
//               <Button className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-light-purple">
//                 <Plus className="h-4 w-4 mr-2" /> Create Project
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Create a New Project</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4 py-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Project Title</Label>
//                   <Input
//                     id="title"
//                     name="title"
//                     placeholder="E.g., Website Redesign"
//                     value={newProject.title}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     name="description"
//                     placeholder="Provide details about your project requirements..."
//                     rows={4}
//                     value={newProject.description}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="budget">Budget ($)</Label>
//                     <Input
//                       id="budget"
//                       name="budget"
//                       type="number"
//                       placeholder="Enter amount"
//                       min="0"
//                       value={newProject.budget || ''}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="timeline">Timeline</Label>
//                     <Input
//                       id="timeline"
//                       name="timeline"
//                       placeholder="E.g., 2 weeks"
//                       value={newProject.timeline}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button 
//                   className="bg-brand-purple hover:bg-brand-light-purple" 
//                   onClick={handleCreateProject}
//                 >
//                   Create Project
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>

//       <div className="mb-6 bg-white shadow-sm rounded-lg p-4">
//         <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search projects..."
//               className="pl-10"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="flex space-x-2">
//             <div className="w-40">
//               <Select 
//                 value={statusFilter} 
//                 onValueChange={setStatusFilter}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="open">Open</SelectItem>
//                   <SelectItem value="in-progress">In Progress</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
            
//             <Button variant="outline">
//               <Filter className="h-4 w-4 mr-2" /> More Filters
//             </Button>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <div key={item} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
//               <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
//               <div className="space-y-2 mb-4">
//                 <div className="h-4 bg-gray-200 rounded w-full"></div>
//                 <div className="h-4 bg-gray-200 rounded w-full"></div>
//                 <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//               </div>
//               <div className="flex justify-between mb-4">
//                 <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//               </div>
//               <div className="h-10 bg-gray-200 rounded w-full"></div>
//             </div>
//           ))}
//         </div>
//       ) : filteredProjects.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredProjects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               id={project.id}
//               title={project.title}
//               description={project.description}
//               budget={project.budget}
//               timeline={project.timeline}
//               status={project.status}
//               createdAt={project.createdAt}
//               onView={handleViewProject}
//               onBid={isFreelancer && project.status === 'open' ? handleBidOnProject : undefined}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <div className="mb-4 text-gray-400">
//             <Filter className="h-12 w-12 mx-auto" />
//           </div>
//           <h3 className="text-lg font-medium">No projects found</h3>
//           <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
//         </div>
//       )}
//     </MainLayout>
//   );
// };

// export default Projects;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { api, Project } from '../services/api';
import ProjectCard from '../components/cards/ProjectCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Search, Filter, Plus } from 'lucide-react';

const Projects: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: 0,
    timeline: '',
  });

  const isFreelancer = user?.userType === 'freelancer';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await api.projects.getAll();
        setProjects(allProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleBidOnProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.budget || !newProject.timeline) {
      toast.error('Please fill out all required fields');
      return;
    }

    setLoading(true);
    try {
      const createdProject = await api.projects.create({
        ...newProject,
        clientId: user?.id || '',
      });

      setProjects([createdProject, ...projects]);
      setNewProject({
        title: '',
        description: '',
        budget: 0,
        timeline: '',
      });
      setIsCreateDialogOpen(false);
      toast.success('Project created successfully!');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: name === 'budget' ? Number(value) : value,
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isFreelancer ? 'Find Work' : 'Manage Projects'}
          </h1>
          <p className="text-gray-600">
            {isFreelancer 
              ? 'Discover projects that match your skills and interests' 
              : 'Create and manage your projects'}
          </p>
        </div>
        
        {!isFreelancer && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-light-purple">
                <Plus className="h-4 w-4 mr-2" /> Create Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Website Redesign"
                    value={newProject.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Provide details about your project requirements..."
                    rows={4}
                    value={newProject.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      placeholder="Enter amount"
                      min="0"
                      value={newProject.budget || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      name="timeline"
                      placeholder="E.g., 2 weeks"
                      value={newProject.timeline}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  className="bg-brand-purple hover:bg-brand-light-purple" 
                  onClick={handleCreateProject}
                >
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="mb-6 bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="w-40">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="flex justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
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
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-gray-400">
            <Filter className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </MainLayout>
  );
};

export default Projects;