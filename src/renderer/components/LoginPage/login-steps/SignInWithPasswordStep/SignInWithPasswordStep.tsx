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

import { AppRouterPath } from "@/renderer/components/AppRouter";
import { dbService, telegramService } from "@/renderer/ipc-services";

interface SignInWithPasswordForm {
  password: string;
}

const SignInWithPasswordStep: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<SignInWithPasswordForm>({
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInWithPasswordForm> = async (data) => {
    setLoading(true);
    try {
      await telegramService.signInWithPassword(data);

      await dbService.fetchDatabase();

      navigate(AppRouterPath.FILE_EXPLORER);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onError: SubmitErrorHandler<SignInWithPasswordForm> = async (
    errors
  ) => {
    console.log(errors);
  };

  return (
    <form
      className="login-page__form"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={2}
      >
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type="password"
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
          Sign In With Password
        </LoadingButton>
      </Grid>
    </form>
  );
};

export default SignInWithPasswordStep;
