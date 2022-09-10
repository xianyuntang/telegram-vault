import { Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import SendCodeStep from "@/renderer/components/LoginPage/login-steps/SendCodeStep/SendCodeStep";
import SignInStep from "@/renderer/components/LoginPage/login-steps/SignInStep";
import SignInWithPasswordStep from "@/renderer/components/LoginPage/login-steps/SignInWithPasswordStep";

interface LoginForm {
  phoneNumber: string;
  phoneCodeHash: string;
  phoneCode: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  const { setValue, getValues } = useForm<LoginForm>({
    defaultValues: {
      phoneNumber: "",
      phoneCodeHash: "",
      phoneCode: "",
      password: "",
    },
  });

  const setPhoneNumber = (value: string) => {
    setValue("phoneNumber", value);
  };

  const setPhoneCodeHash = (value: string) => {
    setValue("phoneCodeHash", value);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <Grid
      sx={{
        width: "100%",
        height: "100%",
      }}
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component={Paper}
      elevation={1}
    >
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {step === 1 && (
          <SendCodeStep
            setPhoneNumber={setPhoneNumber}
            setPhoneCodeHash={setPhoneCodeHash}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <SignInStep
            phoneNumber={getValues("phoneNumber")}
            phoneCodeHash={getValues("phoneCodeHash")}
            nextStep={nextStep}
          />
        )}
        {step === 3 && <SignInWithPasswordStep />}
      </Grid>
    </Grid>
  );
};

export default LoginPage;
