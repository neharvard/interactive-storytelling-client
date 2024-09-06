import { useState, useContext } from 'react';
// import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';


const CreateStory = () => {
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: '',
        photo: '',
        category: '',
        email: user?.email || '',
        descriptionShort: '',
        storyPaths: [{
            pathTitle: '',
            pathDescription: '',
            optionA: '',
            optionADescription: '',
            optionB: '',
            optionBDescription: '',
        }],
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleStoryPathChange = (index, event) => {
        const { name, value } = event.target;
        const updatedPaths = [...formData.storyPaths];
        updatedPaths[index] = { ...updatedPaths[index], [name]: value };
        setFormData({ ...formData, storyPaths: updatedPaths });
    };

    const addNewPath = () => {
        setFormData({
            ...formData,
            storyPaths: [
                ...formData.storyPaths,
                {
                    pathTitle: '',
                    pathDescription: '',
                    optionA: '',
                    optionADescription: '',
                    optionB: '',
                    optionBDescription: '',
                },
            ],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://your-server-endpoint/story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.insertedId) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Story Created Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool',
                });

                setFormData({
                    title: '',
                    photo: '',
                    email: user?.email || '',
                    category: '',
                    descriptionShort: '',
                    storyPaths: [{
                        pathTitle: '',
                        pathDescription: '',
                        optionA: '',
                        optionADescription: '',
                        optionB: '',
                        optionBDescription: '',
                    }],
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
      <div className="mt-14 text-center justify-items-center">
          <h2 className="text-3xl font-extrabold mb-6 text-center">Create a New Story</h2>
          <form onSubmit={handleSubmit} className="bg-[#F4F3F0] p-4 mx-auto max-w-6xl"> {/* Changed max-w-md to max-w-xl */}
              <div className="form-control">
                  <label className="label">
                      <span className="label-text">Title</span>
                  </label>
                  <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                      className="input input-bordered w-full"
                  />
              </div>
  
              <div className="form-control">
                  <label className="label">
                      <span className="label-text">Photo URL</span>
                  </label>
                  <input
                      type="text"
                      name="photo"
                      value={formData.photo}
                      onChange={handleInputChange}
                      placeholder="Photo URL"
                      className="input input-bordered w-full"
                  />
              </div>
  
              <div className="form-control">
                  <label className="label">
                      <span className="label-text">Category</span>
                  </label>
                  <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                  >
                      <option value="">Select a category</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="Mystery">Mystery</option>
                  </select>
              </div>
  
              <div className="form-control">
                  <label className="label">
                      <span className="label-text">Short Description</span>
                  </label>
                  <input
                      type="text"
                      name="descriptionShort"
                      value={formData.descriptionShort}
                      onChange={handleInputChange}
                      placeholder="Short description"
                      className="input input-bordered w-full"
                  />
              </div>
  
              <h3 className="text-xl mt-6 font-bold">Story Paths</h3>
              {formData.storyPaths.map((path, index) => (
                  <div key={index} className="form-control mt-4">
                      <label className="label">
                          <span className="label-text">Path {index + 1} Title</span>
                      </label>
                      <input
                          type="text"
                          name="pathTitle"
                          value={path.pathTitle}
                          onChange={(e) => handleStoryPathChange(index, e)}
                          placeholder="Path Title"
                          className="input input-bordered w-full"
                      />
  
                      <label className="label mt-2">
                          <span className="label-text">Path Description</span>
                      </label>
                      <textarea
                          name="pathDescription"
                          value={path.pathDescription}
                          onChange={(e) => handleStoryPathChange(index, e)}
                          placeholder="Describe this path..."
                          className="textarea textarea-bordered w-full"
                      ></textarea>
                  </div>
              ))}
  
              <button
                  type="button"
                  onClick={addNewPath}
                  className="btn btn-outline btn-primary  mt-4"
              >
                  Add Another Path
              </button>
  
              <input
                  type="submit"
                  value="Create Story"
                  className="btn btn-primary w-full mt-6"
              />
          </form>
      </div>
  );
};

export default CreateStory;
