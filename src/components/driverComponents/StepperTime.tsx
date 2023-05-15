import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';


const StepperTime=()=> {
  const [active, setActive] = useState<number>(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper color='lime' iconSize={32} active={active} onStepClick={setActive} >
        <Stepper.Step>
        </Stepper.Step>
        <Stepper.Step>
        </Stepper.Step>
        <Stepper.Step>
        </Stepper.Step>
        <Stepper.Completed>
        </Stepper.Completed>
      </Stepper>

    {/** 
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
     */}
    </>
  );
}

export default StepperTime;