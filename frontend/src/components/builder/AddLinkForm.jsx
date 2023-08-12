import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddLinkForm({ handleAdd }) {
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!desc || !url) {
      toast.warn('Missing description and/or URL', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      window.add_link_form.close();
      await handleAdd(desc, url);
      setDesc('');
      setUrl('');
    }
  };

  return (
    <>
      <dialog id="add_link_form" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <form method="dialog" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="description" className="label">
                <span className="label-text text-lg font-semibold">
                  Enter description
                </span>
              </label>
              <input
                type="text"
                id="description"
                name="Description"
                placeholder="Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                autoComplete="off"
                required
                className="input input-bordered input-primary w-full"
              />
            </div>
            <div>
              <label htmlFor="url" className="label">
                <span className="label-text text-lg font-semibold">
                  Enter URL
                </span>
              </label>
              <input
                type="text"
                id="url"
                name="Url"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete="off"
                required
                className="input input-bordered input-primary w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-6">
              Add
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop backdrop-blur-sm">
          <button type="submit">Close</button>
        </form>
      </dialog>
      <ToastContainer />
    </>
  );
}

AddLinkForm.propTypes = {
  handleAdd: PropTypes.func.isRequired,
};

export default AddLinkForm;
