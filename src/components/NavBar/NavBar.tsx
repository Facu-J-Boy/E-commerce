import React, { useState } from 'react';

const NavBar: React.FC = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const handleInputChange = (ev: any) => {
    setSearch(ev.target.value);
  };

  return (
    <div>
      <form>
        <input type='text' value={search} onChange={handleInputChange} />
      </form>
    </div>
  );
};

export default NavBar;
