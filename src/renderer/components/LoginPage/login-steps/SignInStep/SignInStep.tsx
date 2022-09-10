import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TelegramError } from "@/common/gramjs";
import { telegramService } from "@/renderer/ipc-services";
interface SignInForm {
  phoneNumber: string;
  phoneCodeHash: string;
  phoneCode: string;
}

interface SignInFormProps {
  nextStep: () => void;
  phoneNumber: string;
  phoneCodeHash: string;
}

const SignInStep: React.FC<SignInFormProps> = ({
  nextStep,
  phoneNumber,
  phoneCodeHash,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<SignInForm>({
    defaultValues: {
      phoneNumber: phoneNumber,
      phoneCodeHash: phoneCodeHash,
      phoneCode: "",
    },
  });

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    setLoading(true);
    try {
      const response = await telegramService.signIn(data);
      console.log(response);
      navigate("/");
    } catch (e) {
      if ((e as TelegramError).code === 401) {
        nextStep();
      }
    }
    setLoading(false);
  };

  const onError: SubmitErrorHandler<SignInForm> = async (errors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Controller
          control={control}
          name="phoneCode"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Code"
              variant="outlined"
              disabled={loading}
              fullWidth
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          fullWidth
        >
          Sign In
        </LoadingButton>
      </Grid>
    </form>
  );
};

export default SignInStep;
