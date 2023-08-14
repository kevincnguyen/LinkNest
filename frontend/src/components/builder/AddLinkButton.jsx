function AddLinkButton() {
  return (
    <button
      type="button"
      onClick={() => window.add_link_form.showModal()}
      className="btn btn-primary my-4 w-3/5"
    >
      + Add link
    </button>
  );
}

export default AddLinkButton;
