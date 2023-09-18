import { useState } from 'react';

function ClickableElement({ name }: any) {
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  return (
    <div style={{width: '300px'}} onClick={handleClick}>
      {editing ? (
        <input
          type="text"
          defaultValue={name}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
}

export default ClickableElement;
