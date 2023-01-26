import React, { useEffect, useState } from "react";
import { TransferenciaResponse } from "../../models/transferencia.model";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import {
  deleteTrans,
  fetchTransfer,
} from "../../features/transferencia/transferenciaApi";
import { UpdateTrasnferModal } from "../../components/transferencias/updateTransfer";
import { useAppSelector } from "../../app/hooks";

export const TransferenciasList = () => {
  const [transferencias, settransferencias] = useState<TransferenciaResponse[]>(
    []
  );
  const {auth} = useAppSelector(state => state);
  const [selectedTransfer, setselectedTransfer] = useState<TransferenciaResponse|null>(null);
  const [loading, setloading] = useState<boolean>(true);
  const [open, setOpen] = React.useState(false);

  const handleUpdate = (transfer: TransferenciaResponse) => {
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    setloading(true);
    const resp = await deleteTrans(id);
    if (resp.status === 200) {
      settransferencias((x) => x.filter((x) => x.id != id));
    }
    setloading(false);
  };

  useEffect(() => {
    if(auth.token){
      setloading(true);
      fetchTransfer(auth.token)
        .then(({ transfer }) => {
          settransferencias(transfer);
          setloading(false);
        })
        .catch(x=>{
          setloading(false)
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <h2>Cargando...</h2>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Observacion</TableCell>
                <TableCell align="right">Cuenta Destino</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transferencias.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {" "}
                    {row.fecha.toString()}
                  </TableCell>
                  <TableCell align="right">{row.monto}</TableCell>
                  <TableCell align="right">{row.observacion}</TableCell>
                  <TableCell align="right">{row.cuenta_destino}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      sx={{ mx: "10px" }}
                      onClick={() => {
                        handleUpdate(row);
                        setselectedTransfer(row);
                      }}
                    >
                      Modificar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        handleDelete(row.id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {
         selectedTransfer && <UpdateTrasnferModal 
         setOpen={setOpen} open={open}
         selectedTransfer={selectedTransfer}
         setTransfers={settransferencias}
         transfers={transferencias}
         setSelectedTransfer={setselectedTransfer} />
      }
    </>
  );
};
