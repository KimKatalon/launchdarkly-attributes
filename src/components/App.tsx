import { styled, TextField } from "@mui/material";
import { useFlags, useLDClient } from "launchdarkly-react-client-sdk";
import React, { useEffect, useState } from "react";

const AppContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "2rem",
  height: "100vh",
  gap: "1rem",
});

const FlagContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const InputsContainer = styled("div")({
  display: "flex",
  gap: "1rem",
});

const App: React.FC = () => {
  const [settings, setSettings] = useState<{
    organization: number;
    account: number;
    project: number;
  }>({
    organization: 1,
    account: 2,
    project: 3,
  });
  const flags = useFlags();
  const ldClient = useLDClient();

  useEffect(() => {
    console.log("Identifying user with custom attributes", settings);
    ldClient?.identify({
      kind: "user",
      key: "context-key-changing",
      ...settings,
    });
  }, [settings]);

  return (
    <AppContainer>
      <h1>Launch Darkly Custom Attributes test</h1>
      <InputsContainer>
        <TextField
          label="Organization"
          type="number"
          value={settings.organization}
          onChange={(e) =>
            setSettings({ ...settings, organization: parseInt(e.target.value) })
          }
        />
        <TextField
          label="Account"
          type="number"
          value={settings.account}
          onChange={(e) =>
            setSettings({ ...settings, account: parseInt(e.target.value) })
          }
        />
        <TextField
          label="Project"
          type="number"
          value={settings.project}
          onChange={(e) =>
            setSettings({ ...settings, project: parseInt(e.target.value) })
          }
        />
      </InputsContainer>
      <FlagContainer>
        <h2>Flags</h2>
        {Object.entries(flags).map(([key, value]) => (
          <div key={key}>
            <strong>{key}</strong>: {value.toString()}
          </div>
        ))}
      </FlagContainer>
    </AppContainer>
  );
};

export default App;
