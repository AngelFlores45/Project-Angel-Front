import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Container} from '@mui/system';
import {useNavigate} from 'react-router-dom';
export default function Project() {
    const navigate = useNavigate();
    const[id,setId]=useState('')
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[projects,setProjects]=useState([])
    const handleClick=(e)=>{
      e.preventDefault()
      const project={name,address}
      console.log(project)
      fetch ("http://localhost:8080/project/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(project)
      }).then(()=>{
        console.log("New Project Added");
        projects.push(project);
        setProjects(projects);
        navigate('/project');
      })
    }
    const DetailsClick=(item)=>{    
      setName(item.name)
      setId(item.id)
      setAddress(item.address)
      const project={id,name,address}
      console.log(project)      
    }

    const Update=(e)=>{
      e.preventDefault()
      const project={id,name,address}
      console.log(project)
      fetch ("http://localhost:8080/project/item/"+id,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(project)
      }).then(()=>{
        console.log("Project Updated");
        const newList = projects.filter((item) => item.id !== id);
        setProjects(newList);
        projects.push(project);
        setProjects(projects);
        navigate('/project');
      })      
    }

    const handleRemove=(id)=>{

      console.log(id)
      fetch ("http://localhost:8080/project/item/"+ id,{
        method:"DELETE"
      }).then(()=>{
        console.log("Project deleted");
        const newList = projects.filter((item) => item.id !== id);
        setProjects(newList);
        navigate('/project');
      })
    }
    useEffect(()=>{
      fetch("http://localhost:8080/project/getAll")
      .then(res=>res.json())
      .then((result)=>{
        setProjects(result);
      })
    },[])

  return (
     <Container> 
      <Paper elevation={3}>
        <h1 style={{color:"blue"}}>
          Agregar Autor
        </h1>
       <Box sx={{
        padding:'00px 10px',
        margin:'20px auto',
        width: 600,
        height: 130
      }}>
      
      <TextField id="outlined-basic" label="Nombre del Autor" variant="outlined"  
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <TextField id="outlined-basic" label="Titulo del Libro" variant="outlined"  
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <br/>
      <br/>
     <Stack direction="row" spacing={2}>
     
      <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
        Add
      </Button>
<Button variant="contained" onClick={Update}>
        Update
      </Button>
    </Stack>
        
        </Box>
             
        </Paper>
        <h1>
          Autores
        </h1>

        <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 332,
          height: 160,
        },
      }}
    >
          {projects.map(project=>
            (
              <Paper elevation={6} style={{margin:"10px",padding:"15px", textAling:"left"}} key={project.id}>
                Id :{project.id}
                <Grid container spacing={2} style={{textAlign:"left"}}>
                  <Grid item xs={2}>
                    <label style={{textAlign:"right", fontWeight:"bold"}} >Name:</label>
                  </Grid>
                  <Grid item xs={9}>
                    <label style={{textAlign:"left"}}>{project.name}</label>
                  </Grid>
                  <Grid item xs={2}>
                  <label style={{textAlign:"right", fontWeight:"bold"}} >Book:</label>
                  </Grid>
                  <Grid item xs={9}>
                    <label style={{textAlign:"left"}}>{project.address}</label>
                  </Grid>
                </Grid>

                <br/><Button style={{margin:"10px", textAling:"left"}} variant="contained" onClick={() => DetailsClick(project)}>
        Edit
      </Button>
      <Button variant="outlined" color="error"  onClick={() => handleRemove(project.id)}>
        Delete 
      </Button>
              </Paper>

            ))
            
            
            }
        </Box>
    </Container>
  );
}

