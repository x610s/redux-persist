import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TransferenciaResponse,
  TrasnferenciaEdit,
} from "../../models/transferencia.model";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { fetchEditTransfer } from "../../features/transferencia/transferenciaApi";
import { SnackBarMessage } from "../snackbar";
import { useState } from "react";
import { SnackbarMessage } from "../../models/snackbar.model";

export const UpdateTrasnferModal = ({
  open,
  setOpen,
  selectedTransfer,
  setSelectedTransfer,
  setTransfers,
  transfers
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTransfer: TransferenciaResponse;
  setSelectedTransfer: React.Dispatch<
    React.SetStateAction<TransferenciaResponse | null>
  >;
  setTransfers: React.Dispatch<React.SetStateAction<TransferenciaResponse[]>>
  transfers: TransferenciaResponse[]
}) => {
  const [mostrarSnakbar, setmostrarSnakbar] = useState<SnackbarMessage | null>(
    null
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TrasnferenciaEdit>();

  const onSubmit: SubmitHandler<TrasnferenciaEdit> = async (
    data: TrasnferenciaEdit
  ) => {
    data.fecha = dayjs(data.fecha).format("YYYY-MM-DD HH:mm:ss");
    const resp = await fetchEditTransfer(data);
    if (resp.status === 200) {

      let trans: TransferenciaResponse = transfers.filter(x=> x.id === selectedTransfer.id)[0];
      let index: number = transfers.indexOf(trans);
      if(index>-1){
        trans = {...data, user: selectedTransfer.user};
        transfers[index] = trans;
        setTransfers(transfers)
        setmostrarSnakbar({
          mostrar: true,
          msg: resp.resp,
          success: true,
        });
        setOpen(false);
        setTimeout(() => {
        setSelectedTransfer(null);
        }, 1000);
      }
    } else {
      setmostrarSnakbar({
        mostrar: true,
        msg: resp.resp,
        success: false,
      });
    }
  };

  return (
    <div>
        <Dialog
          open={open}
          onClose={() => {
            setSelectedTransfer(null);
            setOpen(false);
          }}
        >
      <form className="p-4">
          <DialogTitle>Modificar Transferencia</DialogTitle>
          <DialogContent>

            {/*  */}
            <div className="w-full max-w-xs">
              {/* Fecha */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha
                </label>
                <Controller
                  control={control}
                  name="fecha"
                  defaultValue={selectedTransfer.fecha}
                  rules={{
                    required: true,
                  }}
                  render={({
                    field: { ref, onBlur, name, ...field },
                    fieldState,
                  }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        {...field}
                        inputRef={ref}
                        renderInput={(inputProps) => (
                          <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            name={name}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
                {errors.fecha && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/*  */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Monto
                </label>
                <input
                  defaultValue={selectedTransfer.monto}
                  {...register("monto", { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3
                   leading-tight focus:outline-none focus:shadow-outline"
                  id="monto"
                  type="number"
                  min={0}
                />
                {errors.monto && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/*  */}

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Observacion
                </label>
                <input
                  defaultValue={selectedTransfer.observacion}
                  {...register("observacion")}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3
                   leading-tight focus:outline-none focus:shadow-outline"
                  id="observacion"
                  type="text"
                />
              </div>
              {/*  */}

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Cuenta Destino
                </label>
                <input
                  defaultValue={selectedTransfer.cuenta_destino}
                  {...register("cuenta_destino", { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3
                   leading-tight focus:outline-none focus:shadow-outline"
                  id="cuenta_destino"
                  type="text"
                />
                {errors.cuenta_destino && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/*  */}

              <input
                type={"hidden"}
                defaultValue={selectedTransfer.user_id}
                {...register("user_id", { required: true })}
              />
              <input
                type={"hidden"}
                defaultValue={selectedTransfer.id}
                {...register("id", { required: true })}
              />
            </div>

            {/*  */}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSelectedTransfer(null);
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Enviar
            </Button>
          </DialogActions>
      </form>
        </Dialog>
      {mostrarSnakbar && (
        <SnackBarMessage
          snackData={mostrarSnakbar}
          setSnackData={setmostrarSnakbar}
        />
      )}
    </div>
  );
};
