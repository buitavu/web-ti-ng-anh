"use client";
import Topic from '@/app/component/studybytopic/topic';
import TraTu from '@/app/component/tratu/TraTu';
import TuDinhNghia from '@/app/component/tudinhnghia/tudinhnghia';
import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';


function CustomTabPanel(props){
    const {children,value,index,...other} = props;

    return(
        <div role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
            {value === index && <Box sx={{p:3}}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}


const word = () =>{
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%' , height: '100%'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Học theo chủ đề" {...a11yProps(0)} />
              <Tab label="Tra từ trong thư viện" {...a11yProps(1)} />
              <Tab label="Tự định nghĩa" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Topic/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TraTu/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <TuDinhNghia/>
          </CustomTabPanel>
       
        </Box>
      );
}

export default word;