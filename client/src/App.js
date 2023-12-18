 
import React, { useState } from 'react'
import { Grid, TextField, Button } from '@mui/material'   

function App() {
  const [data, setData] = useState([])
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')

  let result4 = {
    "category": null,
    "products": [],
    "drinks": [
      {
        "category": "Безалкохолни напитки",
        "products": [],
        "drinks": [
          {
            "category": "Газирани напитки",
            "products": [],
            "drinks": [
              {
                "category": "Кола",
                "products": [
                  {
                    "name": "Green Газирана напитка Кола",
                    "price": "2,49 лв."
                  },
                  {
                    "name": "Coca Cola Газирана напитка 2х1.5л",
                    "price": "4,99 лв."
                  },
                  {
                    "name": "Coca Cola Газирана напитка 2л",
                    "price": "2,89 лв."
                  },
                  {
                    "name": "Coca Cola Газирана напитка без захар 2л",
                    "price": "2,89 лв."
                  },
                  {
                    "name": "Coca Cola Zero Газирана напитка без захар",
                    "price": "1,79 лв."
                  },
                  {
                    "name": "Coca Cola Zero Безалкохолна газирана напитка без захар",
                    "price": "2,39 лв."
                  },
                  {
                    "name": "Pepsi Безалкохолна газирана напитка",
                    "price": "2,69 лв."
                  },
                  {
                    "name": "Coca Cola Газирана напитка 500мл",
                    "price": "1,79 лв."
                  },
                  {
                    "name": "Pepsi Max Газирана безалкохолна напитка без захар",
                    "price": "2,69 лв."
                  },
                  {
                    "name": "Pepsi Безалкохолна напитка Twist 6x330мл",
                    "price": "8,99 лв."
                  },
                  {
                    "name": "Pepsi Газирана напитка 6x330мл",
                    "price": "8,99 лв."
                  },
                  {
                    "name": "Green Cola Газирана напитка",
                    "price": "1,39 лв."
                  },
                  {
                    "name": "Aro Газирана напитка Кола 6x2.5л",
                    "price": "6,99 лв."
                  },
                  {
                    "name": "Coca Cola Газирана напитка 6x1л",
                    "price": "11,99 лв."
                  },
                  {
                    "name": "Pepsi Max Газирана безалкохолна напитка",
                    "price": "2,89 лв."
                  },
                  {
                    "name": "Pepsi Газирана безалкохолна напитка 6x1.5л",
                    "price": "15,49 лв."
                  },
                  {
                    "name": "Coca Cola Газирана напитка 5+1 кен",
                    "price": "6 бр"
                  },
                  {
                    "name": "Derby Газирана безалкохолна напитка Кола",
                    "price": "1,00 лв."
                  }
                ],
                "drinks": []
              },
              {
                "category": "Портокал",
                "products": [],
                "drinks": []
              },
              {
                "category": "Лимон",
                "products": [],
                "drinks": []
              },
              {
                "category": "Тоник",
                "products": [],
                "drinks": []
              },
              {
                "category": "Други плодове",
                "products": [],
                "drinks": []
              },
              {
                "category": "Газирана вода",
                "products": [],
                "drinks": []
              },
              {
                "category": "Кенчета",
                "products": [],
                "drinks": []
              }
            ]
          },
          {
            "category": "Студен чай",
            "products": [],
            "drinks": []
          }
        ]
      },
      {
        "category": "Сокове",
        "products": [],
        "drinks": []
      },
      {
        "category": "Кафе",
        "products": [],
        "drinks": []
      },
      {
        "category": "Чай",
        "products": [],
        "drinks": []
      },
      {
        "category": "Бира",
        "products": [],
        "drinks": []
      },
      {
        "category": "Вино",
        "products": [],
        "drinks": []
      },
      {
        "category": "Алкохолни напитки",
        "products": [],
        "drinks": []
      },
      {
        "category": "Сайдер и коктейли",
        "products": [],
        "drinks": []
      },
      {
        "category": "Енергийни и спортни напитки",
        "products": [],
        "drinks": []
      },
      {
        "category": "Сиропи",
        "products": [],
        "drinks": []
      },
      {
        "category": "Разтворими напитки",
        "products": [],
        "drinks": []
      },
      {
        "category": "Вода",
        "products": [],
        "drinks": []
      },
      {
        "category": "XXL Опаковки",
        "products": [],
        "drinks": []
      }
    ]
  }
    
   

  const handleClick = async () => {
    setIsLoading(true);

    try {  
        const response = await fetch("https://localhost:7022/api/Scrap/Webscraping", {
          method: "POST",
            body: JSON.stringify({webaddress: value}),
            headers: { 'Content-Type': 'application/json' }, 
        })

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        } 
         const result = await response.json()

        console.log('result is: ', result) 

        if(result) { 
          
          //const result3 = (result) => {
            var r = result.drinks.map(function(obj) {
              return Object.keys(obj).sort().map(function(key) { 
                return obj[key] 
              }) 
            }) 
            
            let o = r.flat(2)
          
            var a = o.map((str, index) => {
              if(typeof str === 'string' || str instanceof String) {
                return { "category": str, "products": [], "drinks": [] } 
              }  else {
                return str
              }
            }) 
          //  console.log("output2-------------------------------------->", output2) 
          //  return output2
         // }



          setData(a) 
        }
         
    } catch (err) {
        setErr(err.message)
    } finally {
        setIsLoading(false)
    }
  }

  //console.log(data);

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
                <Grid container item xs={10} sm={8} md={6} lg={6} mt={3}>  
                    {data.map((d, xid) => {
                        return (
                          <Grid container item xs={10} sm={8} md={6} lg={10}>  
                            <div>  
                                <h3>Category: {d.category}</h3>   
                                {d.drinks.length > 0 && d.drinks.map((p) => (
                                  <div>  
                                      <h4 style={{marginLeft: 25, marginTop: -5,}}>Sub Category: {p.category}</h4>  
                                      {p.products.length > 0 &&  p.products.map((pr) => (
                                        <div style={{marginLeft: 55}}>  
                                          <p>Name: {pr.name}</p>  
                                          <p style={{marginTop: -13, marginBottom: 30}}>Price: {pr.price}</p>  
                                        </div>
                                      ))}
                                  </div>
                                ))} 
                            </div>
                        </Grid> 
                        )
                    })} 
                   
                </Grid>  
            </Grid>
        </Grid>
    </Grid>
  )
}

export default App
