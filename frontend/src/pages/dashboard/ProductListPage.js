import React, { useState, useEffect } from 'react'
import { Box, CircularProgress, Grid ,Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import { Helmet } from 'react-helmet-async';
import Tooltip from '@mui/material/Tooltip';
import CustomDataGrid from '../../components/customdatagrid/datagrid';
import { getAllProducts } from '../../api';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';


function Productlist() {
  const [data, setdata] = useState([])
  const [isLoader,setIsLoader] = useState(false)
  useEffect(() => {
    setIsLoader(true)
    getAllProducts().then((res) => {
    
      setIsLoader(false)
      setdata(res.data)
    
    }).catch((err) =>{
      console.log(err)
      setIsLoader(false)
      })
  }, [])



  const columns = [
    {
      field: "image",
      headerName: "Product Image",
      renderCell:(param)=>(
        
        <img alt='product imag'  src={`http://207.180.230.78:8081/${param.image}`}/>
      )
    },
    {
      field: "name_en",
      headerName: "Product Name English",
      flex:6,
      groupable: false,
      aggregable: false,
    }, 
    {
      field: "name_ur",
      headerName: "Product Name Urdu",
      flex:6,
      groupable: false,
      aggregable: false,
  }, 
    {
      field: "sale_price",
      headerName: "Sale Price",
      flex:6,
      groupable: false,
      aggregable: false,
  }, 
    {
      field: "trade_price",
      headerName: "Trade Price",
      flex:6,
      groupable: false,
      aggregable: false,
  }, 
    
  ];

  

  return (
    <>

         <CustomBreadcrumbs
          sx={{ml:3}}
          heading={'Product List'}
          links={[
            {
              name: 'Dashboard',
              href:'/dashboard',
            },
            {
              name: 'Product',
              href: '/product/list',
            },
            { name:'Product List' },
          ]}
        />
    <div>
      {data?.length?
        <CustomDataGrid 
          data={{columns,rows:[...data]}}
        />:null
      }
    </div>
    </>
  )
}

export default Productlist;