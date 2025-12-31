import React, { useState, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  AppBar, Toolbar, Typography, Container, Card, CardContent,
  Paper, CardActionArea, CardMedia, Grid, TableContainer, Table,
  TableBody, TableHead, TableRow, TableCell, Button, Box
} from "@material-ui/core";
import { useDropzone } from 'react-dropzone';
import Clear from '@material-ui/icons/Clear';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SpaIcon from '@material-ui/icons/Spa';
import axios from "axios";

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#fff',
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '12px 28px',
    borderRadius: '25px',
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'none',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': { 
      backgroundColor: 'rgba(56, 142, 60, 0.95)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      margin: 0,
      padding: 0,
      overflow: 'auto',
    },
    html: {
      margin: 0,
      padding: 0,
    }
  },
  grow: { flexGrow: 1 },
  clearButton: {
    width: "100%",
    maxWidth: '300px',
  },
  media: { 
    height: 350,
    borderRadius: '20px 20px 0 0',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: 250,
    }
  },
  gridContainer: {
    justifyContent: "center",
    padding: "2em 1em",
    minHeight: "calc(100vh - 70px)",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      padding: "1em 0.5em",
      minHeight: "calc(100vh - 60px)",
    }
  },
  mainContainer: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1645628100819-981300372236?auto=format&fit=crop&w=1920&q=60&blur=30)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: "100vh",
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    paddingTop: '70px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '60px',
      backgroundAttachment: 'scroll',
    },
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 0,
    }
  },
  imageCard: {
    margin: "auto",
    maxWidth: 500,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      borderRadius: '16px',
    }
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  tableCell: {
    fontSize: '18px',
    color: '#fff !important',
    fontWeight: 600,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    }
  },
  tableHeader: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7) !important',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    }
  },
  detail: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 20px',
    borderRadius: '0 0 24px 24px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 15px',
    }
  },
  appbar: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1100,
  },
  dropzone: {
    border: '3px dashed rgba(76, 175, 80, 0.6)',
    borderRadius: '20px',
    padding: '40px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 15px',
      minHeight: '240px',
      borderRadius: '16px',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgba(76, 175, 80, 0.9)',
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 30px rgba(76, 175, 80, 0.3)',
    }
  },
  dropzoneActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: 'rgba(76, 175, 80, 1)',
    borderStyle: 'solid',
    transform: 'scale(1.02)',
  },
  uploadIcon: {
    fontSize: 64,
    color: 'rgba(76, 175, 80, 0.9)',
    marginBottom: 16,
    filter: 'drop-shadow(0 4px 10px rgba(76, 175, 80, 0.3))',
    [theme.breakpoints.down('sm')]: {
      fontSize: 48,
      marginBottom: 12,
    }
  },
  loaderContainer: {
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '280px',
    [theme.breakpoints.down('sm')]: {
      padding: '40px 15px',
      minHeight: '240px',
    }
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(1.1)', opacity: 0.8 },
  },
  loader: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: '5px solid rgba(76, 175, 80, 0.2)',
    borderTop: '5px solid rgba(76, 175, 80, 1)',
    animation: '$spin 1s linear infinite',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
      border: '4px solid rgba(76, 175, 80, 0.2)',
      borderTop: '4px solid rgba(76, 175, 80, 1)',
    }
  },
  loaderIcon: {
    fontSize: 50,
    color: 'rgba(76, 175, 80, 1)',
    animation: '$pulse 2s ease-in-out infinite',
    marginBottom: 16,
    filter: 'drop-shadow(0 4px 15px rgba(76, 175, 80, 0.4))',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      marginBottom: 12,
    }
  },
  titleText: {
    color: '#fff',
    fontWeight: 700,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    }
  },
  uploadText: {
    color: '#fff',
    fontWeight: 600,
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
    }
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.9)',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    }
  },
  captionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '6px 16px',
    borderRadius: '20px',
    marginTop: '12px',
    fontSize: '0.75rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.7rem',
      padding: '5px 12px',
    }
  },
  resultBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    padding: '8px 20px',
    borderRadius: '30px',
    border: '2px solid rgba(76, 175, 80, 0.4)',
    marginBottom: '20px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    [theme.breakpoints.down('sm')]: {
      padding: '6px 16px',
    }
  },
  gridItem: {
    position: 'relative',
    zIndex: 1,
  },
  contentWrapper: {
    position: 'relative',
    zIndex: 1,
  }
}));


