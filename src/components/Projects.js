import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../constant/serverUrl";
import { useHistory } from "react-router-dom";

function Projects() {
  const history = useHistory();

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(SERVER_URL + "/projects")
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      })
      .catch((err) => {});
  }, []);

  const getImage = (author, name) => {
    return (
      SERVER_URL +
      "/images/creators/" +
      author +
      "/projects/" +
      name +
      "/" +
      name +
      ".jpg"
    );
  };

  const amountRef = React.useRef();

  const handlePledge = (pageName, projectTitle) => {
    history.push("/login");
  };

  const alreadyPledged = (audience) => {
    let alreadyPledged = false;

    if (audience.length > 0) {
      audience.forEach((element, index) => {
        if (element.audienceEmail === localStorage.getItem("email")) {
          alreadyPledged = true;
        }
      });
    }

    return alreadyPledged;
  };

  const getRaisedAmount = (audience) => {
    let raisedAmount = 0;

    if (audience.length > 0) {
      audience.forEach((element) => {
        raisedAmount += element.amount;
      });
    }

    return raisedAmount;
  };

  return (
    <Grid
      container
      style={{ padding: "2rem", backgroundColor: "black" }}
      spacing={4}
    >
      {projects.length > 0 &&
        projects.map((element) => {
          return (
            <Grid item style={{ marginLeft: "52px" }}>
              <Card
                sx={{ width: 345 }}
                elevation={4}
                key={element.title}
                style={{
                  // borderRadius: "22px",
                  margin: "0 auto",
                  boxShadow: "0 4px 8px teal",
                  borderRadius: "8px",
                  backgroundColor: "#424242 ",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={element.projectURL}
                  alt={element.title}
                  style={{ paddingInline: "1rem", paddingTop: ".5rem" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {element.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {element.description}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    paddingInline: "1rem",
                    paddingTop: "0rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <small style={{ color: "blue" }}>
                            Required:&ensp;₹&nbsp;{element.amount}
                          </small>
                        </Grid>
                        <Grid item>
                          <small style={{ color: "green" }}>
                            Raised:&ensp;₹ {getRaisedAmount(element.audience)}
                          </small>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardActions>
                <CardActions>
                  <Grid container justifyContent="flex-end" alignItems="center">
                    <Typography color="primary">Amount (in ₹)&ensp;</Typography>
                    <input
                      type="number"
                      size={10}
                      ref={amountRef}
                      style={{ paddingBlock: ".25rem" }}
                    />
                    <span style={{ marginInline: ".25rem" }}></span>
                    <Button
                      sx={{
                        backgroundColor: "#555555",
                        "&:hover": {
                          backgroundColor: "#666666",
                        },
                      }}
                      style={{ paddingTop: "1px" }}
                      color="inherit"
                      size="small"
                      onClick={() =>
                        handlePledge(element.pageName, element.title)
                      }
                      // disabled={alreadyPledged(element.audiences)}
                    >
                      {/* {alreadyPledged(element.audiences) ? 'Pledged' : 'Pledge'} */}
                      Pledge
                    </Button>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default Projects;
