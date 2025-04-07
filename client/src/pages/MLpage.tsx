import React, { useState } from 'react';

interface Freelancer {
  name: string;
  location: string;
  title: string;
  skills: string[];
  years_experience: number;
  hourly_rate: number;
  availability: string;
  rating: number;
  projects_count: number;
  education_level: string;
  industry_focus: string;
  certifications: boolean;
  languages_spoken: string[];
  response_time: number;
  last_active: number;
}

// Static freelancer data (include as many entries as needed)
const freelancerData: Freelancer[] = [
    {
        name: "Alice Johnson",
        location: "San Francisco, US",
        title: "Frontend Developer",
        skills: ["React", "TypeScript", "CSS", "Figma"],
        years_experience: 5,
        hourly_rate: 45,
        availability: "Hourly",
        rating: 4.8,
        projects_count: 25,
        education_level: "Bachelors",
        industry_focus: "SaaS",
        certifications: true,
        languages_spoken: ["English", "Spanish"],
        response_time: 1,
        last_active: 2,
      },
      {
        name: "Omar Khalid",
        location: "Berlin, DE",
        title: "Fullstack Developer",
        skills: ["Node.js", "React", "MongoDB", "Docker"],
        years_experience: 6,
        hourly_rate: 50,
        availability: "Full-time",
        rating: 4.9,
        projects_count: 30,
        education_level: "Masters",
        industry_focus: "E-commerce",
        certifications: true,
        languages_spoken: ["English", "German"],
        response_time: 2,
        last_active: 1,
      },
      {
        name: "Jia Li",
        location: "Beijing, CN",
        title: "Backend Developer",
        skills: ["Python", "Django", "PostgreSQL"],
        years_experience: 4,
        hourly_rate: 40,
        availability: "Part-time",
        rating: 4.7,
        projects_count: 18,
        education_level: "Bachelors",
        industry_focus: "Fintech",
        certifications: false,
        languages_spoken: ["English", "Mandarin"],
        response_time: 3,
        last_active: 5,
      },
      {
        name: "Priya Verma",
        location: "Bangalore, IN",
        title: "UI/UX Designer",
        skills: ["Figma", "Adobe XD", "HTML", "CSS"],
        years_experience: 3,
        hourly_rate: 35,
        availability: "Hourly",
        rating: 4.6,
        projects_count: 22,
        education_level: "Bachelors",
        industry_focus: "SaaS",
        certifications: true,
        languages_spoken: ["English", "Hindi"],
        response_time: 5,
        last_active: 3,
      },
      {
        name: "David Kim",
        location: "Seoul, KR",
        title: "Mobile App Developer",
        skills: ["Flutter", "Dart", "Firebase"],
        years_experience: 5,
        hourly_rate: 48,
        availability: "Full-time",
        rating: 4.8,
        projects_count: 27,
        education_level: "Masters",
        industry_focus: "Social Media",
        certifications: false,
        languages_spoken: ["English", "Korean"],
        response_time: 4,
        last_active: 1,
      },
      {
        name: "Sara Müller",
        location: "Munich, DE",
        title: "DevOps Engineer",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        years_experience: 7,
        hourly_rate: 60,
        availability: "Part-time",
        rating: 4.9,
        projects_count: 35,
        education_level: "Masters",
        industry_focus: "Cloud Infrastructure",
        certifications: true,
        languages_spoken: ["English", "German"],
        response_time: 1,
        last_active: 0,
      },
      {
        name: "Miguel Torres",
        location: "Madrid, ES",
        title: "Backend Developer",
        skills: ["Java", "Spring Boot", "MySQL"],
        years_experience: 6,
        hourly_rate: 42,
        availability: "Hourly",
        rating: 4.7,
        projects_count: 29,
        education_level: "Bachelors",
        industry_focus: "Banking",
        certifications: false,
        languages_spoken: ["English", "Spanish"],
        response_time: 3,
        last_active: 2,
      },
      {
        name: "Chloe Martin",
        location: "Paris, FR",
        title: "UI Designer",
        skills: ["Sketch", "Illustrator", "HTML", "CSS"],
        years_experience: 4,
        hourly_rate: 38,
        availability: "Part-time",
        rating: 4.6,
        projects_count: 20,
        education_level: "Bachelors",
        industry_focus: "E-commerce",
        certifications: true,
        languages_spoken: ["English", "French"],
        response_time: 2,
        last_active: 4,
      },
      {
        name: "Ankit Shah",
        location: "Ahmedabad, IN",
        title: "Fullstack Developer",
        skills: ["React", "Node.js", "Express", "MongoDB"],
        years_experience: 5,
        hourly_rate: 30,
        availability: "Full-time",
        rating: 4.8,
        projects_count: 26,
        education_level: "Bachelors",
        industry_focus: "SaaS",
        certifications: true,
        languages_spoken: ["English", "Gujarati", "Hindi"],
        response_time: 1,
        last_active: 0,
      },
      {
        name: "Emily Carter",
        location: "New York, US",
        title: "Content Strategist",
        skills: ["SEO", "Copywriting", "Google Analytics"],
        years_experience: 6,
        hourly_rate: 55,
        availability: "Hourly",
        rating: 4.9,
        projects_count: 28,
        education_level: "Masters",
        industry_focus: "Marketing",
        certifications: false,
        languages_spoken: ["English"],
        response_time: 3,
        last_active: 1,
      },
      {
        name: "Leo Nakamura",
        location: "Tokyo, JP",
        title: "Machine Learning Engineer",
        skills: ["Python", "TensorFlow", "PyTorch", "Pandas"],
        years_experience: 5,
        hourly_rate: 65,
        availability: "Full-time",
        rating: 4.9,
        projects_count: 23,
        education_level: "Masters",
        industry_focus: "AI/ML",
        certifications: true,
        languages_spoken: ["English", "Japanese"],
        response_time: 2,
        last_active: 1,
      },
      {
        name: "Isabelle Dubois",
        location: "Lyon, FR",
        title: "Graphic Designer",
        skills: ["Photoshop", "Illustrator", "InDesign"],
        years_experience: 7,
        hourly_rate: 40,
        availability: "Part-time",
        rating: 4.7,
        projects_count: 31,
        education_level: "Bachelors",
        industry_focus: "Advertising",
        certifications: true,
        languages_spoken: ["English", "French"],
        response_time: 4,
        last_active: 2,
      },
      {
        name: "Mohammed Al-Farsi",
        location: "Dubai, AE",
        title: "Cloud Architect",
        skills: ["AWS", "Azure", "Terraform", "DevOps"],
        years_experience: 8,
        hourly_rate: 75,
        availability: "Full-time",
        rating: 4.9,
        projects_count: 36,
        education_level: "Masters",
        industry_focus: "Cloud Infrastructure",
        certifications: true,
        languages_spoken: ["English", "Arabic"],
        response_time: 1,
        last_active: 0,
      },
      {
        name: "Nina Petrova",
        location: "Moscow, RU",
        title: "QA Engineer",
        skills: ["Selenium", "JIRA", "Postman", "Python"],
        years_experience: 5,
        hourly_rate: 37,
        availability: "Hourly",
        rating: 4.5,
        projects_count: 19,
        education_level: "Bachelors",
        industry_focus: "Software Testing",
        certifications: false,
        languages_spoken: ["English", "Russian"],
        response_time: 3,
        last_active: 4,
      },
      {
        name: "Carlos Méndez",
        location: "Bogotá, CO",
        title: "Mobile App Developer",
        skills: ["React Native", "JavaScript", "Firebase"],
        years_experience: 4,
        hourly_rate: 33,
        availability: "Part-time",
        rating: 4.6,
        projects_count: 21,
        education_level: "Bachelors",
        industry_focus: "Startups",
        certifications: true,
        languages_spoken: ["English", "Spanish"],
        response_time: 2,
        last_active: 3,
      },
      {
        name: "Sophie Brown",
        location: "Toronto, CA",
        title: "Technical Writer",
        skills: ["Markdown", "Confluence", "API Docs"],
        years_experience: 6,
        hourly_rate: 50,
        availability: "Hourly",
        rating: 4.8,
        projects_count: 24,
        education_level: "Masters",
        industry_focus: "Documentation",
        certifications: false,
        languages_spoken: ["English", "French"],
        response_time: 1,
        last_active: 2,
      },
      {
        name: "Ahmed El-Sayed",
        location: "Cairo, EG",
        title: "Frontend Developer",
        skills: ["Angular", "TypeScript", "Bootstrap"],
        years_experience: 5,
        hourly_rate: 28,
        availability: "Full-time",
        rating: 4.6,
        projects_count: 20,
        education_level: "Bachelors",
        industry_focus: "Healthcare",
        certifications: false,
        languages_spoken: ["English", "Arabic"],
        response_time: 3,
        last_active: 1,
      },
      {
        name: "Elena Rossi",
        location: "Rome, IT",
        title: "UX Researcher",
        skills: ["User Interviews", "A/B Testing", "Figma"],
        years_experience: 4,
        hourly_rate: 39,
        availability: "Part-time",
        rating: 4.7,
        projects_count: 18,
        education_level: "Masters",
        industry_focus: "Retail",
        certifications: true,
        languages_spoken: ["English", "Italian"],
        response_time: 2,
        last_active: 4,
      },
      {
        name: "Daniel Osei",
        location: "Accra, GH",
        title: "Data Analyst",
        skills: ["SQL", "Tableau", "Python", "Excel"],
        years_experience: 5,
        hourly_rate: 34,
        availability: "Full-time",
        rating: 4.8,
        projects_count: 22,
        education_level: "Bachelors",
        industry_focus: "Business Intelligence",
        certifications: true,
        languages_spoken: ["English"],
        response_time: 2,
        last_active: 0,
      },
      {
        name: "Ava Thompson",
        location: "Melbourne, AU",
        title: "Digital Marketer",
        skills: ["Google Ads", "SEO", "Email Marketing"],
        years_experience: 6,
        hourly_rate: 52,
        availability: "Hourly",
        rating: 4.9,
        projects_count: 30,
        education_level: "Masters",
        industry_focus: "E-commerce",
        certifications: true,
        languages_spoken: ["English"],
        response_time: 1,
        last_active: 1,
      }
  // ... add additional freelancer entries as needed
];

