import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { setModalContent, toggleModal } from '../Store';
import { useMutation } from '@apollo/client';
import { FINISH_REPAIR } from '../queries';
import { SelectTaskParts } from '../createNew/repair/SelectTaskParts';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const RepairEditCard = ({ repair }) => {
    const [editRepair] = useMutation(FINISH_REPAIR);


    return (

        <Box sx={style}>
            <SelectTaskParts />
        </Box>
    );
}