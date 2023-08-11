const AddLinkButton = () => {
    return (
        <button 
            onClick={() => window.add_link_form.showModal()} 
            className='btn btn-primary mt-8 mb-4 w-3/5'
        >   
            + Add link
        </button>
    )
}

export default AddLinkButton