// --- Helper Functions ---

// Tokenize the text: lowercase, remove punctuation, split by whitespace.
const tokenize = (text: string): string[] =>
  text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);

// Build a term-frequency dictionary for a list of tokens.
const termFrequency = (tokens: string[]): Record<string, number> =>
  tokens.reduce((acc: Record<string, number>, token: string) => {
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {});

// Compute cosine similarity between two term-frequency dictionaries.
const cosineSimilarity = (freqA: Record<string, number>, freqB: Record<string, number>): number => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  const tokens = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);
  tokens.forEach((token) => {
    const a = freqA[token] || 0;
    const b = freqB[token] || 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  });
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Combine freelancer features into a single string.
const combineFreelancerFeatures = (f: Freelancer): string =>
  `${f.skills.join(' ')} ${f.title} ${f.years_experience} ${f.hourly_rate} ${f.rating} ${f.projects_count}`;

const MLPage: React.FC = () => {
  // Form input states
  const [skills, setSkills] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [rating, setRating] = useState('');
  const [projectsCount, setProjectsCount] = useState('');

  // Results state and modal
  const [results, setResults] = useState<Array<{ freelancer: Freelancer; similarity: number }>>([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Require at least one input field.
    if (!skills && !title && !experience && !hourlyRate && !rating && !projectsCount) {
      alert('Please enter at least one field.');
      return;
    }

    // Build the user query from non-empty inputs.
    const queryParts: string[] = [];
    if (skills) queryParts.push(skills);
    if (title) queryParts.push(title);
    if (experience) queryParts.push(experience);
    if (hourlyRate) queryParts.push(hourlyRate);
    if (rating) queryParts.push(rating);
    if (projectsCount) queryParts.push(projectsCount);
    const userQuery = queryParts.join(' ');

    // Tokenize and get term frequency for the query.
    const userTokens = tokenize(userQuery);
    const userFreq = termFrequency(userTokens);

    // Compute cosine similarity for each freelancer.
    const scoredFreelancers = freelancerData.map((freelancer) => {
      const combined = combineFreelancerFeatures(freelancer);
      const tokens = tokenize(combined);
      const freq = termFrequency(tokens);
      const sim = cosineSimilarity(userFreq, freq);
      return { freelancer, similarity: sim };
    });

    // Sort by similarity in descending order and take top 10.
    const sorted = scoredFreelancers.sort((a, b) => b.similarity - a.similarity).slice(0, 10);
    setResults(sorted);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 ">
      <h1 className="text-2xl font-bold mb-4">Find Top Matched Freelancers</h1>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="grid gap-4 mb-6">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., React, Node.js"
              className="w-full border border-input rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Fullstack Developer"
              className="w-full border border-input rounded-md p-2"
            />
          </div>
        </div>
        {/* Side-by-side numeric inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Years of Experience</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="e.g., 5"
              className="w-full border border-input rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hourly Rate</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="e.g., 45"
              className="w-full border border-input rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="e.g., 4.8"
              className="w-full border border-input rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Projects Count</label>
            <input
              type="number"
              value={projectsCount}
              onChange={(e) => setProjectsCount(e.target.value)}
              placeholder="e.g., 25"
              className="w-full border border-input rounded-md p-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-brand-purple text-white py-2 px-4 rounded-md hover:bg-brand-purple/80"
        >
          Find Freelancers
        </button>
      </form>

      {/* Results Section */}
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Matched Freelancers</h2>
          <div className="grid gap-4">
            {results.map(({ freelancer, similarity }, idx) => (
              <div key={idx} className="border border-border rounded-md p-4 flex flex-col">
                <h3 className="text-lg font-bold">{freelancer.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {freelancer.title} • {freelancer.skills.join(', ')}
                </p>
                <p className="mt-1 text-sm">
                  <strong>Match Score:</strong> {(similarity * 100).toFixed(2)}%
                </p>
                <button
                  className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md self-start"
                  onClick={() => setSelectedFreelancer(freelancer)}
                >
                  Show Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Freelancer Details */}
      {selectedFreelancer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedFreelancer(null)}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedFreelancer.name}</h2>
            <p><strong>Title:</strong> {selectedFreelancer.title}</p>
            <p><strong>Skills:</strong> {selectedFreelancer.skills.join(', ')}</p>
            <p><strong>Location:</strong> {selectedFreelancer.location}</p>
            <p><strong>Years of Experience:</strong> {selectedFreelancer.years_experience}</p>
            <p><strong>Hourly Rate:</strong> {selectedFreelancer.hourly_rate}</p>
            <p><strong>Rating:</strong> {selectedFreelancer.rating}</p>
            <p><strong>Projects Count:</strong> {selectedFreelancer.projects_count}</p>
            <p><strong>Availability:</strong> {selectedFreelancer.availability}</p>
            <p><strong>Education Level:</strong> {selectedFreelancer.education_level}</p>
            <p><strong>Industry Focus:</strong> {selectedFreelancer.industry_focus}</p>
            <p>
              <strong>Certifications:</strong> {selectedFreelancer.certifications ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Languages Spoken:</strong> {selectedFreelancer.languages_spoken.join(', ')}
            </p>
            <p>
              <strong>Response Time:</strong> {selectedFreelancer.response_time} hours
            </p>
            <p>
              <strong>Last Active:</strong> {selectedFreelancer.last_active} days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MLPage;
