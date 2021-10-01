import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography } from '@mui/material';
import { SERVER_URL } from '../../../constant/serverUrl';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Funds() {
  const [supporters, setSupporters] = React.useState([]);
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(SERVER_URL + '/creator/funds/audience', {
        pageName: localStorage.getItem('pageName'),
      })
      .then((response) => {
        console.log(response.data.audience);
        setSupporters(response.data.audience);
      })
      .catch((err) => console.log(err));

    axios
      .post(SERVER_URL + '/creator/funds/projects', {
        pageName: localStorage.getItem('pageName'),
      })
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <Grid
        container
        style={{ marginTop: '.5rem', paddingInline: '1rem' }}
        spacing={3}
      >
        <Grid item xs={5}>
          <Typography gutterBottom>
            Supporters (subscribed per month)
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Amount (in ₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supporters.length > 0 &&
                  supporters.map((row) => (
                    <TableRow
                      key={row.audienceEmail}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.firstName + ' ' + row.lastName}
                      </TableCell>
                      <TableCell align='right'>{row.audienceEmail}</TableCell>
                      <TableCell align='right'>{row.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Projects Funded</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align='right'>Date</TableCell>
                  <TableCell align='right'>Funded By</TableCell>
                  <TableCell align='right'>Email</TableCell>
                  <TableCell align='right'>Amount (in ₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length > 0 &&
                  projects.map((row) =>
                    row.audience.map((innerRow) => {
                      return (
                        <TableRow
                          key={innerRow.audienceEmail}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component='th' scope='row'>
                            {new Date(innerRow.timestamp).toLocaleDateString()}
                          </TableCell>
                          <TableCell align='right'>{row.title}</TableCell>
                          <TableCell align='right'>
                            {innerRow.firstName + ' ' + innerRow.lastName}
                          </TableCell>
                          <TableCell align='right'>
                            {innerRow.audienceEmail}
                          </TableCell>
                          <TableCell align='right'>{innerRow.amount}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
