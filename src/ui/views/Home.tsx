import React, { useState } from "react";
import { useChangeTitle } from "../../core";
import Button from "@mui/material/Button";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = React.memo(({}) => {
  const meta = useChangeTitle("Home");
  const [open, setOpen] = useState(false);

  return (
    <div>
      {meta}
      home
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
});

export default Home;
