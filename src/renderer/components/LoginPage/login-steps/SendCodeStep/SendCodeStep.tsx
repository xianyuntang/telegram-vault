import { LoadingButton } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { telegramService } from "@/renderer/ipc-services";

interface SendCodeForm {
  phoneNumber: string;
}

interface SendCodeStepProps {
  setPhoneNumber: (value: string) => void;
  setPhoneCodeHash: (value: string) => void;
  nextStep: () => void;
}

const SendCodeStep: React.FC<SendCodeStepProps> = (props) => {
  const { setPhoneNumber, setPhoneCodeHash, nextStep } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const { handleSubmit, control, getValues } = useForm<SendCodeForm>({
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit: SubmitHandler<SendCodeForm> = async (data) => {
    setLoading(true);
    try {
      const response = await telegramService.sendCode({
        phoneNumber: getValues("phoneNumber"),
      });
      console.log(response);
      setPhoneNumber(getValues("phoneNumber"));
      setPhoneCodeHash(response.phoneCodeHash);
      nextStep();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onError: SubmitErrorHandler<SendCodeForm> = async (errors) => {
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
          name="phoneNumber"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              variant="outlined"
              fullWidth
              disabled={loading}
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          fullWidth
        >
          Send SMS Code
        </LoadingButton>
      </Grid>
    </form>
  );
};

export default SendCodeStep;
