import PropTypes from 'prop-types';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PencilIcon from '../icons/PencilIcon';
import DeleteButton from './DeleteButton';

function LinkCard({ link, index, handleSave, handleDelete }) {
  const [desc, setDesc] = useState(link.desc);
  const [url, setUrl] = useState(link.url);
  const [isDFocused, setIsDFocused] = useState(false);
  const [isUFocused, setIsUFocused] = useState(false);

  const handleDBlur = async () => {
    setIsDFocused(false);
    if (!desc) {
      toast.warn('Please enter a description', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      await handleSave(link.id, desc, url);
    }
  };
  const handleUBlur = async () => {
    setIsUFocused(false);
    if (!url) {
      toast.warn('Please enter a valid URL', {
        position: toast.POSITION.TOP_CENTER,
      });
      setUrl('http://');
    } else {
      await handleSave(link.id, desc, url);
    }
  };

  return (
    <>
      <Draggable draggableId={link.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="card card-side card-compact mb-3 bg-base-100 shadow-md"
          >
            <div
              {...provided.dragHandleProps}
              className="flex items-center justify-center px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <div className="card-body">
              <div className="flex flex-row">
                <input
                  type="text"
                  name="Description"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  onFocus={() => setIsDFocused(true)}
                  onBlur={handleDBlur}
                  autoComplete="off"
                  required
                  className={`w-full max-w-full text-base font-medium !outline-none cursor-${
                    isDFocused ? 'text' : 'pointer'
                  }`}
                />
                {isDFocused ? null : <PencilIcon />}
              </div>
              <div className="flex flex-row">
                <input
                  type="text"
                  name="Url"
                  placeholder="URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsUFocused(true)}
                  onBlur={handleUBlur}
                  autoComplete="off"
                  required
                  className={`w-full max-w-full text-base !outline-none cursor-${
                    isUFocused ? 'text' : 'pointer'
                  }`}
                />
                {isUFocused ? null : <PencilIcon />}
              </div>
              <div className="card-actions justify-end">
                <DeleteButton handleDelete={() => handleDelete(link.id)} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
      <ToastContainer />
    </>
  );
}

LinkCard.propTypes = {
  link: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default LinkCard;
