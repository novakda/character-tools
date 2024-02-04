import Export from "@/components/characterEditor/exportOrSave/ExportCharacter";
import SaveCharacter from "@/components/characterEditor/exportOrSave/SaveCharacter";
import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import SaveCharacterNow from "./exportOrSave/SaveCharacterNow";

const SaveAndReturn: FC = () => {
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Save it
      </Typography>
      <SaveCharacterNow/>
    </>
  );
};

export default SaveAndReturn;
