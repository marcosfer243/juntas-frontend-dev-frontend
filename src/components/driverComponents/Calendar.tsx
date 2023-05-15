import { useState } from 'react';
import { Group, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

type Props ={
  depDate: Date | null,
  setDepDate:(updatedDepDate: Date)=>void
}


const Calendar=(props: Props)=> {
  const {depDate, setDepDate} = props;


  return (
    <Group style={{ width:"max-content", display:"flex", flexDirection:"column"}} position="center">
      <Title order={3} fw="normal">¿Cuándo?</Title>
      <DatePicker
      style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px", borderRadius:"10px"}}
       minDate={new Date()}
       size="xs"
         value={depDate} onChange={setDepDate} />
    </Group>
  );
}

export default Calendar;