 
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'   

function App() {
  const [data, setData] = useState([])
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')

  const handleClick = async () => {
    setIsLoading(true);

    try {  
        const response = await fetch("https://localhost:7022/api/Scrap/Webscraping", {
          method: "POST",
            body: JSON.stringify({webaddress: value}),
            headers: {
                'Content-Type': 'application/json',
                //'Access-Control-Allow-Headers': '*',
            }, 
        })

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        }

        const result = await response.json()

        console.log('result is: ', JSON.stringify(result))

        setData(result)
    } catch (err) {
        setErr(err.message)
    } finally {
        setIsLoading(false)
    }
  }

  console.log(data);

  return (
    <Grid container item xs={12} sm={12} md={12} lg={12} mt={10}    
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="row"         
    >
      <Grid container item xs={10} sm={8} md={6} lg={6} 
        alignItems="center"
        justifyContent="center"    
        display="flex" 
        direction="column"         
     > 
            <Grid container item xs={12} sm={12} md={12} lg={12}   
                alignItems="center"
                justifyContent="center"
                direction="column"       
            > 
                {err && <h1>{err}</h1>}  
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} 
                alignItems="center"
                justifyContent="center"
                direction="column"  
            >
                <Grid container item xs={12} sm={12} md={12} lg={12}>    
                    {isLoading && <h1>Loading...</h1>} 
                </Grid>  
                  
                <Grid container item xs={10} sm={12} md={12} lg={12} mt={1}
                    alignItems="flex-start"
                    justifyContent="center"
                    direction="column"       
                > 
                  <TextField  
                      fullWidth   
                      InputProps={{ style: { fontSize: 20, borderRadius: '12px', } }}
                      InputLabelProps={{ style: { fontSize: 20.5 } }}
                      type="text"
                      variant="outlined"
                      placeholder='Web Address'
                      label="Web Address"
                      name="web"
                      value={value}
                      onChange={(e) => setValue(e.target.value)} 
                  /> 
                </Grid>  

                <Grid container item xs={10} sm={12} md={12} lg={12} mt={3}
                    alignItems="flex-start"
                    justifyContent="center"
                    direction="column"       
                >    
                    <Button variant="outlined" size="large"
                        style={{ borderRadius: '14px', fontSize: 21, color: "black",  border: '2px solid #020233' 
                    }}
                        onClick={() => handleClick()}
                    >Fetch</Button>
                </Grid> 
                <Grid container item xs={10} sm={8} md={6} lg={6} > 
                    {data.map((d, xid) => {
                      return (
                        <div key={xid}>
                          <h2>{d.email}</h2>
                          <h2>{d.name}</h2>
                          <h2>{d.ages}</h2>
                          <br />
                        </div>
                      )
                    })} 
                </Grid>  
            </Grid>
        </Grid>
    </Grid>
  )
}

export default App
