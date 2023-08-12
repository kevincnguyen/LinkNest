function AddLinkButton() {
  return (
    <button
      type="button"
      onClick={() => window.add_link_form.showModal()}
      className="btn btn-primary mb-4 mt-8 w-3/5"
    >
      + Add link
    </button>
  );
}

export default AddLinkButton;
