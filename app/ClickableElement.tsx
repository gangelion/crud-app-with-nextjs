import { useState } from 'react';

function ClickableElement({ name }: {name: string}) {
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
        <div title={name} style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{name}</div>
      )}
    </div>
  );
}

export default ClickableElement;
