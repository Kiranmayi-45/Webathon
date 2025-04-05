// // import React, { useState } from 'react';
// // import { useParams } from 'react-router-dom';

// // const QuizPage: React.FC = () => {
// //   const { id } = useParams<{ id: string }>(); // Get the test ID from URL
// // //   const history = useHistory();
// //   const [answers, setAnswers] = useState<any>([]);
// //   const [score, setScore] = useState<number | null>(null);

// //   // Dummy questions for demonstration
// //   const questions = [
// //     { question: 'What is HTML?', options: ['Markup Language', 'Programming Language', 'Database'], answer: 'Markup Language' },
// //     { question: 'What is CSS?', options: ['Markup Language', 'Style Sheet', 'Database'], answer: 'Style Sheet' },
// //     { question: 'What is JavaScript?', options: ['Markup Language', 'Programming Language', 'Style Sheet'], answer: 'Programming Language' },
// //     { question: 'What is React?', options: ['Library', 'Framework', 'Programming Language'], answer: 'Library' },
// //     { question: 'What is Node.js?', options: ['Library', 'Server-side Environment', 'Framework'], answer: 'Server-side Environment' }
// //   ];

// //   const handleChange = (questionIndex: number, selectedAnswer: string) => {
// //     const newAnswers = [...answers];
// //     newAnswers[questionIndex] = selectedAnswer;
// //     setAnswers(newAnswers);
// //   };

// //   const handleSubmit = () => {
// //     let score = 0;
// //     questions.forEach((q, index) => {
// //       if (answers[index] === q.answer) score++;
// //     });
// //     setScore(score);
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-4xl">
// //       <h1 className="text-2xl font-bold text-gray-800">Take the {id} Test</h1>
// //       <p className="text-gray-600 mb-4">Answer the following questions:</p>

// //       <div>
// //         {questions.map((question, index) => (
// //           <div key={index} className="mb-6">
// //             <h3 className="font-medium">{question.question}</h3>
// //             <div className="mt-2">
// //               {question.options.map((option, optionIndex) => (
// //                 <div key={optionIndex}>
// //                   <input
// //                     type="radio"
// //                     name={`question-${index}`}
// //                     value={option}
// //                     onChange={() => handleChange(index, option)}
// //                     checked={answers[index] === option}
// //                   />
// //                   <label className="ml-2">{option}</label>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-md">
// //         Submit Test
// //       </button>

// //       {score !== null && (
// //         <div className="mt-4">
// //           <h2 className="text-lg font-semibold">Your Score: {score} / 5</h2>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default QuizPage;

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// const QuizPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get the test ID from URL
//   const [answers, setAnswers] = useState<any>([]);
//   const [score, setScore] = useState<number | null>(null);

//   // Dummy questions for demonstration
//   const questions = [
//     { question: 'What is HTML?', options: ['Markup Language', 'Programming Language', 'Database'], answer: 'Markup Language' },
//     { question: 'What is CSS?', options: ['Markup Language', 'Style Sheet', 'Database'], answer: 'Style Sheet' },
//     { question: 'What is JavaScript?', options: ['Markup Language', 'Programming Language', 'Style Sheet'], answer: 'Programming Language' },
//     { question: 'What is React?', options: ['Library', 'Framework', 'Programming Language'], answer: 'Library' },
//     { question: 'What is Node.js?', options: ['Library', 'Server-side Environment', 'Framework'], answer: 'Server-side Environment' }
//   ];

//   const handleChange = (questionIndex: number, selectedAnswer: string) => {
//     const newAnswers = [...answers];
//     newAnswers[questionIndex] = selectedAnswer;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = () => {
//     let score = 0;
//     questions.forEach((q, index) => {
//       if (answers[index] === q.answer) score++;
//     });
//     setScore(score);
//   };

//   return (
//     <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold text-black mb-6">Take the {id} Test</h1>
//       <p className="text-gray-700 mb-6">Answer the following questions to check your knowledge.</p>

//       <div className="space-y-8">
//         {questions.map((question, index) => (
//           <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//             <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
//             <div className="mt-4 space-y-4">
//               {question.options.map((option, optionIndex) => (
//                 <div key={optionIndex} className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     onChange={() => handleChange(index, option)}
//                     checked={answers[index] === option}
//                     className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   />
//                   <label className="text-gray-700 text-sm">{option}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 text-center">
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg shadow-md hover:bg-blue-700 focus:outline-none"
//         >
//           Submit Test
//         </button>
//       </div>

//       {score !== null && (
//         <div className="mt-6 text-center">
//           <h2 className="text-2xl font-semibold text-blue-600">Your Score: {score} / 5</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the test ID from URL
  const [answers, setAnswers] = useState<any>([]);
  const [score, setScore] = useState<number | null>(null);

  // Dummy questions for demonstration
  const questions = [
    { question: 'What is HTML?', options: ['Markup Language', 'Programming Language', 'Database'], answer: 'Markup Language' },
    { question: 'What is CSS?', options: ['Markup Language', 'Style Sheet', 'Database'], answer: 'Style Sheet' },
    { question: 'What is JavaScript?', options: ['Markup Language', 'Programming Language', 'Style Sheet'], answer: 'Programming Language' },
    { question: 'What is React?', options: ['Library', 'Framework', 'Programming Language'], answer: 'Library' },
    { question: 'What is Node.js?', options: ['Library', 'Server-side Environment', 'Framework'], answer: 'Server-side Environment' }
  ];

  const handleChange = (questionIndex: number, selectedAnswer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedAnswer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.answer) score++;
    });
    setScore(score);

    // Generate the certificate if the test is submitted
    generateCertificate(score);
  };

  const generateCertificate = (score: number) => {
    const doc = new jsPDF();

    // Add certificate title
    doc.setFontSize(30);
    doc.text('Certificate of Completion', 105, 60, { align: 'center' });

    // Add test details
    // doc.setFontSize(20);
    // doc.text(`Test: `, 105, 70, { align: 'center' });

    // Add user's score
    doc.setFontSize(16);
    doc.text(`Congratulations! You scored ${score} / 5`, 105, 100, { align: 'center' });

    // Add a thank you message
    doc.setFontSize(14);
    doc.text('Thank you for completing the test!', 105, 130, { align: 'center' });

    // Save the PDF as a file
    doc.save(`Certificate_${id}.pdf`);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Take the {id} Test</h1>
      <p className="text-gray-700 mb-6">Answer the following questions to check your knowledge.</p>

      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
            <div className="mt-4 space-y-4">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleChange(index, option)}
                    checked={answers[index] === option}
                    className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="text-gray-700 text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Submit Test
        </button>
      </div>

      {score !== null && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-600">Your Score: {score} / 5</h2>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
