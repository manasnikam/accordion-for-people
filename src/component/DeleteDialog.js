import React, { memo } from 'react';
import '../App.css';

import { useAccordion } from '../core/context/AccordionContext';


const DeleteDialog = () => {

    const { deleteCelebrity, showDeleteDialog, setShowDeleteDialog } = useAccordion()

    return (
        <div className='dialog' style={{ display: showDeleteDialog ? 'block' : 'none' }}>
            <div className='dialog-content'>
                <div className='title'>Are you sure you want to delete?</div>
                <div className='button-grp'>
                    <div className='cancel' onClick={() => setShowDeleteDialog(false)}>Cancel</div>
                    <div className='delete' onClick={deleteCelebrity}>Delete</div>
                </div>
            </div>
        </div>
    )
}

export default memo(DeleteDialog);
