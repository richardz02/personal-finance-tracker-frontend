function Button({ button_text, button_id, handleOnClick }) {
  return (
    <>
      <button onClick={handleOnClick} id={button_id}>
        {button_text}
      </button>
    </>
  );
}

export default Button;
