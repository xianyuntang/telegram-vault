import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { Country } from "@/common/gramjs";
import { telegramService } from "@/renderer/ipc-services";

interface SendCodeForm {
  phoneNumber: string;
  country: string;
}

interface SendCodeStepProps {
  setPhoneNumber: (value: string) => void;
  setPhoneCodeHash: (value: string) => void;
  nextStep: () => void;
}

const SendCodeStep: React.FC<SendCodeStepProps> = ({
  setPhoneNumber,
  setPhoneCodeHash,
  nextStep,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);

  const { handleSubmit, control, getValues } = useForm<SendCodeForm>({
    defaultValues: {
      phoneNumber: "",
      country: "",
    },
  });

  useEffect(() => {
    (async () => {
      const response = await telegramService.getCountriesList();
      setCountries(response.countries);
    })();
  }, []);

  const onSubmit: SubmitHandler<SendCodeForm> = async (data) => {
    setLoading(true);
    try {
      const fullPhoneNumber = `+${data.country}${data.phoneNumber}`;
      const response = await telegramService.sendCode({
        phoneNumber: fullPhoneNumber,
      });
      console.log(response);
      setPhoneNumber(fullPhoneNumber);
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
          name="country"
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl sx={{ width: "100%" }}>
              <InputLabel>Country</InputLabel>
              <Select
                {...field}
                label="Country"
                fullWidth
                disabled={loading}
                MenuProps={{
                  PaperProps: { sx: { height: "200px" } },
                }}
              >
                {countries.map((country) => (
                  <MenuItem
                    key={country.defaultName}
                    value={country.countryCodes[0].countryCode}
                  >
                    {country.defaultName} {}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl sx={{ width: "100%" }}>
              <TextField
                {...field}
                label="Phone Number"
                variant="outlined"
                fullWidth
                disabled={loading}
              />
            </FormControl>
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
