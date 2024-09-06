import { useState } from 'react';

const CreateStory = () => {
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Create a New Story</h2>
      
    </div>
  );
};

export default CreateStory;



// import { useState } from 'react';

// const CreateStory = () => {
//   const [title, setTitle] = useState('');
//   const [story, setStory] = useState([{ text: '', options: [] }]);

//   const addOption = (index) => {
//     const newStory = [...story];
//     newStory[index].options.push({ text: '', next: null });
//     setStory(newStory);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Create a New Story</h2>
//       <div className="form-control">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Story Title"
//           className="input input-bordered mb-4"
//         />
//       </div>
//       {story.map((section, index) => (
//         <div key={index} className="mb-6">
//           <textarea
//             value={section.text}
//             onChange={(e) => {
//               const newStory = [...story];
//               newStory[index].text = e.target.value;
//               setStory(newStory);
//             }}
//             placeholder="Story Text"
//             className="textarea textarea-bordered w-full mb-2"
//           />
//           {section.options.map((option, optionIndex) => (
//             <div key={optionIndex} className="mb-2">
//               <input
//                 type="text"
//                 value={option.text}
//                 onChange={(e) => {
//                   const newStory = [...story];
//                   newStory[index].options[optionIndex].text = e.target.value;
//                   setStory(newStory);
//                 }}
//                 placeholder="Option Text"
//                 className="input input-bordered w-full"
//               />
//             </div>
//           ))}
//           <button
//             className="btn btn-outline btn-sm"
//             onClick={() => addOption(index)}
//           >
//             Add Option
//           </button>
//         </div>
//       ))}
//       <button className="btn btn-primary">Save Story</button>
//     </div>
//   );
// };

// export default CreateStory;
