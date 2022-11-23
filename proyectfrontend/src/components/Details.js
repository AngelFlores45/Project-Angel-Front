import {useNavigate} from 'react-router-dom';
export default function Details() {
    const navigate = useNavigate();
<Paper elevation={3}>
<h1 style={{color:"blue"}}>
  Agregar Autor
</h1>
<Box sx={{
padding:'50px 20px',
margin:'20px auto',
width: 600,
height: 150
}}>

<TextField id="outlined-basic" label="Nombre del Autor" variant="outlined" fullWidth 
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<TextField id="outlined-basic" label="Titulo del Libro" variant="outlined" fullWidth 
value={address}
onChange={(e)=>setAddress(e.target.value)}
/>
<Stack direction="row" spacing={2}>
<Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>
Send
</Button>
</Stack>

</Box>

</Paper>
}