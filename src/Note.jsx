

function Note({ text, color, onDelete }) {
  return (
    <div className="note" style={{ backgroundColor: color }}>
      <p>{text}</p>
      <button className="delete-button" onClick={onDelete}>X</button>
    </div>
  );
}

export default Note;