export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendFile = useCallback(async (file) => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        process.env.REACT_APP_API_URL || "http://127.0.0.1:4000/predict",
        formData
      );

      setData(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to predict. Please check if backend is running.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      setData(null);
      
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      sendFile(file);
    }
  }, [sendFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    maxSize: 5242880
  });

  const clearData = () => {
    setData(null);
    setSelectedFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const confidence = data ? (parseFloat(data.confidence) * 100).toFixed(2) : 0;

  return (
    <>
      <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar>
          <SpaIcon style={{ marginRight: 12, fontSize: 32, color: '#4CAF50' }} />
          <Typography variant="h5" className={classes.titleText}>
            SpudHealth AI - Potato Disease Detector
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>

      <div className={classes.mainContainer}>
        <Container maxWidth="md" className={classes.contentWrapper}>
          <Grid container justifyContent="center" alignItems="center" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={10} md={8} className={classes.gridItem}>
              <Card className={classes.imageCard} elevation={0}>
                {selectedFile && preview && !isLoading && (
                  <CardActionArea>
                    <CardMedia className={classes.media} image={preview} component="img" />
                  </CardActionArea>
                )}

                {!selectedFile && !isLoading && (
                  <CardContent>
                    <div 
                      {...getRootProps()} 
                      className={`${classes.dropzone} ${isDragActive ? classes.dropzoneActive : ''}`}
                    >
                      <input {...getInputProps()} />
                      <CloudUploadIcon className={classes.uploadIcon} />
                      <Typography variant="h5" gutterBottom className={classes.uploadText}>
                        {isDragActive ? 'Drop it here!' : 'Upload Plant Image'}
                      </Typography>
                      <Typography variant="body1" className={classes.subtitleText} style={{ marginBottom: 16 }}>
                        Drag and drop or click to browse
                      </Typography>
                      <Typography variant="caption" className={classes.captionText}>
                        JPG, PNG • Max 5MB
                      </Typography>
                    </div>
                  </CardContent>
                )}

                {isLoading && (
                  <Box className={classes.loaderContainer}>
                    <SpaIcon className={classes.loaderIcon} />
                    <div className={classes.loader}></div>
                    <Typography variant="h6" className={classes.uploadText} style={{ marginBottom: 8 }}>
                      Analyzing Plant Health...
                    </Typography>
                    <Typography variant="body2" className={classes.subtitleText}>
                      Our AI is examining your potato leaf
                    </Typography>
                  </Box>
                )}

                {data && (
                  <CardContent className={classes.detail}>
                    <Box className={classes.resultBadge}>
                      <CheckCircleOutlineIcon style={{ color: 'rgba(76, 175, 80, 1)', fontSize: 24 }} />
                      <Typography variant="body2" style={{ color: '#fff', fontWeight: 700 }}>
                        Analysis Complete
                      </Typography>
                    </Box>
                    
                    <TableContainer component={Paper} className={classes.tableContainer}>
                      <Table size="medium">
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tableHeader}>Detected Disease</TableCell>
                            <TableCell align="right" className={classes.tableHeader}>Confidence</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.tableCell}>{data.class}</TableCell>
                            <TableCell align="right" className={classes.tableCell}>
                              <Box component="span" style={{ 
                                fontSize: '24px', 
                                fontWeight: 800,
                                color: '#4CAF50',
                                textShadow: '0 2px 8px rgba(76, 175, 80, 0.3)'
                              }}>
                                {confidence}%
                              </Box>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                )}
              </Card>

              {data && (
                <Box display="flex" justifyContent="center" marginTop={3}>
                  <ColorButton
                    variant="contained"
                    className={classes.clearButton}
                    onClick={clearData}
                    startIcon={<Clear />}
                  >
                    Analyze Another Image
                  </ColorButton>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};